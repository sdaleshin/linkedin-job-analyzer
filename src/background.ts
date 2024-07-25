import { getAnalyzeJobDescriptionUrb } from './utils/apiUrls'
import { basicFetch } from './utils/basicFetch'
import { QUESTIONS_STORAGE_NAME } from './utils/consts'
import { JobDescription, Message } from './types'
import { QuestionModel, StoredQuestion } from './models/question'

function sendMessage(tabId: number, message: Message) {
    chrome.tabs.sendMessage(tabId, message)
}

function openQuestionsEditor() {
    chrome.tabs.create({ url: 'index.html' })
}

chrome.action.onClicked.addListener(function (tab) {
    openQuestionsEditor()
})

chrome.runtime.onMessage.addListener((message: Message, sender) => {
    switch (message.action) {
        case 'analyzeJobDescription':
            return analyzeJobDescription({
                jobDescription: message.payload,
                tabId: sender.tab.id,
            })
        case 'requestQuestions':
            return sendQuestionsWithStatus(sender.tab.id, 'empty')
        case 'openQuestionsEditor':
            openQuestionsEditor()
    }
})

async function getQuestionsFromStorage(): Promise<StoredQuestion[]> {
    const data = await chrome?.storage?.local?.get([QUESTIONS_STORAGE_NAME])
    return data[QUESTIONS_STORAGE_NAME]
}

async function sendQuestionsWithStatus(
    tabId: number,
    status: 'empty' | 'progress',
) {
    const storedQuestions = await getQuestionsFromStorage()
    const questions = storedQuestions.map(
        (q) =>
            ({
                ...q,
                status,
                answer: null,
            } as QuestionModel),
    )

    sendMessage(tabId, {
        action: 'questionsUpdated',
        payload: questions,
    })
}

async function analyzeJobDescription({
    jobDescription,
    tabId,
}: {
    jobDescription: JobDescription
    tabId: number
}) {
    await sendQuestionsWithStatus(tabId, 'progress')
    const storedQuestions = await getQuestionsFromStorage()
    const response = await basicFetch(getAnalyzeJobDescriptionUrb(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jobDescription: jobDescription.jobDescription,
            questions: storedQuestions,
        }),
    })
    const data = await response.json()
    const parsedData = JSON.parse(
        data.choices[0].message.content
            .replace(/\\n/g, '')
            .replaceAll('```json', '')
            .replaceAll('```', '')
            .replace(/\\"/g, '"'),
    )

    const answers: { id: string; answer: string }[] = Array.isArray(parsedData)
        ? parsedData
        : parsedData.questions || parsedData.responses || parsedData.answers

    if (answers?.length > 0) {
        const questions: QuestionModel[] = storedQuestions.map((q) => ({
            ...q,
            status: 'finished',
            answer: answers.find((a) => a.id === q.id)?.answer,
        }))

        sendMessage(tabId, {
            action: 'questionsUpdated',
            payload: questions,
        })
    } else {
        sendQuestionsWithStatus(tabId, 'empty')
    }
}
