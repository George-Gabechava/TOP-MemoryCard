import { useState } from 'react'
import './App.css'
import jikanGet from './jikanAPI'

function App() {
  // const [count, setCount] = useState(0)
  jikanGet(12, 0);

  return (
    <>
      hello
    </>
  )
}

export default App
