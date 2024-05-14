import { Container, Sprite, Stage } from '@pixi/react'
import { SCALE_MODES, Texture } from 'pixi.js'
import { FC, useEffect, useMemo, useRef, useState } from 'react'

const CatBox: FC = () => {
    const containerRef = useRef(null)
    const [stageSize, setStageSize] = useState({ width: 0, height: 0 })

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const { clientWidth, clientHeight } = containerRef.current
                setStageSize({ width: clientWidth, height: clientHeight })
            }
        }

        handleResize() // Initial setting

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const catBoxTexture: Texture = useMemo(() => {
        const texture = Texture.from('./catbox.png')
        texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
        return texture
    }, [])

    return (
        <Stage
            className="w-full"

            // options={{ background:  }}
        >
            <Container>
                <Sprite texture={catBoxTexture} x={150} y={150} scale={3} />
            </Container>
        </Stage>
    )
}

export default CatBox
