/*
# Copyright 2025 i3l3
#
# Redistribution and use in source and binary forms, with or without modification, are permitted provided that
# the following conditions are met:
#
# 1. Redistributions of source code must retain the above copyright notice, this list of conditions
#    and the following disclaimer.
# 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions
#    and the following disclaimer in the documentation and/or other materials provided with the distribution.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
# WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
# PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
# ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
# TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
# HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
# NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
# POSSIBILITY OF SUCH DAMAGE.
# 
# Modified by minje4830 in 2025
*/

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
        let encodedBin = "";
        for (let i = 0; i < string.length; i++) {
            let charRaw = string.charCodeAt(i).toString(2);
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
        let paddingCount = (string.match(new RegExp(this.paddingChar, "g")) || []).length;
        string = string.slice(0, string.length - paddingCount);

        let decodedBin = "";
        let chunks = this.splitString(string, 2);
        for (let i = 0; i < chunks.length; i++) {
            let char = parseInt("0o" + this.dduChar.indexOf(chunks[i][0]) + this.dduChar.indexOf(chunks[i][1]), 8).toString(2);
            char = "0".repeat(6 - char.length) + char;
            decodedBin += char;
        }
        decodedBin = decodedBin.slice(0, decodedBin.length - paddingCount * 2);

        let decoded = [];
        let binChunks = this.splitString(decodedBin, 8);
        for (let i = 0; i < binChunks.length; i++) {
            decoded.push(parseInt("0b" + binChunks[i], 2));
        }

        return new TextDecoder().decode(new Uint8Array(decoded));
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
