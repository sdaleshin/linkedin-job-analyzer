import { Colors, Typography, TypographyType } from 'chooui'
import styled from 'styled-components'

const TitleTypography = styled(Typography)`
    display: block;
    color: ${Colors.Blue60} !important;
`

const ResultTypography = styled(Typography)`
    display: block;
`

export const Answer = ({
    title,
    result,
    className,
}: {
    title: string
    result: string
    className: string
}) => {
    return (
        <div className={className}>
            <TitleTypography type={TypographyType.Body}>
                {title}
            </TitleTypography>
            <ResultTypography type={TypographyType.BodyLarge}>
                {result}
            </ResultTypography>
        </div>
    )
}
