import { Sprite } from '@pixi/react'
import { SCALE_MODES, Texture } from 'pixi.js'
import { FC, useMemo } from 'react'

interface CatPawProps {}

const CatPaw: FC<CatPawProps> = () => {
    const catPawTexture: Texture = useMemo(() => {
        const texture = Texture.from('./paw.png')
        texture.baseTexture.scaleMode = SCALE_MODES.NEAREST

        return texture
    }, [])

    return <Sprite texture={catPawTexture} />
}

export default CatPaw
