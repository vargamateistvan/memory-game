import styled from 'styled-components';
import { Paper } from '@mui/material';

const MainContainer = styled(Paper)`
  min-height: 325px;
  max-width: 1050px;
  width: '100%';
  height: '100%';
  padding: 24px;

  @media (max-width: 768px) {
    min-height: 325px;
    max-width: 1050px;
    padding: 4px;
  }
`;

export default MainContainer;
