const UserReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          _id: action._id,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          name: action.name,
          _id: action.id,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          name: null,
          _id: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          name: action.id,
          _id: action.token,
          isLoading: false,
        };
    }
  };
  export default UserReducer