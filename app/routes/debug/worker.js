/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2018/11/27
 * Time: 17:26
 *
 */

var a = require("debug")("worker:a"),
  b = require("debug")("worker:b");

function work() {
  a("doing lots of uninteresting work");
  setTimeout(work, Math.random() * 1000);
}

work();

function workb() {
  b("doing some work");
  setTimeout(workb, Math.random() * 2000);
}

workb();
