import { useCallback, useEffect, useMemo, useState } from 'react';
import { Container, Divider, Grid } from '@mui/material';
import GameContainer from '../containers/GameContainer';
import Card, { CardType } from '../components/Card/Card';
import { getCardImages } from '../utils/images';
import Header from '../components/Header';
import MainContainer from '../containers/MainContainer';

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

  const createDeck = useCallback(async (decksize = 8) => {
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
    () => cards.length === foundCards.length,
    [cards, foundCards]
  );

  const resetGame = useCallback(() => {
    setFlippedCards([]);
    setFoundCards([]);
    setMoves(0);
  }, []);

  return (
    <Container component="main">
      <Header
        moves={moves}
        foundCards={foundCards}
        reset={resetGame}
        start={createDeck}
      />
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
      )}
    </Container>
  );
};

export default Game;
