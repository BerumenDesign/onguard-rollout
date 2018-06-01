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
                        // deferred.resolve( { success: true, phone: res.data.data.phoneNumber } );
                        // $scope.submit();
                    } else {
                        // console.error( '$makeUser.verify.response.no.phoneNumber', res );
                        // $scope.error = 'Failed to verify phone number';
                        reject({ errors:[{success: false, type: 'validation', field: 'phone', message: 'Invalid phone number'}]});
                    }
                });
        });
    }
};

export default store;
