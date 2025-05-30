import AllStatCards from "../components/AllStatCards"
import CharacterInput from "../components/CharacterInput"
import LetterDensityChart from "../components/LetterDensityChart"
import Navigation from "../components/Navigation"
import './Home.css'

function Home() {
  return (
    <>
        <Navigation />
        <main>
          <h1>Analyze your text in real-time</h1>
          <CharacterInput />
          <AllStatCards />
          <div>
            <LetterDensityChart />
          </div>
        </main>
    </>
  )
}

export default Home