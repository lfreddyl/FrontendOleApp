import React from 'react'

// Import react-native components
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native'

// Import react-native-vector-icons
// from "https://github.com/oblador/react-native-vector-icons"
import Icon from 'react-native-vector-icons/FontAwesome5'

// Import react-native-reanimated
// from "https://github.com/software-mansion/react-native-reanimated"
import Animated, { Easing } from 'react-native-reanimated'
const { Value, timing } = Animated

// Calculate window size
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

// Declare component 
class OleSearchBar extends React.Component {
  
  constructor(props){
    super(props)

    // state
    this.state = {
      isFocused: false,
      keyword: ''
    }

    // animation values
    this._input_box_translate_x = new Value(width)
    this._back_button_opacity = new Value(0)
    this._content_translate_y = new Value(height)
    this._content_opacity = new Value(0)
  }

  _onFocus = () => {
    // update state
    this.setState({isFocused: true})
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }
    const back_button_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease)
    }

    // content
    const content_translate_y_config = {
      duration: 0,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }
    const content_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease)
    }

    // run animation
    timing(this._input_box_translate_x, input_box_translate_x_config).start()
    timing(this._back_button_opacity, back_button_opacity_config).start()
    timing(this._content_translate_y, content_translate_y_config).start()
    timing(this._content_opacity, content_opacity_config).start()

    // force focus
    this.refs.input.focus()

  }

  _onBlur = () => {
    // update state
    this.setState({isFocused: false})
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 200,
      toValue: width,
      easing: Easing.inOut(Easing.ease)
    }
    const back_button_opacity_config = {
      duration: 50,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }

    // content
    const content_translate_y_config = {
      duration: 0,
      toValue: height,
      easing: Easing.inOut(Easing.ease)
    }
    const content_opacity_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }

    // run animation
    timing(this._input_box_translate_x, input_box_translate_x_config).start()
    timing(this._back_button_opacity, back_button_opacity_config).start()
    timing(this._content_translate_y, content_translate_y_config).start()
    timing(this._content_opacity, content_opacity_config).start()

    // force blur
    this.refs.input.blur();

  }
  
  render(){
    return (
      <>
        <SafeAreaView style={styles.header_safe_area}>
          <View style={styles.header}>
            <View style={styles.header_inner}>
              <View>
                <Image 
                  source={{uri:'data:image/jpeg;base64,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'}} 
                  style={{width: 152, height: 30}}
                />
              </View>
              <TouchableHighlight
                activeOpacity={1}
                underlayColor={"#ccd0d5"}
                onPress={this._onFocus}
                style={styles.search_icon_box}
              >
                <Icon name="search" size={22} color="#000000" />
              </TouchableHighlight>
              <Animated.View
                style={[ styles.input_box, {transform: [{translateX: this._input_box_translate_x}] } ]}
              >
                <Animated.View style={{opacity: this._back_button_opacity}}>
                  <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={"#ccd0d5"}
                    onPress={this._onBlur}
                    style={styles.back_icon_box}
                  >
                    <Icon name="chevron-left" size={22} color="#000000" />
                  </TouchableHighlight>
                </Animated.View>
                <TextInput 
                  ref="input"
                  placeholder="Search Facebook"
                  clearButtonMode="always"
                  value={this.state.keyword}
                  onChangeText={(value) => this.setState({keyword: value}) }
                  style={styles.input}
                />
              </Animated.View>
            </View>
          </View>
        </SafeAreaView>

        <Animated.View style={[styles.content, { opacity: this._content_opacity, transform: [{translateY: this._content_translate_y }] }]}>
          <SafeAreaView style={styles.content_safe_area}>
            <View style={styles.content_inner}>
              <View style={styles.separator} />
              {
                this.state.keyword === ''
                ?
                  <View style={styles.image_placeholder_container}>
                 
                    <Text style={styles.image_placeholder_text}>
                      Enter a few words{"\n"}
                      to search on Facebook
                    </Text>
                  </View>
                :
                  <ScrollView>
                    <View style={styles.search_item}>
                      <Icon style={styles.item_icon} name="search" size={16} color="#cccccc" />
                      <Text>Fake result 1</Text>
                    </View>
                    <View style={styles.search_item}>
                      <Icon style={styles.item_icon} name="search" size={16} color="#cccccc" />
                      <Text>Fake result 2</Text>
                    </View>
                    <View style={styles.search_item}>
                      <Icon style={styles.item_icon} name="search" size={16} color="#cccccc" />
                      <Text>Fake result 3</Text>
                    </View>
                    <View style={styles.search_item}>
                      <Icon style={styles.item_icon} name="search" size={16} color="#cccccc" />
                      <Text>Fake result 4</Text>
                    </View>
                    <View style={styles.search_item}>
                      <Icon style={styles.item_icon} name="search" size={16} color="#cccccc" />
                      <Text>Fake result 5</Text>
                    </View>
                  </ScrollView>
              }
            </View>
          </SafeAreaView>
        </Animated.View>
      </>
    )
  }
}

export default OleSearchBar

const styles = StyleSheet.create({
  header_safe_area: {
    zIndex: 1000
  },
  header: {
    height: 50,
    paddingHorizontal: 16
  },
  header_inner: {
    flex:1,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative'
  },
  search_icon_box: {
    width:40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#e4e6eb',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input_box: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top:0,
    left:0,
    backgroundColor: 'white',
    width: width - 32
  },
  back_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#e4e6eb',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15
  },
  content: {
    width: width,
    height: height,
    position:'absolute',
    left: 0,
    bottom: 0,
    zIndex: 999
  },
  content_safe_area: {
    flex: 1,
    backgroundColor: 'white'
  },
  content_inner: {
    flex: 1,
    paddingTop: 50
  },
  separator: {
    marginTop: 5,
    height: 1,
    backgroundColor: '#e6e4eb'
  },
  image_placeholder_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '-50%'
  },
  image_placeholder: {
    width: 150,
    height: 113,
    alignSelf: 'center'
  },
  image_placeholder_text: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 5
  },
  search_item: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e4eb',
    marginLeft: 16
  },
  item_icon: {
    marginRight: 15
  }
})
