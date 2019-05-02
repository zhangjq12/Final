var second = document.getElementById('totalSecond').textContent; 

if (navigator.appName.indexOf("Explorer") > -1)  { 
    second = document.getElementById('totalSecond').innerText; 
} else { 
    second = document.getElementById('totalSecond').textContent; 
} 

function auto(URL) {    
    setInterval("redirect('" + URL + "')", 1000); 
}

function redirect(URL) { 
    if (second < 0) { 
        location.href = URL; 
    } else { 
        if (navigator.appName.indexOf("Explorer") > -1) { 
            document.getElementById('totalSecond').innerText = second--; 
            if(second == "0")
                document.getElementById('second').innerText = "Second";
        } else { 
            document.getElementById('totalSecond').textContent = second--; 
            if(second == "0")
                document.getElementById('second').textContent = "Second";
        } 
    } 
} 