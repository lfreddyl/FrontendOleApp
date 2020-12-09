
import React,{ useReducer, useEffect,useMemo} from 'react';
import { View, ActivityIndicator } from 'react-native';
import { 
  NavigationContainer, 
} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabScreen from './screens/MainTabScreen';
import RootStackScreen from './screens/RootStackScreen';
import FormularioPlatillo from './screens/FormularioPlatillo';
import AuthContext from'./context/AuthContext'; 
import ProductState from'./context/productContext/ProductState';
import PedidoState from'./context/pedidoContext/PedidoState'
import ListaTiendas from './screens/ListaTiendas';
import ListaProductos from './screens/ListaProductos';
import ResumenPedido from './screens/ResumenPedido';

const RootStack = createStackNavigator();


const App= ()=>{
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [_id, set_id] = React.useState(null); 
  const initialState = {
    isLoading: true,
    user: null,
    _id: null,
  };   

  const UserReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          user: action.payload,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          user: action.payload,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          user: null,
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
  const [state, dispatch] =useReducer(UserReducer, initialState);
  
 

  const authContext = useMemo(() => ({
    
    signIn: async(user) => {
      // set_id('fgkj');
      // setIsLoading(false);
      const userstorage={city: "Riobamba",
      address: [
          "Recife y Tucuman",
          "Orozco y Veloz"
      ],
      picture: null,
      deleted_at: "false",
      _id: "5f8622e979494d0f287a4f26",
      name: "Fredd",
      lastname: "lema",
      movil: "0981355487",
      type: "cliente",
      password: "1234567"}
      try {
        await AsyncStorage.setItem('user',JSON.stringify(userstorage));
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', _id);
      dispatch({ type: 'LOGIN', payload: userstorage});
    },
    signOut: async() => {
      // set_id(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('user');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // set_id('fgkj');
      // setIsLoading(false);
    },
    user2:state.user
    
  }), [state]);

  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let user;
      user = {city: "Riobamba",
      address: [
          "Recife y Tucuman",
          "Orozco y Veloz"
      ],
      picture: null,
      deleted_at: "false",
      _id: "5f8622e979494d0f287a4f26",
      name: "Fredd",
      lastname: "lema",
      movil: "0981355487",
      type: "cliente",
      password: "1234567"};
      try {
       // user = await AsyncStorage.getItem('user'); 
       await AsyncStorage.setItem('user',JSON.stringify(user));
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', _id);
      dispatch({ type: 'RETRIEVE_TOKEN', payload: user});
    }, 1000);
  }, []);

  if(state.isLoading) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return (
      <AuthContext.Provider value={authContext}>
      <ProductState>
      <PedidoState>
       <NavigationContainer  >
      { state.user !== null ? (
          <RootStack.Navigator headerMode='none'>
          <RootStack.Screen name="HomeDrawer" component={MainTabScreen} />
          <RootStack.Screen name="ListaTiendas" component={ListaTiendas}/>
          <RootStack.Screen name="ListaProductos" component={ListaProductos} />
          <RootStack.Screen name="FormularioPlatillo" component={FormularioPlatillo}/>
          <RootStack.Screen name="ResumenPedido" component={ResumenPedido}/>
        
        </RootStack.Navigator>
      )
    :
      <RootStackScreen/>
    }
    </NavigationContainer>
    </PedidoState>
    </ProductState>
    </AuthContext.Provider>
  
   
  );
}
export default App;



