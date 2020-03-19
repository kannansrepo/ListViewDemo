import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import Product from './component/Product';
import reducer from './component/reducer'

const client = axios.create({
  baseURL: 'http://jsonplaceholder.typicode.com',
  responseType: 'json'
});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar backgroundColor="#00BFA5" barStyle="light-content" style={styles.toolBar} />
          <Text style={styles.text}>List Demo</Text>
          < Product />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#00BFA5'
  },
  toolBar: {
    flex: 1,
    backgroundColor:'#00BFA5'
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  text: {
    marginTop: 40,
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
    padding: 10
  }
});
