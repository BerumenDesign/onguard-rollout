const _errorCodes = {
    'auth/email-already-in-use': {
        type: 'validation',
        source: 'Firebase',
        field: 'email',
        message: 'a user with this email address already exists'
    },
    'auth/invalid-email': {
        type: 'validation',
        source: 'Firebase',
        field: 'email',
        message: 'You must enter a valid Email address'
    },
    'auth/operation-not-allowed': {
        type: 'uncaught',
        source: 'Firebase',
        message: 'Unable to register user'
    },
    'auth/weak-password': {
        type: 'validation',
        source: 'Firebase',
        field: 'password',
        message: 'Password must be at least 8 characters'
    },
    'uncaughtexception': {
        type: 'uncaught',
        title: 'Unexpected error',
        message: 'An Unexpected Error has occurred'
    }
};

const Errors = {
    get: (code) => {
        return _errorCodes[code] || _errorCodes['uncaughtexception'];
    }
};

export default Errors;