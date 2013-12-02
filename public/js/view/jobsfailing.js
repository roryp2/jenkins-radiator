JR.JobsFailingView = Backbone.View.extend({
    className: "row-fluid build-health failing",

    initialize: function () {
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
    },

    render: function () {
        this.$el.html("");

        _.each(this.model.get('failingJobs'), function (job) {
            this.$el.append(new JR.JobView({model: job}).render().el);
        }, this);

        return this;
    }
});