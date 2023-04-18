import { useCallback } from 'react';
import { CardBack, CardFront, CardWrapper } from './card.style';

type Props = {
  card: CardType;
  index: number;
  flipped: boolean;
  found: boolean;
  flipCard: Function;
};

export type CardType = {
  imageUrl: string;
  id: number;
};

const Card = ({ card, index, flipped, found, flipCard }: Props) => {
  const handleOnClick = useCallback(() => {
    flipCard(index);
  }, [index, flipCard]);

  return (
    <CardWrapper onClick={handleOnClick}>
      {flipped || found ? <CardFront imageUrl={card.imageUrl} /> : <CardBack />}
    </CardWrapper>
  );
};

export default Card;
