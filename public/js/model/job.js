// This represents a Jenkins job
JR.Job = Backbone.RelationalModel.extend({
    // Use the job url as the id
    idAttribute: "name",

    validate: function (attrs) {
        if (!this.colorIsValid(attrs.color)) {
            return "Color of job is unknown";
        }
    },

    colorIsValid: function (color) {
        return _.contains(this.jobColors.failing, color)
            || _.contains(this.jobColors.passing, color)
            || _.contains(this.jobColors.unstable, color)
            || _.contains(this.jobColors.building, color)
            || _.contains(this.jobColors.aborted, color)
            || _.contains(this.jobColors.disabled, color);
    },

    jobColors: {
        failing: ['red', 'red_anime'],
        passing: ['blue', 'blue_anime'],
        unstable: ['yellow'],
        building: ['blue_anime', 'red_anime'],
        disabled: ['grey', 'disabled'],
        aborted: ['aborted']
    },

    url: function () {
        return this.get('ci_url') + "/job/" + this.id + '/api/json';
    },

    relations: [
        {
            type: Backbone.HasMany,
            key: 'builds',
            relatedModel: 'JR.Build'
        }
    ],

    getName: function () {
        return this.get("name");
    },

    getColor: function () {
        return this.get("color");
    },

    getUrl: function () {
        return this.get("url");
    },

    getBuilds: function () {
        return this.get("builds");
    },

    isInQueue: function () {
        return this.get("inQueue");
    },

    isFailing: function () {
        return _.contains(this.jobColors.failing, this.getColor());
    },

    isPassing: function () {
        return _.contains(this.jobColors.passing, this.getColor());
    },

    isBuilding: function () {
        return _.contains(this.jobColors.building, this.getColor());
    },

    isDisabled: function () {
        return _.contains(this.jobColors.disabled, this.getColor());
    },

    isAborted: function () {
        return _.contains(this.jobColors.aborted, this.getColor());
    },

    isUnstable: function () {
        return _.contains(this.jobColors.unstable, this.getColor());
    }
});