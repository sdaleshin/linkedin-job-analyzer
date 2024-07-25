import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ContentPlate } from './сontent-plate/ContentPlate'
import { Messenger } from '../../types'
import { QuestionList } from './question-list/QuestionList'
import { QuestionModel } from '../../models/question'

const ContentDiv = styled.div`
    position: fixed;
    top: 150px;
    right: 32px;
    font-size: 16px;
    color: black;
    z-index: 1000;
    width: 100px;
`

let lastJobDescription = ''
const LINKEDIN_JOB_DESCRIPTION_CLASSNAME = 'jobs-description'

export function ContentApp({ messenger }: { messenger: Messenger }) {
    const [questions, setQuestions] = useState<QuestionModel[]>([])
    useEffect(() => {
        messenger.addMessageListener((message) => {
            if (message.action === 'questionsUpdated') {
                setQuestions(message.payload)
            }
        })
        messenger.sendMessage({ action: 'requestQuestions' })
    }, [messenger])
    useEffect(() => {
        const intervalId = setInterval(() => {
            const jobDescription = document
                .getElementsByClassName(LINKEDIN_JOB_DESCRIPTION_CLASSNAME)[0]
                ?.textContent?.trim()
            if (jobDescription && jobDescription !== lastJobDescription) {
                lastJobDescription = jobDescription
                messenger.sendMessage({
                    action: 'analyzeJobDescription',
                    payload: { jobDescription },
                })
            }
        }, 100)
        return () => clearInterval(intervalId)
    }, [messenger])

    const handleEditClick = () => {
        messenger.sendMessage({ action: 'openQuestionsEditor' })
    }

    return (
        <ContentDiv>
            <ContentPlate onEditClick={handleEditClick}>
                <QuestionList questions={questions} />
            </ContentPlate>
        </ContentDiv>
    )
}
