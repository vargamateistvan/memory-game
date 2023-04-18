import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Divider,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from '@mui/material';
import { PlayArrow, RestartAlt } from '@mui/icons-material';
import { CardType } from './Card/Card';

type Props = {
  moves: number;
  foundCards: CardType[];
  start: Function;
  reset: Function;
};

const deckSizes = [4, 8, 12, 16, 20, 24];

const Header = ({ moves, foundCards, reset, start }: Props) => {
  const [deckSize, setDeckSize] = useState<number>(8);

  const resetGame = useCallback(() => reset(), [reset]);
  const startGame = useCallback(() => start(deckSize), [start, deckSize]);

  const handleChange = useCallback((event: SelectChangeEvent) => {
    setDeckSize(parseInt(event.target.value));
  }, []);

  return (
    <Box>
      <Typography variant="h5">Memory game</Typography>
      <Divider />
      <Typography>Moves: {moves}</Typography>
      <Typography>
        Founded Pairs: {foundCards.length / 2} / {deckSize / 2}
      </Typography>
      <Typography>Deck size: {deckSize}</Typography>
      <Divider />
      <Box display="flex">
        <Button
          variant="outlined"
          onClick={resetGame}
          startIcon={<RestartAlt />}
        >
          Reset
        </Button>
        <Button
          variant="outlined"
          onClick={startGame}
          startIcon={<PlayArrow />}
        >
          Start
        </Button>
        <InputLabel id="select-label">Number of pairs</InputLabel>
        <Select
          labelId="select-label"
          value={deckSize.toString()}
          label="Number of pairs"
          onChange={handleChange}
        >
          {deckSizes.map((size) => (
            <MenuItem key={size} value={size.toString()}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default Header;
