
export class Helper {
    static toQueryString(obj): string {
        let parts = [];
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
            }
        }

        return parts.join('&');
    }

    static isNullOrWhiteSpace(str: string): boolean {
        if (str === null)
            return true;
        else if (typeof str == 'undefined')
            return true;
        else if (typeof str == "undefined")
            return true;
        else if (typeof str == 'string')
            return !/\S/.test(str); // returns true if string is empty or just whitespace
        else
            return true;
    }

    static isValidDate(value): boolean {
        return value.match(/^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/);
    }

    static isValidEmail(value): boolean {
        return value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
    }

    static createGuid(): string {
        let S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    }

    static isJSON(str): boolean {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

}
