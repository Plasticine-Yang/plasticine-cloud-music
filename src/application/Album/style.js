import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  background: #fff;

  /* animation */
  transform-origin: right bottom;
  &.fly-enter,
  &.fly-appear {
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active,
  &.fly-appear-active {
    transition: transform 0.3s;
    transform: rotateZ(0) translate3d(0, 0, 0);
  }
  &.fly-exit {
    transform: rotateZ(0) translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    transition: transform 0.3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`
