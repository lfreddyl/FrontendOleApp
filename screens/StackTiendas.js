

import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import ListaProductos from './ListaProductos';
import Promociones from './Promociones';
import Buscar from './Buscar';

const RootStack = createStackNavigator();
const StackTiendas = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="ListaProductos" component={ListaProductos}/>
        <RootStack.Screen name="Promociones" component={Promociones}/>
        <RootStack.Screen name="Buscar" component={Buscar}/>
    </RootStack.Navigator>
);

export default StackTiendas