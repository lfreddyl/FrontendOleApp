import React, {useReducer} from 'react';
import PedidoReducer from './PedidoReducer';
import PedidoContext from './PedidoContext';
import axios from 'axios';
import variables from '../../styles/variables';
import {
  SELECCIONAR_PRODUCTO,
  AGREGAR_PEDIDO,
  MOSTRAR_TOTAL,
  ELIMINAR_PRODUCTO,
  GUARDAR_ORDEN,
  ELIMINAR_PEDIDO
} from '../../types/types';



const PedidoState = props => {
  const initialStateOrden = {
    pedido: [],
    producto_seleccionado: null,
    total_pedido: 0,
    ordenes:[]
  };

  const [state, dispatch] = useReducer(PedidoReducer, initialStateOrden);

  const seleccionarProducto = async producto => {
    //consultar Productos Tienda
    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: producto,
      error: false,
    });
  };

  const eliminarPedido = () => {
    //consultar Productos Tienda
    dispatch({
      type: ELIMINAR_PEDIDO,
      payload: [],
      error: false,
    });
  };

  const agregarPedido = async pedido => {
    //consultar Productos Tienda
    dispatch({
      type: AGREGAR_PEDIDO,
      payload: pedido,
      error: false,
    });
  };

  const mostrarResumen = total => {
    dispatch({
      type: MOSTRAR_TOTAL,
      payload: total,
      error: false,
    });
  };
  const eliminarProductoPedido = id => {
    dispatch({
      type: ELIMINAR_PRODUCTO,
      payload: id,
      error: false,
    });
  };

  const guardarOrden = async (orden) => {
    console.log(orden)
    try {
      const res = await axios.post(variables.$UrlApi+'orders', orden);
      const data = res.data;
      const sms = data.MESSAGE;
      if (data.STATUS === 'FAILURE') {
          console.log(sms)
        
      } else {

        console.log(sms)
        
      }
    } catch (error) {
      console.log(error);
     
    }
  };
  return (
    <PedidoContext.Provider
      value={{
        seleccionarProducto,
        agregarPedido,
        mostrarResumen,
        eliminarProductoPedido,
        total_pedido: state.total_pedido,
        pedido: state.pedido,
        eliminarPedido,
        producto_seleccionado: state.producto_seleccionado,
      }}>
      {props.children}
    </PedidoContext.Provider>
  );
};
export default PedidoState;
