import styled from 'styled-components';

type CardFrontProps = {
  imageUrl: string;
};

const Card = styled.div`
  background-repeat: no-repeat;
  background-position: center;
  width: 150px;
  height: 150px;
  border: 1px solid black;
  border-radius: 5px;
`;

export const CardWrapper = styled.div`
  transition: 0.5s;
  transform-style: preserve-3d;
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
  transform: rotateY(180deg);
`;

export const CardFront = styled(Card)<CardFrontProps>`
  background-size: cover;
  background-image: url('${({ imageUrl }) => imageUrl}');
  transform: rotateY(0deg);
`;
