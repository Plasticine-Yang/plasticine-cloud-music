import styled from 'styled-components'
import gs from '../../../../assets/global-style'

export const HeaderContainer = styled.div`
  position: fixed;
  padding: 5px 10px;
  padding-top: 0;
  height: 40px;
  width: 100%;
  z-index: 100;
  display: flex;
  line-height: 40px;
  color: ${gs['font-color-light']};
  .back {
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }
  > h1 {
    font-size: ${gs['font-size-l']};
    font-weight: 700;
  }
`
