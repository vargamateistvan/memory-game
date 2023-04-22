import { useCallback, useMemo } from 'react';
import { CardBack, CardFront, CardWrapper, Flipper } from './card.style';
import useStateContext from '../../state/context/state/use-state-context';
import useDispatchContext from '../../state/context/dispatch/use-dispatch-context';

type Props = {
  card: CardType;
  index: number;
};

export type CardType = {
  imageUrl: string;
  id: number;
};

const Card = ({ card, index }: Props) => {
  const { flippedCards, foundCards } = useStateContext();
  const dispatch = useDispatchContext();

  const flipCard = useCallback(() => {
    dispatch({ type: 'FLIP_CARD', index });
  }, []);

  const flipped = useMemo(() => flippedCards.includes(card), [flippedCards]);

  const found = useMemo(() => foundCards.includes(card), [foundCards]);

  return (
    <CardWrapper onClick={flipCard}>
      <Flipper flipped={flipped || found}>
        <CardFront imageUrl={card.imageUrl} />
        <CardBack />
      </Flipper>
    </CardWrapper>
  );
};

export default Card;
