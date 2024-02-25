import { useEffect, useState } from 'react'
import { generateId } from '../../utils/generateId'
import styled from 'styled-components'

const ContentDiv = styled.div`
    position: fixed;
    top: 100px;
    right: 32px;
    font-size: 16px;
    color: black;
    z-index: 1000;
    width: 100px;
`

let lastJobDescription = ''

export function ContentApp() {
    const [analyzeResult, setAnalyzeResult] = useState('Нет данных')

    useEffect(() => {
        setInterval(() => {
            const jobDescription =
                document.getElementsByClassName('jobs-description')[0]
                    ?.textContent
            if (jobDescription && jobDescription !== lastJobDescription) {
                lastJobDescription = jobDescription
                setAnalyzeResult('Анализирую...')
                chrome.runtime.sendMessage(
                    {
                        action: 'analyzeJobDescription',
                        payload: { id: generateId(), jobDescription },
                    },
                    function (response) {
                        if (response.data === null) {
                            return
                        }
                        if (
                            response.data.choices &&
                            response.data.choices.length
                        ) {
                            setAnalyzeResult(
                                response.data.choices[0].message.content,
                            )
                        }
                    },
                )
            }
        }, 100)
    }, [])

    return <ContentDiv>{analyzeResult}</ContentDiv>
}
