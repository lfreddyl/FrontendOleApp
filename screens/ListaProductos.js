import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  StatusBar,
  Image
} from 'react-native';
import {Separator, List, ListItem, Thumbnail, Text, Body} from 'native-base';
import ProductContext from '../context/productContext/ProductContext';
import PedidoContext from '../context/pedidoContext/PedidoContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SearchBar} from 'react-native-elements';
import variables from '../styles/variables';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {Footer, FooterTab} from 'native-base';
import {PulseIndicator} from 'react-native-indicators';

import {StatusBarHeight} from '../functions/StatusBarHeight';

const ListaProductos = ({navigation}) => {
  const headerHeight = Number.parseInt(StatusBarHeight);

  const {
    products,
    tienda_seleccionada,
    obtenerProductosTiendas,
    unsuscribeProductosTiendas,
    longitudArray,
    longitudArrayOferta,
    obtenerProductosByOferta,
    productsOferta,
    unsuscribeProductosByOferta
  } = useContext(ProductContext);

  const {pedido, seleccionarProducto} = useContext(PedidoContext);

  useEffect(() => {
    obtenerProductosByOferta();
    obtenerProductosTiendas('5fa04304e7b035f33c083b6a');
    

    console.log(longitudArrayOferta);
    return () => {unsuscribeProductosTiendas();unsuscribeProductosByOferta()}
  }, []);

  const mostrarActivityIndicator = () => {
    if (longitudArray === 0 || products.length < 1) {
      return (
        <PulseIndicator
          count={5}
          size={50}
          color={variables.$color_principal}
        />
      );
    } else return null;
  };

  const mostrarProductosByOferta = () => {
    if (longitudArrayOferta!== 0) {
      return (
        <View style={{height: 180, paddingHorizontal: '2.5%', paddingVertical: 20}}>
          <Text style={[styles.h3,{fontWeight:'bold',padding:5,bottom:5,backgroundColor:variables.$color_botones,width:'100%',height:30,borderRadius:20,textAlign:'center'}]}>Promociones</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
           >
          
              {productsOferta.map((product, i) => (
                <View key={product._id}>
                 
                    <TouchableOpacity
                      onPress={() => {
                        seleccionarProducto(product);
                        navigation.navigate('FormularioPlatillo');
                      }}
                      style={{
                        width:100,
                       
                      }}>
                      <View style={{height:90}}>
                        <Image
                          source={{uri: product.picture}}
                          style={{
                            width: 80,
                            height: 80,
                            borderRadius: 10,
                          }}
                        />
                        
                      </View>
                      <View style={{flex:1}}>
                      <Text
                          style={[
                            styles.colorh1,
                            styles.h3,
                            {fontWeight: 'bold'},
                          ]}>
                          {product.titulo}
                        </Text>
                      </View>
                      
                    </TouchableOpacity>
                </View>
              ))}
            
          </ScrollView>
        </View>
      );
    } else return null;
  };
  const mostrarHeading = (categoria, i) => {
    if (i > 0) {
      const categoriaAnterior = products[i - 1].type;
      if (categoriaAnterior !== categoria) {
        return (
          <Separator style={{backgroundColor: variables.$color_principal}}>
            <Text style={[styles.h2, {fontWeight: 'bold', color: '#fff'}]}>
              {categoria}
            </Text>
          </Separator>
        );
      }
    } else {
      return (
        <Separator style={{backgroundColor: variables.$color_principal}}>
          <Text
            style={[
              styles.colorh1,
              styles.h2,
              {fontWeight: 'bold', color: '#fff'},
            ]}>
            {categoria}
          </Text>
        </Separator>
      );
    }
  };

  const MostrarCarrito = () => {
    if (pedido.length > 0) {
      return (
        <Footer style={{height: 60}}>
          <FooterTab
            style={{
              backgroundColor: '#fff',
              paddingHorizontal: '5%',
              flex: 1,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ResumenPedido')}
              style={{
                flex: 1,
                height: 40,
                backgroundColor: variables.$color_secundario,
                borderRadius: 20,

                alignItems: 'center',
                flexDirection: 'row',
                padding: 10,
              }}>
              <View
                style={{
                  flex: 1,
                }}>
                <FontAwesome
                  name="shopping-cart"
                  color={variables.$colorblanco}
                  size={25}
                />
              </View>
              <Text
                style={[
                  styles.h3,
                  {
                    fontWeight: 'bold',
                    flex: 8,
                    textAlign: 'center',
                    color: variables.$colorblanco,
                  },
                ]}>
                Revisa tu Pedido
              </Text>
            </TouchableOpacity>
          </FooterTab>
        </Footer>
      );
    }
  };
  const mostrarDescuento = descuento => {
    if (descuento > 0) {
      return (
        <Text
          style={[
            styles.h3,
            {
              width: '20%',
              fontWeight: 'bold',
              color: '#fff',
              backgroundColor: '#7F00FF',
              borderRadius: 10,
              textAlign: 'center',
              padding: 1,
            },
          ]}>
          {descuento}%
        </Text>
      );
    } else return null;
  };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="rgba(18, 16, 14, 0.0)"
        translucent
        barStyle="light-content"
      />

      <ImageBackground
        source={{uri: tienda_seleccionada.picture}}
        style={{
          height: 150,
          width: '100%',
        }}>
        <View
          style={{
            height: 70,
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: '2.5%',
            marginTop: headerHeight,
          }}>
          <TouchableOpacity
            style={[{flex: 1}]}
            onPress={() => navigation.goBack()}>
            <FontAwesome
              style={styles.caret_down}
              name="arrow-circle-left"
              color="#eee"
              size={35}
            />
          </TouchableOpacity>
          <View style={{flex: 10}}>
            <SearchBar
              placeholder="Buscar"
              round={true}
              containerStyle={{
                backgroundColor: 'rgba(18, 16, 14, 0.0)',
                borderTopWidth: 0,
                borderBottomWidth: 0,
              }}
            />
          </View>
        </View>
      </ImageBackground>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: 100,
            paddingHorizontal: '2.5%',
            backgroundColor: variables.$color_principal,
            paddingTop: 15,
            marginTop: 10,
            borderRadius: 20,
            alignSelf: 'center',
            justifyContent: 'space-between',
            width: '95%',
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text
              style={[
                {flex: 8, fontWeight: 'bold', color: variables.$colorblanco},

                styles.h2,
              ]}>
              {tienda_seleccionada.description}
            </Text>
            <Text
              style={[
                {
                  flex: 1,
                  fontWeight: 'bold',
                  textAlign: 'right',
                  color: variables.$colorblanco,
                },

                styles.h2,
              ]}>
              {tienda_seleccionada.rating}{' '}
            </Text>
            <FontAwesome
              style={{flex: 1}}
              name="star"
              color="#FA8856"
              size={20}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={[{flex: 5, color: variables.$colorblanco}, styles.h3]}>
              {tienda_seleccionada.address}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <Text
              style={[
                {
                  color: variables.$colorblanco,
                  width: '50%',
                },

                styles.h3,
              ]}>
              <Text
                style={[
                  styles.h3,
                  {fontWeight: 'bold', color: variables.$colorblanco},
                ]}>
                Envío:{' '}
              </Text>
              $ {tienda_seleccionada.costo_envio}
            </Text>
            <Text
              style={[
                {
                  color: variables.$colorblanco,
                  textAlign: 'right',
                  width: '50%',
                },

                styles.h3,
              ]}>
              <Text
                style={[
                  styles.h3,
                  {fontWeight: 'bold', color: variables.$colorblanco},
                ]}>
                Entrega:{' '}
              </Text>
              {tienda_seleccionada.delivery_time} min
            </Text>
          </View>
          <View style={{flex: 1}} />
        </View>
        {mostrarProductosByOferta()}

        <List style={{top: 5}}>
          {products.map((product, i) => (
            <View key={product._id}>
              {mostrarHeading(product.type, i)}
              <ListItem style={{height: 150}}>
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
                  <View style={{flex: 3}}>
                    <Thumbnail
                      square
                      source={{uri: product.picture}}
                      style={{width: '90%', height: '100%', borderRadius: 10}}
                    />
                  </View>
                  <Body
                    style={{
                      flex: 5,
                      justifyContent: 'center',
                      alignContent: 'center',
                    }}>
                    {mostrarDescuento(product.off)}
                    <Text
                      style={[styles.colorh1, styles.h2, {fontWeight: 'bold'}]}>
                      {product.titulo}
                    </Text>
                    <Text style={[styles.colorh2, styles.h3]} numberOfLines={2}>
                      {product.description}
                    </Text>
                    <View
                      style={{
                        top: 15,
                        flex: 1,
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={[
                          styles.colorh1,
                          styles.h2,
                          {fontWeight: 'bold', flex: 1},
                        ]}>
                        $ {product.price}
                      </Text>
                      <TouchableHighlight>
                        <Text
                          style={{
                            backgroundColor: variables.$color_secundario,
                            color: variables.$colorTextoBlanco,
                            borderRadius: 20,
                            width: '100%',
                            textAlign: 'center',
                            padding: 2,
                            height: 30,
                            fontSize: 14,
                            color: variables.$colorblanco,
                          }}
                          onPress={() => {
                            seleccionarProducto(product);
                            navigation.navigate('FormularioPlatillo');
                          }}>
                          Agregar
                        </Text>
                      </TouchableHighlight>
                    </View>
                  </Body>
                </TouchableOpacity>
              </ListItem>
            </View>
          ))}
        </List>
      </ScrollView>
      {MostrarCarrito()}
    </View>
  );
};

export default ListaProductos;

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
    fontSize: 16,
  },
  h3: {
    fontSize: 14,
  },

  colorh2: {
    color: variables.$color_h2,
  },
});
