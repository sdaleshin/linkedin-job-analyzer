import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ContentPlate } from './сontent-plate/ContentPlate'
import { Messenger } from '../../types'
import { QuestionList } from './question-list/QuestionList'
import { QuestionModel } from '../../models/question'
import { GlobalStyle } from './global-style/GlobalStyle'

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
    const [selectors, setSelectors] = useState<string[]>([])
    useEffect(() => {
        messenger.addMessageListener((message) => {
            if (message.action === 'questionsUpdated') {
                setQuestions(message.payload)
            }
            if (message.action === 'selectorsUpdated') {
                setSelectors(message.payload)
            }
        })
        messenger.sendMessage({ action: 'requestQuestions' })
        messenger.sendMessage({ action: 'requestSelectors' })
    }, [messenger])
    useEffect(() => {
        const intervalId = selectors?.length
            ? setInterval(() => {
                  let jobDescription = ''
                  selectors.forEach((selector) => {
                      jobDescription += document
                          .querySelector(selector)
                          ?.textContent?.trim()
                  })
                  if (jobDescription && jobDescription !== lastJobDescription) {
                      lastJobDescription = jobDescription
                      messenger.sendMessage({
                          action: 'analyzeJobDescription',
                          payload: { jobDescription },
                      })
                  }
              }, 100)
            : null
        return () => intervalId && clearInterval(intervalId)
    }, [messenger, selectors])

    const handleEditClick = () => {
        messenger.sendMessage({ action: 'openQuestionsEditor' })
    }

    return (
        <>
            <GlobalStyle />
            <ContentDiv>
                <ContentPlate onEditClick={handleEditClick}>
                    <QuestionList questions={questions} />
                </ContentPlate>
            </ContentDiv>
        </>
    )
}
