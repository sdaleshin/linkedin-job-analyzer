import styled from 'styled-components'
import {
    ChevronDownSvg,
    Colors,
    EditSvg,
    Typography,
    TypographyType,
} from 'chooui'
import { ReactNode } from 'react'
import { Moveable } from '../moveable/Moveable'
import { NonMoveable } from '../moveable/NonMoveable'

const ContentMoveable = styled(Moveable)<{ expanded: boolean }>`
    border-radius: 24px;
    border: 1px solid ${Colors.Gray90};
    background: ${Colors.White};
    padding: ${(p) => (p.expanded ? '32px' : '8px 16px')};
    width: ${(p) => (p.expanded ? '264px' : '97px')};
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
    position: absolute;
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
    expanded,
    onExpandedChanged,
}: {
    children: ReactNode
    onEditClick: () => void
    expanded: boolean
    onExpandedChanged: (expanded: boolean) => void
}) => {
    return (
        <ContentMoveable expanded={expanded}>
            <HeadDiv>
                <TitleTypography type={TypographyType.BodyLarge}>
                    {expanded ? 'Job AI Analyser' : 'JAA'}
                </TitleTypography>
                <ButtonsNonMoveable>
                    {expanded && (
                        <span onClick={onEditClick}>
                            <StyledEditSvg />
                        </span>
                    )}
                    <span onClick={() => onExpandedChanged(!expanded)}>
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
