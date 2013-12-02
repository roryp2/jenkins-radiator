JR.BuildMetricView = Backbone.View.extend({
    initialize: function () {
        _.bindAll(this, 'render');
    },
    render: function () {
        var template = "<h1>{{title}}</h1><p>{{count}}</p>",
            output = Mustache.to_html(template, this.options);

        $(this.el).html(output);
        //$(this.el).addClass('build-metrics-wrapper');
        $(this.el).addClass('span3');
        $(this.el).addClass('build-metric');
        $(this.el).addClass(this.options.title + "-count");

        return this;
    }
});