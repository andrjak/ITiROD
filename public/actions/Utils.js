"use strict"

let Utils =
{
    parseRequestURL : () => {

        let url = location.hash.slice(1).toLowerCase() || "/";
        let r = url.split("/");
        let request = {
            resource    : null,
            id          : null,
            verb        : null
        };
        request.resource    = r[1];
        request.id          = r[2];
        request.verb        = r[3];

        return request;
    },

    timeLabelCreater : () =>
    {
        let date = new Date();
        return String(date.getYear()) + String(date.getMonth())
        + String(date.getDate()) + String(date.getHours())
        + String(date.getMinutes()) + String(date.getSeconds())
        + String(date.getMilliseconds())
    }
};

export default Utils;