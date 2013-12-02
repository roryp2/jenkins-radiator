module("model/radiator", {
    setupBuildServerModelFromTestResource: function () {
        console.log("Creating build server model");
        var buildServer = new JR.BuildServer(json);
        equal(buildServer.getJobs().length, 8, "Build server has expected amount of jobs");
        console.log("Build server model created, it has " + buildServer.getJobs().length + " jobs");
        return buildServer;

    }
});

test("If no buildserver model passed in, then invalid", function () {
    try {
        var radiator = new JR.Radiator();
        console.log("radiator.isValid(): " + radiator.isValid());
        ok(!radiator.isValid(), "Must not get here");
    } catch (err) {
        ok(err);
    }
});

test("When buildserver model passed in, then valid", function () {
    var buildServer = new JR.BuildServer(),
        buildServers = new JR.BuildServerCollection();
    buildServers.add(buildServer);

    try {
        var params = {
            "buildServers": buildServers
        };
        var radiator = new JR.Radiator(params);
        console.log("radiator.isValid(): " + radiator.isValid());
        ok(radiator.isValid());
    } catch (err) {
        ok(false, "Must not get here: " + JSON.stringify(err));
    }
});

test("When exclude or include filters are not defined, all jobs from build server are included in radiator", function () {
    var buildServer = this.setupBuildServerModelFromTestResource(),
        buildServers = new JR.BuildServerCollection();
    buildServers.add(buildServer);

    // Use the "All jobs" config
    config = configs[0];
    equal(config.includeFilter.length, 0, "config include filter has expected amount of job names");
    equal(config.radiatorTitle, 'All Apache jobs', "config radiator name is expected");

    var radiator;
    ok(_, "underscore available");
    try {
        var params = {
            "buildServers": buildServers,
            "includeFilter": config.includeFilter,
            "excludeFilter": config.excludeFilter
        };
        radiator = new JR.Radiator(params);
        console.log("radiator.isValid(): " + radiator.isValid());
        ok(radiator.isValid(), "Radiator is valid");
        radiator.processChangedBuildServer();
    } catch (err) {
        ok(false, "Must not get here: " + JSON.stringify(err));
    }
    deepEqual(buildServers, radiator.getBuildServers(), "Build server objects are equal");
    equal(radiator.getBuildServers().first().getJobs().length, 8, "Build server model of radiator has expected amount of jobs");
    equal(radiator.getIncludeFilter().length, 0, "Radiator include filter has expected amount of job names");
    ok(radiator.getIncludedJobs(), "Radiator has expected jobs array");
    equal(radiator.getIncludedJobsCount(), 8, "Radiator reports expected amount of included jobs");
});

test("When include filter is defined, only included jobs from build server are included in radiator", function () {
    console.log("Executing When include filter is defined, only included jobs from build server are included in radiator");
    var buildServer = this.setupBuildServerModelFromTestResource(),
        buildServers = new JR.BuildServerCollection();
    buildServers.add(buildServer);

    // Use the "Only ActiveMQ config"
    config = configs[1];
    equal(config.includeFilter.length, 1, "config include filter has expected amount of job names");
    equal(config.radiatorTitle, 'Only Active MQ from all Apache jobs', "config radiator name is expected");

    var radiator;
    ok(_, "underscore available");
    try {
        var params = {
            "buildServers": buildServers,
            "includeFilter": config.includeFilter,
            "excludeFilter": config.excludeFilter
        };
        console.log("Constructing radiator with params " + JSON.stringify(params));
        radiator = new JR.Radiator(params);
        console.log("radiator.isValid(): " + radiator.isValid());
        ok(radiator.isValid(), "Radiator is valid");
        radiator.processChangedBuildServer();
    } catch (err) {
        ok(false, "Must not get here: " + JSON.stringify(err));
    }
    deepEqual(buildServers, radiator.getBuildServers(), "Build server objects are equal");
    equal(radiator.getBuildServers().first().getJobs().length, 8, "Build server model of radiator has expected amount of jobs");
    equal(radiator.getIncludeFilter().length, 1, "Radiator include filter has expected amount of job names");
    ok(radiator.getIncludedJobs(), "Radiator has expected jobs array");
    equal(radiator.getIncludedJobs().length, 1, "Radiator has expected amount of included jobs in array");
    equal(radiator.getIncludedJobsCount(), 1, "Radiator reports expected amount of included jobs");
});


