import React from 'react';
import { enableScreens } from 'react-native-screens'
import { createStore, combineReducers } from 'redux'
import productsReducer from './store/reducers/products'
import { Provider } from 'react-redux';
import Navigator from './navigation/navigator'

enableScreens();

const rootReducer = combineReducers({
  products: productsReducer
});
const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
