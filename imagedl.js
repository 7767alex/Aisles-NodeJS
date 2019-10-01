
var getImageUrls = require('get-image-urls');
 
getImageUrls('http://google.com', function(err, images) {
  if (!err) {
    console.log('Images found', images.length);
    console.log(images);
  }
  else {
    console.log('ERROR', err);
  }
})



/*

var rp = require('request-promise'),
    cheerio = require('cheerio'),
    url = require('url'),
    base = 'https://shop.safeway.com/search-results.html?q=apple&zipcode=94611&r=https%3A%2F%2Fwww.safeway.com%2Fhome.html';

var options = {
    uri: base,
    method: 'GET',
    resolveWithFullResponse: true
};

rp(options)
    .then (function (response) {
        var $ = cheerio.load(response.body);

        return $('img').map(function () {
            return url.resolve(base, $(this).attr('src'));
        }).toArray();
    })
    .then(console.log);
*/

/*
//Scraper for images, saves all images from the page 
  
var Scraper = require('image-scraper');
var scraper = new Scraper('https://shop.safeway.com/search-results.html?q=apple&zipcode=94611&r=https%3A%2F%2Fwww.safeway.com%2Fhome.html');
 
scraper.scrape(function(image) { 
    image.save();
});

*/

var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
  console.log('done');
});
