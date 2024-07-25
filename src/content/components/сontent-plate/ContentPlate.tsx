import styled from 'styled-components'
import {
    CheckInCircleSvg,
    ChevronDownSvg,
    Colors,
    EditSvg,
    Typography,
    TypographyType,
} from 'chooui'
import { ReactNode, useState } from 'react'
import { Moveable } from '../moveable/Moveable'
import { NonMoveable } from '../moveable/NonMoveable'

const ContentMoveable = styled(Moveable)`
    border-radius: 24px;
    border: 1px solid ${Colors.Gray90};
    background: ${Colors.White};
    padding: 32px;
    width: 264px;
    box-sizing: border-box;
    cursor: move;
`

const HeadDiv = styled.div`
    display: flex;
`

const StyledEditSvg = styled(EditSvg)`
    width: 20px;
    height: 20px;
    path {
        fill: ${Colors.Gray70};
    }
    margin-left: 26px;
    cursor: pointer;
`
const StyledChevronDownSvg = styled(ChevronDownSvg)<{ $expanded: boolean }>`
    width: 20px;
    height: 20px;
    margin-left: 8px;
    transform: rotate(${({ $expanded }) => ($expanded ? 0 : 180)}deg);
    cursor: pointer;
`

const TitleTypography = styled(Typography)`
    color: ${Colors.Blue50} !important;
    -webkit-font-smoothing: antialiased;
`

const ChildrenNonMoveableDiv = styled(NonMoveable)<{ expanded: boolean }>`
    margin-top: 24px;
    display: ${({ expanded }) => (expanded === true ? 'block' : 'none')};
    cursor: default;
`

const ButtonsNonMoveable = styled(NonMoveable)`
    display: flex;
`

export const ContentPlate = ({
    children,
    onEditClick,
}: {
    children: ReactNode
    onEditClick: () => void
}) => {
    const [expanded, setExpanded] = useState(true)
    return (
        <ContentMoveable>
            <HeadDiv>
                <TitleTypography type={TypographyType.BodyLarge}>
                    Job AI Analyser
                </TitleTypography>
                <ButtonsNonMoveable>
                    <span onClick={onEditClick}>
                        <StyledEditSvg />
                    </span>
                    <span onClick={() => setExpanded(!expanded)}>
                        <StyledChevronDownSvg $expanded={expanded} />
                    </span>
                </ButtonsNonMoveable>
            </HeadDiv>
            <ChildrenNonMoveableDiv expanded={expanded}>
                {children}
            </ChildrenNonMoveableDiv>
        </ContentMoveable>
    )
}
