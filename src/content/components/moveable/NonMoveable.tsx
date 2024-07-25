import { ReactNode } from 'react'
import styled from 'styled-components'

const ContentDiv = styled.div`
    cursor: default;
`

export const NonMoveable = ({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) => {
    return (
        <ContentDiv
            className={className}
            onMouseDown={(e) => {
                e.stopPropagation()
            }}
        >
            {children}
        </ContentDiv>
    )
}
