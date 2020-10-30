import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import variables from'../styles/variables'
import axios from'axios'
const SignInScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        name: '',
        movil:'',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidName: true,
        isValidPassword: true,
        isValidMovil: true,
    });

    const textInputChange = (val) => {
        if( val.length >= 3) {
            setData({
                ...data,
                name: val,
                check_textInputChange: true,
                isValidName: true,
            });
        } else {
            setData({
                ...data,
                name: val,
                check_textInputChange: false,
                isValidName: false
            });
        }
    }
    const textInputChangePassword = (val) => {
        if( val.length >= 8) {
            setData({
                ...data,
                password: val,
                check_textInputChange: true,
                isValidPassword: true,
            });
        } else {
            setData({
                ...data,
                password: val,
                check_textInputChange: false,
                isValidPassword: false
            });
        }
    }
    const textInputChangeMovil = (val) => {
        if( val.length === 10) {
            setData({
                ...data,
                movil: val,
                check_textInputChange: true,
                isValidMovil: true,
            });
        } else {
            setData({
                ...data,
                movil: val,
                check_textInputChange: false,
                isValidMovil: false
            });
        }
    }
    const handleValidUser = (val) => {
        if( val.trim().length >=3 ) {
            setData({
                ...data,
                isValidName: true
            });
        } else {
            setData({
                ...data,
                isValidName: false
            });
        }
    }
    const handleValidPassword= (val,number) => {
        if( val.trim().length >=number ) {
            setData({
                ...data,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                isValidPassword: false
            });
        }
    }
    const handleValidMovil= (val,number) => {
        if( val.trim().length ===number ) {
            if(/^\d+$/.test(val.trim())){
                setData({
                    ...data,
                    isValidMovil: true
                });
            }
            else{
            setData({
                ...data,
                isValidMovil: false
            });}
        } else {
            setData({
                ...data,
                isValidMovil: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
    const SignUpHandle =async () => {
        
        if ( data.name.length == 0 || data.password.length == 0 ||data.movil.length == 0) {
            Alert.alert('Registro Cancelado', 'Ingrese sus datos porfavor no pueden estar vacíos.', [
                {text: 'Ok'}
            ]);
            return;
        }
        const body={movil:data.movil,password:data.password,name:data.name,type:'cliente'}
        try {
            const res= await axios.post(variables.$UrlApi+'users',body);
            const data=res.data
            const user=data.MESSAGE
            console.log(user)
            if (data.STATUS === "FAILURE") {
                Alert.alert('Registro Cancelado', user+', Ingrese al sistema con sus credenciales porfavor', [
                    {text: 'Okay'}
                ]);
                return;
            }
            else{
                Alert.alert('Registro Completado','Ingrese al sistema con sus credenciales porfavor', [
                    {text: 'Okay'}
                ]);
                navigation.goBack();
                return;
            }
        } catch (error) {
            console.log(error)
            return  error
        } 
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#0F1317' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Registrate Ahora!</Text>
        </View>
        <Animatable.View 
            animation="bounceInUp"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>Nombres</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput
                    placeholder="Tus nombres"
                    style={styles.textInput}
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
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidName ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Ingrese su nombre porfavor.</Text>
            </Animatable.View>
            }

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Contraseña</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Tu Contraseña"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                    onEndEditing={(e)=>handleValidPassword(e.nativeEvent.text,8)}
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

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Número de Celular</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    keyboardType='numeric' 
                    placeholder="Tu número de celular"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChangeMovil(val)}
                    onEndEditing={(e)=>handleValidMovil(e.nativeEvent.text,10)}
                />
                                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidMovil ? null : 
            <Animatable.View animation="fadeInLeft" duration={400}>
            <Text style={styles.errorMsg}>El números debe contener 10 dígitos.</Text>
            </Animatable.View>
            }
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {SignUpHandle()}}
                >
                <LinearGradient
                    colors={[variables.$color10,variables.$color11]}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Registrarse</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.signIn, {
                        borderColor: variables.$color7,
                        borderWidth: 1.2,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: variables.$color7
                    }]}>Ingresar</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
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
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop:10,
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
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    }
  });
