import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from './Navbar';
import Home from './Home';
import Boutique from './Boutique';
import Produit from './Produit';
import Panier from './Panier';
import APropos from'./APropos';
import InscriptionConnexion from './InscriptionConnexion';
import Profil from './Profil'
import AdminProduit from './AdminProduit';
import AdminUser from './AdminUser';
import Footer from './Footer';
import '../style/App.css';

function App() {
  // const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [userId, setUserId] = useState(Cookies.get('userId') || null);
  const [isAdmin, setIsAdmin] = useState(null);
  console.log(userId)
  console.log(isAdmin)

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
    if (userId) {
      getUserRole(userId);
    }
  }, [userId]);

  return (
    <div className='site-container'>
      <Navbar userId={userId} setUserId={setUserId} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <div className='flexible-grow'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Boutique' element={<Boutique />} />
          <Route path="/Produit/:productId" element={<Produit />} />
          <Route path='/Panier' element={<Panier userId={userId} />} />
          <Route path='/APropos' element={<APropos />}/>
          <Route path='/InscriptionConnexion' element={<InscriptionConnexion />} />
          <Route path='/Profil' element={<Profil userId={userId} />} />
          <Route path='/AdminProduit' element={<AdminProduit />} />
          <Route path='/AdminUser' element={<AdminUser />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
