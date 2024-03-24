export interface QuestionModel {
    id: string
    text: string
    type: 'boolean' | 'text'
    short: string
}

export interface AnswerModel {
    title: string
    result: string
}
