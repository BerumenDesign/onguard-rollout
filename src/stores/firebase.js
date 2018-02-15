import _firebase from 'firebase';

class FirebaseService {
    constructor({ apiKey, authDomain, databaseURL }) {
        this.apiKey = apiKey + '';
        this.authDomain = authDomain + '';
        this.databaseURL = databaseURL + '';
        
        if ( apiKey && authDomain && databaseURL ) {
            try {
                this.firebaseApp = _firebase.initializeApp({ apiKey, authDomain, databaseURL });
                this.ref = _firebase.database().ref();
                this.auth = _firebase.auth;
            } catch (e) {
                console.error('FirebaseService.initialize.failed', e);
                return e;
            }
        } else {
            throw new Error('Initialization failed, some or all required parameters are missing');
        }
    }
};

export default FirebaseService;