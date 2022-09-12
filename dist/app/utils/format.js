"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatText = exports.formatMoney = exports.valueToNumber = exports.replaceValueForString = exports.refactorProductSearch = exports.formatProductMessage = void 0;
const formatProductMessage = (message) => {
    const phrase = message.split(' ');
    let price = null;
    phrase.shift();
    const formatPhrase = phrase.reduce((acc, el) => {
        if (parseFloat(el)) {
            price = parseFloat(el);
        }
        else {
            acc = acc + el + ' ';
        }
        return acc;
    }, '');
    return { formatMessageProduct: formatPhrase.replace(/^\s*|\s*$/g, ""), price };
};
exports.formatProductMessage = formatProductMessage;
const refactorProductSearch = (phraseProduct) => {
    return (phraseProduct.replace(/ /g, '%20'));
};
exports.refactorProductSearch = refactorProductSearch;
const replaceValueForString = (phraseProduct, collection) => {
    return collection.replace(/VALUE/g, phraseProduct);
};
exports.replaceValueForString = replaceValueForString;
const valueToNumber = (value) => {
    if (!value)
        return 0;
    const specialChars = '!@#$^&%*()+=-[]{}|:<>?,';
    for (let i = 0; i < specialChars.length; i++) {
        value = value && value.replace(new RegExp('\\' + specialChars[i], 'gi'), '');
    }
    value = value.replace(/USD/g, '');
    value = value.replace(/á/gi, 'a');
    value = value.replace(/é/gi, 'e');
    value = value.replace(/í/gi, 'i');
    value = value.replace(/ó/gi, 'o');
    value = value.replace(/ú/gi, 'u');
    value = value.replace(/ñ/gi, 'n');
    value = value.replace(/ü/gi, 'u');
    value = value.replace(/Á/gi, 'A');
    value = value.replace(/É/gi, 'E');
    value = value.replace(/Í/gi, 'I');
    value = value.replace(/Ú/gi, 'U');
    value = value.replace(/Ü/gi, 'U');
    value = value.replace(/Ñ/gi, 'N');
    value = parseFloat(value);
    return value || 0;
};
exports.valueToNumber = valueToNumber;
const formatMoney = (value) => {
    const price = '$' + Intl.NumberFormat("en-MX", {
        minimumFractionDigits: 2
    }).format(value);
    return price;
};
exports.formatMoney = formatMoney;
const formatText = (value) => {
    if (!value)
        return '';
    const specialChars = '!@#$^&%*()+=-[]{}|:<>?,_//';
    for (let i = 0; i < specialChars.length; i++) {
        value = value && value.replace(new RegExp('\\' + specialChars[i], 'gi'), ' ');
    }
    return value;
};
exports.formatText = formatText;
//# sourceMappingURL=format.js.map