// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Contact from "./Contact"

function App() {

  axios.defaults.baseURL = `http://localhost:8000/`;

  return (
    <>

      <HelmetProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Contact />} />
            {/* <Route path="/about" element={<About />} /> */}
          </Routes>
        </Router>
      </HelmetProvider>

    </>
  );
}

export default App;
