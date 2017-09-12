// declare variables

var GITHUB_USER = "llcoolj84";
var GITHUB_TOKEN = "7a67c9ac7c1951d38001ee8c9bf8734567f28005";
var request = require('request');
var fs = require('fs');
var repoOwner = process.argv[2]; //takes in user input position 2
var repoName = process.argv[3]; //takes in user input position 3

// function to check for valid arguments in the command line
function checkArguments(owner, name) {
    if (owner === undefined || name === undefined) {
        console.log("Please enter valid owner name and repository!");
    } else {
        //welcome message
        console.log('Welcome to the GitHub Avatar Downloader!');
        getRepoContributors(repoOwner, repoName, getJson);
    }
}

// function to get repo contributor url's
function getRepoContributors(repoOwner, repoName, cb) {
    //declare variables
    var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
    var string = '';
    var options = {
        url: requestURL,
        headers: {
            'User-Agent': 'llcoolj84' //User agent for header
        }
    };

    // request module , these .get, .on, .on, .on are all "chained" together
    request.get(options)
        .on('error', function(err) { // message on error
            throw err;
        })
        .on('response', function(response) { // message on response
            response.setEncoding('utf8');
            console.log('Response Status Message: ', response.statusMessage);
            console.log('Downloading image url\'s...');
        })
        .on('data', function(data) { // downloaded data sent to empty array "string"
            string += data;
        })
        .on('end', function() { // message on end , parsing of JSON string
            console.log('Download complete.');
            console.log('Response stream complete.');
            string = JSON.parse(string);
            cb(string);
        })
}

//for each result in array, run downloadImageByURL function.
var getJson = function(result) {
    for (var j in result)
        downloadImageByURL(result[j].avatar_url, 'avatar', result[j].login);
}

//download and write images to "avatar" folder
function downloadImageByURL(url, filePath, fileName) {
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
//call checkArguments function with input from console.
checkArguments(repoOwner, repoName);