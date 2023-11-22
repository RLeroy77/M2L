import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Shop from './Shop';
import Connexion from './Connexion';
import Profil from './Profil'
import AddProduit from './AddProduit';
import '../style/App.css';

function App() {

  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));
  const [userName, setUserName] = useState('');

  const getUserInfo = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/user_name/${id}`);
      const data = await response.json();
      setUserName(data[0].user_name);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserInfo(userId);
    }
  }, [userId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar userId={userId} setUserId={setUserId} isAdmin={isAdmin} setIsAdmin={setIsAdmin} userName={userName} setUserName={setUserName} />
      <div style={{ flexGrow: 1 }} className='bg-color'>
        <Routes>
          <Route path='/' element={<Home userId={userId} setUserId={setUserId} isAdmin={isAdmin} setIsAdmin={setIsAdmin} userName={userName} setUserName={setUserName} />} />
          <Route path='/shop' element={<Shop userId={userId} setUserId={setUserId} isAdmin={isAdmin} setIsAdmin={setIsAdmin} userName={userName} setUserName={setUserName} />} />
          <Route path='/connexion' element={<Connexion userId={userId} setUserId={setUserId} isAdmin={isAdmin} setIsAdmin={setIsAdmin} userName={userName} setUserName={setUserName} />} />
          <Route path='/profil' element={<Profil userId={userId} setUserId={setUserId} isAdmin={isAdmin} setIsAdmin={setIsAdmin} userName={userName} setUserName={setUserName} />} />
          <Route path='/AddProduit' element={<AddProduit userId={userId} setUserId={setUserId} isAdmin={isAdmin} setIsAdmin={setIsAdmin} userName={userName} setUserName={setUserName} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
