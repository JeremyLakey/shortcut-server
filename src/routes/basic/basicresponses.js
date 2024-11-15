

const basicResponses = (redirect) => {
    if (redirect && typeof redirect === "string") {
        return "<!DOCTYPE html><html><body><script>window.location.replace(" + redirect + ")</script></body></html>";
    }
    else if (Array.isArray(redirect) && redirect.length > 0 && typeof redirect[0] === "string") {
        let finalHtml = "<!DOCTYPE html><html><body><script>";
        for (let i = 1; i < redirect.urls.length; i++) {
            finalHtml += "window.open(\"" + redirect.urls[i] + "\", \"_blank\");";
        }
        finalHtml += "window.location.replace(\"" + redirect.urls[0] + "\", \"_self\");";
        finalHtml += "</script></body></html>";
        return finalHtml;
    }
    else if (typeof redirect === 'object') {
        let finalHtml = "<!DOCTYPE html><html><body>";

        if (redirect.style) {
            finalHtml += "<style>" + redirect.style + "</style>";
        }

        if (redirect.result) {
            finalHtml += "<div id=\"result\">" + redirect.result + "</div>";
        }

        if (redirect.alert) {
            finalHtml += "<script>alert(\"" + redirect.alert + "\")</script>";
        }

        if (redirect.stay) {
            if (redirect.urls) {
                finalHtml += "<script>";
                for (let i = 0; i < redirect.urls.length; i++) {
                    finalHtml += "window.open(\"" + redirect.urls[i] + "\", \"_blank\");";
                }
                finalHtml += "</script>";
            }
        }
        else {
            if (redirect.urls) {
                finalHtml += "<script>";
                for (let i = 1; i < redirect.urls.length; i++) {
                    finalHtml += "window.open(\"" + redirect.urls[i] + "\", \"_blank\");";
                }
                finalHtml += "window.open(\"" + redirect.urls[0] + "\", \"_self\");";
                finalHtml += "</script>";
            }
        }

        if (redirect.script) {
            finalHtml += "<script>" + redirect.script + "</script>";
        }
        
        finalHtml += "</body></html>";
        return finalHtml;
    }
    else {
        return "<!DOCTYPE html><html><body><script>history.back()</script></body></html>";
    }
}

export default basicResponses;