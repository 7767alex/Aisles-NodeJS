/*
const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = 'https://www.reddit.com';

puppeteer
	.launch()

 	.then(function(browser){
 		return browser.newPage();
 	})
 	.then(function(page) {
 		return page.goto(url).then(function() {
 			return page.content();
 		});
 	})
 	.then(function(html) {
 		$('h3',html).each(function() {
 			console.log($(this).text());
 		});
 	})
 	.catch(function(err) {
 		//handle error
 	});
 	*/

const puppeteer = require('puppeteer');
const $ = require('cheerio');
var url = 'https://shop.safeway.com/search-results.html?q=apple&zipcode=94611&r=https%3A%2F%2Fwww.safeway.com%2Fhome.html';
														//at(47)

var standard_input = process.stdin;
standard_input.setEncoding('utf-8');
console.log("Input Item");
standard_input.on('data',function(data) {
	if(data == 'exit\n') {
		console.log("Exiting program");
		process.exit();
	}
	else {
		console.log('User Input Data :' + data);
	}
});
url = setCharAt(url, 47, 'p')
url = setCharAt(url,48,'e')
url = setCharAt(url,49,'a')
url = setCharAt(url,50,'r')
url = setCharAt(url,51,'s')

console.log(url);

function setCharAt(str, index, chr) {
	if(index > str.length-1) 
		return str;
	return str.substr(0, index) + chr + str.substr(index+1);
}



puppeteer
  .launch()

  .then(function(browser) {
    return browser.newPage();
  })
  .then(function(page) {
    return page.goto(url).then(function() {
      return page.content();
    });
  })
  .then(function(html) {
    $('h3', html).each(function() {
      console.log($(this).text());
    });
  })
  .catch(function(err) {
    //handle error
  });





