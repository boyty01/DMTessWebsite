import logo from './logo.svg';
import './App.css';
import Navigation from "./components/navigation/Navigation.js";
import Home from "./pages/Home.js";
import Footer from 'components/footer/Footer.js';
import About from 'pages/About.js';
import WarOfBeing from 'pages/games/WarOfBeing.js';
import Contact from 'pages/Contact.js';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navigation />
      
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/warofbeing" element={<WarOfBeing/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
