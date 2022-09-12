"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatProductMessage = void 0;
const formatProductMessage = (message) => {
    const phrase = message.split(' ');
    phrase.shift();
    const formatPhrase = phrase.reduce((acc, el) => {
        acc = acc + el + ' ';
        return acc;
    }, '');
    return formatPhrase;
};
exports.formatProductMessage = formatProductMessage;
//# sourceMappingURL=formats.js.map