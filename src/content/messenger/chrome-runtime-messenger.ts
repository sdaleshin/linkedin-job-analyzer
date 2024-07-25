import { Messenger } from '../../types'

export const chromeRuntimeMessenger: Messenger = {
    sendMessage: (message) => {
        chrome.runtime.sendMessage(message)
    },
    addMessageListener: (handler) => {
        chrome.runtime.onMessage.addListener(handler)
    },
}
