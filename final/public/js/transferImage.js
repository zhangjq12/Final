$(function(){
    var data = document.getElementsByClassName('projectDetails')[0].innerHTML;
    data = data.replace(/&lt;/g, "<");
    data = data.replace(/&gt;/g, ">");
    data = data.replace(/&#x3D;/g, "=");
    data = data.replace("<script>", "&lt;script&gt;");
    data = data.replace("<style>", "&lt;style&gt;");
    data = data.replace(/<img src/g, "<img style='max-width:100%;' src");
    data = data.replace("&amp;nbsp;", " ");
    document.getElementsByClassName('projectDetails')[0].innerHTML = data;
});