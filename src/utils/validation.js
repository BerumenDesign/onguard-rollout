const Validation = {
    IMEI: function(value) {
        return new Promise((resolve, reject) => {
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
    }
};

export default Validation;