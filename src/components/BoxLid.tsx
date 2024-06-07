import { Container, Graphics, Sprite, useTick } from '@pixi/react'
import { FC, useCallback, useEffect, useRef, useState } from 'react'

//images
import catBoxLid from './images/catboxlid.png'

interface BoxLidProps {
    catStack: { id: number; y: number }[]
    x: number
    y: number
}

const BoxLid: FC<BoxLidProps> = ({ x, y, catStack }) => {
    // const [openBox, setOpenBox] = useState<boolean>(false)
    const [lidPosition, setLidPosition] = useState<number>(0)
    const [targetLidPosition, setTargetLidPosition] = useState<number>(0)
    const maskRef = useRef<any>(null)
    const [maskReady, setMaskReady] = useState<boolean>(false)

    const lidOpen: number = 0.1
    const lidClosed: number = 0

    useEffect(() => {
        // Setting a delay here to make it feel more natural
        setTimeout(() => {
            if (catStack.length > 0) {
                setTargetLidPosition(lidOpen)
            } else {
                setTargetLidPosition(lidClosed)
            }
        }, 250)
    }, [catStack])

    const drawMask = useCallback((g: any) => {
        g.clear()
        g.beginFill(0xffffff)
        g.drawRect(0, -30, 150, 186.1) // Adjust dimensions as needed
        g.endFill()
    }, [])

    useEffect(() => {
        if (maskRef.current) {
            setMaskReady(true)
        }
    }, [maskRef.current])

    useTick((delta) => {
        setLidPosition((prev) => {
            return prev + (targetLidPosition - prev) * 0.2 * delta
        })
    })

    return (
        <Container x={x} y={y}>
            {maskReady && (
                <Sprite
                    width={109 - lidPosition * 55}
                    skew={-lidPosition}
                    rotation={-lidPosition}
                    image={catBoxLid}
                    mask={maskRef.current}
                />
            )}
            <Graphics ref={maskRef} draw={drawMask} />
        </Container>
    )
}

export default BoxLid
