/**
 * Created with Cocos2d-x3.0 jsb.
 * User: lizizhen
 * Date: 2018/12/14
 * Time: 12:00
 *
 */
const mongoose = require("mongoose");

// (async ()=> {
//   try {
//     const db=await mongoose.createConnection('mongodb://localhost:27017/data')
//     const gridFSBucket = new mongoose.mongo.GridFSBucket(db.db,{
//       bucketName:'fs'
//     });
//     const testy=await gridFSBucket.openUploadStream('register154468879697255555554',{
//       chunkSizeBytes: 'asdasdasdasd',
//       metadata: 'asdasdasdasd',
//       contentType: 'asdasdasdasd'
//     })
//     console.log(testy)
//   }catch (e) {
//     console.log(e)
//   }
// })();

var stream = require("stream");

function getFileSystemItem(dbo, filename) {
  var buf = new Buffer("");
  return new Promise(function(resolve, reject) {
    var bucket = new mongoose.mongo.GridFSBucket(dbo);
    var readstream = bucket.openDownloadStream(filename);
    readstream.on("data", chunk => {
      buf = Buffer.concat([buf, chunk]);
    });
    readstream.on("error", err => {
      reject(err);
    });
    readstream.on("end", () => {
      var res = buf.toString();
      buf = null; // Clean up memory
      readstream.destroy();
      resolve(res);
    });
  });
}

function putFileSystemItem(dbo, filename, data) {
  var putItemHelper = function(bucket, resolve, reject) {
    var writeStream = bucket.openUploadStreamWithId(filename, filename);
    var s = new stream.Readable();
    s.push(data);
    s.push(null); // Push null to end stream
    s.pipe(writeStream);
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  };
  return new Promise(function(resolve, reject) {
    var bucket = new mongoose.mongo.GridFSBucket(dbo);
    bucket.find({ _id: filename }).count(function(err, count) {
      if (err) return reject(err);
      if (count > 0) {
        bucket.delete(
          filename,
          function() {
            putItemHelper(bucket, resolve, reject);
          },
          reject
        );
      } else {
        putItemHelper(bucket, resolve, reject);
      }
    }, reject);
  });
}

async function test() {
  const db = await mongoose.createConnection("mongodb://localhost:27017/data");
  const dbo = db.db;
  const a = await putFileSystemItem(dbo, "test", "this is a test");
  const v = await getFileSystemItem(dbo, "test");
  console.log(v);
}

test()
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.log(err);
  });
