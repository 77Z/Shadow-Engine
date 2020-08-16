module.exports = function(string) {
    const indexOfLF = string.indexOf('\n', 1);  // No need to check first-character
    if (indexOfLF === -1) {
        if (string.indexOf('\r') !== -1) return '\r';
        return '\n';
    }
    if (string[indexOfLF - 1] === '\r') return '\r\n';
    return '\n';
}