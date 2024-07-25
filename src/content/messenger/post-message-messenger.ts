import { Messenger } from '../../types'

const sendMessage = (message: any): void => {
    window.postMessage(message)
}

const addMessageListener: Messenger['addMessageListener'] = (handler) => {
    window.addEventListener('message', (event: MessageEvent): void => {
        handler(event.data)
    })
}

export const postMessageMessenger: Messenger = {
    sendMessage,
    addMessageListener,
}
