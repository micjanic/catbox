import { Sprite } from '@pixi/react'
import { FC, useState } from 'react'

const BoxButton: FC = () => {
    const [on, setOn] = useState<boolean>(false)

    const onSprite = <Sprite image="/button_off.png" />
    const offSprite = <Sprite image="/button_off.png" />

    return <>{on ? onSprite : offSprite}</>
}

export default BoxButton
