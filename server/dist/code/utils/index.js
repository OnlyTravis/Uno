"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomInt = randomInt;
exports.randomInt_ = randomInt_;
exports.randomText = randomText;
const character_list = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
function randomInt(from, to) {
    return Math.floor((to - from + 1) * Math.random()) + from;
}
function randomInt_(n) {
    return Math.floor(n * Math.random());
}
function randomText(length, type = 1) {
    let text = "";
    switch (type) {
        case 1:
            for (let i = 0; i < length; i++) {
                text += character_list[randomInt_(character_list.length)];
            }
            break;
    }
    return text;
}
