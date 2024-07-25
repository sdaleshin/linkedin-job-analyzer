import { postMessageMessenger } from '../content/messenger/post-message-messenger'
import {
    questionExample1,
    questionExample2,
    questionExample3,
    QuestionModel,
} from '../models/question'

const QUESTIONS: QuestionModel[] = [
    { ...questionExample1 },
    { ...questionExample2 },
    { ...questionExample3 },
]

function init() {
    document.getElementById('send-message').addEventListener('click', () => {
        postMessageMessenger.sendMessage({
            action: 'requestQuestions',
        })
    })
    postMessageMessenger.addMessageListener((message) => {
        switch (message.action) {
            case 'requestQuestions':
                postMessageMessenger.sendMessage({
                    action: 'questionsUpdated',
                    payload: QUESTIONS,
                })
                break
            case 'analyzeJobDescription':
                setTimeout(() => {
                    postMessageMessenger.sendMessage({
                        action: 'questionsUpdated',
                        payload: QUESTIONS,
                    })
                }, 300)
                break
        }
    })
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}
