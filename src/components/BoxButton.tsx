import { Container, Sprite } from '@pixi/react'
import { SCALE_MODES, Texture, Rectangle } from 'pixi.js'
import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react'

interface BoxButtonProps {
    id: number
    x: number
    y: number
    setCatStack: Dispatch<SetStateAction<{ id: number; y: number }[]>>
}

const BoxButton: FC<BoxButtonProps> = ({ id, x, y, setCatStack }) => {
    const [on, setOn] = useState<boolean>(false)

    const buttonHandler = () => {
        setOn((prev) => !prev)
        setCatStack((prev) => prev.concat({ id, y }))
    }

    const buttonTexture: Texture = useMemo(() => {
        const offTexture = Texture.from('./button_off.png')
        offTexture.baseTexture.scaleMode = SCALE_MODES.NEAREST

        const onTexture = Texture.from('./button_on.png')
        onTexture.baseTexture.scaleMode = SCALE_MODES.NEAREST

        return on ? onTexture : offTexture
    }, [on])

    const curHitArea = useMemo(() => {
        const rightHitboxActive = new Rectangle(13, 6, 10, 12)
        const leftHitboxActive = new Rectangle(2, 6, 10, 12)

        return on ? leftHitboxActive : rightHitboxActive
    }, [on])

    return (
        <Container x={x} y={y}>
            <Sprite
                texture={buttonTexture}
                cursor="pointer"
                eventMode="static"
                hitArea={curHitArea}
                pointertap={buttonHandler}
            />
        </Container>
    )
}

export default BoxButton
