export type CardType = {
  imageUrl: string;
  id: number;
};

type Image = {
  height: number;
  id: string;
  url: string;
  width: number;
};

export type Action =
  | {
      type: 'FLIP_CARD';
      index: number;
    }
  | { type: 'CHECK_MATCH' }
  | { type: 'EMPTY_FLIPEDCARDS' }
  | {
      type: 'START_GAME';
      deckSize: number;
      images: Image[];
    }
  | {
      type: 'RESET_GAME';
    };

export type State = {
  cards: CardType[];
  flippedCards: CardType[];
  foundCards: CardType[];
  moves: number;
};
