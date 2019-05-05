function deleteTabs(text) {
    const json = {"id": text};
    doFormRequest("/tabs/delete", "post", "", json);
}

function thumbsdown(text) {
    const json = {"name": document.getElementById("tab").innerText, "operation": text};
    const res = document.getElementById("thumbsdown").innerText;
    var content = "";
    var number = res;
    if(text == "bad") {
        content = "dislikefilled.png";
        number ++;
        document.getElementById("thumbsdown").innerHTML = '<a href="javascript:void(0);" onclick="var s=judge(2);thumbsdown(s);"><img id="dislike" src="/public/image/like/' + content + '" alt="thumbsdown"></a>' + number.toString();
    }
    else
    if(text == "nobad") {
        content = "dislike.png";
        number --;
        document.getElementById("thumbsdown").innerHTML = '<a href="javascript:void(0);" onclick="var s=judge(2);thumbsdown(s);"><img id="dislike" src="/public/image/like/' + content + '" alt="thumbsdown"></a>' + number.toString();
    }
    doFormRequest("/tabs/thumbsdown", "post", "iframeStyle", json);
}

function like(text) {
    const json = {"name": document.getElementById("tab").innerText, "operation": text};
    const res = document.getElementById("thumbsup").innerText;
    var content = ""
    var number = res;
    if(text == "good") {
        content = "likefilled.png"
        number ++;
        document.getElementById("thumbsup").innerHTML = '<a href="javascript:void(0);" onclick="var s=judge(1);like(s);"><img id="like" src="/public/image/like/' + content + '" alt="thumbsup"></a>' + number.toString();
    }
    else
    if(text == "nogood") {
        content = "like.png"
        number --;
        document.getElementById("thumbsup").innerHTML = '<a href="javascript:void(0);" onclick="var s=judge(1);like(s);"><img id="like" src="/public/image/like/' + content + '" alt="thumbsup"></a>' + number.toString();
    }
    doFormRequest("/tabs/like", "post", "iframeStyle", json);
}

function judge(text) {
    if(text == 1) {
        const res1 = document.getElementById("like").getAttribute("src");
        const content1 = res1.substring(19);
        if(content1 === "likefilled.png")
            return "nogood";
        else
        if(content1 === "like.png")
            return "good";
    }
    else 
    if(text == 2) {
        const res2 = document.getElementById("dislike").getAttribute("src");
        const content2 = res2.substring(19);
        if(content2 === "dislike.png")
            return "bad";
        else
        if(content2 === "dislikefilled.png")
            return "nobad";
    }
}

/*function renameTabs(text) {
    const json = {"name": text};
    doFormRequest("/tabs", "put", json);
}*/

function doFormRequest(url, action, target, json)
{
    var form = document.createElement("form");
    form.action = url;
    form.method = action;
    form.target = target;
    for (var key in json)
    {
        if (json.hasOwnProperty(key))
        {
            var val = json[key];
            input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = val;
            form.appendChild(input);
        }
    }

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}