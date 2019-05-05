function checkSize(input) {
    var ie = false;
    var other = false;
    var flag;
    var filesize = 0;

    if (navigator.userAgent.indexOf("ie") > -1) {
        ie = true;
    }
    else
        other = true;

    if(input.files[0] == undefined)
        return false;
    if (other) {
        filesize = input.files[0].size;
    } else {
        var fileobject = new ActiveXObject ("Scripting.FileSystemObject");
        var file = fileobject.GetFile (input.value);
        filesize = file.Size;
    }

    if (filesize / (1024 * 1024) < 2 ) {
        flag = true;
    } else {
        flag = false;
    }

    return flag;
}