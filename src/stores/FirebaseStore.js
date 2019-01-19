import firebase from '../utils/firebase';
import Errors from '../utils/errors';
import Config from '../config.json';
import Twilio from '../stores/twilio';

const database = {};

const store = {
    initialize() {
        const params = {
            apiKey: Config.firebaseApiKey,
            authDomain: Config.firebaseId + '.firebaseapp.com',
            databaseURL: 'https://' + Config.firebaseId + '.firebaseio.com'
        };

      database.state = new firebase(params);
    },
    makeAdmin(params) {
        return new Promise((resolve, reject) => {
            try {
                database.state.auth().createUserWithEmailAndPassword(params.email.toLowerCase(), params.password)
                    .then(function(user) {
                        const id = _convertToId(params.email.toLowerCase());
                        const { firstName, lastName, phone, shard } = params;

                        const companies = {};

                        // companies[params.company.id] = {
                        //   canDeleteUsers: false,
                        //   companyName: params.company.name,
                        //   id: params.company.id
                        // };

                        const fullNameLower = firstName.toLowerCase() + ' ' + lastName.toLowerCase();

                        // TODO figure out if we need to pass in SHARD
                        database.state.ref.child('/ercadmins/' + id)
                            .set({
                                adminId: params.email.toLowerCase(),
                                admin: true,
                                uid: user.uid,
                                firstName,
                                lastName,
                                fullNameLower,
                                phone,
                                companies,
                                // shard
                            })
                            .then(function() {
                                resolve({ success: true });
                            })
                            .catch(function(err) {
                                console.error('FirebaseStore.makeAdmin.setErcAdmin.failed', err);
                                reject({ success: false, errors: [ Errors.get(err.code) ]});
                            });
                    })
                    .catch(function(err) {
                        console.error('FirebaseStore.makeAdmin.createUserWithEmailAndPassword.failed', err);
                        reject({ success: false, errors: [ Errors.get(err.code) ]});
                    });
            } catch (e) {
                console.error('FirebaseStore.makeAdmin.createUserWithEmailAndPassword.unexpectederror', e);
                reject({ success: false, errors: [ Errors.get(e.code) ]});
            }
        });
    },
    makeCompany(params) {
        // on hold for now
        return new Promise((resolve, reject) => {
            try {
                const id = _convertToId(params.name);
                database.state.ref.child('/companies/' + id)
            } catch (e) {
                console.error('FirebaseStore.makeCompany.set.company.unexpectederror', e);
                reject({ success: false, errors: [ Errors.get(e.code) ]});
            }
        });
    },
    getCompanyDetails(id) {
      return new Promise((resolve, reject) => {
        try {
          database.state.ref.child('/companiesdetails/' + id)
            .once('value')
            .then(snap => {
                let company = snap.val();

                if (company) {
                    if (!company.address || typeof company.address === 'string') {
                      company.address = {}
                    }

                    let { city, country, postal, provstate } = company;

                    company.address = {
                      city,
                      zip: postal,
                      country,
                      state: provstate
                    };

                    resolve({success: true, company});
                } else {
                  reject({ success: false, errors: [ Errors.get('uncaughtexception') ]});
                }
            })
        } catch (e) {
          console.error('FirebaseStore.getCompanyDetails.unexpectederror', e);
          reject({ success: false, errors: [ Errors.get(e.code) ]});
        }
      });
    },
    updateCompany(company) {
      return new Promise((resolve, reject) => {
        try {
          let { email, sameAsCompanyAddress } = company;
          let { city, country, zip, state, address } = company.address;

          if (!email) {
            email = null;
          }

          let data = {
            companyName: company.name,
            phone: company.phone,
            email,
            streetAddress: address,
            city,
            postal: zip,
            country,
            provstate: state
          };

          if (sameAsCompanyAddress) {
            data.billing = { city, country, zip, state, address }
          }

          database.state.ref.child('/companiesdetails/' + company.id)
            .update(data)
            .then(() => {
              resolve({success: true});
            })
        } catch (e) {
          console.error('FirebaseStore.updateCompany.error', e);
          reject({ success: false, errors: [ Errors.get(e.code) ]});
        }
      })
    },
    checkUserName(email) {
        return new Promise((resolve, reject) => {
            const id = _convertToId(email);
            database.state.ref.child('/systemusers/' + id).once('value')
                .then(function(snap) {
                    const _user = snap.val();

                    resolve({ success: true, found: _user && _user.emailId });
                })
                .catch(function(err) {
                    console.error('FirebaseService.checkUserName.failed', err);
                    reject(err);
                });
        });
    },
    checkAuthority(imei, invoice) {
        return new Promise((resolve, reject) => {
            try{
                database.state.ref.child('/invoices/' + invoice)
                    .once('value')
                    .then(function(snap) {
                        let details = snap.val()
                        if (details) {
                            if (details.firstImei && details.firstImei.toString() === imei.toString()) {
                              resolve({ success: true, invoice: details });
                            } else {
                                reject({ success: false, errors: [ Errors.get('check-auth/imei-not-found') ]});
                            }
                        } else {
                            // TODO maybe merge the two errors into one, since we can query both invoice# and imei in 1 check
                            reject({ success: false, errors: [ Errors.get('check-auth/invoice-not-found') ]});
                        }
                    })
                    .catch(function(err) {
                        console.error('FirebaseStore.checkAuthority.failed', err);
                        reject({ success: false, errors: [ Errors.get(err.code) ]});
                    });
            } catch(e) {
                console.error('FirebaseStore.checkAuthority.failed', e);
                reject({ success: false, errors: [ Errors.get(e.code) ]});
            }
        });
    },
    makeInvite(user, companyId, groupId) {
        return new Promise((resolve, reject) => {
            try {
                const userid = user.email ? _convertToId(user.email) : undefined;

                const reqs = [_checkPhone(user.phone), _isUserAlreadyInGroup(companyId, groupId, userid), _getCompany(companyId)];

                return Promise.all(reqs)
                    .then(responses => {
                        const resPhone = responses[0];
                        const resGroupCheck = responses[1];
                        const company = responses[2].val();
                        const group = company.groups[groupId];

                        if (resPhone.phone) {
                            user.phone = resPhone.phone;
                        }

                        if (resGroupCheck.inGroup) {
                            return reject({ success: false, errors: [Errors.get('invite/user-already-in-group')]});
                        }

                        if (!company || !group) {
                            return reject({ success: false, errors: [Errors.get()]});
                        }

                        const {groupManager, groupName, invitationExpireTime} = group.attributes;

                        let data = {
                            emailId: user.email || null,
                            firstName: user.firstName || null,
                            lastName: user.lastName || null,
                            phoneNumber: user.phone || null,
                            pttNumber: user.pttNumber || null,
                            language: user.language || null,
                            deviceid: user.imei || null,
                            invitationForGroup: {
                                0: {
                                    companyId: companyId,
                                    companyName: company.companyName,
                                    groupManager: groupManager || null,
                                    groupName: groupName,
                                    groupId: groupId,
                                    invitationEmailStatus: 'not_sent',
                                    timestamp: Date.now(),
                                    senderEmail: '',
                                    senderFirstName: '',
                                    senderLastName: '',
                                    expireTime: Date.now() + (invitationExpireTime || 1209600000)
                                }
                            }
                        };

                        let promises = [];

                        if (userid) {
                            data.type = 'email';
                            promises.push( database.state.ref.child( '/invitations/' + userid ).set( data ) );
                        }

                        if (data.phoneNumber) {
                            data.type = 'phone';
                            promises.push( database.state.ref.child( '/invitations/' + data.phoneNumber ).set( data ) );
                        }

                        if (data.deviceid) {
                            data.type = 'imei';
                            promises.push( database.state.ref.child( '/invitations/' + data.deviceid ).set( data ) );
                        }

                        return Promise.all( promises )
                            .then(res => {
                                console.log( 'sendFirstTimeInvitations.all.promises', res );
                                resolve({ success: true, data: data });
                            });

                    });
            } catch (e) {
                console.error('FirebaseStore.makeInvite.failed', e);
                reject({ success: false, errors: [ Errors.get(e.code) ]});
            }
        });
    }
};

function _checkPhone (phone) {
    return new Promise((resolve, reject) => {
        if (!phone) {
            resolve({});
        } else {
            Twilio.validate(phone)
                .then(res => resolve(res))
                .catch(err => reject(err));
        }
    });
}

function _getCompany (id) {
    return database.state.ref.child('/companies/' + id).once('value');
}

function _isUserAlreadyInGroup (cid, gid, uid) {
    return new Promise((resolve, reject) => {
        if (!uid) {
            return resolve({success: true, inGroup: false});
        }

        database.state.ref.child('/companies/' + cid + '/groups/' + gid + '/users/' + uid)
            .once('value')
            .then(snap => { resolve({ success: true, inGroup: !!(snap && snap.val()) }); })
            .catch(err => reject(err));
    });
}

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
