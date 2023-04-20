import styled from 'styled-components';

type CardFrontProps = {
  imageUrl: string;
};

type FlipperProps = {
  flipped: boolean;
};

export const CardWrapper = styled.div`
  display: inline-block;
  width: 150px;
  height: 150px;
  perspective: 1000px;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 600px) {
    width: 50px;
    height: 50px;
  }
`;

export const Flipper = styled.div<FlipperProps>`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 5px;
  transform-style: preserve-3d;
  transform-origin: center right;
  transition: transform 1s;
  ${({ flipped }) => flipped && `transform: translateX(-100%) rotateY(-180deg)`}
`;

const Card = styled.div`
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  z-index: 2;
`;

export const CardBack = styled(Card)`
  background-color: #271306;
  opacity: 0.8;
  background-image: linear-gradient(135deg, #43f7d0 25%, transparent 25%),
    linear-gradient(225deg, #43f7d0 25%, transparent 25%),
    linear-gradient(45deg, #43f7d0 25%, transparent 25%),
    linear-gradient(315deg, #43f7d0 25%, #271306 25%);
  background-position: 10px 0, 10px 0, 0 0, 0 0;
  background-size: 20px 20px;
  background-repeat: repeat;
`;

export const CardFront = styled(Card)<CardFrontProps>`
  background-size: cover;
  background-image: url('${({ imageUrl }) => imageUrl}');
  transform: rotateY(180deg);
`;
