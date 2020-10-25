import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function ListaTiendas (){
    return (
      <View style={styles.container}>
        <Text>Lista Tiendas</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default ListaTiendas;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
