
import React,{ useReducer, useEffect} from 'react';
import { View, ActivityIndicator } from 'react-native';
import { 
  NavigationContainer, 
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { DrawerContent } from './screens/DrawerContent';

import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import RootStackScreen from './screens/RootStackScreen';
import NetInfo from'@react-native-community/netinfo';
import UserContext from'./context/userContext/UserContext'; 
const Drawer = createDrawerNavigator();

const App= ()=>{
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [_id, set_id] = React.useState(null); 
  const initialState = {
    isLoading: true,
    name: null,
    _id: null,
  };   
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
  const [state, dispatch] =useReducer(UserReducer, initialState);
  
  NetInfo.fetch().then(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
  });

  const userContext = React.useMemo(() => ({
    signIn: async(user) => {
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
    },
    signOut: async() => {
      // set_id(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('_iduser');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // set_id('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let _id;
      _id = null;
      try {
        _id = await AsyncStorage.getItem('_iduser');
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', _id);
      dispatch({ type: 'RETRIEVE_TOKEN', _id: _id });
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
        <UserContext.Provider value={userContext}>
       <NavigationContainer >
      { state._id !== null ? (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          <Drawer.Screen name="SupportScreen" component={SupportScreen} />
          <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
          <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
        </Drawer.Navigator>
      )
    :
      <RootStackScreen/>
    }
    </NavigationContainer>
    </UserContext.Provider>
  
   
  );
}
export default App;



