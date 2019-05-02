function deleteTabs(text) {
    const json = {"id": text};
    doFormRequest("/tabs/delete", "post", "", json);
}

function thumbsdown(text) {
    const json = {"name": document.getElementById("tab").innerText, "operation": text};
    const res = document.getElementById("thumbsdown").innerText;
    var content = res.substring(0, 12);
    var number = parseInt(res.substring(12));
    console.log(text);
    console.log(number);
    if(text == "bad") {
        content = "It's so bad:";
        number ++;
        document.getElementById("thumbsdown").innerHTML = '<a href="javascript:void(0);" onclick="var s=judge(2);thumbsdown(s);">' + content + "</a>" + number.toString();
    }
    else
    if(text == "nobad") {
        content = "Thumbs down:";
        number --;
        document.getElementById("thumbsdown").innerHTML = '<a href="javascript:void(0);" onclick="var s=judge(2);thumbsdown(s);">' + content + "</a>" + number.toString();
    }
    doFormRequest("/tabs/thumbsdown", "post", "iframeStyle", json);
}

function like(text) {
    const json = {"name": document.getElementById("tab").innerText, "operation": text};
    const res = document.getElementById("thumbsup").innerText;
    var content = res.substring(0, 10);
    var number = parseInt(res.substring(10));
    if(text == "good") {
        content = "Thumbed!!:"
        number ++;
        document.getElementById("thumbsup").innerHTML = '<a href="javascript:void(0);" onclick="var s=judge(1);like(s);">' + content + "</a>" + number.toString();
    }
    else
    if(text == "nogood") {
        content = "Thumbs up:"
        number --;
        document.getElementById("thumbsup").innerHTML = '<a href="javascript:void(0);" onclick="var s=judge(1);like(s);">' + content + "</a>" + number.toString();
    }
    doFormRequest("/tabs/like", "post", "iframeStyle", json);
}

function judge(text) {
    if(text == 1) {
        const res1 = document.getElementById("thumbsup").innerText;
        const content1 = res1.substring(0, 9);
        if(content1 === "Thumbed!!")
            return "nogood";
        else
        if(content1 === "Thumbs up")
            return "good";
    }
    else 
    if(text == 2) {
        const res2 = document.getElementById("thumbsdown").innerText;
        const content2 = res2.substring(0, 12);
        console.log(content2);
        if(content2 === "Thumbs down:")
            return "bad";
        else
        if(content2 === "It's so bad:")
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