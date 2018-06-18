import firebase from '../utils/firebase';
import Config from '../config.json';

let state = null;

const store = {
    initialize: () => {
        const params = {
            apiKey: Config.lookupFirebaseApiKey,
            authDomain: Config.lookupFirebaseId + '.firebaseapp.com',
            databaseURL: 'https://' + Config.lookupFirebaseId + '.firebaseio.com',
            name: 'Lookup'
        };

        state = new firebase(params);
    },
    checkUserName: (email) => {
        return new Promise((resolve, reject) => {
            const id = _convertToId(email);
            state.ref.child('/invitations/').once('value')
                .then(function(snap) {
                    // const _user = snap.val();

                    resolve({ success: true, found: snap.val() });
                })
                .catch(function(err) {
                    console.error('LookupStore.checkUserName.failed', err);
                    reject(err);
                });
        });
    }
};

function _convertToId (name) {
    name = name.toLowerCase(); //returns new, doesn't change the original
    name = name.trim();

    name = name.replace(/\_/g,'__');
    name = name.replace(/\./g,'_');
    name = name.replace(/\#/g,'_');
    name = name.replace(/\@/g,'_');
    name = name.replace(/\$/g,'_');
    name = name.replace(/\//g,'_');
    name = name.replace(/\[/g,'_');
    name = name.replace(/\]/g,'_');
    name = name.replace(/\s/g,'_');

    /**
     * String firebasePath = email.replace("_", "__");
     firebasePath = firebasePath.replace('@', '_');
        firebasePath = firebasePath.replace('.', '_');
        firebasePath = firebasePath.replace('$', '_');
        firebasePath = firebasePath.replace('#', '_');
        */

    //TODO as per Will lets use the function below, must implement punycode first
    // self.makeUserId = function (email) {
    //     return email.toLowerCase().replace(/[^a-z0-9-]+/g, '_');
    // };

    return name;
};

export default store;
