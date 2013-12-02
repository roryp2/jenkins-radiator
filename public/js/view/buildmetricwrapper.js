JR.BuildMetricWrapperView = Backbone.View.extend({
    className: "row-fluid build-metrics-wrapper",

    initialize: function () {
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
    },

    render: function () {
        this.$el.html("");

        var passingBuildsView = new JR.BuildMetricView({"title": "Passing", "count": this.model.get('passingJobCount')});
        passingBuildsView.render();
        var unstableBuildsView = new JR.BuildMetricView({"title": "Unstable", "count": this.model.get('unstableJobCount')});
        unstableBuildsView.render();
        var failingBuildsView = new JR.BuildMetricView({"title": "Failing", "count": this.model.get('failingJobCount')});
        failingBuildsView.render();
        var buildingBuildsView = new JR.BuildMetricView({"title": "Building", "count": this.model.get('buildingJobCount')});
        buildingBuildsView.render();

        this.$el.append(passingBuildsView.el);
        this.$el.append(unstableBuildsView.el);
        this.$el.append(failingBuildsView.el);
        this.$el.append(buildingBuildsView.el);

        var footerView = new JR.FooterView({
            "includedJobCount": this.model.get('includedJobCount'),
            "abortedJobCount": this.model.get('abortedJobCount'),
            "disabledJobCount": this.model.get('disabledJobCount')
        });

        footerView.render();

        return this;
    }
});