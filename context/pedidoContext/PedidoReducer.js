import {
  SELECCIONAR_PRODUCTO,
  LLENAR_PRODUCTO,
  AGREGAR_PEDIDO,
  MOSTRAR_TOTAL,
  ELIMINAR_PRODUCTO,
  GUARDAR_ORDEN,
  ELIMINAR_PEDIDO
} from '../../types/types';
const PedidoReducer = (prevState, action) => {
  switch (action.type) {
    case SELECCIONAR_PRODUCTO:
      return {
        ...prevState,
        producto_seleccionado: action.payload,
        error: action.error,
      };
    case LLENAR_PRODUCTO:
      return {
        ...prevState,
        producto_seleccionado: action.payload,
        error: action.error,
      };
    case AGREGAR_PEDIDO:
      return {
        ...prevState,
        pedido: [...prevState.pedido, action.payload],
        error: action.error,
      };
    case MOSTRAR_TOTAL:
      return {
        ...prevState,
        total_pedido: action.payload,
        error: action.error,
      };
    case ELIMINAR_PRODUCTO:
      return {
        ...prevState,
        pedido: prevState.pedido.filter(
          articulo => articulo._id !== action.payload,
        ),
        error: action.error,
      };
    case GUARDAR_ORDEN:
      return {
        ...prevState,
        pedido: prevState.pedido.filter(
          articulo => articulo._id !== action.payload,
        ),
        error: action.error,
      };
      case ELIMINAR_PEDIDO:
      return {
        ...prevState,
        pedido:action.payload,
        error: action.error,
      };
      
  }
};
export default PedidoReducer;
