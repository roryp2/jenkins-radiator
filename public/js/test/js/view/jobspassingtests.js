module("view/jobspassing");
test("Job view renders and has expected title", function () {
    var view = new JR.JobsPassingView();
    ok(view);
    view.render();
    ok(JR.ViewHelpers.viewContains(view.el, "icon"));
});