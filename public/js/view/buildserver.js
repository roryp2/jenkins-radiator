JR.BuildServerView = Backbone.View.extend({
    //id: 'container',
    // The default is div
    tagName: "div",
    className: "container-fluid",

    initialize: function () {
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
    },

    render: function () {
        _.each(this.model.getJobs().toArray(), function (job) {
            this.$el.append(new JR.JobView({model: job}).render().el);
        }, this);

        $('#container').html(this.el);
        return this;
    }
});