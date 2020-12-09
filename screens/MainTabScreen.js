import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import StackHome from './StackHome' ;
import DetailsScreen from './DetailsScreen';
import Pedidos from './Pedidos';
import ListaTiendas from './ListaTiendas';
import variables from'../styles/variables'
import Promociones from './Promociones';
import {Text} from 'react-native';
const DetailsStack = createStackNavigator();

const Tab = createBottomTabNavigator();
const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        inactiveTintColor: variables.$color9,
        activeTintColor: variables.$color_secundario,
        style:[{backgroundColor:variables.$color_principal}]
      }
    }
      
      
     
    >
      <Tab.Screen
        name="Home"
        component={StackHome}
        options={{
          tabBarLabel: ({}) => (<Text style={{ fontSize: 15,color:variables.$color9}}> Inicio </Text>),
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={ListaTiendas}
        options={{
          tabBarVisible:false,
          tabBarLabel:({}) => (<Text style={{ fontSize: 15,color:variables.$color9}}> Buscar</Text>),
          tabBarIcon: ({ color }) => (
            <Icon name="ios-search" color={color} size={25} />
          ),
        }
        }
      />
      <Tab.Screen
        name="Ofertas"
        component={Promociones}
        options={{
          tabBarLabel:({}) =>(<Text style={{ fontSize: 15,color:variables.$color9}}> Ofertas </Text>),
          tabBarIcon: ({ color }) => (
            <Icon name="ios-cart" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Pedidos"
        component={Pedidos}
        options={{
          tabBarLabel:({}) => (<Text style={{ fontSize: 15,color:variables.$color9}}>Pedidos</Text>),
          tabBarIcon: ({ color }) => (
            <Icon name="ios-car" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={DetailsStackScreen}
        options={{
          tabBarLabel:({}) => (<Text style={{ fontSize: 15,color:variables.$color9}}> Cuenta </Text>),
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
);

export default MainTabScreen;



const DetailsStackScreen = ({navigation}) => (
<DetailsStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: variables.$color10,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <DetailsStack.Screen name="Cuenta" component={DetailsScreen} options={{
        headerRight: () => (
            <Icon.Button name="ios-menu" size={25} color="#FF4500" backgroundColor="#03273A" ></Icon.Button>
        )
        }} />
        </DetailsStack.Navigator>
);
  