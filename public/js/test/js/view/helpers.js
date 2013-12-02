JR.ViewHelpers = {
    viewContains: function (el, text) {
        var html = $(el).html();
        var b = (html.indexOf(text) != -1);
        if (!b) {
            console.log("Actual html where text was not found: " + html + ", text: " + text);
        }
        return b;
    },
    viewEquals: function (el, text) {
        var html = $(el).html();
        var b = (html == text);
        if (!b) {
            console.log("Actual html: " + html + ", does not match " + text);
        }
        return b;
    }
};