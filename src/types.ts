import { QuestionModel } from './models/question'

export interface TranslationRequestParams {
    id: string
    word: string
    context?: string
}

export interface JobDescription {
    jobDescription: string
}

export type Message =
    | {
          action: 'questionsUpdated'
          payload: QuestionModel[]
      }
    | {
          action:
              | 'requestQuestions'
              | 'openQuestionsEditor'
              | 'requestSelectors'
      }
    | {
          action: 'analyzeJobDescription'
          payload: JobDescription
      }
    | {
          action: 'selectorsUpdated'
          payload: string[]
      }

export interface Messenger {
    readonly sendMessage: (message: Message) => void
    readonly addMessageListener: (handler: (message: Message) => void) => void
}
