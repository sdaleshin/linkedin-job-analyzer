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
          action: 'requestQuestions' | 'openQuestionsEditor'
      }
    | {
          action: 'analyzeJobDescription'
          payload: JobDescription
      }

export interface Messenger {
    readonly sendMessage: (message: Message) => void
    readonly addMessageListener: (handler: (message: Message) => void) => void
}
