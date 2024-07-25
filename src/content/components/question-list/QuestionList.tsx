import { QuestionModel } from '../../../models/question'
import { Question } from '../question/Question'
import styled from 'styled-components'

const DividerDiv = styled.div`
    margin: 24px 0;
    width: 100%;
    height: 1px;
    background: #d9d9d9;
`

export function QuestionList({ questions }: { questions: QuestionModel[] }) {
    return questions.map((question: QuestionModel, index: number) => (
        <div key={question.id}>
            <Question question={question} />
            {index !== questions.length - 1 && <DividerDiv />}
        </div>
    ))
}
