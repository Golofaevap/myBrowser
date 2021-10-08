const puppeteer = require("puppeteer-extra");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const stealthPlugin = StealthPlugin();
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const puppeteerExtraPluginUserAgentOverride = require("puppeteer-extra-plugin-stealth/evasions/user-agent-override");
stealthPlugin.enabledEvasions.delete("user-agent-override");
puppeteer.use(stealthPlugin);
const TimezonePlugin = require("puppeteer-extra-plugin-timezone").TimezonePlugin;
console.log(TimezonePlugin);
puppeteer.use(new TimezonePlugin());
// puppeteer.use(StealthPlugin());

// const cookiesExtention =
//   "C:\\Users\\nntve\\Desktop\\code\\puppeteer\\myBro2wser\\extentions\\cookies.txt";
const cookiesExtention = path.resolve("./extentions/cookies.txt");
async function getBrowser(opts) {
    try {
        const pluginUserAgentOverride = puppeteerExtraPluginUserAgentOverride({
            userAgent: opts.userAgent,
            locale: "es-Es,es;q=0.9,en-US;q=0.8,en;q=0.7",
            platform: "Win32",
        });
        console.log(opts.userDataDirPath);
        console.log(path.resolve(opts.userDataDirPath));
        puppeteer.use(pluginUserAgentOverride);
        const browser = await puppeteer.launch({
            headless: opts.headless,
            userDataDir: opts.userDataDirPath,
            ignoreDefaultArgs: ["--disable-extensions", "--enable-automation"],
            args: [
                `--proxy-server=${opts.proxy_type}://${opts.proxy_ip}:${opts.proxy_prt}`,
                "--no-sandbox",
                "--disable-setuid-sandbox",
                `--start-maximized`,
                `--load-extension=${cookiesExtention}`,
                "--disable-infobars",
                `--window-size=${opts.width},${opts.height}`,
                `--user-agent=${opts.userAgent}`,
                "--use-gl=swiftshader-webgl",
                "--disable-gpu",
                // "--enable-webgl-draft-extensions",
                // "--lang=bn-BD,bn",
            ],
        });
        const context = browser.defaultBrowserContext();
        await context.overridePermissions("https://ya.ru", ["geolocation"]);
        // return browser;
        return context;
    } catch (error) {
        console.log(error);
    }
    return null;
}

module.exports = getBrowser;
