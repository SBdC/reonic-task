import reonicLogo from './assets/reonic.svg'
import SimulationControls from './components/SimulationControls'
import ChargerOutlets from './components/visualizer/ChargerOutlets'
import DailyStats from './components/visualizer/DailyStats'
import YearStats from './components/visualizer/YearStats'
import { SimulationProvider } from './provider/SimulationProvider'
import { useSimulation } from './provider/useSimulation'
import './App.css'

function AppContent() {
  const {
    numberOfOutlets, 
    simulateDay,
    simulateYear,
  } = useSimulation();

  return (
    <>
      <div className="reonic-logo">
        <a href="https://reonic.com/de-de/" target="_blank">
          <img src={reonicLogo} className="logo" alt="Reonic logo" />
        </a>
      </div>
   
      <SimulationControls onSimulate={simulateDay} runYearlySimulation={simulateYear} />
      <div className='simulation-visualizer'>
      <ChargerOutlets numberOfOutlets={numberOfOutlets}/>
      <DailyStats />
      <YearStats />
      </div>
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