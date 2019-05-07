var fs = require("fs"),
    path = require("path");

function deleteFile(url, name){
    var files = [];
    var url = __dirname + url;

    if(fs.existsSync(url)) {    
        files = fs.readdirSync(url);    
        files.forEach(function(file, index){
            var curPath = path.join(url, file);
            if(fs.statSync(curPath).isDirectory()) { 
                deleteFile(curPath, name);
            } 
            else {  
                if(file.indexOf(name) > -1){   
                    fs.unlinkSync(curPath);
                    return true;
                }
            }  
        });
    }
    else {
        return false;
    }
}

module.exports = deleteFile;