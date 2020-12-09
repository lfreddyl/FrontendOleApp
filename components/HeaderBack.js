
import React,{useContext} from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import variables from'../styles/variables'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProductContext from'../context/productContext/ProductContext'

const HeaderBack = ({navigation,nombre}) => {
  const {unsuscribeTiendas}=useContext(ProductContext);
  
  return(
    <View style={{height:50,
      borderBottomColor:variables.$color_border,
      borderBottomWidth: 0.8}}>
    <View style={[{flexDirection:'row'}]}>
    <TouchableOpacity 
      style={[{flex:3,top:10}]} onPress={() => {unsuscribeTiendas();navigation.goBack()}}>
      <FontAwesome 
              style={styles.caret_down}
              name="arrow-circle-left"
              color={variables.$color4_text_header}
              size={30}
      />
    </TouchableOpacity>
    <Text style={[{flex:5,fontSize:18,justifyContent:'flex-start'}]}>{nombre}</Text>
    </View>
    </View>

  )
   
  };
export default HeaderBack;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    position:"absolute"
  },
})