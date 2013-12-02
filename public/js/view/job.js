JR.JobView = Backbone.View.extend({
    // TODO: This is a "Job state view, displaying only the name & color indicating state"
    className: "row-fluid job-view",

    initialize: function () {
        _.bindAll(this, 'render');
    },

    render: function () {
        var template = "<div class='span12'><span style=\"width:100%\"><h1>{{name}}</h1></span></div>",
            json = this.model.toJSON(),
            output = Mustache.to_html(template, json);

        $(this.el).html(output);
        $(this.el).addClass(this.model.get("color"));

        return this;
    }
});