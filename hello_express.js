'use strict';
/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2018/9/18
 * Time: 16:14
 *
 */
Object.defineProperty(exports, '__esModule', { value: true });
const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('hello world');
});
app.listen(3000, () => {
  console.log('on port 3000');
});
//# sourceMappingURL=hello_express.js.map
