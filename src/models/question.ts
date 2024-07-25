export interface QuestionModel {
    id: string
    text: string
    type: 'boolean' | 'text'
    short: string
    answer: string
    status: 'empty' | 'progress' | 'finished'
}

export type StoredQuestion = Omit<QuestionModel, 'answer' | 'status'>

export const questionExample1: QuestionModel = {
    id: 'id1',
    text: 'Do they provide visa sponsorship?',
    type: 'boolean',
    short: 'Visa',
    answer: 'no',
    status: 'finished',
}
export const questionExample2: QuestionModel = {
    id: 'id2',
    text: 'How much salary do they offer',
    type: 'text',
    short: 'Salary',
    answer: '80-100k EUR per year',
    status: 'finished',
}

export const questionExample3: QuestionModel = {
    id: 'id3',
    text: 'Tell me about company',
    type: 'text',
    short: 'Company',
    answer: 'Genuine Parts Company founded in 1928 and based in Atlanta, Georgia, is a leading specialty distributor engaged in the distribution of automotive and industrial replacement parts and value-added services. The Company operates a global portfolio of businesses with more than 10,000 locations across the world, employing 58 000 people.',
    status: 'finished',
}

export const questionList = [
    questionExample1,
    questionExample2,
    questionExample3,
]
