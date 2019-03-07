import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import {StripeProvider} from 'react-stripe-elements';
import './index.css';
import { store, persistor } from './store';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/*<StripeProvider apiKey='pk_test_feHScO25l9pXUPP5opXgkoKY'>*/}
        <App />
      {/*</StripeProvider>*/}
    </PersistGate>
  </Provider>, document.getElementById('root'));
// registerServiceWorker();
