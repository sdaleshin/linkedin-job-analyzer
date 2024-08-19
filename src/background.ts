import { getAnalyzeJobDescriptionUrl, getSelectorsUrl } from './utils/apiUrls'
import { basicFetch } from './utils/basicFetch'
import { QUESTIONS_STORAGE_NAME } from './utils/consts'
import { JobDescription, Message } from './types'
import { QuestionModel, StoredQuestion } from './models/question'
import { generateId } from './utils/generateId'
import { extractAnswersFromJson } from './utils/extract-answers-from-json'

function sendMessage(tabId: number, message: Message) {
    chrome.tabs.sendMessage(tabId, message)
}

function openQuestionsEditor() {
    chrome.tabs.create({ url: 'index.html' })
}

const DEFAULT_QUESTIONS: StoredQuestion[] = [
    {
        id: generateId(),
        short: 'Visa',
        type: 'boolean',
        text: 'Do they provide visa sponsorship?',
    },
    {
        id: generateId(),
        short: 'Salary',
        type: 'text',
        text: 'What is the salary?',
    },
]

chrome.runtime.onInstalled.addListener(async function () {
    const storedQuestions = await getQuestionsFromStorage()
    if (storedQuestions.length === 0) {
        chrome?.storage?.local?.set({
            [QUESTIONS_STORAGE_NAME]: DEFAULT_QUESTIONS,
        })
    }
})

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
    return data[QUESTIONS_STORAGE_NAME] ?? []
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
    if (storedQuestions.length === 0) {
        return
    }
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

    const answers = extractAnswersFromJson(parsedData)

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
