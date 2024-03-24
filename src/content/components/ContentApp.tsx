import { useEffect, useState } from 'react'
import { generateId } from '../../utils/generateId'
import styled from 'styled-components'
import { Typography, TypographyType } from 'chooui'
import { Answer } from './Answer'
import {
    AnswerModel,
    QuestionModel,
} from '../../settings-page/components/types'

const ContentDiv = styled.div`
    position: fixed;
    top: 150px;
    right: 32px;
    font-size: 16px;
    color: black;
    z-index: 1000;
    width: 100px;
`

const StyledAnswer = styled(Answer)`
    margin-bottom: 8px;
`

let lastJobDescription = ''
let requestId = ''
export function ContentApp() {
    const [inProgress, setInProgress] = useState(false)
    const [answers, setAnswers] = useState<AnswerModel[]>([])
    useEffect(() => {
        const intervalId = setInterval(() => {
            const jobDescription = document
                .getElementsByClassName('jobs-description')[0]
                ?.textContent?.trim()
            if (jobDescription && jobDescription !== lastJobDescription) {
                console.log('jobDescription', jobDescription)
                console.log('lastJobDescription', lastJobDescription)
                lastJobDescription = jobDescription
                setInProgress(true)
                requestId = generateId()
                console.log('requestId', requestId)
                chrome.runtime.sendMessage(
                    {
                        action: 'analyzeJobDescription',
                        payload: { id: requestId, jobDescription },
                    },
                    function (response) {
                        if (
                            response.data === null ||
                            response.id !== requestId
                        ) {
                            return
                        }
                        if (
                            response.data.choices &&
                            response.data.choices.length
                        ) {
                            setInProgress(false)
                            const rawAnswers = JSON.parse(
                                response.data.choices[0].message.content
                                    .replace(/\\n/g, '')
                                    .replaceAll('```json', '')
                                    .replaceAll('```', '')
                                    .replace(/\\"/g, '"'),
                            ) as { id: string; answer: string }[]

                            setAnswers(
                                rawAnswers.map((a) => {
                                    const question = (
                                        response.questions as QuestionModel[]
                                    ).find((q) => q.id === a.id)
                                    return {
                                        title: question.short,
                                        result: a.answer,
                                    }
                                }),
                            )
                        }
                    },
                )
            }
        }, 100)
        return () => clearInterval(intervalId)
    }, [])

    return (
        <ContentDiv>
            {!inProgress && !answers?.length && (
                <Typography type={TypographyType.Body}>No Data</Typography>
            )}
            {inProgress && (
                <Typography type={TypographyType.Body}>Analyzing</Typography>
            )}
            {!inProgress &&
                answers.map((answer) => (
                    <StyledAnswer
                        key={answer.title}
                        result={answer.result}
                        title={answer.title}
                    />
                ))}
        </ContentDiv>
    )
}
