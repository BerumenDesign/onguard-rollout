import firebase from './firebase';
import Errors from '../utils/errors';
import Config from '../config.json';
import 'whatwg-fetch';

let state = null;

const store = {
    validate: (phone) => {
        return new Promise((resolve, reject) => {
            fetch('/api/twilio/phone', {
                method: 'GET',
                params: {phone}
            })
                .then(res => {
                    if ( res.data && res.data.data && res.data.data.phoneNumber ) {
                        resolve({success: true, phone: res.data.data.phoneNumber});
                    } else {
                        reject({code: 'twilio/invalid-phone'})
                    }
                });
        });
    }
};

export default store;
