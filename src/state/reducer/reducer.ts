import { Action, CardType, State } from '../types';

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FLIP_CARD': {
      const card = state.cards.find(
        (card: CardType) => card.id === action.index
      );
      if (!card || state.flippedCards.includes(card)) break;
      state = {
        ...state,
        flippedCards: [...state.flippedCards, card],
        moves: state.moves++,
      };
      break;
    }

    case 'CHECK_MATCH': {
      const [firstCard, secondCard] = state.flippedCards;

      if (!firstCard || !secondCard) break;

      if (firstCard.imageUrl === secondCard.imageUrl) {
        state = {
          ...state,
          foundCards: [...state.foundCards, firstCard, secondCard],
        };
      }
      break;
    }

    case 'EMPTY_FLIPEDCARDS': {
      state = {
        ...state,
        flippedCards: [],
      };
      break;
    }

    case 'START_GAME': {
      const cardImages = [...action.images, ...action.images];
      cardImages.sort(() => Math.random() - 0.5);

      const gameCards = cardImages.map((card, index) => {
        return {
          imageUrl: card.url,
          id: index,
        };
      });

      state = {
        ...state,
        cards: gameCards,
      };
      break;
    }

    case 'RESET_GAME': {
      state = {
        cards: [],
        flippedCards: [],
        foundCards: [],
        moves: 0,
      };
      break;
    }

    default: {
      break;
    }
  }

  return state;
};

export default reducer;
