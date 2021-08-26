// creates page in browser;

async function setCoords(page) {
    await page.goto("https://iphey.com", { waitUntil: "networkidle2" });
    const blocks = await page.$$("div.user-block-two");
    const coord = {};
    for (let i in blocks) {
        const inText = await blocks[i].evaluate((el) => {
            return el.innerText;
        });
        if (inText.toLowerCase().includes("latitude")) {
            const lat = await blocks[i].$("div.user-data");
            coord.latitude = Number(await lat.evaluate((el) => el.innerText));
        }
        if (inText.toLowerCase().includes("longitude")) {
            const long = await blocks[i].$("div.user-data");
            coord.longitude = Number(await long.evaluate((el) => el.innerText));
        }
    }
    // console.log(coord);
    await page.setGeolocation({ latitude: coord.latitude, longitude: coord.longitude });

    return page;
}

module.exports = setCoords;
