function trans(){
    var data = document.getElementById('tabContent').innerHTML;
    console.log(data);
    data = data.replace("&lt;img", "<img");
    data = data.replace(/&gt;/g, ">");
    data = data.replace(/&#x3D;/g, "=");
    data = data.replace("&lt;span", "<span");
    data = data.replace("&lt;/span", "</span");
    /*(data = data.replace("&lt;/i", "</i");
    data = data.replace("&lt;font", "<font");
    data = data.replace("&lt;/font", "</font");*/

    console.log(data);
    document.getElementById('tabContent').innerHTML = data;
}