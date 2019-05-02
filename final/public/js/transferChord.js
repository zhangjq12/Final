function rePlace() {
    var text = document.getElementById("tabContent").innerText;
    //var newSt = text;

    var boo = true;
    var str = "";
    var myhtml = "";
    for(var i = 0; i < text.length; i++) {
        if(text[i] == '(') {
            boo = false;
            continue;
        }
        if(text[i] == ')') {
            switch(str) {
                case "#Cm": 
                    myhtml += '<a href="#" data-toggle="tooltip" data-html="true" title data-original-title="<img src=&quot;/public/image/#Cm.png&quot; />">('+ str +')</a>';
                    break;
                case "#Dm": 
                    myhtml += '<a href="#" data-toggle="tooltip" data-html="true" title data-original-title="<img src=&quot;/public/image/#Dm.png&quot; />">('+ str +')</a>';
                    break;
                case "#F": 
                    myhtml += '<a href="#" data-toggle="tooltip" data-html="true" title data-original-title="<img src=&quot;/public/image/#F.png&quot; />">('+ str +')</a>';
                    break;
                case "#F7": 
                    myhtml += '<a href="#" data-toggle="tooltip" data-html="true" title data-original-title="<img src=&quot;/public/image/#F7.png&quot; />">('+ str +')</a>';
                    break;
                case "#Fm": 
                    myhtml += '<a href="#" data-toggle="tooltip" data-html="true" title data-original-title="<img src=&quot;/public/image/#Fm.png&quot; />">('+ str +')</a>';
                    break;
                case "#Gm": 
                    myhtml += '<a href="#" data-toggle="tooltip" data-html="true" title data-original-title="<img src=&quot;/public/image/#Gm.png&quot; />">('+ str +')</a>';
                    break;
                case "A": 
                    myhtml += '<a href="#" data-toggle="tooltip" data-html="true" title data-original-title="<img src=&quot;/public/image/A.png&quot; />">('+ str +')</a>';
                    break;
                case "A7": 
                    myhtml += '<a href="#" data-toggle="tooltip" data-html="true" title data-original-title="<img src=&quot;/public/image/A7.png&quot; />">('+ str +')</a>';
                    break;
                case "Am": 
                    myhtml += '<a href="#" data-toggle="tooltip" data-html="true" title data-original-title="<img src=&quot;/public/image/Am.png&quot; />">('+ str +')</a>';
                    break;
                case "B": 
                    myhtml += '<a href="#" data-toggle="tooltip" data-html="true" title data-original-title="<img src=&quot;/public/image/B.png&quot; />">('+ str +')</a>';
                    break;
                case "B7": 
                    myhtml += '<a href="#" data-toggle="tooltip" data-html="true" title data-original-title="<img src=&quot;/public/image/B7.png&quot; />">('+ str +')</a>';
                    break;
                case "bB": 
                    myhtml += '<a href="#" data-toggle="tooltip" data-html="true" title data-original-title="<img src=&quot;/public/image/bB.png&quot; />">('+ str +')</a>';
                    break;
                case "Bm": 
                    myhtml += '<a href="#" data-toggle="tooltip" data-html="true" title data-original-title="<img src=&quot;/public/image/Bm.png&quot; />">('+ str +')</a>';
                    break;
                case "C": 
                    myhtml += '<a href="#" data-toggle="tooltip" data-html="true" title data-original-title="<img src=&quot;/public/image/C.png&quot; />">('+ str +')</a>';
                    break;
                case "C7": 
                    myhtml += '<a href="#" data-toggle="tooltip" data-html="true" title data-original-title="<img src=&quot;/public/image/C7.png&quot; />">('+ str +')</a>';
                    break;
                case "D": 
                    myhtml += '<a href="#" data-toggle="tooltip" data-html="true" title data-original-title="<img src=&quot;/public/image/D.png&quot; />">('+ str +')</a>';
                    break;
                case "D7": 
                    myhtml += '<a href="#" data-toggle="tooltip" data-html="true" title data-original-title="<img src=&quot;/public/image/D7.png&quot; />">('+ str +')</a>';
                    break;
                case "Dm": 
                    myhtml += '<a href="#" data-toggle="tooltip" data-html="true" title data-original-title="<img src=&quot;/public/image/Dm.png&quot; />">('+ str +')</a>';
                    break;
                case "E": 
                    myhtml += '<a href="#" data-toggle="tooltip" data-html="true" title data-original-title="<img src=&quot;/public/image/E.png&quot; />">('+ str +')</a>';
                    break;
                case "E7": 
                    myhtml += '<a href="#" data-toggle="tooltip" data-html="true" title data-original-title="<img src=&quot;/public/image/E7.png&quot; />">('+ str +')</a>';
                    break;
                case "Em": 
                    myhtml += '<a href="#" data-toggle="tooltip" data-html="true" title data-original-title="<img src=&quot;/public/image/Em.png&quot; />">('+ str +')</a>';
                    break;
                case "F": 
                    myhtml += '<a href="#" data-toggle="tooltip" data-html="true" title data-original-title="<img src=&quot;/public/image/F.png&quot; />">('+ str +')</a>';
                    break;
                case "G": 
                    myhtml += '<a href="#" data-toggle="tooltip" data-html="true" title data-original-title="<img src=&quot;/public/image/G.png&quot; />">('+ str +')</a>';
                    break;
                case "G7": 
                    myhtml += '<a href="#" data-toggle="tooltip" data-html="true" title data-original-title="<img src=&quot;/public/image/G7.png&quot; />">('+ str +')</a>';
                    break;
                case "Gm": 
                    myhtml += '<a href="#" data-toggle="tooltip" data-html="true" title data-original-title="<img src=&quot;/public/image/Gm.png&quot; />">('+ str +')</a>';
                    break;
                default:
            }
            str = "";
            boo = true;
            continue;
        }
        if(!boo) {
            str = str + text[i];
        }
        else {
            myhtml += text[i];
        }
    }

    document.getElementById("tabContent").innerHTML = myhtml;
}