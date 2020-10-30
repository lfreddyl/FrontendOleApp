import{OBTENER_TIENDAS} from '../../types/types'
const ProductReducer = (prevState, action) => {
    switch( action.type ) {
      case OBTENER_TIENDAS: 
        return {
          ...prevState,
          tiendas:action.payload,
          error:action.error
    }
  };
}
export default ProductReducer