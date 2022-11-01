import styled from 'styled-components'
import gs from '../../assets/global-style'

export const Container = styled.div`
  position: fixed;
  top: 100px;
  bottom: 0;
  width: 100%;
  .offical,
  .global {
    margin: 10px 5px;
    padding-top: 15px;
    font-weight: 700;
    font-size: ${gs['font-size-m']};
    color: ${gs['font-color-desc']};
  }
`
export const List = styled.ul`
  margin-top: 10px;
  padding: 0 5px;
  display: ${props => (props.useFlex ? 'flex' : '')};
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  background: ${gs['background-color']};
  &::after {
    content: '';
    display: block;
    width: 32vw;
  }
`
export const ListItem = styled.li`
  display: ${props => (props.tracks.length ? 'flex' : '')};
  padding: 3px 0;
  border-bottom: 1px solid ${gs['border-color']};
  .img_wrapper {
    width: ${props => (props.tracks.length ? '27vw' : '32vw')};
    height: ${props => (props.tracks.length ? '27vw' : '32vw')};
    border-radius: 3px;
    position: relative;
    .decorate {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0, 0%, 100%, 0), hsla(0, 0%, 43%, 0.4));
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
    .update_frequecy {
      position: absolute;
      left: 7px;
      bottom: 7px;
      font-size: ${gs['font-size-ss']};
      color: ${gs['font-color-light']};
    }
  }
`
export const SongList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 10px;
  > li {
    font-size: ${gs['font-size-s']};
    color: grey;
  }
`
