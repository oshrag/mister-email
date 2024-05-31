
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './assets/css/index.css'
import { Home } from './pages/Home';
import { AppHeader } from './cmps/AppHeader'
import { AboutUs } from './pages/AboutUs'
import { EmailIndex } from './pages/EmailIndex'
import { EmailDetails } from './cmps/EmailDetails'






function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <section className='main-app'>
      
          <AppHeader />
    

      <main className='container'>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} /> 
            <Route path="/email" element={<EmailIndex />} />   
            <Route path="/email/:emailId" element={<EmailDetails />} />  
           
        </Routes>
      </main>

      <footer>
          <section className="container">
              misterEmailRights 2024 &copy;
          </section>
      </footer>
      </section>
    </Router>
    

    // <>
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
  )
}

export default App
