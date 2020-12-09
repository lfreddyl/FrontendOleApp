import React from 'react';
import { View, Image,Text, StyleSheet,TouchableOpacity } from 'react-native';

import variables from '../styles/variables';
const img=[
  {id:1,uri:'https://www.deliverypedidos.com/wp-content/uploads/2020/06/delivery-pedidos-comida-a-domicilio-google.png'},
  {id:2,uri:'https://www.deliverypedidos.com/wp-content/uploads/2020/06/delivery-pedidos-comida-a-domicilio-google.png'},
  {id:3,uri:'https://www.deliverypedidos.com/wp-content/uploads/2020/06/delivery-pedidos-comida-a-domicilio-google.png'},
  {id:4,uri:'https://www.deliverypedidos.com/wp-content/uploads/2020/06/delivery-pedidos-comida-a-domicilio-google.png'},
  {id:5,uri:'https://www.deliverypedidos.com/wp-content/uploads/2020/06/delivery-pedidos-comida-a-domicilio-google.png'}
]
const HEADER_HEIGHT=50;

const Buscar = () => {
 
    return (
      <View style={styles.container}>
    
      </View>
    );
};

export default Buscar;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingHorizontal:'2.5%',
  },
  action_busqueda: {
    top:55,
    marginBottom:20,
    height:45,
    padding:10,
    borderRadius:20,
    backgroundColor:variables.$color_secundario,
    
  },
  textSign:{
    fontWeight:"bold",
    left:30,
    fontSize:15
  }
});