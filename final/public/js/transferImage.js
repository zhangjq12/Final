$(function(){
    var data = document.getElementById('detailsShow').innerHTML;
    data = data.replace(/&lt;/g, "<");
    data = data.replace(/&gt;/g, ">");
    data = data.replace(/&#x3D;/g, "=");
    data = data.replace("<script>", "&lt;script&gt;");
    data = data.replace("<style>", "&lt;style&gt;");

    document.getElementById('detailsShow').innerHTML = data;
});