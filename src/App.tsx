import { useState } from 'react'
import reonicLogo from './assets/reonic.svg'
import ChargerOutlets from './components/ChargerOutlets'
import './App.css'

function App() {
  const [numberOfOutlets, setNumberOfOutlets] = useState(20)

  return (
    <>
      <div className="reonic-logo">
    
        <a href="https://reonic.com/de-de/" target="_blank">
          <img src={reonicLogo} className="logo" alt="Reonic logo" />
        </a>
      </div>
      <input type="number" value={numberOfOutlets} onChange={(e) => setNumberOfOutlets(parseInt(e.target.value))}/>
      <ChargerOutlets numberOfOutlets={numberOfOutlets}/>
    </>
  )
}

export default App
