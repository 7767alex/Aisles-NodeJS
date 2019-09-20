const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = 'https://shop.safeway.com/search-results.html?q=apples&zipcode=94612&r=https%3A%2F%2Fwww.safeway.com%2F';

const name = new Set();
const quantity = new Set();
const price = new Set();

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
      name.add($(this).text());
    });
    console.log(name);
  })
  .catch(function(err) {
    //handle error
  });


  //h3 name
  //div.product-price-con price
  //p.product-qty quantity