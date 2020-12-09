import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';
import {Thumbnail} from 'native-base';

import HeaderBack from '../components/HeaderBack';
import ProductContext from '../context/productContext/ProductContext';
import TiendaListItem from '../components/TiendasListItem';
import variables from '../styles/variables';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';
import {PulseIndicator} from 'react-native-indicators';
import {StatusBarHeight} from '../functions/StatusBarHeight';
function ListaTiendas({navigation}) {
  const headerHeight = Number.parseInt(StatusBarHeight);
  const [isModalVisible, setModalVisible] = useState(false);
  const [opcion, setOpcion] = useState(true);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroCategoria2, setFiltroCategoria2] = useState('');

  const {
    tiendas,
    obtenerTiendasTipo,
    error,
    TiendasPorCategorias,
    unsuscribeTiendas,
    obtenerCategoriasTiendas,
    unsuscribeCategorias,
    categorias,
    longitudArray
  } = useContext(ProductContext);

  useEffect(() => {
    obtenerTiendasTipo();
    return () => unsuscribeTiendas();
  }, []);

  const unsuscribeTienda = () => {
    unsuscribeTiendas();
    
      obtenerTiendasTipo();
   
  };
  const mostrarActivityIndicator = () => {
    if (longitudArray===0||tiendas.length<1) {
        return <PulseIndicator  count={5} size={50} color={variables.$color_principal} />
    }
    else return null
  };

  const mensajeTiendasVacias=()=>{
  setTimeout(() => {
    setOpcion(false);
  }, 1000);
      if(tiendas.length===0){
        return(
          <Text>
            No se encontraron resultados!
          </Text>
        )
      }
      else{
        return null
      }
    

  }
  const modalVisible = opcion => {
    setModalVisible(opcion);
  };

  const categoriaItem = () => {
    return (
      <View key={id} style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 3}}>
          <Thumbnail
            square
            source={{uri: item.img}}
            style={{width: '90%', height: '100%', borderRadius: 10}}
          />
        </View>
        <View>
          <Text />
        </View>
      </View>
    );
  };

  const mostrarFiltroCategoria = () => {
    if (filtroCategoria !== '') {
      return (
        <Animatable.View
          animation="bounceInRight"
          duraton="1500"
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              backgroundColor: '#7F00FF',
              color: '#fff',
              borderRadius: 20,
              width: '40%',
              height: 30,
              padding: 5,
              textAlign: 'center',
            }}>
            {filtroCategoria}
          </Text>
          <Text
            onPress={() => {
              setFiltroCategoria('');
              unsuscribeTienda();
            }}
            style={{
              borderColor: '#E50A3F',
              borderWidth: 1,
              color: '#E50A3F',
              borderRadius: 20,
              width: '20%',
              height: 30,
              padding: 5,
              textAlign: 'center',
            }}>
            Borrar
          </Text>
        </Animatable.View>
      );
    } else {
      return null;
    }
  };

  const mostrarFiltroCategoria2 = () => {
    if (filtroCategoria2 !== '') {
      return (
        <Animatable.View
          animation="bounceInRight"
          duraton="1500"
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 5,
          }}>
          <Text
            style={{
              backgroundColor: '#7F00FF',
              color: '#fff',
              borderRadius: 20,
              width: '40%',
              height: 30,
              padding: 5,
              textAlign: 'center',
            }}>
            {filtroCategoria2}
          </Text>
          <Text
            onPress={() => {
              setFiltroCategoria2('');
              unsuscribeTienda();
            }}
            style={{
              borderColor: '#E50A3F',
              borderWidth: 1,
              color: '#E50A3F',
              borderRadius: 20,
              width: '20%',
              height: 30,
              padding: 5,
              textAlign: 'center',
            }}>
            Borrar
          </Text>
        </Animatable.View>
      );
    } else {
      return null;
    }
  };

  const mostrarModal = () => {
    return (
      <View>
        <Modal
          isVisible={isModalVisible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          animationInTiming={100}
          animationOutTiming={100}
          onBackButtonPress={() => {
            modalVisible(false);
          }}
          swipeDirection="down"
          backdropOpacity={0.5}>
          <View
            style={{
              height: 600,
              backgroundColor: '#eee',
              width: '100%',
              left: 0,
              right: 0,
              padding: 5,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <View
              style={{
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome
                onPress={() => {
                  modalVisible(false);
                  setFiltroCategoria('');
                }}
                name="times-circle"
                color={variables.$color_principal}
                size={30}
              />
            </View>

            {mostrarFiltroCategoria()}
            {mostrarFiltroCategoria2()}
            <View style={{height: 125, width: '40%'}}>
              <Text style={[styles.h3, styles.colorh1, {fontWeight: 'bold'}]}>
                Ordenar Por:
              </Text>
              <Text
                style={[styles.textFiltro, styles.h3, styles.colorh2]}
                onPress={() => {
                  setFiltroCategoria2('Calificacion');
                }}>
                Más Calificado
              </Text>
              <Text
                style={[styles.textFiltro]}
                onPress={() => {
                  setFiltroCategoria2('Tiempo Entrega');
                }}>
                Tiempo de Entrega
              </Text>
              <Text
                style={[styles.textFiltro]}
                onPress={() => {
                  setFiltroCategoria2('Precio Envío');
                }}>
                Precio de Envío
              </Text>
            </View>
            <Text
              style={[
                {height: 40, top: 20, fontWeight: 'bold'},
                styles.h3,
                styles.colorh1,
              ]}>
              Categorías
            </Text>

            <FlatList
              style={{top: 20}}
              data={categorias}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    setFiltroCategoria(item.description);
                  }}
                  style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Thumbnail
                      source={{uri: item.img}}
                      style={{width: 60, height: 60, borderRadius: 50}}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={[styles.h3, styles.colorh2]}>
                      {item.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
            <View
              style={{
                paddingVertical: 10,
                height: 50,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                onPress={() => {
                  unsuscribeTiendas();
                  TiendasPorCategorias(filtroCategoria, filtroCategoria2);
                  mostrarActivityIndicator();
                  modalVisible(false);

                  unsuscribeCategorias();
                }}
                style={[
                  styles.h3,
                  {
                    textAlign: 'center',
                    padding: 10,
                    color: variables.$colorblanco,
                    width: '50%',
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: variables.$color_principal,
                  },
                ]}>
                Aplicar
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  if (error) {
    return (
      <View style={[styles.container]}>
        <StatusBar
          backgroundColor="rgba(18, 16, 14, 0.0)"
          barStyle="dark-content"
          translucent
        />
        <View
          style={{
            height: 50,
            borderBottomColor: variables.$color_border,
            marginTop: headerHeight,
            borderBottomWidth: 0.8,
          }}>
          <View style={[{flexDirection: 'row'}]}>
            <TouchableOpacity
              style={[{flex: 3, top: 10}]}
              onPress={() => {
                unsuscribeTiendas();
                navigation.goBack();
              }}>
              <FontAwesome
                style={styles.caret_down}
                name="arrow-circle-left"
                color={variables.$color4_text_header}
                size={30}
              />
            </TouchableOpacity>
            <Text
              style={[{flex: 5, fontSize: 18, justifyContent: 'flex-start'}]}>
              Error
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 30,
            flex: 11,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          Hubo un error no se puede conectar al sistema
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="rgba(18, 16, 14, 0.0)"
        barStyle="dark-content"
        translucent
      />
      {mostrarModal()}

      <View
        style={{
          height: 70,
          marginTop: headerHeight,
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: variables.$color_border,
          borderBottomWidth: 0.8,
        }}>
        <TouchableOpacity
          style={[{flex: 3}]}
          onPress={() => {
            navigation.goBack();
          }}>
          <FontAwesome
            style={styles.caret_down}
            name="arrow-circle-left"
            color={variables.$color4_text_header}
            size={35}
          />
        </TouchableOpacity>
        <Text style={[{flex: 5, fontSize: 18, justifyContent: 'flex-start'}]}>
          Restaurantes
        </Text>
      </View>

      <View style={[styles.action_busqueda]}>
        <FontAwesome name="search" color="#fff" size={20} />
        <TouchableOpacity
          style={{flex: 4}}
          onPress={() => navigation.navigate('Buscar')}>
          <Text
            style={[
              styles.h3,
              {
                color: variables.$colorblanco,
                fontWeight: 'bold',
                textAlign: 'center',
              },
            ]}>
            Buscar Tienda o Producto
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        {mostrarFiltroCategoria()}
        {mostrarFiltroCategoria2()}
        <View style={{height: 125, flexDirection: 'row', paddingVertical: 20}}>
          <TouchableOpacity
            onPress={() => {
              modalVisible(true);
              obtenerCategoriasTiendas();
            }}
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <FontAwesome
              style={styles.caret_down}
              name="cogs"
              color={variables.$color4_text_header}
              size={40}
            />
            <Text
              style={[
                {textAlign: 'center', top: 10, fontWeight: 'bold'},
                styles.h3,
                styles.colorh1,
              ]}>
              Todo{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              unsuscribeTiendas();
              TiendasPorCategorias('Pizza', filtroCategoria2);
              setFiltroCategoria('Pizza');
              mostrarActivityIndicator();
            }}
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri:
                  'https://assets.stickpng.com/images/580b57fcd9996e24bc43c1e1.png',
              }}
              style={[styles.imgCategorias]}
            />
            <Text style={[{textAlign: 'center'}, styles.h3, styles.colorh2]}>
              Pizza
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              unsuscribeTiendas();
              TiendasPorCategorias('Hamburguesa', filtroCategoria2);
              setFiltroCategoria('Hamburguesa');
            }}
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Image
              style={[styles.imgCategorias]}
              source={{
                uri:
                  'https://www.saborusa.com/wp-content/uploads/2019/10/67.-Hamburguesa-de-carne.png',
              }}
            />
            <Text style={[{textAlign: 'center'}, styles.h3, styles.colorh2]}>
              Hamburguesa
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              unsuscribeTiendas();
              TiendasPorCategorias('Pollo', filtroCategoria2);
              setFiltroCategoria('Pollo');
            }}
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Image
              style={[styles.imgCategorias]}
              source={{
                uri:
                  'https://cdn.queapetito.com/wp-content/uploads/2019/06/pollo-frito-crujiente-al-estilo-americano-600x469.jpg',
              }}
            />
            <Text style={[{textAlign: 'center'}, styles.h3, styles.colorh2]}>
              Pollo
            </Text>
          </TouchableOpacity>
        </View>
        {mostrarActivityIndicator(true)}
        {mensajeTiendasVacias()}
        {tiendas.map(tiendaitem => (
          <View key={tiendaitem._id} style={{height: 200}}>
            <TiendaListItem navigation={navigation} tienda={tiendaitem} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default ListaTiendas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '2.5%',
  },
  action_busqueda: {
    flexDirection: 'row',
    height: 40,
    padding: 10,
    marginVertical: 20,
    borderRadius: 20,
    backgroundColor: variables.$color2principal,
  },
  textSign: {
    fontWeight: 'bold',
    left: 30,
    fontSize: 15,
  },
  imgCategorias: {
    height: 60,
    width: 60,
    borderRadius: 50,
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
  textFiltro: {
    height: 30,
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 30,
    marginVertical: 5,
    textAlign: 'center',
  },
});
