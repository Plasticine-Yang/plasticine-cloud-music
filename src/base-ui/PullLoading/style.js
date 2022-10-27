
import styled, { keyframes } from 'styled-components'

import gs from '../../assets/global-style'

export const PullUpLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`

export const PullDownLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`

const dance = keyframes`
    0%, 40%, 100%{
      transform: scaleY (0.4);
      transform-origin: center 100%;
    }
    20%{
      transform: scaleY (1);
    }
`
export const Loading = styled.div`
  height: 10px;
  width: 100%;
  margin: auto;
  text-align: center;
  font-size: 10px;
  > div {
    display: inline-block;
    background-color: ${gs['theme-color']};
    height: 100%;
    width: 1px;
    margin-right: 2px;
    animation: ${dance} 1s infinite;
  }
  > div:nth-child(2) {
    animation-delay: -0.4s;
  }
  > div:nth-child(3) {
    animation-delay: -0.6s;
  }
  > div:nth-child(4) {
    animation-delay: -0.5s;
  }
  > div:nth-child(5) {
    animation-delay: -0.2s;
  }
`
