/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2018/12/6
 * Time: 15:56
 *
 */

const mongoose = require("mongoose");
const encryptionKey =
  "c2FkYXNhc2R6eGNhc2Rhc2Rhc2RkZmd3ZXJmd2Q0YTZzNWQ0dzZxOGQ0NmFzZGFzdmN6eGNhc2Zkc2d2enhjenhjeGdmZHl0amhqa2hqNDU2NDU2NDVBRFNDWkNYc2RkY1paWFNkc2ZTRFNBRENaWGNjc2RTRFNBU0ZTREFzZGFzZGFzZHNhY3hhcw==";
const mongooseFieldEncryption = require("ptah-encryption");
mongoose.Promise = global.Promise;

let db = mongoose.createConnection(
  "mongodb://13.228.85.101:8103,13.228.85.101:8104/data",
  {
    replset: { strategy: "ping", rs_name: "dev" },
    db: { native_parser: true },
    server: { poolSize: 100, reconnectTries: 1.7976931348623157e308 },
    user: "hauser",
    pass: "K63!Ty2@3h"
  }
);

mongoose.connection.on("error", (err, doc) => {
  console.log(err, doc);
});

let Schema = mongoose.Schema;

function set(item) {
  return "hhhhhhh";
}

const doubtSchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, index: true }, //设备ID
  accessDate: { type: String, set: set }, //时间
  siteId: { type: Schema.Types.ObjectId }
});

doubtSchema.plugin(mongooseFieldEncryption, {
  fields: ["accessDate"],
  secret: encryptionKey
});

const doubt = db.model("doubt", doubtSchema);

// doubt.create({accessDate:'asdasdas'},function(err,doc) {
//   console.log(err,doc);
// });

doubt.update(
  { _id: "5c1326a61562a60ecc78f544" },
  { $set: { accessDate: "ffffff", siteId: "5c1326a61562a60ecc78f566" } },
  function(err, doc) {
    console.log(err, doc);
  }
);

// doubt.find({},function(err,doc) {
//   console.log(err,doc);
// });
