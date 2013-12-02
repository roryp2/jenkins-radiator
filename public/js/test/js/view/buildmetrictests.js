module("view/buildmetric");
test("Build metric view constructor", function () {
    var view = new JR.BuildMetricView();
    ok(view);
});

test("Build metric view constructor", function () {
    var view = new JR.BuildMetricView();
    ok(view);
    view.render();
});

test("Build metric view renders and has expected title", function () {
    var view = new JR.BuildMetricView({"title": "Passing", "count": 1});
    equal(view.options.title, "Passing");
    equal(view.options.count, 1);
    ok(view);
    view.render();
    ok(JR.ViewHelpers.viewContains(view.el, "Passing"));
});

test("Build metric view renders and outputs expected content", function () {
    var view = new JR.BuildMetricView({"title": "Passing", "count": 1});
    equal(view.options.title, "Passing");
    equal(view.options.count, 1);
    ok(view);
    view.render();
    ok(JR.ViewHelpers.viewEquals(view.el, "<h1>Passing</h1><p>1</p>"));
});