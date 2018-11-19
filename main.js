mdinput = document.getElementById("markdown")
mdoutput = document.getElementById("response")
htmlcode = document.getElementById("html5")
fileupload = document.getElementById("file")

let input_mark = ""

file.addEventListener("change",readFile, false);

function readFile(e){
    var files = e.target.files;
    var file = files[0];           
    var reader = new FileReader();
    reader.onload = function(e) {
        mdinput.value = e.target.result; 
        updateOthers();           
    }
    reader.readAsText(file)
}

mdinput.addEventListener("input", updateOthers, false);

function updateOthers(){
    input_mark = mdinput.value
    output_txt = marked(input_mark)
    html5.value = output_txt
    mdoutput.innerHTML = output_txt
}

function copyhtml(){
    copyToClipboard(htmlcode.value);
}

function copytext(){
    downtext(mdoutput.innerHTML, '.doc')
}

function copymarkdown(){
    downtext(mdinput.value, '.MD')
}

function downtext(text, doctype){
    if(doctype == ".doc"){
        var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
        var postHtml = "</body></html>";
        var html = preHtml+text+postHtml;
    }
    
    else{
        html = text;
    }

    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });
    
    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    
    // Specify file name
    filename = "MyMakdownToHTML"+doctype;
    
    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = url;
        
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }

    document.body.removeChild(downloadLink);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
}
