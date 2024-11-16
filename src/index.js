import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from './firebase/config';
import { FirebaseContext } from './Store/Context';
import Context from './Store/Context';

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase }}>
    <Context> {/* Wrap App within Context to provide AuthContext */}
      <App />
    </Context>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
