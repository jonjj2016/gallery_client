import React from 'react';
import UnsplashImages from './Components/Gallery/container';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import { store } from './Modules/store';

function App() {
  return (
    <Provider store={store}>
      <UnsplashImages />
    </Provider>
  );
}

export default App;
