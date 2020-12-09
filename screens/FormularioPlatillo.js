import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Text, Footer, FooterTab} from 'native-base';
import PedidoContext from '../context/pedidoContext/PedidoContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import variables from '../styles/variables';
import * as Animatable from 'react-native-animatable';

import {StatusBarHeight} from '../functions/StatusBarHeight';
const FormularioPlatillo = ({navigation}) => {
  const headerHeight = Number.parseInt(StatusBarHeight);
  const [cantidad, guardarCantidad] = useState(1);
  const [total, guardarTotal] = useState(0);

  const {producto_seleccionado, agregarPedido, pedido} = useContext(
    PedidoContext,
  );
  const {price} = producto_seleccionado;

  useEffect(() => {
    calcularTotal();
  }, [cantidad]);

  const calcularTotal = () => {
    const totalPagar = price * cantidad;
    guardarTotal(totalPagar);
  };

  const decrementar = () => {
    if (cantidad > 1) {
      const nuevaCantidad = parseInt(cantidad) - 1;
      guardarCantidad(nuevaCantidad);
    }
  };

  const incrementar = () => {
    const nuevaCantidad = parseInt(cantidad) + 1;
    guardarCantidad(nuevaCantidad);
  };

  const confirmarOrden = () => {
    Alert.alert(
      'Deseas Agregar a tu pedido?',
      'Puede modificar desde tu pedido',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            const pedido = {
              ...producto_seleccionado,
              cantidad,
              total,
            };
            agregarPedido(pedido);
            navigation.goBack();
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
    );
  };
  const mostrarDescuento = descuento => {
    if (descuento > 0) {
      return (
        <Text
          style={[
            styles.h3,
            {
              flex:1,
              fontWeight: 'bold',
              color: '#fff',
              height: 30,
              backgroundColor: '#7F00FF',
              borderRadius: 20,
              textAlign: 'center',
              padding: 5,
            },
          ]}>
          Descuento: {descuento}%
        </Text>
      );
    } else return null;
  };
  const mostrarOferta = oferta => {
    if (oferta === true) {
      return (
        <Text
          style={[
            styles.h3,
            {
              flex:1,
              fontWeight: 'bold',
              color: variables.$color_principal,
              height: 30,
              backgroundColor: '#a8e063',
              borderRadius: 20,
              textAlign: 'center',
              padding: 5,
            },
          ]}>
          Promoción
        </Text>
      );
    } else return null;
  };
  return (
    <View style={{flex: 1}} animation="fadeInDown" duraton="1500">
      <ImageBackground
        source={{uri: producto_seleccionado.picture}}
        style={{height: 300}}>
        <FontAwesome
          style={{
            flex: 1,
            alignSelf: 'flex-start',
            paddingLeft: '2.5%',
            top: headerHeight,
          }}
          name="times-circle"
          color="#000"
          size={35}
          onPress={() => {
            navigation.goBack(null);
          }}
        />
      </ImageBackground>
      <View style={{flex: 2, paddingVertical: 10, paddingHorizontal: '2.5%'}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {mostrarDescuento(producto_seleccionado.off)}

          {mostrarOferta(producto_seleccionado.oferta)}
        </View>
        <Text
          style={[
            styles.colorh1,
            styles.h2,
            {fontWeight: 'bold', flex: 1, textAlign: 'center',textTransform:'uppercase'},
          ]}>
          {producto_seleccionado.type}
          
        </Text>
        <Text
          style={[styles.colorh1, styles.h2, {fontWeight: 'bold', flex: 1}]}>
          {producto_seleccionado.titulo}
         
        </Text>
        <Text style={[styles.colorh2, styles.h3, {flex: 1}]}>
          <Text
            style={[styles.colorh1, styles.h2, {fontWeight: 'bold', flex: 1}]}>
            Descripción:{' '}
          </Text>
          {producto_seleccionado.description}
        </Text>
        <Text style={[styles.colorh1, styles.h3, {flex: 1}]}>
          <Text
            style={[styles.colorh1, styles.h2, {fontWeight: 'bold', flex: 1}]}>
            Costo:{' '}
          </Text>
          ${producto_seleccionado.price}
        </Text>
      </View>

      <Footer style={{height: 60}}>
        <FooterTab
          style={{
            backgroundColor: '#fff',
            borderTopWidth: 0.6,
            borderTopColor: '#eee',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: '2.5%',
            }}>
            <View
              style={{
                flex: 1,
                height: 40,
                flexDirection: 'row',
                backgroundColor: '#eee',
                borderRadius: 20,
                alignItems: 'center',
                padding: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  decrementar();
                }}
                style={{flex: 1, textAlign: 'center', alignItems: 'center'}}>
                <FontAwesome name="minus-circle" color="#12100e" size={25} />
              </TouchableOpacity>
              <View>
                <Text
                  style={[
                    styles.colorh1,
                    styles.h2,
                    {fontWeight: 'bold', flex: 1},
                  ]}>
                  {cantidad}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  incrementar();
                }}
                style={{flex: 1, textAlign: 'center', alignItems: 'center'}}>
                <FontAwesome name="plus-circle" color="#12100e" size={25} />
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.2}} />
            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={() => {
                  confirmarOrden();
                }}>
                <Text
                  style={[
                    styles.h3,
                    {
                      fontWeight: 'bold',
                      backgroundColor: variables.$color_secundario,
                      borderRadius: 20,
                      padding: 10,
                      height: 40,
                      textAlign: 'center',
                      color: variables.$colorblanco,
                    },
                  ]}>
                  Agregar $ {total}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </FooterTab>
      </Footer>
    </View>
  );
};

export default FormularioPlatillo;
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 15,
  },

  colorh2: {
    color: variables.$color_h2,
  },
});
