import 'whatwg-fetch';
import yaml from 'js-yaml';
import Mustache from 'mustache';

let state = {};
let DEFAULT_LANG = 'en-us';
let LANG = 'en-us';

const i18n = {
    initialize: (code) => {
        return new Promise((resolve, reject) => {
            if (!code) {
                reject({ success: false, error: 'error_load_lang_file_code_undefined' });
            } else {
                try {
                    fetch(process.env.PUBLIC_URL + `/i18n/${code}/${code}.yaml`)
                    .then(function(res) {
                        return res.text();
                    })
                    .then(function(res) {
                        state = yaml.safeLoad(res);
                        console.log('i18n.initialized', state);
                        resolve();
                    })
                    .catch(function(err) {
                        console.error('i18n.initialize.get.yaml.' + code + '.failed', err);
                        reject(err);
                    });
                } catch (e) {
                    reject(e);
                }
            }
        });
    },
    getDefaultLangCode: () => {
        return DEFAULT_LANG + '';
    },
    getLangCode: () => {
        return LANG = '';
    },
    setLangCode: (code) => {
        LANG = code;
    },
    string: (key, params) => {
        // console.log('i18n.string', key, params, ' state: ', state);
        return state[key] ? Mustache.render(state[key], params || {}) : key;
    }
};

export default i18n;
