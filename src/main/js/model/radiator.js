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
        "buildServer": null
    },
    validate: function(attrs){
        if(!attrs.buildServer){
            return "Build server model must be passed in";
        }
    },
    initialize: function(){
        if(LOG.isDebugEnabled()){
            LOG.debug("Initialize of Radiator model called");
        }
        _.bindAll(this, 'processChangedBuildServer');
        this.bind("change", this.processChangedBuildServer);
        // Do the initial preprocessing after consructing this model
        //this.processChangedBuildServer();
    },
    processChangedBuildServer: function(){
        if(LOG.isTraceEnabled()){
            LOG.trace("processChangedBuildServer of Radiator model called, context = " + JSON.stringify(this));
            LOG.trace("Include filter in radiator model processChangedBuildServer: " + this.getIncludeFilter());
            LOG.trace("Exclude filter in radiator model processChangedBuildServer: " + this.getExcludeFilter());
            LOG.trace("buildServer in radiator model processChangedBuildServer: " + this.get('buildServer'));
        }

        var allJobs = this.copySortedJobList(this.getBuildServer().getJobs().toArray());
        if(LOG.isDebugEnabled()){
            LOG.debug("Filtering all jobs, length=" + allJobs.length + " against includeFilter=" + this.getIncludeFilter() + ", excludeFilter=" + this.getExcludeFilter());
        }
        var includedJobs = _.filter(allJobs, function(job){
            if(LOG.isTraceEnabled()){
                LOG.trace("Checking if job " + job + " is to be included");
            }
            return this.isJobIncluded(job);
        }, this);
        if(LOG.isTraceEnabled()){
            LOG.trace("includedJobs = " + JSON.stringify(includedJobs));
        }
        this.set('includedJobs', includedJobs, {silent: true});
        if(LOG.isTraceEnabled()){
            LOG.trace("getIncludedJobs() = " + JSON.stringify(this.getIncludedJobs()));
        }

        if(LOG.isDebugEnabled()){
            LOG.debug("Filtering included jobs, length=" + this.getIncludedJobs().length);
        }
        var failingJobs = _.filter(this.copySortedJobList(this.getIncludedJobs()), function(job){
            return job.isFailing();
        }, this);
        this.set('failingJobs', failingJobs, {silent: true});

        var unstableJobs = _.filter(this.copySortedJobList(this.getIncludedJobs()), function(job){
            return job.isUnstable();
        }, this);
        this.set('unstableJobs', unstableJobs, {silent: true});

        var abortedJobs = _.filter(this.copySortedJobList(this.getIncludedJobs()), function(job){
            return job.isAborted();
        }, this);
        this.set('abortedJobs', abortedJobs, {silent: true});

        var passingJobs = _.filter(this.copySortedJobList(this.getIncludedJobs()), function(job){
            return job.isPassing();
        }, this);
        this.set('passingJobs', passingJobs, {silent: true});

        var buildingJobs = _.filter(this.copySortedJobList(this.getIncludedJobs()), function(job){
            return job.isBuilding();
        }, this);
        this.set('buildingJobs', buildingJobs, {silent: true});

        var disabledJobs= _.filter(this.copySortedJobList(this.getIncludedJobs()), function(job){
            return job.isDisabled();
        }, this);
        this.set('disabledJobs', disabledJobs, {silent: true});

    },
    copySortedJobList: function(list){
        if(LOG.isDebugEnabled()){
            LOG.debug("Copying & sorting list of " + list.length + " elements");
        }
        return _.sortBy(list, function(job){
            return job.getName();
        });
    },
    isJobIncluded: function(job){
        if(LOG.isTraceEnabled()){
            LOG.trace("Executing isJobIncluded method on job " + job);
        }
        var excludeFilter = this.getExcludeFilter();
        var jobExcludedByExcludeFilter = _.include(excludeFilter, job.getName());
        var includeFilter = this.getIncludeFilter();
        var includedJobsDefined = includeFilter.length>0;
        //var jobIncludedByIncludeFilter = _.include(includeFilter, job.getName());
        var jobIncludedByIncludeFilter =_.reduce(includeFilter, function(result, regex){
	       return result || job.getName().match(regex);
        }, false);


        var isIncluded = !jobExcludedByExcludeFilter && (!includedJobsDefined || jobIncludedByIncludeFilter);
        if(LOG.isTraceEnabled()){
            LOG.trace("Is job " + job.getName() + " included in radiator? excludeFilter=, " + excludeFilter + ", includeFilter=" + includeFilter + ", jobExcludedByExcludeFilter=" + jobExcludedByExcludeFilter + ", includedJobsDefined=" + includedJobsDefined + ", jobIncludedByIncludeFilter=" + jobIncludedByIncludeFilter + ", isIncluded=" + isIncluded);
        }
        return isIncluded;
    },
    getBuildServer: function(){
        return this.get('buildServer');
    },
    getIncludeFilter: function(){
        return this.get('includeFilter');
    },
    getExcludeFilter: function(){
        return this.get('excludeFilter');
    },
    getIncludedJobs: function(){
        return this.get('includedJobs') || [];
    },
    getIncludedJobsCount: function(){
        return this.getIncludedJobs().length;
    },
    getPassingJobs: function(){
        return this.get('passingJobs') || [];
    },
    getPassingJobsCount: function(){
        return this.getPassingJobs().length;
    },
    getUnstableJobs: function(){
        return this.get('unstableJobs') || [];
    },
    getUnstableJobsCount: function(){
        return this.getUnstableJobs().length;
    },
    getFailingJobs: function(){
        return this.get('failingJobs') || [];
    },
    getFailingJobsCount: function(){
        return this.getFailingJobs().length;
    },
    getBuildingJobs: function(){
        return this.get('buildingJobs') || [];
    },
    getBuildingJobsCount: function(){
        return this.getBuildingJobs().length;
    },
    getDisabledJobs: function(){
        return this.get('disabledJobs') || [];
    },
    getDisabledJobsCount: function(){
        return this.getDisabledJobs().length;
    },
    getAbortedJobs: function(){
        return this.get('abortedJobs') || [];
    },
    getAbortedJobsCount: function(){
        return this.getAbortedJobs().length;
    },
    buildsAreFailing: function(){
        return this.getFailingJobsCount()>0;
    },
    buildsArePassing: function(){
        return !this.buildsAreFailing();
    }

});
