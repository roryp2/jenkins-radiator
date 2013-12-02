JR.RadiatorTitleView = Backbone.View.extend({
    className: "radiator-title-wrapper row-fluid",
    initialize: function(){
        _.bindAll(this, 'loading');
        this.bind('loading', this.loading);
        _.bindAll(this, 'loaded');
        this.bind('loaded', this.loaded);

        this.render();
    },

    loading: function(){
        console.info("Loading...");
        $('#radiator-loading-indicator').show();
    },

    loaded: function(){
        console.info("...Loaded");
        $('#radiator-loading-indicator').hide();
    },

    render: function(){
        var template =
            '<div class="span12 radiator-title">' +
            '<h1 id="radiatorTitle">{{radiatorTitle}}</h1>' +
            '</div>' +
            '<div id="radiator-loading-indicator"><img src="img/ajax-loader.gif"/></div>',
            json = this.model,
            output = Mustache.to_html(template, json);

        $(this.el).html(output);
        $('#title').html(this.el);
        $(document).attr('title',this.model.radiatorTitle);

        return this;
    }
});