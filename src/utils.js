export function numericCharacters(event) {
    let regex = new RegExp('^[0-9 ]+$');
    let key = String.fromCharCode(
        !event.charCode ? event.which : event.charCode
    );
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
}
export const camelizeString = (str) => {
    str = str.toLowerCase();
    return str.replace(/(^|\s)[a-z\u00E0-\u00FC]/g, chr => chr.toUpperCase());
};