import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import Card, { CardType } from '../components/Card/Card';
import { getCardImages } from '../utils/images';
import Header from '../components/Header';
import MainContainer from '../containers/MainContainer';
import GifContainer from '../containers/GifContainer';

const Game = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
  const [foundCards, setFoundCards] = useState<CardType[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    createDeck();
  }, []);

  useEffect(() => {
    if (flippedCards.length !== 2) return;
    checkMatch();
  }, [flippedCards]);

  const createDeck = useCallback(async (decksize = 12) => {
    resetGame();
    const images = await getCardImages(decksize / 2);
    const cardImages = [...images, ...images];
    cardImages.sort(() => Math.random() - 0.5);

    const gameCards = cardImages.map((card, index) => {
      return {
        imageUrl: card.url,
        id: index,
      };
    });

    setCards(gameCards);
  }, []);

  const flipCard = useCallback(
    (index: number) => {
      const card = cards.find((card: CardType) => card.id === index);
      if (!card) return;
      if (flippedCards.includes(card)) return;
      setFlippedCards((prev) => [...prev, card]);
      setMoves((prev) => ++prev);
    },
    [cards, flippedCards]
  );

  const checkMatch = useCallback(() => {
    const [firstCard, secondCard] = flippedCards;

    if (!firstCard || !secondCard) return;

    if (firstCard.imageUrl === secondCard.imageUrl) {
      setFoundCards((prev) => [...prev, firstCard, secondCard]);
    }

    setTimeout(() => {
      setFlippedCards([]);
    }, 750);
  }, [flippedCards]);

  const isOver = useMemo(
    () => cards.length > 0 && cards.length === foundCards.length,
    [cards, foundCards]
  );

  const resetGame = useCallback(() => {
    setFlippedCards([]);
    setFoundCards([]);
    setMoves(0);
  }, []);

  return (
    <Container component="main">
      <MainContainer elevation={3}>
        <Header
          moves={moves}
          foundCards={foundCards}
          reset={resetGame}
          start={createDeck}
          isOver={isOver}
        />
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
                <Card
                  key={index}
                  card={card}
                  index={index}
                  flipped={flippedCards.includes(card)}
                  found={foundCards.includes(card)}
                  flipCard={flipCard}
                ></Card>
              </Grid>
            );
          })}
        </Grid>
      </MainContainer>
    </Container>
  );
};

export default Game;
