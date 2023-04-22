import { useCallback, useEffect, useMemo } from 'react';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import Card, { CardType } from '../components/Card/Card';
import { getCardImages } from '../utils/images';
import Header from '../components/Header';
import useStateContext from '../state/context/state/use-state-context';
import useDispatchContext from '../state/context/dispatch/use-dispatch-context';
import MainContainer from '../containers/MainContainer';
import GifContainer from '../containers/GifContainer';

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

  const createDeck = useCallback(async (deckSize = 12) => {
    dispatch({ type: 'RESET_GAME' });
    const images = await getCardImages(deckSize / 2);
    dispatch({ type: 'START_GAME', deckSize, images });
  }, []);

  const checkMatch = useCallback(() => {
    dispatch({ type: 'CHECK_MATCH' });
    setTimeout(() => {
      dispatch({ type: 'EMPTY_FLIPEDCARDS' });
    }, 750);
  }, []);

  const isOver = useMemo(
    () => cards.length > 0 && cards.length === foundCards.length,
    [cards, foundCards]
  );

  return (
    <Container component="main">
      <MainContainer elevation={3}>
        <Header />
        <Divider />
        {isOver && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            sx={{ pt: 2 }}
          >
            <GifContainer />
            <Typography
              variant="h5"
              textAlign="center"
              sx={{ pt: 2, pl: 1, pr: 1 }}
            >
              You have found all the pairs of cards
            </Typography>
            <GifContainer />
          </Box>
        )}
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          sx={{ pt: 2, pl: 1, pr: 1 }}
        >
          {cards.map((card: CardType, index: number) => {
            return (
              <Grid item key={index}>
                <Card key={index} card={card} index={index}></Card>
              </Grid>
            );
          })}
        </Grid>
      </MainContainer>
    </Container>
  );
};

export default Game;
