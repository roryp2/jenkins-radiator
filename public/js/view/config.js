JR.ConfigView = Backbone.View.extend({
    className: "config-view row-fluid",
    initialize: function () {
        _.bindAll(this, 'render');
    },
    render: function () {
        var template =
            "<div class='config span12'>" +
                "<h1>{{radiatorTitle}}</h1>" +
                "<div class='table'>" +
                "<table>" +
                "<tr><th>Url</th><td>{{ci_json_url}}</td></tr>" +
                "<tr><th>Refresh interval</th><td>{{refresh_interval}}ms</td></tr>" +
                "<tr><th>Exclude filter</th><td>{{excludeFilter}}</td></tr>" +
                "<tr><th>Include filter</th><td>{{includeFilter}}</td></tr>" +
                "</table>" +
                "</div>" +
                "<div class='urls'>" +
                "<p><a href='#radiator/{{idx}}'>Show radiator</a></p>" +
                "</div>" +
                "</div>",
            json = this.options.config,
            output;

        json.idx = this.options.configIdx;
        output = Mustache.to_html(template, json);

        $(this.el).html(output);
        return this;
    }
});