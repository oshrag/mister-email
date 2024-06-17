import {
  HashRouter as Router,
  Routes,
  Route,
  useOutletContext,
} from "react-router-dom";

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./assets/css/index.css";
import { Home } from "./pages/Home";
import { AppHeader } from "./cmps/AppHeader";
import { AboutUs } from "./pages/AboutUs";
import { EmailIndex } from "./pages/EmailIndex";
import { EmailDetails } from "./cmps/EmailDetails";
import { EmailCompose } from "./cmps/EmailCompose";
import { UserMsg } from "./cmps/UserMsg";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <section className="main-app">
        <AppHeader />

        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/email/:folder" element={<EmailIndex />}>
              {/* <Route
                path="/email/:folder/edit/:emailId?"
                element={<EmailCompose />}
              /> */}
              <Route
                path="/email/:folder/:emailId"
                element={<EmailDetails />}
              />
            </Route>
          </Routes>
        </main>

        <footer>
          <section className="container">misterEmailRights 2024 &copy;</section>
        </footer>
        <UserMsg />
      </section>
    </Router>
  );
}

export default App;
