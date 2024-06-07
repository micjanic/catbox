import { Container, Sprite } from '@pixi/react'
import { Rectangle } from 'pixi.js'
import { Dispatch, FC, SetStateAction, useMemo } from 'react'

//images
import buttonOffImage from './images/button_off.png'
import buttonOnImage from './images/button_on.png'

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

    const buttonImage: string = useMemo(() => {
        return buttonOn ? buttonOnImage : buttonOffImage
    }, [buttonOn])

    const curHitArea = useMemo(() => {
        const rightHitboxActive = new Rectangle(13, 6, 10, 12)
        const leftHitboxActive = new Rectangle(2, 6, 10, 12)

        return buttonOn ? leftHitboxActive : rightHitboxActive
    }, [buttonOn])

    return (
        <Container y={y}>
            <Sprite
                image={buttonImage}
                cursor="pointer"
                eventMode="static"
                hitArea={curHitArea}
                pointertap={buttonHandler}
            />
        </Container>
    )
}

export default BoxButton
