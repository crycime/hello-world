/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2018/12/19
 * Time: 10:16
 *
 */

function f() {
  let ArrayRegSite = [
    { regSiteDate: new Date("2018-01-11"), status: "1" },
    { regSiteDate: new Date("2018-11-11"), status: "0" }
  ];
  let regSite = { regSiteDate: new Date("1997-01-11") };

  for (const item of ArrayRegSite) {
    if (["1", "2"].includes(item.status)) {
      regSite = item;
      break;
    }
    if (item.regSiteDate > regSite.regSiteDate) {
      regSite = item;
    }
  }
  console.log(regSite);
}

f();
