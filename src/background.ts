import { getAnalyzeJobDescriptionUrl, getSelectorsUrl } from './utils/apiUrls'
import { basicFetch } from './utils/basicFetch'
import { QUESTIONS_STORAGE_NAME } from './utils/consts'
import { JobDescription, Message } from './types'
import { QuestionModel, StoredQuestion } from './models/question'
import { generateId } from './utils/generateId'

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
            return openQuestionsEditor()
        case 'requestSelectors':
            return requestSelectors(sender.tab.id)
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

let currentAnalyzeId = null

async function analyzeJobDescription({
    jobDescription,
    tabId,
}: {
    jobDescription: JobDescription
    tabId: number
}) {
    let analyzeId = generateId()
    currentAnalyzeId = analyzeId
    await sendQuestionsWithStatus(tabId, 'progress')
    const storedQuestions = await getQuestionsFromStorage()
    const response = await basicFetch(getAnalyzeJobDescriptionUrl(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jobDescription: jobDescription.jobDescription,
            questions: storedQuestions,
        }),
    })
    if (analyzeId !== currentAnalyzeId) {
        return
    }
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

    if (analyzeId !== currentAnalyzeId) {
        return
    }
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

async function requestSelectors(tabId: number) {
    const response = await basicFetch(getSelectorsUrl(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data: string[] = await response.json()
    sendMessage(tabId, {
        action: 'selectorsUpdated',
        payload: data,
    })
}
