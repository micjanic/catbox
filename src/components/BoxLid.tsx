import { Container, Graphics, Sprite, useTick } from '@pixi/react'
import { SCALE_MODES, Texture } from 'pixi.js'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface BoxLidProps {
    catStack: { id: number; y: number }[]
}

const BoxLid: FC<BoxLidProps> = ({ catStack }) => {
    const [openBox, setOpenBox] = useState<boolean>(false)
    const [lidPosition, setLidPosition] = useState<number>(0)
    const [targetLidPosition, setTargetLidPosition] = useState<number>(0)
    const maskRef = useRef<any>(null)

    const catBoxLidTexture: Texture = useMemo(() => {
        const texture = Texture.from('./catboxlid.png')
        texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
        return texture
    }, [])

    const lidOpenAmount: number = 0.13

    useEffect(() => {
        if (catStack.length > 0) {
            // Setting a delay here to make it feel more natural
            setTimeout(() => {
                setTargetLidPosition(lidOpenAmount)
            }, 50)
        } else {
            setTimeout(() => {
                setTargetLidPosition(0)
            }, 50)
        }
    }, [catStack])

    const drawMask = useCallback((g: any) => {
        g.clear()
        g.beginFill(0xffffff)
        g.drawRect(0, -30, 150, 186) // Adjust dimensions as needed
        g.endFill()
    }, [])

    useTick((delta) => {
        setLidPosition((prev) => {
            return prev + (targetLidPosition - prev) * 0.3 * delta
        })
    })

    return (
        <Container>
            {maskRef.current && (
                <Sprite
                    skew={-lidPosition}
                    rotation={-lidPosition}
                    texture={catBoxLidTexture}
                    mask={maskRef.current}
                />
            )}
            <Graphics ref={maskRef} isMask={true} draw={drawMask} />
        </Container>
    )
}

export default BoxLid
