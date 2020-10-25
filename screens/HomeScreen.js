import React from 'react';
import { Image,View,ScrollView, Text, Button, StyleSheet, StatusBar,TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import variables from'../styles/variables';
import global from'../styles/global';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
import Tiendas from'../components/Tiendas'
import * as Animatable from 'react-native-animatable';
const HomeScreen = ({navigation}) => {
  const { colors } = useTheme();

  const theme = useTheme();
  
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
        style={[styles.footer,global.contenido1_column]}>
        <View style={[global.contenido2_column,{borderBottomWidth:0.5,borderBottomColor:variables.$color_border}]}>
        <ScrollView
          horizontal={true}
          decelerationRate="fast"
          
        >  
        </ScrollView>
        </View>
        <View style={global.contenido3_column}>
          <Text>CATEGORIAS</Text>
          <Tiendas></Tiendas>
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
  },
  header: {
    paddingTop:10,
    borderBottomColor:variables.$color_border,
    borderBottomWidth: 0.5,
    paddingHorizontal:10,
    flex:1,
  },
  logo:{
    width:80,
    height:80
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
    flex: 10,
    backgroundColor: variables.$color9,
    paddingVertical: 30
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
