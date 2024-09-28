import reonicLogo from './assets/reonic.svg'
import ChargerOutlets from './components/ChargerOutlets'
import { SimulationProvider } from './provider/SimulationProvider';
import {  useSimulation } from './provider/useSimulation';
import './App.css'

function AppContent() {
  const {
    numberOfOutlets, 
    setNumberOfOutlets
  } = useSimulation();
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

function App() {
  return (
    <SimulationProvider>
      <AppContent />
    </SimulationProvider>
  )
}

export default App