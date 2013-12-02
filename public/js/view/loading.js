JR.LoadingView = Backbone.View.extend({
    className: "loading-view",
    className: 'span12 build-health',

    initialize: function () {
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
    },

    render: function () {
        var template = '<h1 class="loading">Loading</h1><p>{{secondsPassed}}</p>',
            json = {
                secondsPassed: Array(this.model.get('secondsPassed')).join(".")
            },
            output = Mustache.to_html(template, json);

        if (this.model.get('enabled') == true) {
            $(this.el).html(output);
            $('#container').html(this.el);
        }

        return this;
    }
});