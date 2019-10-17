const puppeteer = require('puppeteer');

function sleep(milliseconds) { //delay function to allow google to load
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

(async () => {
   const browser = await puppeteer.launch();
   const page = await browser.newPage();
   await page.goto('https://www.safeway.com/home.html');

   await page.type("#search-img", 'apples'); //input 
   await page.keyboard.press('Enter');
   sleep(20000000000000);
   //page.click("input.gNO89b");
   await page.screenshot({path : "google1.png"});

   browser.close();
})();