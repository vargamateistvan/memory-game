import { CardType } from './Card/Card';

type Props = {
  moves: number;
  foundCards: CardType[];
};

const Header = ({ moves, foundCards }: Props) => {
  return (
    <div>
      <h1>Cat memory game</h1>
      <h2>Moves: {moves}</h2>
      <h2>Founded Pairs: {foundCards.length / 2}</h2>
    </div>
  );
};

export default Header;
