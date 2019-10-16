import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './store';

import {Provider} from 'react-redux';

class Root extends React.Component {
    render(){
        return(
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        );
    }
}

export default Root;
