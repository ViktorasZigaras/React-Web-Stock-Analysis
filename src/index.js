import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app.js';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import store from "./store/index.js";

const application = <Provider store={store}><App /></Provider>;
ReactDOM.render(application, document.getElementById('container'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();