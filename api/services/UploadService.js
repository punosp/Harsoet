
'use strict';

var Q = require('q'),
  _ = require('lodash');
module.exports = {

  uploadPic: uploadPic,

};


function uploadPic(req) {
  var id = Utils.generateReferenceId();
  var file = req.file('pic');
      return new Promise(function(resolve, reject) {
        if(file._files.length) {
      var fname = file._files[0].stream.filename;
    var extension = fname.split('.').pop().toLowerCase();
    if(extension =='jpg' || extension=='jpeg' || extension=='png') {
  //       file.upload({
  //         maxBytes: 10*1024*1024,
  //         saveAs: id+"."+extension,
  //         dirname: '../../assets/images/'
  //     }, function (error, files) {
  //   return error ? reject(error) : resolve(id+"."+extension);
  // });

    file.upload({
      adapter: require('skipper-s3'),
      key: 'AKIAJWUEASUIM7VYXAKQ',
      secret: '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',
      bucket: 'sanjeewaniglobal-images',
      saveAs: id+"."+extension,
      headers: {
          'x-amz-acl': 'public-read' // public or private file, determined by if expiring
        }

    }, function (error, files) {
  return error ? reject(error) : resolve(id+"."+extension);
});
  }
else {
  file.upload({
    maxBytes: 1,
    dirname: '../../assets/images/'
}, function () {
  return reject('Please choose .jpg,jpeg,.png files');
});

}
}
else {
  file.upload(function() {
    return reject('No file selected');
  });
}
});
}
