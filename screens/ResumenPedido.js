import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  List,
  ListItem,
  Text,
  Body,
  Footer,
  FooterTab,
  Picker,
  Icon,
} from 'native-base';
import PedidoContext from '../context/pedidoContext/PedidoContext';
import ProductContext from '../context/productContext/ProductContext';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import variables from '../styles/variables';
import * as Animatable from 'react-native-animatable';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const ResumenPedido = ({navigation}) => {
  const [addres, guardarAddress] = useState([]);
  const [data, guardarData] = useState({
    address: '',
    description: '',
  });
  const {
    producto_seleccionado,
    seleccionarProducto,
    pedido,
    total_pedido,
    mostrarResumen,
    eliminarProductoPedido,
    eliminarPedido
  } = useContext(PedidoContext);
  const {user2} = useContext(AuthContext);
  const {tienda_seleccionada} = useContext(ProductContext);
  const {price} = producto_seleccionado;

  useEffect(() => {
    //calcularTotal();
    console.log(user2)
    obtenerUsuarioStorage();
    calcularTotalPedido();
  }, [pedido]);
  const calcularTotalPedido = () => {
    let nuevoTotal = 0;
    nuevoTotal = pedido.reduce(
      (nuevoTotal, articulo) => nuevoTotal + articulo.total,
      0,
    );
    mostrarResumen(nuevoTotal);
  };

  const obtenerUsuarioStorage = () => {
    guardarAddress(user2.address);
  };

  const confirmarOrden = () => {
    Alert.alert(
      '¿Esta seguro de ordenar su pedido?',
      'Esta accion no se puede cancelar despues de ordenar su pedido ',
      [
        {
          text: 'Confirmar',
          onPress: async () => {
            const orden = {
              delivery_time: tienda_seleccionada.delivery_time,
              products: pedido,
              totalcost: total_pedido + tienda_seleccionada.costo_envio,
              user_id: user2._id,
              address: data.address,
              state: 'Pendiente',
              description: data.description,
              date:Date.now(),
              movil: user2.movil,
            };
            console.log(orden)
           if(orden.address===""){
             orden.address=addres[0]
           }
           try {
            const res = await axios.post(
              'https://oleapi2.herokuapp.com/orders',orden);
              const {data}=res;
              const {STATUS}=data;
              if(STATUS==='SUCCESS'){
                eliminarPedido()
                Alert.alert(
                  'Su pedido fue registrado correctamente',
                  'Puede revisar el estado su pedido en la seccion depedidos',
                  [
                    {
                      text: 'Confirmar',
                      onPress:()=>{
                        navigation.navigate('HomeDrawer')
                      }
                    }
                  ]
                )
              }
              else{
                Alert.alert(
                  'Hubo un problema al registrar su pedido',
                  'Inténtalo más tarde',
                  [
                    {
                      text: 'Confirmar',
                      onPress:()=>{
                        navigation.navigate('HomeDrawer')
                      }
                    }
                  ]
                )

              }
           } catch (error) {
            Alert.alert(
              'Hubo un problema con la red',
              'Inténtalo más tarde',
              [
                {
                  text: 'Confirmar',
                  
                }
              ]
            )
           }
            
     
            

            // navigation.goBack();
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
    );
  };
  const eliminarProducto = id => {
    Alert.alert(
      'Deseas eliminar este producto?',
      'Una vez eliminado no se puede recuperar',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            eliminarProductoPedido(id);
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
    );
  };

  const mostrarPicker = () => {
    if (addres.length !== 0) {
      return (
        <Picker
          mode="dropdown"
          iosHeader="Select your SIM"
          iosIcon={<Icon name="arrow-down" />}
          style={[{width: '100%'}, styles.colorh2]}
          selectedValue={data.address}
          onValueChange={(itemValue, itemIndex) => {
            guardarData({
              ...data,
              address: itemValue,
            }),
              console.log(data);
          }}>
          {addres.map((add, i) => (
            <Picker.Item key={i} label={add} value={add} />
          ))}
        </Picker>
      );
    }
  };
  const textInputChange = val => {
    if (val.length >= 3) {
      guardarData({
        ...data,
        description: val,
      });
    }
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 50,
          borderBottomColor: variables.$color_border,
          borderBottomWidth: 0.5,
          paddingHorizontal: '2.5%',
        }}>
        <View style={[{flexDirection: 'row'}]}>
          <TouchableOpacity
            style={[{flex: 3, top: 10}]}
            onPress={() => navigation.goBack()}>
            <FontAwesome
              style={styles.caret_down}
              name="times-circle"
              color={variables.$color4_text_header}
              size={30}
            />
          </TouchableOpacity>
          <Text
            style={[
              {flex: 5, fontSize: 18, justifyContent: 'flex-start', top: 10},
            ]}>
            Tu Pedido
          </Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, Top: 10, paddingHorizontal: '2.5%'}}>
        <List style={{top: 5}}>
          {pedido.map((product, i) => (
            <View key={i}>
              <ListItem style={{height: 100}}>
                <TouchableOpacity
                  onPress={() => {
                    seleccionarProducto(product);
                    navigation.navigate('FormularioPlatillo');
                  }}
                  style={{
                    flex: 12,
                    flexDirection: 'row',
                    paddingHorizontal: '2.5%',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      decrementar(product._id);
                    }}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>
                      {product.cantidad}x
                    </Text>
                  </TouchableOpacity>
                  <Body
                    style={{
                      flex: 5,
                      justifyContent: 'center',
                      alignContent: 'center',
                    }}>
                    <Text
                      style={[styles.colorh1, styles.h2, {fontWeight: 'bold'}]}>
                      {product.titulo}
                    </Text>
                    <Text style={[styles.colorh2, styles.h3]} numberOfLines={2}>
                      {product.description}
                    </Text>
                  </Body>

                  <TouchableOpacity
                    onPress={() => {
                      eliminarProducto(product._id);
                    }}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>
                      ${product.total}
                    </Text>
                    <FontAwesome
                      name="trash"
                      color="#E50A3F"
                      size={30}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </ListItem>
            </View>
          ))}
        </List>
        <View
          style={{
            flex: 1,
          }}>
          <View style={[{paddingTop: 10}, styles.borderBottom]}>
            <Text
              style={[
                styles.colorh1,
                styles.h3,
                {
                  fontWeight: 'bold',
                },
              ]}>
              Dirección de Entrega
            </Text>

            {mostrarPicker()}
          </View>
          <View style={[{paddingTop: 10}, styles.borderBottom]}>
            <Text
              style={[
                styles.colorh1,
                styles.h3,

                {
                  fontWeight: 'bold',
                  flex: 1,
                },
              ]}>
              Entrega Estimada
            </Text>

            <Text
              style={[
                styles.colorh2,
                styles.h3,

                {
                  flex: 1,
                  padding: 10,
                },
              ]}>
              {tienda_seleccionada.delivery_time} min
            </Text>
          </View>
          <View style={[{paddingTop: 10}, styles.borderBottom]}>
            <Text
              style={[
                styles.colorh1,
                styles.h3,
                {
                  fontWeight: 'bold',
                },
              ]}>
              Observaciones
            </Text>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome
                name="comment"
                color={variables.$color_principal}
                size={15}
              />
              <TextInput
                placeholder="¿Hay alguna observación para tu pedido?"
                placeholderTextColor="#666666"
                onChangeText={val => textInputChange(val)}
                style={[
                  {
                    color: variables.$color_principal,
                    flex: 1,
                    fontSize: 15,
                  },
                ]}

                //onChangeText={(val) => textInputChange(val)}
                // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
              />
            </View>
          </View>
          <View
            style={[
              {
                paddingTop: 10,
                height: 150,
                borderBottomColor: variables.$color_border,
                borderBottomWidth: 0.5,
              },
            ]}>
            <Text
              style={[
                styles.colorh1,
                styles.h3,
                {
                  fontWeight: 'bold',
                  flex: 1,
                },
              ]}>
              Resumen
            </Text>
            <View style={{flex: 4, padding: 10}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={[styles.colorh2, styles.h3, {flex: 5}]}>
                  Costo de los productos
                </Text>
                <Text style={[styles.colorh1, styles.h3, {flex: 1}]}>
                  $ {total_pedido}
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={[styles.colorh2, styles.h3, {flex: 5}]}>
                  Costo de envio
                </Text>
                <Text style={[styles.colorh1, styles.h3, {flex: 1}]}>
                  $ {tienda_seleccionada.costo_envio}
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text
                  style={[
                    styles.colorh2,
                    styles.h3,
                    {flex: 5, fontWeight: 'bold'},
                  ]}>
                  Total
                </Text>
                <Text
                  style={[
                    styles.colorh1,
                    styles.h3,
                    {flex: 1, fontWeight: 'bold'},
                  ]}>
                  $ {total_pedido + tienda_seleccionada.costo_envio}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View />
      <Footer style={{height: 60}}>
        <FooterTab
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: '5%',
            flex: 1,
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => {
              confirmarOrden();
            }}
            style={{
              flex: 1,
              height: 50,
              backgroundColor: '#f9be08',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              alignItems: 'center',
              flexDirection: 'row',
              padding: 10,
            }}>
            <Text
              style={[
                styles.colorh1,
                styles.h2,
                {
                  fontWeight: 'bold',
                  flex: 12,
                  textAlign: 'center',
                },
              ]}>
              Confirmar Pedido
            </Text>
          </TouchableOpacity>
        </FooterTab>
      </Footer>
    </View>
  );
};

export default ResumenPedido;
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
  borderBottom: {
    height: 80,
    borderBottomColor: variables.$color_border,
    borderBottomWidth: 0.5,
  },
});
