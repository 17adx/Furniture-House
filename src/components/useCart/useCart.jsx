import { useContext } from 'react';
import { CartContext } from '../CartContext/CartContext'; 

export const useCart = () => {
  return useContext(CartContext);
};