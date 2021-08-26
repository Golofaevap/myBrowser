// node ./actions2/0ManualStart.js

// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require("puppeteer-extra");
const fs = require("fs");
const _ = require("lodash");
const colors = require("colors");
const puppeteerAfp = require('puppeteer-afp');
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const getBrowser = require("../pptFunctions/getBrowser");
const newPage = require("../pptFunctions/newPage");
const getSession = require("../pptFunctions/getSession");
const setCoords = require("../pptFunctions/setCoords");
puppeteer.use(StealthPlugin());

// function getDirectories(path) {
//     return fs.readdirSync(path).filter(function (file) {
//         return fs.statSync(path + "/" + file).isDirectory();
//     });
// }
// aelbertshvab@yandex.ru+#

// const USER_NAME = "patosgamb1980@ro.ru";
// const USER_NAME = "manmaro1987@rambler.ru";
// const USER_NAME = "johnatanmcsteevenson@yandex.ru";

async function main() {
    const args = process.argv;
    if (!args[2] /*|| !args[3]*/) {
        return console.log(
            "Please setup email".red,
            "email:",
            args[2]
            /*, "pwds:",
            args[3]*/
        );
    }
    const USER_NAME = args[2];

    const opts = getSession(USER_NAME);

    //   return;

    // puppeteer usage as normal
    console.log("Launching puppeteer...");

    const browser = await getBrowser(opts);
    const page = await newPage(browser, opts);
    // const cloakedPage = puppeteerAfp(page);
    (await browser.pages())[0].close();

    
    setCoords(page);

    // await page.waitForTimeout(1000*60);
    // await browser.close();
}

main();
