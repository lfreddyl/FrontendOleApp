import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';

import { AuthContext } from '../components/context';

import users from '../model/users';
import variables from'../styles/variables'
import axios from 'axios'

const SignInScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        movilcorreo: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    const { colors } = useTheme();

    const { signIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                movilcorreo: val,
                check_textInputChange: true,
                isValidUser: true
            });
       
        } else {
            setData({
                ...data,
                movilcorreo: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 7 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle =async () => {
        
        if ( data.movilcorreo.length == 0 || data.password.length == 0 ) {
            Alert.alert('Campos Vacíos', 'El celular o el password no pueden estar vacíos.', [
                {text: 'Ok'}
            ]);
            return;
        }
        const body={movilcorreo:data.movilcorreo,password:data.password}
        try {
            const res= await axios.post(variables.$UrlApi+'login',body);
            const data=res.data
            const user=data.DATA
            if (data.STATUS === "FAILURE") {
                Alert.alert('Credenciales Incorrectas!', 'EL celular o la contraseña son incorrectos.', [
                    {text: 'Okay'}
                ]);
                return;
            }
            else{
                users.$user=user
                signIn(users.$user);
            }
        } catch (error) {
            Alert.alert('No se puede acceder al servidor!', 'La conexion se ha perdido.', [
                {text: 'Okay'}
            ]);
            console.log(error)
            return  error
        } 
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#0F1317' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Iniciar Sesión</Text>
        </View>
        <Animatable.View 
            animation="bounceInUp"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Celular</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    keyboardType='numeric' 
                    placeholder="0998746273"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color='black'
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>El número debe contener 10 dígitos.</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Contraseña</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Tu Contraseña"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={400}>
            <Text style={styles.errorMsg}>La Contraseña debe contener al menos 8 caracteres.</Text>
            </Animatable.View>
            }
            

            <TouchableOpacity>
                <Text style={{color: variables.$color7, marginTop:15}}>Olvidaste tu Contraseña?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity 
                    style={styles.signIn}
                    onPress={() => {loginHandle()}}
                >
                <LinearGradient
                    colors={[variables.$color10,variables.$color11]}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:variables.$color9
                    }]}>Ingresar</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signIn, {
                        borderColor:variables.$color10,
                        borderWidth:1.2,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: variables.$color7
                    }]}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: variables.$color7
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
    
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderTopRightRadius:20,
        borderTopLeftRadius:20
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25
    },
    text_footer: {
        color: variables.$color7,
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: variables.$color7,
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });
