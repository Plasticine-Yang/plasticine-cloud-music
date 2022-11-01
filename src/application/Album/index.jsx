import { useState } from 'react'

import { useNavigate } from 'react-router'

import { CSSTransition } from 'react-transition-group'
import Header from './components/Header'

import { Container } from './style'

function Album() {
  const [showAlbum, setShowAlbum] = useState(true)

  const navigate = useNavigate()

  const handleBackBtnClick = () => {
    setShowAlbum(false)
  }

  return (
    <CSSTransition
      in={showAlbum}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      onExited={() => navigate('..')}
    >
      <Container>
        <Header title="返回" onBackBtnClick={handleBackBtnClick} />
      </Container>
    </CSSTransition>
  )
}

export default Album
