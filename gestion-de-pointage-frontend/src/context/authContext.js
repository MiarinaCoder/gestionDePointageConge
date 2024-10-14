// contexts/authContext.js
'use client';

import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../services/api' // Importez votre service API
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Vérifier le token existant lors du chargement initial
  useEffect(() => {
    const token = localStorage.getItem('token');
    

    if (token) {
      try{
        const decoded = jwt_decode(token);
        setUser({ 
          token, 
          id: decoded.userId,
          sessionId: decoded.sessionId, 
          prenom: decoded.prenom, // Récupérez le prénom de l'utilisateur
          email: decoded.email,
          role: decoded.role
        });
      }
        catch (err) {
          console.error('Invalid token', err);
          // Gérer l'erreur comme vous le souhaitez, par exemple en déconnectant l'utilisateur
        }
        setLoading(false);
      
    }
    setLoading(false);
  }, []);

  // Fonction de login
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, sessionId } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('sessionId', sessionId);
      setUser({ token, sessionId,name: response.data.name }); // Stocker le nom d'utilisateur
      router.push('/dashboard'); // Redirection après connexion
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    try {
      const sessionId = localStorage.getItem('sessionId');
      const token = localStorage.getItem('token');

      await api.put(`/sessions/${sessionId}/terminer`, { endTime: new Date().toISOString() }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      localStorage.removeItem('token');
      localStorage.removeItem('sessionId');
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;