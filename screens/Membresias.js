import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Membresias = () => {
    return (
      <View style={styles.container}>
        <Text>Membresias</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default Membresias;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
