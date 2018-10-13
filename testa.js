/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2018/9/21
 * Time: 16:33
 *
 */

var config;

config = {
  port: 7777,
  mongo: {
    database: "people-database",
    throwHappy: true,
    initReplset: true,
    options: {
      poolSize: 50,
      replicaSet: "rs0"
    },
    hosts: [
      {
        host: "localhost",
        port: 27017
      }
    ],
    useMongoose: false
  },
  watches: [
    {
      path: "pets",
      collection: "pets",
      model: "Pet",
      identityKey: "identity",
      blacklistFields: ["bankAcct"]
    }
  ],
  userIdentityKey: "user-id",
  getAllowed: function(_arg, cb) {
    var filteredIds, ids, userIdentity;
    ids = _arg.ids, userIdentity = _arg.userIdentity;
    filteredIds = ids.filter(function(doc) {
      return allowedIds.includes(userIdentity);
    });
    return cb(null, filteredIds);
  }
};