import React ,{useReducer}from 'react';
import UserReducer from './UserReducer'
import AsyncStorage from '@react-native-community/async-storage';
import UserContext from './UserContext'

const UserState=props=>{

    const initialState = {
        isLoading: true,
        name: null,
        _id: null,
      };   
    const [state, dispatch] =useReducer(UserReducer, initialState);
    const signIn= async(user) => {
      // set_id('fgkj');
      // setIsLoading(false);
      const _id = user._id
      const name = user.name;
      
      try {
         await AsyncStorage.setItem('_iduser', _id);
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', _id);
      dispatch({ type: 'LOGIN', name: name, id: _id });
    }
    const signOut=async() => {
      // set_id(null);
      // setIsLoading(false);
      try {
         await AsyncStorage.removeItem('_iduser');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    }
    const Retrieve_to=async()=>{
     
        // setIsLoading(false);
        let _id;
        _id = null;
        try {
          _id = await AsyncStorage.getItem('_iduser');
        } catch(e) {
          console.log(e);
        }
        console.log('user token: ', _id);
        dispatch({ type: 'RETRIEVE_TOKEN', _id: _id });
      
    }
    return (

      <UserContext.Provider
        value={{signIn,signOut,Retrieve_to,isLoading:state.isLoading,_id:state._id}}
      >
        {props.children}
      </UserContext.Provider>
    )
}
export default UserState



