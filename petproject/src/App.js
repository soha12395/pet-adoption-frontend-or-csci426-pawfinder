



import './styles/Navbar.css'
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home'
import Contact from './components/Contact'
import BrowsePets from './components/BrowsePets'
import About from './components/About'
import Footer from  './components/Footer';
import Login from './components/login.jsx';
import Signup from './components/Signup';
import Adoptionform from './components/Adoptionform.jsx';

import {BrowserRouter as Router , Routes , Route } from 'react-router-dom'; 
function App() {
  
  return (
      <div className="App">
      <Router>
        <Navbar /> 
        <Routes>
          <Route path ="/" excat Component={Home}/>
          <Route path ="/browsepets" excat Component={BrowsePets}/>
          <Route path ="/about" excat Component={About}/>
          <Route path ="/contact" excat Component={Contact}/>
            <Route path="/login" element={<Login />} />
            <Route path ='/signup' element={<Signup/>}/>
            <Route path="/adoptionform" element={<Adoptionform />} />
            
        </Routes>
     
        <Footer/>
        </Router>     
    </div>
  );
}

export default App;