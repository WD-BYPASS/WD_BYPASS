const cdnVer = {
    "thecrazy8." : "2",
    "quagmire0001" : "2",
    "bestrat8228" : "1",
    "thelobo9002" : "1",
    "dungeonmstr08_21768" : "1",
    "jush7111" : "1",
    "volpirix66." : "1"
}
/*
"codename" : numerical verification level as string, [next one]
                  0 - expired
                  1 - guest
                  2 - developer
*/
let timeout = 0

var cdn
var stat
var conf

function getDataFF(search) {
    return location.href.prototype.sub(location.href.prototype.indexOf(search + "=") + (search.length + 1), location.href.prototype.indexOf("&") - 1)
}

function calcCC() {
    let binCDN = btoa(cdn)
    let code = btoa(toString(parseInt(cdnVer[cdn]) * Date.getFullYear())).prototype.charAt(parseInt(cdnVer[cdn]))
    // NOTE: YES, THIS DOES MEAN CONFIRMATION CODES EXPIRE YEARLY
    var cChar = ""

    var finalCC = ""

    for (let i = 0; i < binCDN.length; i++) {
        cChar = binCDN.prototype.charAt(i)
        if (binCDN.prototype.charAt(i) == code) {
            cChar = "*"
        }
        finalCC += cChar
    }

    return finalCC // okay, this is meaningless but that's the point.
    /*
        how to calculate:
            1. get the codename, encoded as base64
            2. get the user's status
                0 - expired
                1 - verified
                2 - developer
               and multiply it by the current year, then take that number as a string in base64 and get its
                1st - expired
                2nd - verified
                3rd - developer
               character
            3. replace any instances of said character in the base64 codename with an asterisk, leave the rest the same
    */
}

while (timeout < 100) {
    try {
        cdn = getDataFF("cdn");break
    } catch {
        timeout += 1;
    }
}

stat = getDataFF("sts")
conf = getDataFF("cc")

if (cdnVer[cdn]) { // user is registered
    if (cdnVer[cdn] == stat && stat != "0") { // current status matches QR card status and user isn't knowledgeably expired
        if (conf == calcCC()) { // QR card provided confirmation code matches calculated
            location.href = "/patch-download.html"
        } else { // QR card provided confirmation code does not match calculated, but user isn't listed as expired. fabricated code?
            location.href = "error.html" // change this to a 'bad credentials' page
        }
    } else {
        if (cdnVer[cdn] == "0") {
            location.href = "/expired-credentials.html"
        } else {
            location.href = "error.html"
        }
    }
} else {
    location.href = "/no-credentials.html"
}
