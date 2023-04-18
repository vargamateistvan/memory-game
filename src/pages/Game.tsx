import { useCallback, useEffect, useMemo, useState } from 'react';
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
    checkMatch();
  }, [flippedCards]);

  const createDeck = useCallback(async () => {
    const images = await getCardImages();
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
    createDeck();
    setFlippedCards([]);
    setFoundCards([]);
    setMoves(0);
  }, []);

  return (
    <MainContainer>
      <Header moves={moves} foundCards={foundCards} reset={resetGame} />
      {isOver ? (
        <div>Game over</div>
      ) : (
        <GameContainer>
          {cards.map((card: CardType, index: number) => {
            return (
              <Card
                key={index}
                card={card}
                index={index}
                flipped={flippedCards.includes(card)}
                found={foundCards.includes(card)}
                flipCard={flipCard}
              ></Card>
            );
          })}
        </GameContainer>
      )}
    </MainContainer>
  );
};

export default Game;
