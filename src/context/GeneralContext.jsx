import React, { createContext, useContext, useReducer, useEffect } from 'react';

const GeneralContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  projects: [],
  applications: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_TOKEN':
      localStorage.setItem('token', action.payload);
      return { ...state, token: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return { ...state, user: null, token: null };
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };
    default:
      return state;
  }
};

export const GeneralProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.token) {
      fetchUserData();
    }
  }, [state.token]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/me', {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });
      if (response.ok) {
        const userData = await response.json();
        dispatch({ type: 'SET_USER', payload: userData });
      } else {
        // Token might be invalid
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
    }
  };

  return (
    <GeneralContext.Provider value={{ state, dispatch }}>
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneral = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error('useGeneral must be used within a GeneralProvider');
  }
  return context;
};