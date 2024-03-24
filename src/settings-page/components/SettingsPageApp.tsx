import styled from 'styled-components'
import {
    ButtonColorEnum,
    ButtonSizeEnum,
    ButtonVariantEnum,
    GlobalStyle,
    Typography,
    TypographyType,
    Button,
} from 'chooui'
import { useEffect, useState } from 'react'
import { Question } from './Question'
import { QuestionModel } from './types'
import { generateId } from '../../utils/generateId'
import { QUESTIONS_STORAGE_NAME } from '../../utils/consts'

const ContainerDiv = styled.div`
    margin: 0 auto;
    padding: 32px 64px 64px;
`

const TitleTypography = styled(Typography)`
    display: block;
`

const ExplanationTypography = styled(Typography)`
    margin: 24px 0;
    display: block;
`

const AddQuestionButton = styled(Button)`
    margin-top: 24px;
`

const StyledQuestion = styled(Question)`
    margin-bottom: 24px;
`

export function SettingsPageApp() {
    const [questions, setQuestions] = useState<QuestionModel[]>()
    if (questions) {
        chrome?.storage?.local?.set({ [QUESTIONS_STORAGE_NAME]: questions })
    }
    useEffect(() => {
        chrome?.storage?.local
            ?.get([QUESTIONS_STORAGE_NAME])
            .then((data) => setQuestions(data[QUESTIONS_STORAGE_NAME] || []))
    }, [])

    const handleAddQuestionClick = () => {
        setQuestions([
            ...(questions || []),
            {
                id: generateId(),
                text: '',
                type: 'text',
                short: '',
            },
        ])
    }

    const handleQuestionChange = (question: QuestionModel) => {
        const index = questions.findIndex((q) => q.id === question.id)
        setQuestions([
            ...questions.slice(0, index),
            question,
            ...questions.slice(index + 1),
        ])
    }
    const handleQuestionDelete = (id: string) => {
        const index = questions.findIndex((q) => q.id === id)
        setQuestions([
            ...questions.slice(0, index),
            ...questions.slice(index + 1),
        ])
    }
    return (
        <>
            <GlobalStyle />
            <ContainerDiv>
                <TitleTypography type={TypographyType.H1}>
                    Settings
                </TitleTypography>
                <ExplanationTypography type={TypographyType.BodyLarge}>
                    Add questions to AI about job description
                </ExplanationTypography>

                {questions?.map((q) => (
                    <StyledQuestion
                        key={q.id}
                        id={q.id}
                        text={q.text}
                        type={q.type}
                        short={q.short}
                        onChange={handleQuestionChange}
                        onDelete={handleQuestionDelete}
                    />
                ))}

                <AddQuestionButton
                    text="Add question"
                    onClick={handleAddQuestionClick}
                    size={ButtonSizeEnum.Regular}
                    color={ButtonColorEnum.Blue}
                    variant={ButtonVariantEnum.Filled}
                />
            </ContainerDiv>
        </>
    )
}
