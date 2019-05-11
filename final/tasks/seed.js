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
    var hotelCalifornia = fs.readFileSync('./tasks/HotelCalifornia.txt', 'utf8');
    const tab6 = await tabs.create("Hotel California Chords","Hotel California","Eagles","P_hill",hotelCalifornia);
    var Hymn = fs.readFileSync('./tasks/HymnWeekend.txt', 'utf8');
    const tab7 = await tabs.create("Hymn For The Weekend Chords","Hymn For The Weekend","Coldplay","P_hill",Hymn);
    var DriveHome = fs.readFileSync('./tasks/DriveHome.txt', 'utf8');
    const tab8 = await tabs.create("Drive Home Chords","Drive Home","Steven Wilson","P_hill",DriveHome);
    var TearsInHeaven = fs.readFileSync('./tasks/TearsInHeaven.txt', 'utf8');
    const tab9 = await tabs.create("Tears In Heaven Chords","Tears In Heaven","Eric Clapton","P_hill",TearsInHeaven);
    var Summer = fs.readFileSync('./tasks/SummerOf69.txt', 'utf8');
    const tab10 = await tabs.create("Summer of '69 Version 1","Summer of '69","Bryan Adams","P_hill",Summer);
}

main().catch(console.log);