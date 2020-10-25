

import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import ListaTiendas from './ListaTiendas';
import Home from './HomeScreen';
import Promociones from './Promociones';
import Buscar from './Buscar';



const RootStack = createStackNavigator();
const StackHome = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="Home" component={Home}/>
        <RootStack.Screen name="ListaTiendas" component={ListaTiendas}/>
        <RootStack.Screen name="Promociones" component={Promociones}/>
        <RootStack.Screen name="Buscar" component={Buscar}/>
    </RootStack.Navigator>
);

export default StackHome