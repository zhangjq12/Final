const auth = require("./authentication");

async function headLink(req) {
    var link = [];
    const good = await auth(req);
    if(good != null) {
        const obj1 = {"id": "uNameShow", "link": "/tabs/mytabs/?name=" + good, "content": good};
        const obj2 = {"id": "modifyInfo", "link": "/modifyInfo", "content": "Modify Info"}
        const obj3 = {"id": "logOut", "link": "/logout", "content": "Log Out"};
        link.push(obj1);
        link.push(obj2);
        link.push(obj3);
    }
    else {
        const obj1 = {"id": "SignIn", "link": "/signin", "content": "Sign In"};
        const obj2 = {"id": "SignUp", "link": "/signup", "content": "Sign Up"};
        link.push(obj1);
        link.push(obj2);
    }
    return link;
}

module.exports = headLink;