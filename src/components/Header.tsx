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
  FormControl,
} from '@mui/material';
import { PlayArrow, RestartAlt } from '@mui/icons-material';
import { CardType } from './Card/Card';

type Props = {
  moves: number;
  foundCards: CardType[];
  start: Function;
  reset: Function;
};

const deckSizes = [6, 12, 18, 24, 30];

const Header = ({ moves, foundCards, reset, start }: Props) => {
  const [deckSize, setDeckSize] = useState<number>(12);

  const resetGame = useCallback(() => reset(), [reset]);
  const startGame = useCallback(() => start(deckSize), [start, deckSize]);

  const handleChange = useCallback((event: SelectChangeEvent) => {
    setDeckSize(parseInt(event.target.value));
  }, []);

  return (
    <Box>
      <Typography variant="h5" sx={{ pt: 2, pb: 2 }}>
        Memory game
      </Typography>
      <Divider />
      <Box display="flex" justifyContent="space-between" sx={{ pt: 2, pb: 2 }}>
        <Box>
          <Typography variant="subtitle1">Moves: {moves}</Typography>
          <Typography variant="subtitle1">
            Founded Pairs: {foundCards.length / 2} / {deckSize / 2}
          </Typography>
          <Typography variant="subtitle1">Deck size: {deckSize}</Typography>
        </Box>

        <Box
          display="flex"
          alignContent="center"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ width: 500 }}
        >
          <FormControl size="medium" sx={{ m: 1, minWidth: 120 }}>
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
          </FormControl>

          <Button
            variant="outlined"
            size="medium"
            onClick={resetGame}
            startIcon={<RestartAlt />}
            sx={{ mr: 2 }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            size="medium"
            onClick={startGame}
            startIcon={<PlayArrow />}
          >
            Start
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
