import { Sprite } from '@pixi/react'
import { SCALE_MODES, Texture } from 'pixi.js'
import { FC, useMemo, useState } from 'react'

const BoxButton: FC = () => {
    const [on, setOn] = useState<boolean>(false)

    const offButtonTexture: Texture = useMemo(() => {
        const texture = Texture.from('./button_off.png')
        texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
        return texture
    }, [])

    const onSprite = <Sprite texture={offButtonTexture} />
    const offSprite = <Sprite texture={offButtonTexture} />

    return <>{on ? onSprite : offSprite}</>
}

export default BoxButton
