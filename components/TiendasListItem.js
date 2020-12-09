import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import variables from '../styles/variables';
import ProductContext from '../context/productContext/ProductContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function TiendasListItem({tienda, navigation}) {
  //Context Producto que permite guardar la tienda seleccionada
  const {seleccionarTienda} = useContext(ProductContext);

  //Hook para redireccionar
  return (
    <TouchableOpacity
      style={{flex: 1,paddingVertical:10}}
      onPress={() => {
        seleccionarTienda(tienda);
        navigation.navigate('ListaProductos');
      }}>
      <View style={{flex: 9}}>
        <Image source={{uri: tienda.picture}} style={[styles.image]} />
        <Text style={styles.text_title}>{tienda.description}</Text>
      </View>
     
        <View style={{flexDirection: 'row', flex: 1, padding: 5,borderWidth:0.6,  borderRadius: 20,
              borderColor: '#aaa',top:5}}>
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            
            }}>
            <Text
              style={[
                {width: '40%', right: 5, textAlign: 'right'},
                styles.h3,
                styles.colorh2,
              ]}>
              ${tienda.costo_envio}
            </Text>
            <FontAwesome
              style={{width: '20%'}}
              name="truck"
              color={variables.$color_principal}
              size={20}
            />
          </View>
          <View
            style={{
              flex: 3,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}>
            <Text
              style={[
                {width: '40%', right: 5, textAlign: 'right'},
                styles.h3,
                styles.colorh2,
              ]}>
              {tienda.delivery_time} min
            </Text>
            <FontAwesome
              style={{width: '20%'}}
              name="bicycle"
              color="#12100e"
              size={20}
            />
          </View>
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}>
            <Text
              style={[
                {width: '20%', textAlign: 'right', right: 5},
                styles.h3,
                styles.colorh2,
              ]}>
              {tienda.rating}
            </Text>

            <FontAwesome
              style={{width: '20%'}}
              name="star"
              color="#FA8804"
              size={20}
            />
          </View>
        </View>
      
    </TouchableOpacity>
  );
}

export default TiendasListItem;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  text_title: {
    flex: 1,
    color: '#fff',
    fontSize: 17,
    backgroundColor: 'rgba(18, 16, 14, 0.5)',
    top: 45,
    width: '100%',
    height: 70,
    position: 'absolute',
    textAlign: 'center',
    padding: 20,
  },
  colorh1: {
    color: variables.$color_h1,
  },
  h1: {
    fontSize: 20,
  },
  h2: {
    fontSize: 17,
  },
  h3: {
    fontSize: 14,
  },

  colorh2: {
    color: variables.$color_h2,
  },
});
