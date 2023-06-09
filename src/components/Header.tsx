import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Card,
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
import colors from '../theme/colors';

type Props = {
  moves: number;
  foundCards: CardType[];
  start: Function;
  reset: Function;
  isOver: boolean;
};

const deckSizes = [6, 12, 18, 24, 30];

const Header = ({ moves, foundCards, reset, start, isOver }: Props) => {
  const [deckSize, setDeckSize] = useState<number>(12);

  const resetGame = useCallback(() => reset(), [reset]);
  const startGame = useCallback(() => start(deckSize), [start, deckSize]);

  const handleChange = useCallback((event: SelectChangeEvent) => {
    setDeckSize(parseInt(event.target.value));
  }, []);

  return (
    <Container>
      <Typography variant="h5" sx={{ pb: 2, color: colors.green }}>
        Cat Memory game
      </Typography>
      <Divider />
      <Box display="flex" alignContent="center" alignItems="center">
        <Button
          variant="contained"
          size="medium"
          onClick={startGame}
          startIcon={<PlayArrow />}
          sx={{ mr: 2, color: colors.brown, backgroundColor: colors.green }}
        >
          {isOver ? 'Restart' : 'Start'}
        </Button>
        <Button
          variant="outlined"
          size="medium"
          onClick={resetGame}
          startIcon={<RestartAlt />}
          sx={{ color: colors.green, backgroundColor: colors.brown }}
        >
          Reset
        </Button>
        <Box flexGrow={1} />
        <FormControl
          size="medium"
          sx={{ m: 1, minWidth: 120, color: colors.brown }}
        >
          <InputLabel
            id="select-label"
            sx={{
              color: colors.green,
            }}
          >
            Number of pairs
          </InputLabel>
          <Select
            labelId="select-label"
            value={deckSize.toString()}
            label="Number of pairs"
            onChange={handleChange}
            sx={{
              color: colors.green,
              backgroundColor: colors.brown,
            }}
          >
            {deckSizes.map((size) => (
              <MenuItem
                key={size}
                value={size.toString()}
                sx={{
                  color: colors.green,
                  backgroundColor: colors.brown,
                }}
              >
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Card
          sx={{
            p: 1,
            width: '100%',
            mr: 2,
            color: colors.brown,
            backgroundColor: colors.green,
          }}
        >
          <Typography variant="subtitle1">Moves: {moves}</Typography>
        </Card>
        <Card
          sx={{
            p: 1,
            width: '100%',
            color: colors.brown,
            backgroundColor: colors.green,
          }}
        >
          <Typography variant="subtitle1">
            Found Pairs: {foundCards.length / 2} / {deckSize / 2}
          </Typography>
        </Card>
      </Box>
      <Divider sx={{ pb: 2 }} />
    </Container>
  );
};

export default Header;