test("When exclude filter is defined, only non excluded jobs from build server are included in radiator", function () {
    var buildServer = this.setupBuildServerModelFromTestResource(),
        buildServers = new JR.BuildServerCollection();
    buildServers.add(buildServer);

    // Use the "Everything else than ActiveMQ config"
    config = configs[2];
    equal(config.includeFilter.length, 0, "config include filter has expected amount of job names");
    equal(config.excludeFilter.length, 1, "config exclude filter has expected amount of job names");
    equal(config.radiatorTitle, 'Every job except Active MQ from all Apache jobs', "config radiator name is expected");

    var radiator;
    ok(_, "underscore available");
    try {
        var params = {
            "buildServers": buildServers,
            "includeFilter": config.includeFilter,
            "excludeFilter": config.excludeFilter
        };
        console.log("Constructing radiator with params " + JSON.stringify(params));
        radiator = new JR.Radiator(params);
        console.log("radiator.isValid(): " + radiator.isValid());
        ok(radiator.isValid(), "Radiator is valid");
        radiator.processChangedBuildServer();
    } catch (err) {
        ok(false, "Must not get here: " + JSON.stringify(err));
    }
    deepEqual(buildServers, radiator.getBuildServers(), "Build server objects are equal");
    equal(radiator.getBuildServers().first().getJobs().length, 8, "Build server model of radiator has expected amount of jobs");
    equal(radiator.getIncludeFilter().length, 0, "Radiator include filter has expected amount of job names");
    equal(radiator.getExcludeFilter().length, 1, "Radiator exclude filter has expected amount of job names");
    ok(radiator.getIncludedJobs(), "Radiator has expected jobs array");
    equal(radiator.getIncludedJobs().length, 7, "Radiator has expected amount of included jobs in array");
    equal(radiator.getIncludedJobsCount(), 7, "Radiator reports expected amount of included jobs");
    equal(radiator.getFailingJobsCount(), 1, "Radiator reports expected amount of failing jobs");
    equal(radiator.getPassingJobsCount(), 3, "Radiator reports expected amount of passing jobs");
    equal(radiator.getBuildingJobsCount(), 2, "Radiator reports expected amount of building jobs");
    equal(radiator.getDisabledJobsCount(), 1, "Radiator reports expected amount of disabled jobs");
});


test("When exclude and include filters are defined, only non excluded jobs and included jobs from build server are included in radiator", function () {
    var buildServer = this.setupBuildServerModelFromTestResource(),
        buildServers = new JR.BuildServerCollection();
    buildServers.add(buildServer);

    config = configs[3];
    equal(config.includeFilter.length, 3, "config include filter has expected amount of job names");
    equal(config.excludeFilter.length, 5, "config exclude filter has expected amount of job names");
    equal(config.radiatorTitle, 'Every job except excluded and inlcuding only included from all Apache jobs', "config radiator name is expected");

    var radiator;
    ok(_, "underscore available");
    try {
        var params = {
            "buildServers": buildServers,
            "includeFilter": config.includeFilter,
            "excludeFilter": config.excludeFilter
        };
        console.log("Constructing radiator with params " + JSON.stringify(params));
        radiator = new JR.Radiator(params);
        console.log("radiator.isValid(): " + radiator.isValid());
        ok(radiator.isValid(), "Radiator is valid");
        radiator.processChangedBuildServer();
    } catch (err) {
        ok(false, "Must not get here: " + JSON.stringify(err));
    }
    deepEqual(buildServers, radiator.getBuildServers(), "Build server objects are equal");
    equal(radiator.getBuildServers().first().getJobs().length, 8, "Build server model of radiator has expected amount of jobs");
    equal(radiator.getIncludeFilter().length, 3, "Radiator include filter has expected amount of job names");
    equal(radiator.getExcludeFilter().length, 5, "Radiator exclude filter has expected amount of job names");
    ok(radiator.getIncludedJobs(), "Radiator has expected jobs array");
    equal(radiator.getIncludedJobs().length, 2, "Radiator has expected amount of included jobs in array");
    equal(radiator.getIncludedJobsCount(), 2, "Radiator reports expected amount of included jobs");
    equal(radiator.getIncludedJobs()[0].getName(), 'Abdera-trunk');
    equal(radiator.getIncludedJobs()[1].getName(), 'Abdera2-trunk');
});