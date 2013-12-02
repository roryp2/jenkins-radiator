// Build Metrics
JR.BuildMetrics = Backbone.Model.extend({
    defaults: {
        passingJobCount: 0,
        failingJobCount: 0,
        buildingJobCount: 0,
        disabledJobCount: 0
    }
});