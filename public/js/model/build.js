// This represents a build of a Jenkins job
JR.Build = Backbone.RelationalModel.extend({
    // Use the job url as the id
    idAttribute: "url",

    url: function () {
        return this.id + '/api/json';
    },

    getNumber: function () {
        return this.get("number");
    },

    getUrl: function () {
        return this.get("url");
    }
});