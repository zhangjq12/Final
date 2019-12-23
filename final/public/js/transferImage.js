$(function(){
    var data = document.getElementById('detailsShow').innerHTML;
    //console.log(data);
    /*data = data.replace("&lt;img", "<img");
    data = data.replace(/&gt;/g, ">");
    data = data.replace(/&#x3D;/g, "=");
    data = data.replace("&lt;h1", "<h1");
    data = data.replace("&lt;/h1", "</h1");
    data = data.replace("&lt;/i", "</i");
    data = data.replace("&lt;b", "<b");
    data = data.replace("&lt;/b", "<b");*/
    data = data.replace(/&lt;/g, "<");
    data = data.replace(/&gt;/g, ">");
    data = data.replace(/&#x3D;/g, "=");
    data = data.replace("<script>", "&lt;script&gt;");
    data = data.replace("<style>", "&lt;style&gt;");

    //console.log(data);
    document.getElementById('detailsShow').innerHTML = data;
})();