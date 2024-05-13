import { Container, Sprite, Stage } from '@pixi/react';
import { SCALE_MODES, Texture } from 'pixi.js';
import { FC, useMemo } from 'react';

const CatBox: FC = () => {
  const catBoxTexture: Texture = useMemo(() => {
    const texture = Texture.from('./catbox.png');
    texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
    return texture;
  }, []);

  return (
    <Stage width={800} height={800} options={{ background: 0x1099bb }}>
      <Container>
        <Sprite texture={catBoxTexture} x={150} y={150} scale={5} />
      </Container>
    </Stage>
  );
};

export default CatBox;
