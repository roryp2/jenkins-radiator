// This represents the Build Server, which reports multiple jobs, their builds etc.
JR.BuildServer = Backbone.RelationalModel.extend({
    idAttribute: 'url',

    url: function () {
        return this.get('ci_url') + '/api/json';
    },

    sync: function (method, model, options) {
        return $.ajax(_.extend({
            type: 'GET',
            dataType: 'jsonp',
            processData: true,
            url: '/jenkins?jsonp=?&server=' + this.url()
        }, options));
    },

    relations: [
        {
            type: Backbone.HasMany,
            key: 'jobs',
            relatedModel: 'JR.Job'
        }
    ],

    getMode: function () {
        return this.get('mode');
    },

    getJobs: function () {
        return this.get('jobs');
    }
});