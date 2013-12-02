JR.FooterView = Backbone.View.extend({
    initialize: function () {
        _.bindAll(this, 'render');
    },

    render: function () {
        var template = "<div>" +
            "<span>All: {{includedJobCount}}</span>" +
            " | " +
            "<span>Aborted: {{abortedJobCount}}</span>" +
            " | " +
            "<span>Disabled: {{disabledJobCount}}</span>" +
            "</div>",
            output = Mustache.to_html(template, this.options);

        $(this.el).html(output);
        $(this.el).addClass('build-metrics-footer');
        $('#footer').html(this.el);

        return this;
    }
});