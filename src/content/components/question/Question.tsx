import { Colors, LoaderSvg, Typography, TypographyType } from 'chooui'
import styled, { keyframes } from 'styled-components'
import { QuestionModel } from '../../../models/question'

const TitleTypography = styled(Typography)`
    display: block;
    color: ${Colors.Gray30} !important;
    margin-bottom: 4px;
    -webkit-font-smoothing: antialiased;
`

const ResultTypography = styled(Typography)`
    display: block;
    -webkit-font-smoothing: antialiased;
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const StyledLoaderSvg = styled(LoaderSvg)`
    display: inline-block;
    animation: ${rotate} 0.5s linear infinite;
`

export const Question = ({
    question,
    className,
}: {
    question: QuestionModel
    className?: string
}) => {
    return (
        <div className={className}>
            <TitleTypography type={TypographyType.BodyLarge}>
                {question.short}
            </TitleTypography>
            {question.status === 'progress' && <StyledLoaderSvg />}
            {question.status !== 'progress' && (
                <ResultTypography type={TypographyType.BodySmall}>
                    {question.status === 'empty' ? 'No Data' : question.answer}
                </ResultTypography>
            )}
        </div>
    )
}
