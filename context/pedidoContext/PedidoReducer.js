const PedidoReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          _id: action._id,
          isLoading: false,
        };
    }
  };
  export default PedidoReducer