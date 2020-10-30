import { StyleSheet } from 'react-native';
import variables from './variables';


const globalStyles=StyleSheet.create({
    contenedor:{
        flex:1,
        width:'100%',
        fontFamily:'Poppins-Medium',
        
    },
    contenido1_row:{
        flexDirection:'row',
        flex:1
    },
    contenido1_column:{
        flexDirection:'column',
    },
    contenido2_column:{
        flexDirection:'column',
        flex:1,
        
    },
    contenido3_column:{
        flexDirection:'column',
        flex:3,
    },
    texto:{
        color:'#000',
        fontSize:12

    }


})
export default globalStyles