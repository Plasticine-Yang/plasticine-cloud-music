import styled from 'styled-components'

import gs from '../../assets/global-style'

export const HorizontalScrollContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 95px;
  width: 100%;
  padding: 5px;
  overflow: hidden;
`

export const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  width: fit-content;
  overflow: hidden;
  > span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${gs['font-size-m']};
  }
`

export const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${gs['font-size-m']};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${gs['theme-color']};
    border: 1px solid ${gs['theme-color']};
    opacity: 0.8;
  }
`
