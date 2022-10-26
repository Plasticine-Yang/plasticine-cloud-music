import styled, { keyframes } from 'styled-components'

import gs from '../../assets/global-style'

const loading = keyframes`
  0%, 100% {
    transform: scale(0);
  }

  50% {
    transform: scale(1);
  }
`

export const LoadingWrapper = styled.div`
  > div {
    position: fixed;
    z-index: 1000;
    inset: 0;
    margin: auto;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    opacity: 0.6;
    background-color: ${gs['theme-color']};
    animation: ${loading} 1.4s infinite ease-in;
  }

  > div:nth-child(2) {
    animation-delay: -0.7s;
  }
`
