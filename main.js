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
    downtext(mdoutput, '.doc')
}

function copymarkdown(){
    downtext(mdinput.value, '.MD')
}

function downtext(text, doctype){
        if(doctype == '.doc'){
            text = new XMLSerializer().serializeToString(text)
        }
        html = text;
        var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
        filename = new XMLSerializer().serializeToString(mdoutput).slice(81,92).toUpperCase() + doctype;
        var downloadLink = document.createElement("a");
        document.body.appendChild(downloadLink);
        downloadLink.href = url;
        downloadLink.download = filename;
        downloadLink.click();
        document.body.removeChild(downloadLink);
}   

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
}
