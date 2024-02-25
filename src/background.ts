import { getAnalyzeJobDescriptionUrb } from './utils/apiUrls'
import { basicFetch } from './utils/basicFetch'

// chrome.runtime.onInstalled.addListener(function () {
//     chrome.tabs.create({ url: 'index.html' })
// })
chrome.runtime.onMessage.addListener(
    ({ action, payload }, sender, sendResponse) => {
        switch (action) {
            case 'analyzeJobDescription':
                return analyzeJobDescription(payload, sendResponse)
        }
    },
)

function analyzeJobDescription({ id, jobDescription }, sendResponse) {
    basicFetch(getAnalyzeJobDescriptionUrb(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jobDescription,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            sendResponse({ data, id })
        })
        .catch(() => {
            sendResponse({ id })
        })
    return true
}
