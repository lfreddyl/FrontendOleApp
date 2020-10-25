import Axios from 'axios';
import React ,{Component}from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import variables from'../styles/variables'

class Tiendas extends Component {
  constructor(){
   
    super();
    this.state={
      tiendas:[],
      cargando:true,
    };
  }
  
    
  
 
    render (){
      return (
        <View style={styles.container}>
          <Text>{this.state.tiendas}</Text>
        </View>
      );
    }
};

export default Tiendas;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
})