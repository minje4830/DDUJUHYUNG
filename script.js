// Encode function (Example encoding logic, you can replace this with your own logic)
function encodeText() {
    let inputText = document.getElementById("inputTextEncode").value;
    let outputText = btoa(inputText);  // Base64 encoding for demo
    document.getElementById("outputTextEncode").value = outputText;
}

// Decode function (Example decoding logic, replace with your own logic)
function decodeText() {
    let inputText = document.getElementById("inputTextDecode").value;
    let outputText = atob(inputText);  // Base64 decoding for demo
    document.getElementById("outputTextDecode").value = outputText;
}
