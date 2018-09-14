# ptah-encryption

**mongoose-field-encryption 重构**

Email: lizizhen@cisystemsolutions.com


BUILD WIDTH: 使用mongoose-field-encryption mongodb字段加密

## Build Setup

```javascript

npm install ptah-encryption


```

## 使用

```javascript

const mongooseFieldEncryption = require('ptah-encryption');

const EmployeesSchema = new Schema(
    {
        'hkid': {type: String},
        'payrollDate': {type: Date},
        'realWages': {type: Number}
    }
)

EmployeesSchema.plugin(mongooseFieldEncryption, {fields: ['hkid'], secret: encryptionKey});  //secret加載秘鈅   hkid:需要加密字段


```


 






