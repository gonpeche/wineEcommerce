import React from 'react';
import ReactDom from 'react-dom';
import Main from './containers/Main.jsx'    
import { BrowserRouter, Route } from 'react-router-dom'    
import {Provider} from 'react-redux'
import store from './store/store'

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path='/' component={Main} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);