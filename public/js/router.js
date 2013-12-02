JR.AppRouter = Backbone.Router.extend({
    routes: {
        "": "help",
        "help": "help",
        "builds/:configIdx": "builds",  // #builds/0
        "radiator/:configIdx": "radiator"  // #radiator/0
    },
    timers: [],

    clearAppUI: function () {
        $('body').css("background-color", 'white');
        $('#container').html("");
        $('#footer').hide();
        $('#title').hide();

        _.each(this.timers, function (timer) {
            window.clearInterval(timer);
        }, this);

        this.timers = [];
    },

    builds: function (configIdx) {
        this.clearAppUI();

        this.selectConfig(configIdx);
        var titleView = new JR.RadiatorTitleView({model: config});

        var model = new JR.BuildServer();
        var buildServerView = new JR.BuildServerView({model: model});
        titleView.trigger('loading');

        model.fetch({
            success: function (model, response) {
                console.info("Fetched build server model");
                buildServerView.render();
                titleView.trigger('loaded');
            },
            error: function (model, response) {
                console.error("Fetching build server model failed, radiator view not rendered. Model: " + JSON.stringify(model) + ", response: " + JSON.stringify(response));
            }
        });
    },

    help: function () {
        this.clearAppUI();
        var helpView = new JR.HelpView({el: $('#container'), configs: configs});
        helpView.render();
    },

    radiator: function (configIdx) {
        this.clearAppUI();
        this.selectConfig(configIdx);

        var titleView = new JR.RadiatorTitleView({model: config});
        $('#title').show();

        var buildServers = new JR.BuildServerCollection();

        _.each(config.ci_json_url, function (url) {
            buildServers.push(new JR.BuildServer({
                ci_url: url
            }));
        }, this);

        var radiator = new JR.Radiator({
            "buildServers": buildServers,
            "includeFilter": config.includeFilter,
            "excludeFilter": config.excludeFilter
        });

        var radiatorView = new JR.RadiatorView({el: $('#container'), model: radiator});
        $('#footer').show();

        var fetchAndRender = function () {
            titleView.trigger('loading');
            buildServers.each(function (buildServer) {
                buildServer.fetch({success: function (model, response) {
                    console.info("Fetched build server model: " + model.url());
                    var updatedBuildServers = radiator.get('buildServers');

                    updatedBuildServers.push(buildServer);
                    radiator.set('buildServers', updatedBuildServers);

                    titleView.trigger('loaded');
                    radiator.trigger('change');
                }, error: function (model, response) {
                    console.error("Fetching build server model failed, radiator view not rendered. Model: " + JSON.stringify(model) + ", response: " + JSON.stringify(response));
                }});
            }, this);
        };

        fetchAndRender();
        this.timers.push(setInterval(fetchAndRender, config.refresh_interval));
    },

    selectConfig: function (configIdx) {
        var idx = parseInt(configIdx, 10);
        if (idx) {
            if (idx >= configs.length) {
                idx = 0;
            } else if (idx < 0) {
                idx = 0;
            }
            config = configs[idx];
        }
    }
});