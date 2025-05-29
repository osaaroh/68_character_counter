import CharacterInput from "../components/CharacterInput"
import Navigation from "../components/Navigation"
import './Home.css'

function Home() {
  return (
    <>
        <Navigation />
        <main>
          <h1>Analyze your text in real-time</h1>
          <CharacterInput />
        </main>
    </>
  )
}

export default Home