import { ReactNode, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const ContentDiv = styled.div<{ x: number; y: number }>`
    cursor: move;
    position: fixed;
    right: ${({ x }) => `${x}px`};
    top: ${({ y }) => `${y}px`};
`

const COORDS_LOCAL_STORAGE_NAME = 'coords_linkedin_job_analyzer'
const DEFAULT_COORDS = '20;20'

export const Moveable = ({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) => {
    const [coords, setCoords] = useState(
        localStorage.getItem(COORDS_LOCAL_STORAGE_NAME) ?? DEFAULT_COORDS,
    )
    const mouseMoveHandler = useRef<(e: MouseEvent) => void>()
    let [x, y] = coords.split(';').map((s) => Number(s))
    useEffect(() => {
        const handleMouseUp = () => {
            if (mouseMoveHandler.current) {
                document.removeEventListener(
                    'mousemove',
                    mouseMoveHandler.current,
                )
            }
        }
        document.addEventListener('mouseup', handleMouseUp)
        return () => {
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [])

    const handleMouseDown = () => {
        mouseMoveHandler.current = (e: MouseEvent) => {
            x -= +e.movementX
            y += +e.movementY

            if (x < 20) {
                x = 20
            }
            if (y < 20) {
                y = 20
            }
            if (x > window.innerWidth - 20) {
                x = window.innerWidth - 20
            }
            if (y > window.innerHeight - 20) {
                y = window.innerHeight - 20
            }
            const newCoords = [x, y].join(';')
            setCoords(newCoords)
            localStorage.setItem(COORDS_LOCAL_STORAGE_NAME, newCoords)
        }
        document.addEventListener('mousemove', mouseMoveHandler.current)
    }
    return (
        <ContentDiv
            className={className}
            onMouseDown={handleMouseDown}
            x={x}
            y={y}
        >
            {children}
        </ContentDiv>
    )
}
