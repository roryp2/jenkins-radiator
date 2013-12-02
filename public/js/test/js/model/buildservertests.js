module("model/jenkins");
test("Empty constructor", function () {
    var jenkins = new JR.BuildServer();
    ok(jenkins);
});

test("Test data parsing", function () {
    var jenkins = new JR.BuildServer(json);
    equal(jenkins.getMode(), "EXCLUSIVE");
    equal(jenkins.getJobs().length, 8);
});

test("Test jobs", function () {
    var jenkins = new JR.BuildServer(json),
        jobName,
        job;
    jenkins.set({ci_url: 'https://builds.apache.org'});
    ok(jenkins.getJobs() instanceof Backbone.Collection, "Jobs is a Collection");

    jobName = "ActiveMQ";
    job = jenkins.getJobs().get(jobName);
    job.set({ci_url: 'https://builds.apache.org'});

    ok(job instanceof JR.Job, "Jobs contains the Job with id='" + jobName + "'");
    equal(job.getUrl(), "https://builds.apache.org/job/ActiveMQ/");
    equal(job.getName(), "ActiveMQ");
    equal(job.getColor(), "red");
    equal(job.url(), "https://builds.apache.org/job/ActiveMQ/api/json");
});