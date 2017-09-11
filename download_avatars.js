var GITHUB_USER = "llcoolj84";
var GITHUB_TOKEN = "7a67c9ac7c1951d38001ee8c9bf8734567f28005";
var request = require('request');
var fs = require('fs');

function getRepoContributors(repoOwner, repoName, cb) {

  console.log('Welcome to the GitHub Avatar Downloader. We love Tongans!');
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var string = '';
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'moogsG' //User agent for header
    }
  };
  console.log(requestURL);
  // ...

       request.get(options) // these .get, .on, .on, .on are all "chained" together
       .on('error', function (err) {
        throw err;
       })
       .on('response', function (response) {
         response.setEncoding('utf8');
         console.log('Response Status Message: ', response.statusMessage);
         console.log('Downloading image...');
       })
       .on('data', function (data) {
       console.log('Chunk Received. Length:', data.length + '\n');
       string += data;
       })
       .on('end', function () {
       console.log('Download complete.');
       console.log('Response stream complete.');
       string = JSON.parse(string);
       return cb(string);
       })


       //.pipe(fs.createWriteStream('./future.jpg'));
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

