import {
  OBTENER_TIENDAS,
  SELECCIONAR_TIENDA,
  OBTENER_PRODUCTOS,
  OBTENER_CATEGORIAS_TIENDAS,
  OBTENER_PRODUCTOSOFERTA,
} from '../../types/types';
const ProductReducer = (prevState, action) => {
  switch (action.type) {
    case OBTENER_TIENDAS:
      return {
        ...prevState,
        tiendas: action.payload,
        error: action.error,
        longitudArray: action.longitudArray,
      };
    case SELECCIONAR_TIENDA:
      return {
        ...prevState,
        tienda_seleccionada: action.payload,
        error: action.error,
      };
    case OBTENER_PRODUCTOS:
      return {
        ...prevState,
        products: action.payload,
        error: action.error,
        longitudArray: action.longitudArray,
      };
    case OBTENER_CATEGORIAS_TIENDAS:
      return {
        ...prevState,
        categorias: action.payload,
        error: action.error,
        longitudArray: action.longitudArray,
      };
    case OBTENER_PRODUCTOSOFERTA:
      return {
        ...prevState,
        productsOferta: action.payload,
        error: action.error,
        longitudArrayOferta: action.longitudArray,
      };
  }
};
export default ProductReducer;
