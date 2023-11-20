import '../style/App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Shop from './Shop';
import Connexion from './Connexion';
import Profil from './Profil'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flexGrow: 1 }} className='bg-color'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/connexion' element={<Connexion />} />
          <Route path='/profil' element={<Profil />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
