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
   await page.goto('https://google.com');

   await page.type("input.gLFyf.gsfi", 'javascript example'); //input 
   await page.keyboard.press('Enter');
   sleep(1000);
   //page.click("input.gNO89b");
   await page.screenshot({path : "google1.png"});
   browser.close();
})();