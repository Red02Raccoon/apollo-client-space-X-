import styled, { keyframes } from 'react-emotion';
import { size } from 'polished';

import { colors } from '../styles/global';

import { ReactComponent as Logo } from '../assets/logo.svg';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled(Logo)(size(64), {
  display: 'block',
  margin: 'auto',
  fill: colors.grey,
  path: {
    transformOrigin: 'center',
    animation: `${spin} 1s linear infinite`,
  },
});

export default Loading;
