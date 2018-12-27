/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2018/12/6
 * Time: 14:26
 *
 */

const Joi = require("joi");

// let testData = {username:'adf',test1:'111111', arraySelect:['My string',1] };
//
// let paramSchema = Joi.object().keys({
//   username: Joi.string().alphanum().min(3).max(30).required(),
//   test1: Joi.string().length(5).required(),
//   password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
//   access_token: [Joi.string(), Joi.number()],
//   birthyear: Joi.number().integer().min(1900).max(2013),
//   email: Joi.string().email(),
//   website: Joi.string().uri({
//     scheme: [
//       'git',
//       /git\+https?/
//     ]
//   }),
//   search: Joi.string().allow(''),
//   type: Joi.string().valid('disabled', 'normal', 'all').default('all'),
//   startTime: Joi.date().min('1-1-1974').max('now'),
//   endTime: Joi.when( Joi.ref('startTime'), { is: Joi.date().required(), then: Joi.date().max('1-1-2100') } ),
//   page: Joi.number().integer().min(1).default(1),
//   pageSize: Joi.number().integer().default(8),
//   deleteWhenLtTen: Joi.number().integer().max(10).strip(),
//   arraySelect: Joi.array().items(Joi.string().label('My string').required(), Joi.number().required()),
// });
//
// let { error, value } = Joi.validate(testData, paramSchema, { allowUnknown: true, abortEarly: true });
// console.log(error, value);

// const schema = {
//   a: Joi.valid('a', 'b', 'other'),
//   other: Joi.string()
//     .when('a', { is: 'other', then: Joi.required() }),
// };
//
// let { error, value } = Joi.validate({a:'a',other:'lll'}, schema, { allowUnknown: true, abortEarly: true });
// console.log(error, value);

const schema = Joi.object().keys({
  a: Joi.string().default(Joi.ref("b.c")),
  b: {
    c: Joi.any()
  },
  c: Joi.ref("$x")
});

let { error, value } = Joi.validate({ b: { c: 6 } }, schema, {
  context: { x: 5 }
});
console.log(error, value);
