import styled from 'styled-components';

type CardFrontProps = {
  imageUrl: string;
};

const Card = styled.div`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 150px;
  height: 150px;
  border: 1px solid black;
`;

export const CardBack = styled(Card)`
  background-image: url('/img/card-back.jpg');
`;

export const CardFront = styled(Card)<CardFrontProps>`
  background-image: url('${({ imageUrl }) => imageUrl}');
`;
