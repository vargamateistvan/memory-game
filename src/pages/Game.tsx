import { useCallback, useEffect, useMemo } from 'react';
import { Container, Divider, Grid } from '@mui/material';
import Card, { CardType } from '../components/Card/Card';
import { getCardImages } from '../utils/images';
import Header from '../components/Header';
import useStateContext from '../state/context/state/use-state-context';
import useDispatchContext from '../state/context/dispatch/use-dispatch-context';

const Game = () => {
  const { cards, flippedCards, foundCards } = useStateContext();
  const dispatch = useDispatchContext();

  useEffect(() => {
    createDeck();
  }, []);

  useEffect(() => {
    if (flippedCards.length !== 2) return;
    checkMatch();
  }, [flippedCards]);

  const createDeck = useCallback(async (deckSize = 8) => {
    dispatch({ type: 'RESET_GAME' });
    const images = await getCardImages(deckSize / 2);
    dispatch({ type: 'START_GAME', deckSize, images });
  }, []);

  const flipCard = useCallback((index: number) => {
    dispatch({ type: 'FLIP_CARD', index });
  }, []);

  const checkMatch = useCallback(() => {
    dispatch({ type: 'CHECK_MATCH' });
    setTimeout(() => {
      dispatch({ type: 'EMPTY_FLIPEDCARDS' });
    }, 750);
  }, []);

  const isOver = useMemo(
    () => cards.length === foundCards.length,
    [cards, foundCards]
  );

  return (
    <Container component="main">
      <Header />
      <Divider />
      {isOver ? (
        <div>Game over</div>
      ) : (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          {cards.map((card: CardType, index: number) => {
            return (
              <Grid item key={index}>
                <Card key={index} card={card} index={index}></Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default Game;
