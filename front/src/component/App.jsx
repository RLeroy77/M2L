import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import Navbar from './Navbar';
import Home from './Home';
import Boutique from './Boutique';
import Produit from './Produit';
import Panier from './Panier';
import APropos from './APropos';
import InscriptionConnexion from './InscriptionConnexion';
import Profil from './Profil'
import AdminProduit from './AdminProduit';
import AdminUser from './AdminUser';
import Footer from './Footer';
import '../style/App.css';

function App() {
  const baseUrl = 'http://10.74.1.151:8000';

  const [userId, setUserId] = useState("");
  const [isAdmin, setIsAdmin] = useState(null);

  const getUserRole = async (decodedUserId) => {
    try {
      const response = await fetch(`${baseUrl}/api/users/getUserRole/${decodedUserId}`);
      const data = await response.json();
      setIsAdmin(data[0].admin);
    } catch (error) {
      console.error('Erreur lors de la récupération des informations utilisateur:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token');

      if (token) {
        const decodedUserId = jwtDecode(token).userId;
        setUserId(decodedUserId);
        await getUserRole(decodedUserId);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className='site-container'>
      <Navbar userId={userId} setUserId={setUserId} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <div className='flexible-grow'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Boutique' element={<Boutique />} />
          <Route path="/Produit/:productId" element={<Produit />} />
          <Route path='/Panier' element={<Panier userId={userId} />} />
          <Route path='/APropos' element={<APropos />} />
          <Route path='/InscriptionConnexion' element={<InscriptionConnexion />} />
          <Route path='/Profil' element={<Profil userId={userId} />} />
          <Route path='/AdminProduit' element={<AdminProduit isAdmin={isAdmin} />} />
          <Route path='/AdminUser' element={<AdminUser isAdmin={isAdmin} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
