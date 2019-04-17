import 'whatwg-fetch';

const store = {
    validate: (phone) => {
        return new Promise((resolve, reject) => {
            console.log('twilio.validate', phone);
            fetch(`/api/twilio/phone?phone=${phone}`, {
                method: 'GET'
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
