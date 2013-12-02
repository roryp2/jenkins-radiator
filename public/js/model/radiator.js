// This represents a Radiator that is a "filtered" view of a BuildServer
JR.Radiator = Backbone.Model.extend({
    defaults: {
        "includedJobs": [],
        "passingJobs": [],
        "unstableJobs": [],
        "failingJobs": [],
        "abortedJobs": [],
        "buildingJobs": [],
        "disabledJobs": [],
        "includeFilter": [],
        "excludeFilter": [],
        "buildServers": null
    },

    validate: function (attrs) {
        if (!attrs.buildServers) {
            return "Build server model must be passed in";
        }
    },

    initialize: function () {
        _.bindAll(this, 'processChangedBuildServer');
        this.bind("change", this.processChangedBuildServer);
//        this.processChangedBuildServer();
    },

    processChangedBuildServer: function () {
        var allJobs = [];

        this.getBuildServers().each(function (buildServer) {
            allJobs.push(buildServer.getJobs().toArray());
        }, this);

        allJobs = this.copySortedJobList(_.flatten(allJobs));

        console.info("Filtering all jobs, length=" + allJobs.length + " against includeFilter=" + this.getIncludeFilter() + ", excludeFilter=" + this.getExcludeFilter());

        var includedJobs = _.filter(allJobs, function (job) {
            return this.isJobIncluded(job);
        }, this);

        this.set('includedJobs', includedJobs, {silent: true});

        var failingJobs = _.filter(this.copySortedJobList(this.getIncludedJobs()), function (job) {
            return job.isFailing();
        }, this);

        this.set('failingJobs', failingJobs, {silent: true});

        var unstableJobs = _.filter(this.copySortedJobList(this.getIncludedJobs()), function (job) {
            return job.isUnstable();
        }, this);

        this.set('unstableJobs', unstableJobs, {silent: true});

        var abortedJobs = _.filter(this.copySortedJobList(this.getIncludedJobs()), function (job) {
            return job.isAborted();
        }, this);

        this.set('abortedJobs', abortedJobs, {silent: true});

        var passingJobs = _.filter(this.copySortedJobList(this.getIncludedJobs()), function (job) {
            return job.isPassing();
        }, this);

        this.set('passingJobs', passingJobs, {silent: true});

        var buildingJobs = _.filter(this.copySortedJobList(this.getIncludedJobs()), function (job) {
            return job.isBuilding();
        }, this);

        this.set('buildingJobs', buildingJobs, {silent: true});

        var disabledJobs = _.filter(this.copySortedJobList(this.getIncludedJobs()), function (job) {
            return job.isDisabled();
        }, this);

        this.set('disabledJobs', disabledJobs, {silent: true});

    },

    copySortedJobList: function (list) {
        return _.sortBy(list, function (job) {
            return job.getName();
        });
    },

    isJobIncluded: function (job) {
        var excludeFilter = this.getExcludeFilter(),
            jobExcludedByExcludeFilter = _.reduce(excludeFilter, function (result, regex) {
                return result || job.getName().match(regex);
            }, false),

            includeFilter = this.getIncludeFilter(),
            includedJobsDefined = includeFilter.length > 0,
            jobIncludedByIncludeFilter = _.reduce(includeFilter, function (result, regex) {
                return result || job.getName().match(regex);
            }, false);

        return !jobExcludedByExcludeFilter && (!includedJobsDefined || jobIncludedByIncludeFilter);
    },

    getBuildServers: function () {
        return this.get('buildServers');
    },

    getIncludeFilter: function () {
        return this.get('includeFilter');
    },

    getExcludeFilter: function () {
        return this.get('excludeFilter');
    },

    getIncludedJobs: function () {
        return this.get('includedJobs') || [];
    },

    getIncludedJobsCount: function () {
        return this.getIncludedJobs().length;
    },

    getPassingJobs: function () {
        return this.get('passingJobs') || [];
    },

    getPassingJobsCount: function () {
        return this.getPassingJobs().length;
    },

    getUnstableJobs: function () {
        return this.get('unstableJobs') || [];
    },

    getUnstableJobsCount: function () {
        return this.getUnstableJobs().length;
    },

    getFailingJobs: function () {
        return this.get('failingJobs') || [];
    },

    getFailingJobsCount: function () {
        return this.getFailingJobs().length;
    },

    getBuildingJobs: function () {
        return this.get('buildingJobs') || [];
    },

    getBuildingJobsCount: function () {
        return this.getBuildingJobs().length;
    },

    getDisabledJobs: function () {
        return this.get('disabledJobs') || [];
    },

    getDisabledJobsCount: function () {
        return this.getDisabledJobs().length;
    },

    getAbortedJobs: function () {
        return this.get('abortedJobs') || [];
    },

    getAbortedJobsCount: function () {
        return this.getAbortedJobs().length;
    },

    buildsAreFailing: function () {
        return this.getFailingJobsCount() > 0;
    },

    buildsArePassing: function () {
        return !this.buildsAreFailing();
    }
});