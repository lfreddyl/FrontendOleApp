import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import variables from'../styles/variables'
const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();

    return (
      <View style={styles.container}>
          <StatusBar  barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.Image 
                animation="zoomInDown"
                duraton="1500"
         
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: variables.$color_principal
            }]}
            animation="bounceInUp"
        >
            <Text style={[styles.title, {
                color: variables.$color_fuente_principal
            }]}>Tus pedidos en la mejores manos</Text>
            <Text style={[styles.text,{color: variables.$color_fuente_principal}]}>Ingresa a tu cuenta</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>
                <LinearGradient
                     start={{ x: 0, y: 0.5 }}
                     end={{ x: 1, y: 0.5 }}
                    colors={[variables.$color_gradiente1,variables.$color_gradiente2]}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Comenzar</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#12100e"
                        size={23}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>
        </Animatable.View>
     
      </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: variables.$color_principal
  },
  header: {
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      paddingVertical: 50,
      paddingHorizontal: 30,
 
        
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5,
      fontSize: 15,
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row',
  },
  textSign: {
      color: variables.$color_principal,
      fontWeight: 'bold',
      fontSize: 16
  }
});
