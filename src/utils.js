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

export function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};