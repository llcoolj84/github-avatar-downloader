var GITHUB_USER = "llcoolj84";
var GITHUB_TOKEN = "7a67c9ac7c1951d38001ee8c9bf8734567f28005";
var request = require('request');
var fs = require('fs');
var repoOwner = process.argv[2]; //takes in user input
var repoName = process.argv[3];


function getRepoContributors(repoOwner, repoName, cb) {

  console.log('Welcome to the GitHub Avatar Downloader. We love Tongans!');
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var string = '';
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'llcoolj84' //User agent for header
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
       string += data;
       })
       .on('end', function () {
       console.log('Download complete.');
       console.log('Response stream complete.');
       string = JSON.parse(string);
       cb(string);
       })


       //.pipe(fs.createWriteStream('./future.jpg'));
}

// getRepoContributors("jquery", "jquery", function(result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);

var getJson = function(result) { // get jason key avatar and prints out


  for (var j in result)
  downloadImageByURL(result[j].avatar_url, 'avatar', result[j].login);

}

getRepoContributors('jquery', 'jquery', getJson); // call get list of url's



function downloadImageByURL(url, filePath, fileName) { //download and write images to "avatar" folder

request.get(url)
    .on('error', function(err) { //on error
      console.log(err);
    })

 .on('data', function(data) { //on data recieving
    console.log('Downloading images... ');
  })

 .on('end', function() { //on data recieve end
    console.log("Download complete!");
  }).pipe(fs.createWriteStream(filePath + "/" + fileName));


}

getRepoContributors(repoOwner, repoName, getJson);

