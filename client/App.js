import React from 'react';
import env from './config/env.config';
import * as firebase from 'firebase';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './store/reducers';
import { Provider } from 'react-redux';


import RootNavigation from './navigation/RootNavigation';

const store = createStore(reducers, applyMiddleware(thunk));

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.AUTH_DOMAIN,
  databaseURL: env.DATABASE_URL,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID,
};

if (!firebase.apps.length) {
  try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    //TODO manage error
    console.error('Firebase initialization error raised', err.stack); // eslint-disable-line no-console
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;

