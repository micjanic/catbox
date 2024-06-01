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
    const [targetPawXPos, setTargetPawXPos] = useState<number>(100)
    const [catPawState, setCatPawState] = useState<CatPawStates>(
        CatPawStates.HIDE
    )

    useEffect(() => {
        switch (catPawState) {
            case CatPawStates.HIDE:
                console.log('hide')
                setTargetPawXPos(0)
                break
            case CatPawStates.MOVE:
                console.log('move')
                setTargetPawXPos(25)
                setTargetPawYPos((prev) =>
                    catStack[0]?.y !== undefined ? catStack[0]?.y : prev
                )
                break
            case CatPawStates.BUTTON:
                console.log('button')
                setTargetPawXPos(28)
                break
        }
    }, [catPawState])

    useEffect(() => {
        if (catStack.length === 0) {
            setCatPawState(CatPawStates.HIDE)
        } else if (catStack[0]?.y === pawYPos) {
            setCatPawState(CatPawStates.BUTTON)
        } else {
            setCatPawState(CatPawStates.MOVE)
        }
    }, [catStack])

    const catPawTexture: Texture = useMemo(() => {
        const texture = Texture.from('./paw.png')
        texture.baseTexture.scaleMode = SCALE_MODES.NEAREST

        return texture
    }, [])

    useTick((delta) => {
        setPawXPos((prev) => {
            if (prev === targetPawXPos) return prev

            const speed = 0.35
            const maxSpeed = 6
            const difference = targetPawXPos - prev
            const sign = Math.sign(difference)
            const maxDifference =
                Math.abs(difference) > maxSpeed ? maxSpeed * sign : difference
            const pawDifference = prev + maxDifference * speed * delta
            const isRoundedDecimal: boolean = Math.abs(maxDifference) < 0.5

            //prevent infinite decimal
            if (isRoundedDecimal) {
                //complete animation
                if (catPawState === CatPawStates.BUTTON) {
                    setCatStack((prev) => prev.slice(1))
                    setTargetPawXPos((prev) => prev + 12)
                }
                return targetPawXPos
            } else {
                // continue animation
                return pawDifference
            }
        })

        setPawYPos((prev) => {
            if (prev === targetPawYPos) return prev

            const speed = 0.15
            const maxSpeed = 20
            const difference = targetPawYPos - prev
            const sign = Math.sign(difference)
            const maxDifference =
                Math.abs(difference) > maxSpeed ? maxSpeed * sign : difference
            const pawDifference = prev + maxDifference * speed * delta
            const isRoundedDecimal: boolean = Math.abs(maxDifference) < 0.7

            //prevent infinite decimal
            if (isRoundedDecimal) {
                setCatPawState(
                    catStack.length === 0
                        ? CatPawStates.HIDE
                        : CatPawStates.BUTTON
                )

                return targetPawYPos
            } else {
                // continue animation
                setCatPawState(CatPawStates.MOVE)
                return pawDifference
            }
        })
    })

    return (
        <Container x={x} y={y}>
            <Sprite x={pawXPos} y={pawYPos} texture={catPawTexture} />
        </Container>
    )
}

export default CatPaw
