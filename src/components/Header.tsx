import { CardType } from './Card/Card';

type Props = {
  moves: number;
  foundCards: CardType[];
  // start: Function;
  reset: Function;
};

const Header = ({ moves, foundCards, reset }: Props) => {
  return (
    <div>
      <h1>Cat memory game</h1>
      <h2>Moves: {moves}</h2>
      <h2>Founded Pairs: {foundCards.length / 2}</h2>
      <div>
        {/* <button onClick={start}>Start Game</button> */}
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default Header;
