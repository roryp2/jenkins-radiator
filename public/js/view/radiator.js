JR.RadiatorView = Backbone.View.extend({
    initialize: function () {
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);

        this.lastSoundPlayed = "";
        this.initializeViews();
    },

    initializeViews: function () {
        // This view is displayed if all jobs are passing
        this.jobsPassingView = new JR.JobsPassingView();
        this.jobsPassingView.render();
        this.$el.append(this.jobsPassingView.el);

        //This view is displayed if there are failing jobs
        this.failingJobs = new JR.FailingJobs({failingJobs: this.model.getFailingJobs()});
        this.jobsFailingView = new JR.JobsFailingView({model: this.failingJobs});
        this.jobsFailingView.render();
        this.$el.append(this.jobsFailingView.el);

        this.buildMetrics = new JR.BuildMetrics({
            includedJobCount: this.model.getIncludedJobsCount(),
            passingJobCount: this.model.getPassingJobsCount(),
            unstableJobCount: this.model.getUnstableJobsCount(),
            failingJobCount: this.model.getFailingJobsCount(),
            buildingJobCount: this.model.getBuildingJobsCount(),
            disabledJobCount: this.model.getDisabledJobsCount(),
            abortedJobCount: this.model.getAbortedJobsCount()
        });

        this.metricsWrapperView = new JR.BuildMetricWrapperView({model: this.buildMetrics});
        this.metricsWrapperView.render();
        this.$el.append(this.metricsWrapperView.el);
    },

    render: function () {
        // Set this, associated view rerenders itself
        this.failingJobs.set('failingJobs', this.model.getFailingJobs());
        this.failingJobs.trigger('change');

        this.buildMetrics.set('includedJobCount', this.model.getIncludedJobsCount());
        this.buildMetrics.set('passingJobCount', this.model.getPassingJobsCount());
        this.buildMetrics.set('failingJobCount', this.model.getFailingJobsCount());
        this.buildMetrics.set('buildingJobCount', this.model.getBuildingJobsCount());
        this.buildMetrics.set('disabledJobCount', this.model.getDisabledJobsCount());
        this.buildMetrics.set('unstableJobCount', this.model.getUnstableJobsCount());
        this.buildMetrics.set('abortedJobCount', this.model.getAbortedJobsCount());
        this.buildMetrics.trigger('change');

        // Render health indicators & audio
        this.renderHealth();
        this.renderAudio();
        return this;
    },

    renderHealth: function () {
        if (this.model.buildsAreFailing()) {
            this.jobsPassingView.$el.hide();
            this.jobsFailingView.$el.show();
            $('body').css("background-color", 'white');
        } else {
            this.jobsFailingView.$el.hide();
            this.jobsPassingView.$el.show();
            $('body').css("background-color", 'lightgreen');
        }
    },

    renderAudio: function () {
        if (this.model.buildsAreFailing() && this.lastSoundPlayed != "boo") {
            this.lastSoundPlayed = "boo";
            $("audio#booing-audio")[0].play();
        } else if (this.model.buildsArePassing() && this.lastSoundPlayed != "cheer") {
            this.lastSoundPlayed = "cheer";
            $("audio#cheering-audio")[0].play();
        }
    }
});