import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

class ActivityIn extends Component {
   state = { animating: true }
   
   closeActivityIndicator = () => setTimeout(() => this.setState({
   animating: false }), 500)
   componentDidMount = () => this.closeActivityIndicator()
   render() {
      const animating = this.state.animating
      return (
         <View>
            <ActivityIndicator
               animating = {animating}
               color = '#12100e'
               size = "large"
               style={{top:10}}
             />
         </View>

       
      )
   }
}
export default ActivityIn

const styles = StyleSheet.create ({

   
})