const data = require("../data");
const fs = require("fs");
const comments = data.comments;
const users = data.users;
const tabs = data.tabs;

const main = async () => {
    const Patrick = await users.create("P_hill","strongpassword","Patrick","Hill","patrickhill@sgmail.com");
    var betterman = fs.readFileSync('./tasks/BetterMan.txt', 'utf8');
    const tab1 = await tabs.create("Better Man Version 1","Better Man","Paolo Nutini","P_hill",betterman);
    var miracles = fs.readFileSync('./tasks/Miracles.txt', 'utf8');
    const tab2 = await tabs.create("Miracles Version 1","Miracles","ColdPlay","P_hill",miracles);
    var unforgiven2 = fs.readFileSync('./tasks/Unforgiven2.txt', 'utf8');
    const tab3 = await tabs.create("Unforgiven 2 Chords","Unforgiven 2","Metallica","P_hill",unforgiven2);
    var spirit = fs.readFileSync('./tasks/SpiritCarriesOn.txt', 'utf8');
    const tab4 = await tabs.create("Spirit Carries On version 1","The Spirit Carries On","Dream Theater","P_hill",spirit);
    var bloodbrothers = fs.readFileSync('./tasks/BloodBrothers.txt', 'utf8');
    const tab5 = await tabs.create("Blood Brothers Chords","Blood Brothers","Iron Maiden","P_hill",bloodbrothers);
}

main().catch(console.log);