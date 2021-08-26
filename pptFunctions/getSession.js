const fs = require("fs");

function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
        return fs.statSync(path + "/" + file).isDirectory();
    });
}

function getSession(USER_NAME) {
    const fSessions = getDirectories("./sessions");
    console.log("Sessions: ", fSessions);
    if (!fSessions.includes(USER_NAME)) {
        console.log("User is not found!".red);
        return;
    }


    const folderPath = `./sessions/${USER_NAME}`;
    const userDataDirPath = `./sessions/${USER_NAME}/userDataDir`;
    const screenshotPath = `./sessions/${USER_NAME}/screnshots`;

    const credentialsJson = fs.readFileSync(
        `${folderPath}/credentials.json`,
        "utf8"
    );
    const credentials = JSON.parse(credentialsJson);
    credentials.userDataDirPath = userDataDirPath;
    return credentials;
}

module.exports = getSession;
