import React ,{useReducer}from 'react';
import PedidoReducer from './PedidoReducer'
import PedidoContext from './PedidoContext'

const PedidoState=props=>{

    const initialStateTiendas = {
        tiendas:[]
      };   
    
    const [state, dispatch] =useReducer(PedidoReducer, initialStateTiendas);
   
    return (

      <PedidoContext.Provider
        value={{tiendas:state.tiendas}}
      >
        {props.children}
      </PedidoContext.Provider>
    )
}
export default PedidoState



