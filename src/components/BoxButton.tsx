import { AnimatedSprite, Container } from '@pixi/react'
import { Rectangle, Resource, Texture } from 'pixi.js'
import {
    Dispatch,
    FC,
    SetStateAction,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import * as PIXI from 'pixi.js'

import buttonSprite1 from './images/button_sprite/button_sprite1.png'
import buttonSprite2 from './images/button_sprite/button_sprite2.png'
import buttonSprite3 from './images/button_sprite/button_sprite3.png'
import buttonSprite4 from './images/button_sprite/button_sprite4.png'

interface BoxButtonProps {
    id: number
    y: number
    catStack: { id: number; y: number }[]
    setCatStack: Dispatch<SetStateAction<{ id: number; y: number }[]>>
}

const BoxButton: FC<BoxButtonProps> = ({ id, y, catStack, setCatStack }) => {
    const [buttonFrames, setButtonFrames] = useState<Texture<Resource>[]>([])
    const buttonRef = useRef<PIXI.AnimatedSprite>(null)

    const buttonOn: boolean = useMemo(() => {
        return catStack.some((buttonData) => buttonData.id === id)
    }, [catStack])

    useEffect(() => {
        if (!buttonRef.current) return
        buttonRef.current.play()
    }, [buttonOn])

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

    const button_animation_paths = useMemo(
        () => [buttonSprite1, buttonSprite2, buttonSprite3, buttonSprite4],
        []
    )

    useEffect(() => {
        const button_animation_textures: Texture<Resource>[] =
            button_animation_paths.map((path) => {
                return Texture.from(path)
            })
        setButtonFrames(button_animation_textures)
    }, [button_animation_paths])

    const curHitArea = useMemo(() => {
        const rightHitboxActive = new Rectangle(13, 6, 10, 12)
        const leftHitboxActive = new Rectangle(2, 6, 10, 12)

        return buttonOn ? leftHitboxActive : rightHitboxActive
    }, [buttonOn])

    if (buttonFrames.length === 0) return null

    return (
        <Container y={y}>
            <AnimatedSprite
                ref={buttonRef}
                textures={buttonFrames}
                isPlaying={true}
                animationSpeed={(buttonOn ? -1 : 1) * 0.5}
                loop={false}
                cursor="pointer"
                eventMode="static"
                hitArea={curHitArea}
                pointertap={buttonHandler}
            />
        </Container>
    )
}

export default BoxButton
