import { useCallback } from 'react';
import { CardBack, CardFront } from './card.style';

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
    <div onClick={handleOnClick}>
      {flipped || found ? <CardFront imageUrl={card.imageUrl} /> : <CardBack />}
    </div>
  );
};

export default Card;
