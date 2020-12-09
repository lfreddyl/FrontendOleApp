import React, {useReducer} from 'react';
import ProductReducer from './ProductReducer';
import ProductContext from './ProductContext';
import axios from 'axios';
import _, { toUpper } from 'lodash';
import {
  OBTENER_TIENDAS,
  SELECCIONAR_TIENDA,
  OBTENER_PRODUCTOS,
  OBTENER_CATEGORIAS_TIENDAS,
  OBTENER_PRODUCTOSOFERTA
} from '../../types/types';
import variables from '../../styles/variables';
const ProductState = props => {
  const initialStateTiendas = {
    tiendas: [],
    error: false,
    products: [],
    productsOferta:[],
    tienda_seleccionada: null,
    categorias:[],
    unsuscribe:false,
    longitudArray:0,
    longitudArrayOferta:0,
  };

  const [state, dispatch] = useReducer(ProductReducer, initialStateTiendas);

  const obtenerTiendas = async () => {
    //consultar tiendas
    try {
      const result = await axios.get(variables.$UrlApi + 'typestores');
      const tiendas = result.data;
      const longitud=tiendas.DATA.length

      dispatch({
        type: OBTENER_TIENDAS,
        payload: tiendas.DATA,
        error: false,
        longitudArray:longitud
      });
      console.log(initialStateTiendas.error);
    } catch (error) {}
  };

  const TiendasPorCategorias = async (category,ordenarPor) => {
    //consultar tiendas
    if(ordenarPor===''){
      ordenarPor='Calificacion'
    }
    if(category===''){
      category='null'
    }
    try {
      const result = await axios.get(variables.$UrlApi + 'storeByCategory/'+category+'/'+ordenarPor
      );
      const tiendas = result.data;
      const longitudArray=tiendas.DATA.length
      dispatch({
        type: OBTENER_TIENDAS,
        payload: tiendas.DATA,
        error: false,
        longitudArray:longitudArray
      });
    } catch (error) {}
  };
  // UNSUSCIRBE DE LAS CONSULTAS REALIZADAS AL API

  const unsuscribeTiendas=()=>{
    dispatch({
      type: OBTENER_TIENDAS,
      payload: [],
      error: false,
      unsuscribe:true
    });
  }

  const unsuscribeCategorias=()=>{
    dispatch({
      type: OBTENER_CATEGORIAS_TIENDAS,
      payload: [],
      error: false,
    });
  }

  const unsuscribeProductosTiendas=()=>{
    dispatch({
      type: OBTENER_PRODUCTOS,
      payload: [],
      error: false,
    });
  }
  //
  const obtenerCategoriasTiendas=async()=>{
    try {
      const result = await axios.get(variables.$UrlApi + 'categoryStores');
      const tiendas = result.data;
      dispatch({
        type: OBTENER_CATEGORIAS_TIENDAS,
        payload: tiendas.DATA,
        error: false,
      });
    } catch (error) {
      dispatch({
        type: OBTENER_TIENDAS,
        payload: null,
        error: true,
      });
    }
  }
  const obtenerTiendasTipo = async () => {
    //consultar tiendas
    
    try {
      const result = await axios.get(variables.$UrlApi + 'storeByType/COMIDA');
      const tiendas = result.data;
      const longitudArray=tiendas.DATA.length
      dispatch({
        type: OBTENER_TIENDAS,
        payload: tiendas.DATA,
        error: false,
        longitudArray:longitudArray
      });
    } catch (error) {
      dispatch({
        type: OBTENER_TIENDAS,
        payload: null,
        error: true,
      });
    }
  };

  const obtenerProductosTiendas = async id => {
    //consultar Productos Tienda
    try {
      const result = await axios.get(
        variables.$UrlApi + 'productsByStore/' + id,
      );
      
      const tiendas = result.data;
      const longitudArray=tiendas.DATA.length
      const ti= _.sortBy(tiendas.DATA,'type')
      dispatch({
        type: OBTENER_PRODUCTOS,
        payload: ti,
        error: false,
        longitudArray:longitudArray
      });
    } catch (error) {
      dispatch({
        type: OBTENER_PRODUCTOS,
        payload: [],
        error: true,
      });
    }
  };

  const unsuscribeProductosByOferta=()=>{
    dispatch({
      type: OBTENER_PRODUCTOSOFERTA,
      payload: [],
      error: false,
    });
  }
  const obtenerProductosByOferta = async()=> {
    //consultar Productos Tienda
    try {
      const result = await axios.get(
        variables.$UrlApi + 'productsByOferta',
      );
      const tiendas = result.data;
      const longitudArray=tiendas.DATA.length
      const ti= _.sortBy(tiendas.DATA,'type')
      console.log(ti);
      dispatch({
        type: OBTENER_PRODUCTOSOFERTA,
        payload: ti,
        error: false,
        longitudArray:longitudArray
      });
    } catch (error) {
      dispatch({
        type: OBTENER_PRODUCTOSOFERTA,
        payload: [],
        error: true,
      });
    }
  };


  const seleccionarTienda = async tienda => {
    //consultar Productos Tienda
    dispatch({
      type: SELECCIONAR_TIENDA,
      payload: tienda,
      error: false,
    });
  };

  return (
    <ProductContext.Provider
      value={{
        obtenerTiendasTipo,
        seleccionarTienda,
        obtenerProductosTiendas,
        TiendasPorCategorias,
        unsuscribeTiendas,
        unsuscribeCategorias,
        obtenerCategoriasTiendas,
        unsuscribeProductosTiendas,
        obtenerProductosByOferta,
        unsuscribeProductosByOferta,
        longitudArrayOferta:state.longitudArrayOferta,
        tienda_seleccionada: state.tienda_seleccionada,
        tiendas: state.tiendas,
        error: state.error,
        products: state.products,
        categorias:state.categorias,
        unsuscribe:state.unsuscribe,
        longitudArray:state.longitudArray,
        productsOferta:state.productsOferta
      }}>
      {props.children}
    </ProductContext.Provider>
  );
};
export default ProductState;
