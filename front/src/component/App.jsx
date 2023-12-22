import React, { useEffect, useId, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from './Navbar';
import Home from './Home';
import Shop from './Shop';
import Produit from './Produit';
import Panier from './Panier';
import Connexion from './Connexion';
import Profil from './Profil'
import AdminProduit from './AdminProduit';
import AdminUser from './AdminUser';
import Footer from './Footer';
import '../style/App.css';

function App() {
  // const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [userId, setUserId] = useState(Cookies.get('userId'));
  const [isAdmin, setIsAdmin] = useState('');

  const getUserRole = async (userId) => {
    try {
      const reponse = await fetch(`http://localhost:8000/role/${userId}`)
      const data = await reponse.json();
      setIsAdmin(data[0].admin);
    } catch (error) {
      console.error('Erreur lors de la récupération des informations utilisateur:', error);
    }
  }

  useEffect(() => {
    if (useId) {
      getUserRole(userId);
    }
  }, [userId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar userId={userId} setUserId={setUserId} isAdmin={isAdmin} />
      <div style={{ flexGrow: 1 }} className='bg-color'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop userId={userId} setUserId={setUserId} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
          <Route path="/Produit/:productId" element={<Produit userId={userId} setUserId={setUserId} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
          <Route path='/Panier' element={<Panier />} />
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
