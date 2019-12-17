const auth = require("./authentication");

async function headLink(req) {
    var link = [];
    const good = await auth(req);
    if(good != null) {
        /*const obj1 = {"id": "uNameShow", "link": "/tabs/mytabs/?name=" + good, "content": good + "'s Info"};
        const obj2 = {"id": "modifyInfo", "link": "/modifyInfo", "content": "Modify Info"}
        const obj3 = {"id": "logOut", "link": "/logout", "content": "Log Out"};*/
        const obj1 = {"content" : '<a id=uNameShow class="nav-link" href="/tabs/mytabs/?name=' + good + '" data-toggle="tooltip" title="Your profile" >' + good + '</a>'};
        //const obj2 = {"content" : '<a id=modifyInfo class="nav-link" href="/modifyInfo">Modify Info</a>'}
        const obj3 = {"content" : '<a id=logOut class="nav-link" href=# data-toggle="modal" data-target="#logoutDia">Log Out</a>'};
        link.push(obj1);
        //link.push(obj2);
        link.push(obj3);
    }
    else {
        /*const obj1 = {"id": "SignIn", "link": "/signin", "content": "Sign In"};
        const obj2 = {"id": "SignUp", "link": "/signup", "content": "Sign Up"};*/
        //const obj1 = {"content" : '<a id=SignIn class="nav-link" href="/signin">Sign In</a>'};
        const obj1 = {"content" : '<a id=SignIn class="nav-link" href=# data-toggle="modal" data-target="#signin">Sign In</a>'};
        //const obj2 = {"content" : '<a id=SignUp class="nav-link" href="/signup">Sign Up</a>'};
        const obj2 = {"content" : '<a id=SignUp class="nav-link" href="/signup">Sign Up</a>'};
        link.push(obj1);
        link.push(obj2);
    }
    return link;
}

module.exports = headLink;