import { Container, Sprite, Stage } from '@pixi/react'
import { SCALE_MODES, Texture } from 'pixi.js'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import BoxButton from './BoxButton'
import BoxLid from './BoxLid'
import CatPaw from './CatPaw'

const CatBox: FC = () => {
    const [catStack, setCatStack] = useState<{ id: number; y: number }[]>([])
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
    })
    const boxWidth = 196
    const boxHeight = 256

    //fit stage to the container div
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                })
            }
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const boxTexture: Texture = useMemo(() => {
        const texture = Texture.from('./catbox.png')
        texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
        return texture
    }, [])

    const boxButtonGroup = [...Array(9)].map((_, i) => (
        <BoxButton
            key={i}
            id={i}
            y={i * 17}
            catStack={catStack}
            setCatStack={setCatStack}
        />
    ))

    return (
        <div className="w-full h-full bg-[#5680a4]" ref={containerRef}>
            <Stage
                width={dimensions.width}
                height={dimensions.height}
                options={{ backgroundAlpha: 0 }}
            >
                <Container
                    scale={3.2}
                    x={dimensions.width / 2 - boxWidth}
                    y={dimensions.height / 2 - boxHeight}
                >
                    <Sprite texture={boxTexture} />
                    <Container x={112}>{boxButtonGroup}</Container>
                    <CatPaw
                        x={25}
                        y={0}
                        catStack={catStack}
                        setCatStack={setCatStack}
                    />
                    <BoxLid x={3} y={3} catStack={catStack} />
                </Container>
            </Stage>
        </div>
    )
}

export default CatBox
