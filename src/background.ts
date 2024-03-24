import { getAnalyzeJobDescriptionUrb } from './utils/apiUrls'
import { basicFetch } from './utils/basicFetch'
import { QUESTIONS_STORAGE_NAME } from './utils/consts'

// chrome.runtime.onInstalled.addListener(function () {
//     chrome.tabs.create({ url: 'index.html' })
// })

chrome.action.onClicked.addListener(function (tab) {
    chrome.tabs.create({ url: 'index.html' })
})
chrome.runtime.onMessage.addListener(
    ({ action, payload }, sender, sendResponse) => {
        switch (action) {
            case 'analyzeJobDescription':
                return analyzeJobDescription(payload, sendResponse)
        }
    },
)

function analyzeJobDescription({ id, jobDescription }, sendResponse) {
    let questions = []
    chrome?.storage?.local
        ?.get([QUESTIONS_STORAGE_NAME])
        .then((data) => {
            questions = data[QUESTIONS_STORAGE_NAME]
            return basicFetch(getAnalyzeJobDescriptionUrb(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jobDescription,
                    questions,
                }),
            })
        })
        .then((response) => response.json())
        .then((data) => {
            sendResponse({ data, id, questions })
        })
        .catch(() => {
            sendResponse({ id })
        })
    return true
}
