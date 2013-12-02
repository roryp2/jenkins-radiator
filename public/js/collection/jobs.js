// This represents jobs as listed by the Jenkins JSON API
JR.JobCollection = Backbone.Collection.extend({
    model: JR.Job
});