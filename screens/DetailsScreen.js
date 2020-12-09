import React,{useContext} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AuthContext from'../context/AuthContext'; 


const DetailsScreen = ({navigation}) => {
  const { signOut } = useContext(AuthContext);
    return (
      <View style={styles.container}>
        <Text>Details Screen</Text>
        <Button
            title="Go to details screen...again"
            onPress={() => navigation.push("Details")}
        />
        <Button
            title="Go to home"
            onPress={() => navigation.navigate("Home")}
        />
        <Button
            title="Go back"
            onPress={() => signOut()}
        />
      </View>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
