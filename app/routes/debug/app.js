/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2018/11/27
 * Time: 17:25
 *
 */

const debug = require("debug")("http"),
  http = require("http"),
  name = "My App";

// fake app

debug("booting %o", name);

http
  .createServer(function(req, res) {
    debug(req.method + " " + req.url);
    res.end("hello\n");
  })
  .listen(3000, function() {
    debug("listening");
  });

// fake worker of some kind

require("./worker");
