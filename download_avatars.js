var GITHUB_USER = "llcoolj84";
var GITHUB_TOKEN = "7a67c9ac7c1951d38001ee8c9bf8734567f28005";
var request = require('request');
var fs = require('fs');
var repoOwner = process.argv[2]; //takes in user input position 2
var repoName = process.argv[3]; //takes in user input position 3

function checkArguments(owner, name) { // checks for valid arguments
    if (owner === undefined || name === undefined) {
        console.log("Please enter valid owner name and repository!");
    } else {
        console.log('Welcome to the GitHub Avatar Downloader!');
        getRepoContributors(repoOwner, repoName, getJson);
    }
}


function getRepoContributors(repoOwner, repoName, cb) { // get repo contributor url's

    console.log('Welcome to the GitHub Avatar Downloader. We love Tongans!');
    var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
    var string = '';
    var options = {
        url: requestURL,
        headers: {
            'User-Agent': 'llcoolj84' //User agent for header
        }
    };


    request.get(options) // request module , these .get, .on, .on, .on are all "chained" together
        .on('error', function(err) {
            throw err;
        })
        .on('response', function(response) {
            response.setEncoding('utf8');
            console.log('Response Status Message: ', response.statusMessage);
            console.log('Downloading image...');
        })
        .on('data', function(data) {
            string += data;
        })
        .on('end', function() {
            console.log('Download complete.');
            console.log('Response stream complete.');
            string = JSON.parse(string);
            cb(string);
        })
}

var getJson = function(result) { // get jason key avatar and prints out


    for (var j in result)
        downloadImageByURL(result[j].avatar_url, 'avatar', result[j].login);

}

//getRepoContributors(repoOwner, repoName, getJson); // call get list of url's

function downloadImageByURL(url, filePath, fileName) { //download and write images to "avatar" folder

    request.get(url)
        .on('error', function(err) { //message on error
            console.log(err);
        })

        .on('data', function(data) { //message on data recieving
            console.log('Downloading images... ');
        })

        .on('end', function() { //on message data recieved and end
            console.log("Download complete!");
        }).pipe(fs.createWriteStream(filePath + "/" + fileName)); // pipe data from read to write to avatar folder


}

checkArguments(repoOwner, repoName);