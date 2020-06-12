/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import firebase from 'firebase';
import Rotas from './rotas';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers/index';
import ReduxThunk from 'redux-thunk';
console.disableYellowBox = true;


class App extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyCBP1oPILi-nz8sJXSalQ5-2hXCbeRO-eM",
      authDomain: "uber-bf973.firebaseapp.com",
      databaseURL: "https://uber-bf973.firebaseio.com",
      projectId: "uber-bf973",
      storageBucket: "uber-bf973.appspot.com",
      messagingSenderId: "369758478982",
      appId: "1:369758478982:web:d385ec203fa6094c87e707",
      measurementId: "G-PSMXFSHZM7"
    };
    // Initialize Firebase

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

  }


  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Rotas></Rotas>
      </Provider>
    )
  }

}

export default App;
