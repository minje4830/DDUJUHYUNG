class Ddu64 {
    constructor(dduChar = ["뜌", "땨", "조", "주", "형", "!", "?", "."], paddingChar = "뭐") {
        this.dduChar = dduChar;
        this.paddingChar = paddingChar;
    }

    splitString(s, length) {
        let result = [];
        for (let i = 0; i < s.length; i += length) {
            result.push(s.substring(i, i + length));
        }
        return result;
    }

    encode(string) {
        let encoder = new TextEncoder(); // UTF-8 인코딩
        let encodedBytes = encoder.encode(string); // 문자열을 바이트 배열로 인코딩
        let encodedBin = "";
        
        // 바이트 배열을 이진수 문자열로 변환
        for (let i = 0; i < encodedBytes.length; i++) {
            let charRaw = encodedBytes[i].toString(2);
            encodedBin += ("0".repeat(8 - charRaw.length) + charRaw);
        }

        let encoded = this.splitString(encodedBin, 6);
        let padding = 6 - encoded[encoded.length - 1].length;
        encoded[encoded.length - 1] = encoded[encoded.length - 1] + "0".repeat(padding);

        let result = "";
        for (let i = 0; i < encoded.length; i++) {
            let charInt = parseInt(encoded[i], 2);
            result += this.dduChar[Math.floor(charInt / 8)] + this.dduChar[charInt % 8];
        }
        result += this.paddingChar.repeat(Math.floor(padding / 2));

        return result;
    }

    decode(string) {
        // 패딩 문자 수 세기
        let paddingCount = (string.match(new RegExp(this.paddingChar, "g")) || []).length;
        string = string.slice(0, string.length - paddingCount); // 패딩 제거
    
        let decodedBin = "";
        let chunks = this.splitString(string, 2);
    
        // dduChar 인덱스를 기반으로 이진수로 변환
        for (let i = 0; i < chunks.length; i++) {
            let char1Index = this.dduChar.indexOf(chunks[i][0]);
            let char2Index = this.dduChar.indexOf(chunks[i][1]);
    
            // 유효하지 않은 인덱스가 있을 경우 오류를 발생시킴
            if (char1Index === -1 || char2Index === -1) {
                throw new Error("Invalid encoding characters detected.");
            }
    
            // 6비트 이진수 생성
            let charBin = (char1Index * 8 + char2Index).toString(2);
            charBin = charBin.padStart(6, '0'); // 6비트로 맞추기
            decodedBin += charBin;
        }
    
        decodedBin = decodedBin.slice(0, decodedBin.length - paddingCount * 2); // 패딩 제거
    
        let decoded = [];
        let binChunks = this.splitString(decodedBin, 8);
    
        // 8비트씩 잘라서 다시 바이트 배열로 변환
        for (let i = 0; i < binChunks.length; i++) {
            decoded.push(parseInt(binChunks[i], 2));
        }
    
        let decoder = new TextDecoder(); // UTF-8 디코딩
        return decoder.decode(new Uint8Array(decoded)); // 바이트 배열을 문자열로 디코딩
    }
    
    
}

let ddu64 = new Ddu64();

// Encode function using Ddu64 class
function encodeText() {
    let inputText = document.getElementById("inputTextEncode").value;
    let encodedText = ddu64.encode(inputText);
    document.getElementById("outputTextEncode").value = encodedText;
}

// Decode function using Ddu64 class
function decodeText() {
    let inputText = document.getElementById("inputTextDecode").value;
    let decodedText = ddu64.decode(inputText);
    document.getElementById("outputTextDecode").value = decodedText;

}
