const fieldEncryption = require('mongoose-field-encryption')
const encrypt = fieldEncryption.encrypt
const decrypt = fieldEncryption.decrypt

module.exports = exports = function lastModifiedPlugin (schema, options) {
    if (!options || !options.secret) {
        throw new Error('missing required secret');
    }

    const fieldsToEncrypt = options.fields || [];
    const secret = options.secret;

    function encryptFields(obj, fields, secret) {
        for (let field of fields) {
            const fieldValue = obj[field];
            if (fieldValue) {
                if (typeof fieldValue === 'string') { // handle strings separately to maintain searchability
                    const value = encrypt(fieldValue, secret);
                    obj[field] = value;
                } else {
                    const value = encrypt(JSON.stringify(fieldValue), secret);
                    obj[field] = value;
                }
            }
        }
    };

    function decryptFields(obj, fields, secret) {
        for (let field of fields) {
            if (obj[field]) {
                const encryptedValue = obj[field];
                obj[field] = decrypt(encryptedValue, secret);
            }
        }
    };

    schema.pre('init', function(next, data) {
        try {
            decryptFields(data, fieldsToEncrypt, secret);
            next();
        } catch (err) {
            next(err);
        }
    });

    schema.pre('save', function(next) {
        try {
            encryptFields(this, fieldsToEncrypt, secret);
            next();
        } catch (err) {
            next(err);
        }
    });

    schema.pre('update', function(next) {
        for (let field of fieldsToEncrypt) {
            let plainTextValue = this._update.$set[field];
            if (plainTextValue) {
                if (typeof plainTextValue === 'string' || plainTextValue instanceof String) {
                    let updateObj = { $set: {} };
                    updateObj.$set[field] = encrypt(plainTextValue, secret);
                    this.update({}, updateObj);
                } else {
                    return next(new Error('Cannot apply mongoose-field-encryption plugin on update to encrypt non string fields'));
                }
            }
        }
        next();
    });
}