
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
        file.upload({
          maxBytes: 10*1024*1024,
          saveAs: id+"."+extension,
          dirname: '../../assets/images/'
      }, function (error, files) {
    return error ? reject(error) : resolve(id);
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
