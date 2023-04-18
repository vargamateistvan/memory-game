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
  transition: '0.6s',
	transformStyle: 'preserve-3d',
`;

export const CardBack = styled(Card)`
  background-size: contain;
  background-image: url('/img/card-back2.png');
  background-color: #3f9191;
  transform: 'rotateY(180deg)';
`;

export const CardFront = styled(Card)<CardFrontProps>`
  background-size: cover;
  background-image: url('${({ imageUrl }) => imageUrl}');
  transform: 'rotateY(0deg)';
`;
