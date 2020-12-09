import React from 'react';
import {View, Text , StyleSheet,TouchableOpacity,Image } from 'react-native';
import variables from'../styles/variables';
import global from'../styles/global';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
const HomeScreen = ({navigation}) => {
  
    return (
      <View style={styles.container}>

        <View style={[styles.header,global.contenido1_column]}>
          <View style={global.contenido1_row}>
          <TouchableOpacity 
            style={[styles.header_localidad,global.contenido1_row]}> 
            
            <Text style={styles.text_header}>Riobamba</Text>
            <FontAwesome 
                    style={styles.caret_down}
                    name="caret-down"
                    color={variables.$color4_text_header}
                    size={20}
            />
          </TouchableOpacity>
            <View>
          <FontAwesome 
                    name="bell"
                    color={variables.$color4_text_header}
                    size={30}
          />
            </View>
          </View>
        </View>
        <View style={[styles.action_busqueda,global.contenido1_column]}>
            <View style={global.contenido1_row}>
            <FontAwesome 
                    name="search"
                    color={variables.$color_principal}
                    size={20}
                />
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() =>navigation.navigate("Buscar")}
                >
                <Text style={[styles.textSign, {
                        color:variables.$color_principal
                }]}>Buscar Tienda o Producto</Text>               
                </TouchableOpacity>
            </View>    
        </View>
       
        <Animatable.View 
        animation="bounceIn"
        style={[styles.footer,{ borderBottomColor:variables.$color_border,
          borderBottomWidth: 0.5}]}>
        <View  style={{flex:1,flexDirection:'column'}}>
        <View style={{flex:1,flexDirection:'row' , alignItems:"center"}} >
        <View style={{
                      flex:1,
                      padding:10
                      }}>
                      <TouchableOpacity style={{flex:1}}  onPress={()=>navigation.navigate('ListaTiendas')}>

                      <Image source={{uri:'https://www.transparenciaactiva.gob.sv/system/covers/images/000/006/433/large/comida_chatarra.jpg?1521735087'}} style={[styles.image]}/>
                      <Text style={[styles.label_touch]}>Comida</Text>
                      
                      </TouchableOpacity>
        </View>
        <View style={{
                      flex:1,
                      padding:10
                      }}>
                      <TouchableOpacity style={{flex:1}}  onPress={()=>navigation.navigate('ListaTiendas')}>

                      <Image source={{uri:'https://cdn.lavoz.com.ar/sites/default/files/styles/width_1072/public/nota_periodistica/pernod-ricard_1574089335.jpg'}} style={[styles.image]}/>
                      <Text style={[styles.label_touch]}>Alcohol y Bebidas</Text>
                 
                      </TouchableOpacity>
        </View>
          </View>
        </View>
        <View  style={{flex:1,flexDirection:'column',  
         borderBottomColor:variables.$color_border,borderBottomWidth: 0.5}}>
        <View style={{flex:1,flexDirection:'row',alignItems:"center"}} >
        <View style={{
                      
                      flex:1,
                      padding:10
                      }}>
                      <TouchableOpacity style={{flex:1}} onPress={()=>navigation.navigate('ListaTiendas')}>

                      <Image source={{uri:'https://www.bancaynegocios.com/wp-content/uploads/2020/04/Delivery-Caracas-Gastro-No-mia.jpg'}} style={[styles.image]}/>
                      <Text style={[styles.label_touch]}>Pide lo que sea</Text>
                      
                      </TouchableOpacity>
        </View>
        <View style={{
                      flex:1,
                      padding:10
                      }}>
                      <TouchableOpacity style={{flex:1}} onPress={()=>navigation.navigate('ListaTiendas')}>

                      <Image source={{uri:'https://www.deliverypedidos.com/wp-content/uploads/2020/06/delivery-pedidos-comida-a-domicilio-google.png'}} style={[styles.image]}/>
                      <Text style={[styles.label_touch]}>Encomiendas</Text>
                      
                      </TouchableOpacity>
        </View>
        </View>
        </View>
        <View  style={{flex:1.5,flexDirection:'column'}}>
        
        </View>

          
        </Animatable.View>
      </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    flex: 1, 
    fontFamily:'Poppins-Medium',
    marginHorizontal:'2.5%',
  },
  header: {
    height:50,
    paddingTop:10,
    borderBottomColor:variables.$color_border,
    borderBottomWidth: 0.5,
  },
  label_touch:{
    top:20,fontWeight:'bold', 
    fontSize:14,
    backgroundColor:variables.$color_secundario,
    paddingVertical:10,
    width:130,
    borderTopRightRadius:20,
    borderBottomRightRadius:20,
    color:variables.$color_principal,
    position: 'absolute',
  },
  image: {
    flex: 1,
     resizeMode:"cover",
     borderRadius:20,
  },
  header_localidad:{
    justifyContent:"center"
  },
  header_notification:{
    flexDirection:'row',
    backgroundColor:'#575'
  },
  caret_down:{
    top:10,
    left:20
  }
  ,
  footer: {
    flex: 11,
    paddingTop:10,
  },
  text_header: {
      color: variables.$color4_text_header,
      fontSize: 25,
      fontWeight:"bold",
      fontFamily:"Segoe UI Symbol"
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  action_busqueda: {
    marginTop: 10,
    height:45,
    padding:10,
    borderRadius:20,
    backgroundColor:variables.$color_border
  },
  header_notification:{
    left:50
  },textSign:{
    fontWeight:"bold",
    left:30,
    fontSize:15
  }

});
