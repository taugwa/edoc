import Theme from './Theme'
import MainAppBar from './components/MainAppBar'
import LogoTitle from './components/LogoTitle'
import MainButton from './components/MainButton'
import './index.css';



const App = () => {
  return (
    <div>
      <MainAppBar />
      <LogoTitle />
      <MainButton variant="contained" pill className="mainButton">🍄 Join the community</MainButton>
    </div>
    
  )
}





export default App