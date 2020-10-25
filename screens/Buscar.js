import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Buscar = () => {
    return (
      <View style={styles.container}>
        <Text>Buscar</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default Buscar;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
}})