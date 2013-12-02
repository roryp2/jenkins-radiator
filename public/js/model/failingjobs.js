// Failing Jobs
JR.FailingJobs = Backbone.Model.extend({
    defaults: {
        "failingJobs": []
    },

    getFailingJobs: function () {
        return this.get('failingJobs') || [];
    },

    getFailingJobsCount: function () {
        return this.getFailingJobs().length;
    },

    buildsAreFailing: function () {
        return this.getFailingJobsCount() > 0;
    },

    buildsArePassing: function () {
        return !this.buildsAreFailing();
    }
});