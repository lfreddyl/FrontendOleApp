import React ,{useReducer}from 'react';
import ProductReducer from './ProductReducer';
import ProductContext from './ProductContext';
import axios from 'axios';
import {OBTENER_TIENDAS}from '../../types/types';
import variables from '../../styles/variables';
const ProductState=props=>{
    
  const initialStateTiendas = {
    tiendas:[],
    error:false,
  };   
  const [state, dispatch] =useReducer(ProductReducer, initialStateTiendas);
  const obtenerTiendas=async()=>{
      
      //consultar tiendas
      try {
        const result=await axios.get(variables.$UrlApi+'typestores')
        const tiendas=result.data
        console.log(tiendas.DATA)
        dispatch({
          type:OBTENER_TIENDAS,
          payload:tiendas.DATA,
          error:false
        })
      console.log(initialStateTiendas.error)
      } catch (error) {
        
      }
      
  }
    return (
      <ProductContext.Provider
        value={{obtenerTiendas,tiendas:state.tiendas,error:state.error}}
      >
        {props.children}
      </ProductContext.Provider>
    )
}
export default ProductState



