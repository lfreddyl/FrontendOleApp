import React, { useContext, useEffect,Fragment } from 'react';
import {View,ScrollView, Text , StyleSheet, StatusBar,TouchableOpacity,ImageBackground } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {Separator,ListItem,Thumbail,Left,Body} from 'native-base'
import variables from'../styles/variables';
import global from'../styles/global';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProductContext from'../context/productContext/ProductContext'
import * as Animatable from 'react-native-animatable';
const HomeScreen = ({navigation}) => {
  const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
  const {obtenerTiendas,tiendas,error}=useContext(ProductContext)
  useEffect(()=>{
    obtenerTiendas()
  },[])
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#03273A' color='#fff' />
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
                    color={variables.$color1}
                    size={20}
                />
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() =>navigation.navigate("Buscar")}
                >
                <Text style={[styles.textSign, {
                        color:variables.$color6_text_search
                }]}>Buscar Tienda o Producto</Text>               
                </TouchableOpacity>
            </View>    
        </View>
       
        <Animatable.View 
        animation="bounceIn"
        style={[styles.footer]}>
        <ScrollView
        nestedScrollEnabled={false}>
          
        <View style={{width:'100%',justifyContent:"center",alignItems:'center'}} >
        
              
                {tiendas.map(tiendas=>{
                  const{img,description,_id}=tiendas;
                  
                  return(
              
                    <Fragment key={_id}>
                     <View style={{
                       marginVertical:10

                      }}>
                      <TouchableOpacity onPress={()=>navigation.navigate('ListaTiendas')}>

                      <ImageBackground source={{uri:img}} style={[styles.image]}>
                      <Text style={{top:10,fontWeight:'bold', fontSize:15,backgroundColor:variables.$color10,paddingVertical:10, width:150,borderTopRightRadius:20,borderBottomRightRadius:20,color:variables.$color9}}>{description}</Text>
                      </ImageBackground>
                      </TouchableOpacity>
                    </View>
                    </Fragment>
                  )
                
                })}
          </View>
          </ScrollView>
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
    backgroundColor:variables.$color_fondo
  },
  header: {
    paddingTop:10,
    borderBottomColor:variables.$color_border,
    borderBottomWidth: 0.5,
    paddingHorizontal:10,
    flex:1,
  },
  image: {
    width:250,
    height:100,
    alignItems:"flex-start",
    
  }
  ,
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
    backgroundColor: variables.$color9,
    paddingTop:10,
    alignItems:"center"
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
    flex:1,
    marginTop: 10,
    padding:10,
    borderWidth:0.2,
    borderRadius:20,
    marginHorizontal:'2.5%',    
    borderColor:variables.$color5_text
  },
  header_notification:{
    left:50
  },textSign:{
    fontWeight:"bold",
    left:30,
    fontSize:15
  }

});
