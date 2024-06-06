import { Dispatch, SetStateAction } from 'react'

import { CatPaw } from './CatPaw.1'

export interface CatPawProps {
    setCatStack: Dispatch<SetStateAction<{ id: number; y: number }[]>>
    catStack: { id: number; y: number }[]
    x: number
    y: number
}

export enum CatPawStates {
    HIDE,
    BUTTON,
    MOVE,
}

export default CatPaw
