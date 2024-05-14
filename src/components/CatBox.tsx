import { Container, Sprite, Stage } from '@pixi/react'
import { SCALE_MODES, Texture } from 'pixi.js'
import { FC, useEffect, useMemo, useRef, useState } from 'react'

const CatBox: FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
    })

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
    const catBoxTexture: Texture = useMemo(() => {
        const texture = Texture.from('./catbox.png')
        texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
        return texture
    }, [])

    return (
        <div
            className="w-full h-full max-w-[1200px] bg-[#5680a4]"
            ref={containerRef}
        >
            <Stage
                width={dimensions.width}
                height={dimensions.height}
                options={{ backgroundAlpha: 0 }}
            >
                <Container
                    scale={3.2}
                    x={dimensions.width / 2}
                    y={dimensions.height / 2}
                >
                    <Sprite
                        texture={catBoxTexture}
                        width={196}
                        height={256}
                        x={-70}
                        y={-100}
                    />
                </Container>
            </Stage>
        </div>
    )
}

export default CatBox
