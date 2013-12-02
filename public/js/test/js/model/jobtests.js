module("model/job",
    {
        teardown: function () {
            Backbone.Relational.store = new Backbone.Store();
        }
    }
);

test("Empty constructor", function () {
    var job = new JR.Job();
    ok(job);
});

test("Job Abdera-trunk from json is valid", function () {
    var job = new JR.Job(json.jobs[0]);
    ok(job);
    equal(job.getName(), 'Abdera-trunk');
    equal(job.getColor(), "aborted");
    ok(job.isAborted());
});

test("Job Abdera2-trunk from json is valid", function () {
    var job = new JR.Job(json.jobs[1]);
    ok(job);
    ok(job.isValid());
    equal(job.getName(), 'Abdera2-trunk');
    equal(job.getColor(), "red_anime");
    ok(job.isFailing());
    ok(job.isBuilding());
});

test("Job Accumulo-1.3.x from json is valid", function () {
    var job = new JR.Job(json.jobs[2]);
    ok(job);
    ok(job.isValid());
    equal(job.getName(), 'Accumulo-1.3.x');
    equal(job.getColor(), "disabled");
    ok(job.isDisabled());
});

test("Job Accumulo-1.4.x from json is valid", function () {
    var job = new JR.Job(json.jobs[3]);
    ok(job);
    ok(job.isValid());
    equal(job.getName(), 'Accumulo-1.4.x');
    equal(job.getColor(), "blue");
    ok(job.isPassing());
});

test("Job Accumulo-trunk from json is valid", function () {
    var job = new JR.Job(json.jobs[4]);
    ok(job);
    ok(job.isValid());
    equal(job.getName(), 'Accumulo-Trunk');
    equal(job.getColor(), "blue");
    ok(job.isPassing());
});

test("Job ACE-trunk from json is valid", function () {
    var job = new JR.Job(json.jobs[5]);
    ok(job);
    ok(job.isValid());
    equal(job.getName(), 'ACE-trunk');
    equal(job.getColor(), "yellow");
    ok(job.isUnstable());
});

test("Job ActiveMQ from json is valid", function () {
    var job = new JR.Job(json.jobs[6]);
    ok(job);
    ok(job.isValid());
    equal(job.getName(), 'ActiveMQ');
    equal(job.getColor(), "red");
    ok(job.isFailing());
});

test("Job ZooKeeper_branch34_solaris from json is valid", function () {
    var job = new JR.Job(json.jobs[7]);
    ok(job);
    ok(job.isValid());
    equal(job.getName(), 'ZooKeeper_branch34_solaris');
    equal(job.getColor(), "blue_anime");
    ok(job.isPassing());
    ok(job.isBuilding());
});


test("Job with unknown color is not valid", function () {
    try {
        var job = new JR.Job({name: 'Invalid job', color: 'unknown', url: 'http:/foo.bar'});
        console.log("job.isValid(): " + job.isValid());
        ok(!job.isValid(), "Must not get here");
    } catch (err) {
        ok(err);
    }
});