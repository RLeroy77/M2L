import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Shop from './Shop';
import Connexion from './Connexion';
import Profil from './Profil'
import AdminProduit from './AdminProduit';
import AdminUser from './AdminUser';
import Produit from './Produit';
import '../style/App.css';

function App() {

  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));

  useEffect(() => {
  }, [userId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar userId={userId} setUserId={setUserId} isAdmin={isAdmin} />
      <div style={{ flexGrow: 1 }} className='bg-color'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop userId={userId} setUserId={setUserId} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
          <Route path="/Produit/:productId" element={<Produit userId={userId} setUserId={setUserId} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
          <Route path='/connexion' element={<Connexion />} />
          <Route path='/profil' element={<Profil userId={userId} setUserId={setUserId} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
          <Route path='/AdminProduit' element={<AdminProduit />} />
          <Route path='/AdminUser' element={<AdminUser />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
