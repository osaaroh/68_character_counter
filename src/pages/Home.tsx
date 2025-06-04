import AllStatCards from "../components/AllStatCards"
import CharacterInput from "../components/CharacterInput"
import LetterDensityChart from "../components/LetterDensityChart"
import Navigation from "../components/Navigation"
import './Home.css'
import styles from '../Theme.module.css'
import { useGlobalContext } from "../contextAPI/context"

function Home() {
  const {theme} = useGlobalContext();
  const themeClass = theme === 'dark' ? styles.darkTheme : styles.lightTheme;
  return (
    <>
        <Navigation />
        <main className={`${themeClass}`}>
          <h1>Analyze your text in real-time</h1>
          <CharacterInput />
          <AllStatCards />
          <div className="container letter_density_container">
            <LetterDensityChart />
          </div>
        </main>
    </>
  )
}

export default Home