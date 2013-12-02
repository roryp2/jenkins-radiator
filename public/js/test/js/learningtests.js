module("Backbone model learning");

test("isValid throws an error if validate function is not defined for model", function () {
    var MyModel = Backbone.Model.extend({
    });
    var m = new MyModel;

    ok(m);

    try {
        m.isValid();
        ok(false, "Must not get here");
    } catch (err) {
        ok(err);
    }
});

test("Validate function must return things only when the model is invalid", function () {
    var MyModel = Backbone.Model.extend({
        validate: function (attrs) {
            // Nothing here, always valid
        }
    });
    var m = new MyModel;

    ok(m);
    ok(m.isValid());
});