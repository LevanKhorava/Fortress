import Nav from './sections/Nav.tsx'
import Hero from './sections/Hero.tsx'
import About from './sections/About.tsx'
import Roster from './sections/Roster.tsx'
import Schedule from './sections/Schedule.tsx'
import Stats from './sections/Stats.tsx'
import CallToAction from './sections/CallToAction.tsx'
import Footer from './sections/Footer.tsx'

function App() {
  return (
    <div className="relative min-h-screen bg-ink-950 text-white">
      <Nav />
      <main>
        <Hero />
        <About />
        <Roster />
        <Schedule />
        <Stats />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}

export default App
