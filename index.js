/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2018/8/29
 * Time: 12:34
 *
 */
const lodash = require("lodash");
const mongoose = require("mongoose");

let a = [
  { id: mongoose.Types.ObjectId("5c1216e3c8f8db1b646a1e91"), name: "c" },
  { id: mongoose.Types.ObjectId("5c1216e3c8f8db1b646a1e95"), name: "c" },
  { id: mongoose.Types.ObjectId("5c1216e3c8f8db1b646a1e94"), name: "c" }
];

let b = [
  { id: mongoose.Types.ObjectId("5c1216e3c8f8db1b646a1e91"), name: "c" },
  { id: mongoose.Types.ObjectId("5c1216e3c8f8db1b646a1e92"), name: "c" },
  { id: mongoose.Types.ObjectId("5c1216e3c8f8db1b646a1e93"), name: "c" }
];

const database = lodash.differenceWith(a, b, (t1, t2) => {
  return t1.id + "" === t2.id + "";
});
console.log(database);
