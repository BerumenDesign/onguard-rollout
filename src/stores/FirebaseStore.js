import firebase from './firebase';
import Errors from '../utils/errors';

let state = null;

const store = {
    initialize: () => {
        const params = {
            apiKey: 'AIzaSyDtJwhZVsgsgz0W-7VKPG593ZiOXSc8jcM',
            authDomain: 'cg-community' + '.firebaseapp.com',
            databaseURL: 'https://' + 'cg-community' + '.firebaseio.com'
        };
    
        state = new firebase(params);
    },
    makeAdmin: (params) => {
        return new Promise((resolve, reject) => {
            try {
                state.auth().createUserWithEmailAndPassword(params.email.toLowerCase(), params.password)
                .then(function(user) {
                    const id = _convertToId(params.email.toLowerCase());
                    const { firstName, lastName, phone } = params;

                    state.ref.child('/systemadmins/' + id)
                        .set({
                            emailId: params.email.toLowerCase(),
                            uid: user.uid,
                            firstName,
                            lastName,
                            phone
                        })
                        .then(function() {
                            resolve({ success: true });
                        })
                        .catch(function(err) {
                            console.error('FirebaseStore.registerAdmin.setSystemAdmin.failed', err);
                            reject({ success: false, errors: [ Errors.get(err.code) ]});
                        });
                })
                .catch(function(err) {
                    console.error('FirebaseStore.registerAdmin.createUserWithEmailAndPassword.failed', err);
                    reject({ success: false, errors: [ Errors.get(err.code) ]});
                });
            } catch (e) {
                console.error('FirebaseStore.registerAdmin.createUserWithEmailAndPassword.unexpectederror', e);
                reject({ success: false, errors: [ Errors.get(e.code) ]});
            }
        });
    },
    checkUserName: (email) => {
        return new Promise((resolve, reject) => {
            const id = _convertToId(email);
            state.ref.child('/systemusers/' + id).once('value')
                .then(function(snap) {
                    const _user = snap.val();

                    resolve({ success: true, found: _user && _user.emailId });
                })
                .catch(function(err) {
                    console.error('FirebaseService.checkUserName.failed', err);
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
}

export default store;