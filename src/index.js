import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter } from 'react-router-dom';
import i18n from './utils/i18n';

const Index = {
    initialize: function () {
        // initialize all required utils
        let _promise = [];
        
        _promise.push(i18n.initialize(i18n.getDefaultLangCode()));

        Promise.all(_promise)
            .then(function() {
                this.run();
            }.bind(this))
            .catch(function(err) {
                console.error('Index.initialize.failed', err);
            });
    },
    run: function () {
        ReactDOM.render(
            <BrowserRouter>
                <App />
            </BrowserRouter>, document.getElementById('root')
        );
    }
};

Index.initialize();

registerServiceWorker();
