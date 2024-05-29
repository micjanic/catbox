import { Container, Sprite } from '@pixi/react'
import { SCALE_MODES, Texture, Rectangle } from 'pixi.js'
import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react'

interface BoxButtonProps {
    id: number
    y: number
    catStack: { id: number; y: number }[]
    setCatStack: Dispatch<SetStateAction<{ id: number; y: number }[]>>
}

const BoxButton: FC<BoxButtonProps> = ({ id, y, catStack, setCatStack }) => {
    const buttonOn = useMemo(() => {
        return catStack.some((buttonData) => buttonData.id === id)
    }, [catStack])

    const buttonHandler = () => {
        setCatStack((prev) => {
            if (buttonOn) {
                //remove existing element from the stack
                return prev.filter((element) => element.id !== id)
            } else {
                //add this button to the stack
                return prev.concat({ id, y })
            }
        })
    }

    const buttonTexture: Texture = useMemo(() => {
        const offTexture = Texture.from('./button_off.png')
        offTexture.baseTexture.scaleMode = SCALE_MODES.NEAREST

        const onTexture = Texture.from('./button_on.png')
        onTexture.baseTexture.scaleMode = SCALE_MODES.NEAREST

        return buttonOn ? onTexture : offTexture
    }, [buttonOn])

    const curHitArea = useMemo(() => {
        const rightHitboxActive = new Rectangle(13, 6, 10, 12)
        const leftHitboxActive = new Rectangle(2, 6, 10, 12)

        return buttonOn ? leftHitboxActive : rightHitboxActive
    }, [buttonOn])

    return (
        <Container y={y}>
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
