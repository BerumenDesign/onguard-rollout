const _isValidEmail = function ( email ) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test( email );
};

const _isString = function (str) {
    return typeof str === 'string';
};

const _isNumber = function (num) {
    return typeof num === 'number';
};

const _getLength = function (elm) {
    if (elm === 'undefined' || elm === null) { return 0; }
    switch (typeof elm) {
        case 'object':
            if (Array.isArray(elm)) {
                return elm.length;
            } else {
                return Object.keys(elm).length;
            }
        case 'string':
            return elm.length;
        case 'boolean':
        case 'number':
            return (elm + '').length;
        default:
            return 0;
    }
};

const _isValidRegion = function (region) {
    //temp, need to figure out regions and test the value is valid
    return true;
};

const _hasValue = function (val) {
    return val !== null && val !== undefined && val !== '';
};

const _passwordMeetsCriteria = function (password) {
    //basic test, may want to expand on this
    return password && password.length >= 8;
};

const Validation = {
    IMEI: function(value, optional) {
        return new Promise((resolve, reject) => {
            if (!_hasValue(value) && !optional) {
                reject();
            } else if (!_hasValue(value) && optional) {
                resolve();
            }
            var imei = (value + '').replace(/-/g, '');

            // validate IMEI number using the Luhn algorithm
            // https://en.wikipedia.org/wiki/Luhn_algorithm
            if (imei.length < 15) {
                reject()
            } else {
                var validationDigit = imei.substring((imei.length - 1), imei.length); //grab last digit, this is the validation digit
                var _imei = imei.substring(0, imei.length-1); //exclude the validation digit
                var _imeiArr = _imei.split('');
                //double every 2nd value in the IMEI number
                for (var i = 1; i < _imeiArr.length; i+=2) {
                    var _val = parseInt(_imeiArr[ i ]);
                    _imeiArr[ i ] = (_val * 2).toString();
                }

                //add all the numbers
                var total = 0;
                _imeiArr.join('').split('').forEach(function(val) {
                    total += parseInt(val);
                });
                //round up to nearest multiple of 10, and subtract validationDigit..should match the total
                if (((Math.ceil(total / 10) * 10) - validationDigit) === total) {
                    resolve();
                } else {
                    reject();
                }
            }
        });
    },
    email: function(value, optional) {
        return new Promise((resolve, reject) => {
            if (!_hasValue(value) && !optional) {
                reject();
            } else if (!_hasValue(value) && optional) {
                resolve();
            }

            const email = value + '';

            if (_isValidEmail(email)) {
                resolve();
            } else {
                reject();
            }
        });
    },
    name: function (value, optional) {
        return new Promise((resolve, reject) => {
            if (!_hasValue(value) && !optional) {
                reject();
            } else if (!_hasValue(value) && optional) {
                resolve();
            }

            const name = value + '';

            if (_isString(name) && _getLength(name) >= 2) {
                resolve();
            } else {
                reject();
            }
        });
    },
    phone: function (value, optional) {
        return new Promise((resolve, reject) => {
            if (!_hasValue(value) && !optional) {
                reject();
            } else if (!_hasValue(value) && optional) {
                resolve();
            }

            const phone = value + '';

            //temp likely will want to use Twilio for validating this phone number
            if (_isString(phone) && _getLength(phone) === 10) {
                resolve();
            } else {
                reject();
            }
        });
    },
    count: function (value, min, max, optional) {
        return new Promise((resolve, reject) => {
            if (!_hasValue(value) && !optional) {
                reject();
            } else if (!_hasValue(value) && optional) {
                resolve();
            }

            const count = value + 0;

            if (_isNumber(count)) {
                if (count >= min && count <= max) {
                    resolve();
                } else {
                    reject();
                }
            } else {
                reject();
            }
        });
    },
    dataCenterRegion: function (value, optional) {
        return new Promise((resolve, reject) => {
            if (!_hasValue(value) && !optional) {
                reject();
            } else if (!_hasValue(value) && optional) {
                resolve();
            }

            const region = value + '';

            if (_isString(region) && _isValidRegion(region)) {
                resolve();
            } else {
                reject();
            }
        });
    },
    password: function(value, optional) {
        return new Promise((resolve, reject) => {
            if (!_hasValue(value) && !optional) {
                reject();
            } else if (!_hasValue(value) && optional) {
                resolve();
            }

            const password = value + '';

            if (_isString(password) && _passwordMeetsCriteria(password)) {
                resolve();
            } else {
                reject();
            }
        });
    },
    streetaddress: function(value, optional) {
        //could possibly use external services to validate address
        return new Promise((resolve, reject) => {
            if (!_hasValue(value) && !optional) {
                reject();
            } else if (!_hasValue(value) && optional) {
                resolve();
            } else {
                resolve();
            }
        });
    },
    city: function(value, optional) {
        //could possibly use external services to validate address
        return new Promise((resolve, reject) => {
            if (!_hasValue(value) && !optional) {
                reject();
            } else if (!_hasValue(value) && optional) {
                resolve();
            } else {
                resolve();
            }
        });
    },
    zip: function(value, optional) {
        //could possibly use external services to validate address
        return new Promise((resolve, reject) => {
            if (!_hasValue(value) && !optional) {
                reject();
            } else if (!_hasValue(value) && optional) {
                resolve();
            } else {
                resolve();
            }
        });
    },
    country: function(value, optional) {
        //could possibly use external services to validate address
        return new Promise((resolve, reject) => {
            if (!_hasValue(value) && !optional) {
                reject();
            } else if (!_hasValue(value) && optional) {
                resolve();
            } else {
                resolve();
            }
        });
    },
    state: function(value, optional) {
        //could possibly use external services to validate address
        return new Promise((resolve, reject) => {
            if (!_hasValue(value) && !optional) {
                reject();
            } else if (!_hasValue(value) && optional) {
                resolve();
            } else {
                resolve();
            }
        });
    }
};

export default Validation;