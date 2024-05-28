import { Container, Sprite, useTick } from '@pixi/react'
import { SCALE_MODES, Texture } from 'pixi.js'
import {
    Dispatch,
    FC,
    SetStateAction,
    useEffect,
    useMemo,
    useState,
} from 'react'

interface CatPawProps {
    setCatStack: Dispatch<SetStateAction<{ id: number; y: number }[]>>
    catStack: { id: number; y: number }[]
    x: number
    y: number
}

enum CatPawStates {
    HIDE,
    BUTTON,
    MOVE,
}

const CatPaw: FC<CatPawProps> = ({ x, y, catStack, setCatStack }) => {
    const [pawYPos, setPawYPos] = useState<number>(0)
    const [targetPawYPos, setTargetPawYPos] = useState<number>(0)
    const [pawXPos, setPawXPos] = useState<number>(0)
    const [catPawState, setCatPawState] = useState<CatPawStates>(
        CatPawStates.HIDE
    )

    const determinePawState = () => {
        if (catStack.length === 0) {
            // hide paw when no buttons are there to press
            console.log('hide')
            setCatPawState(CatPawStates.HIDE)
        } else if (catStack[0]?.y === pawYPos) {
            console.log('button')
            // paw goes to the button press state when paw y and top button y match
            setCatPawState(CatPawStates.BUTTON)
        } else {
            // paw goes to moving position when paw y and top button don't match
            console.log('move')
            setCatPawState(CatPawStates.MOVE)
        }
    }

    useEffect(() => {
        setTargetPawYPos((prev) =>
            catStack[0]?.y !== undefined ? catStack[0]?.y : prev
        )
        determinePawState()
    }, [catStack])

    const catPawTexture: Texture = useMemo(() => {
        const texture = Texture.from('./paw.png')
        texture.baseTexture.scaleMode = SCALE_MODES.NEAREST

        return texture
    }, [])

    useTick((delta) => {
        setPawYPos((prev) => {
            if (prev === targetPawYPos) return prev

            const speed = 0.35
            const maxSpeed = 20
            const difference = targetPawYPos - prev
            const sign = Math.sign(difference)
            const maxDifference =
                Math.abs(difference) > maxSpeed ? maxSpeed * sign : difference
            const pawDifference = prev + maxDifference * speed * delta
            const isRoundedDecimal: boolean = Math.abs(maxDifference) < 0.7

            //prevent infinite decimal
            if (isRoundedDecimal) {
                //complete animation
                console.log('animation done')
                return targetPawYPos
            } else {
                return pawDifference
            }
        })
    })

    return (
        <Container x={x} y={y}>
            <Sprite x={10} y={pawYPos} texture={catPawTexture} />
        </Container>
    )
}

export default CatPaw
