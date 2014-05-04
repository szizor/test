var r,
ReportsWidget = {
    settings: {
        polygonId: null,
        articleList: $("#article-list"),
        moreButton: $("#more-button")
    },
    init: function() {
        r = this.settings;
        this.bindEvents();
    },
    bindEvents: function() {
        s.polygonSelect.on("change", function() {
          ReportsWidget.getReport(s.numArticles);
        });
    },
    getReport: function(id) {
    // $.ajax or something
    // using id as param
    },

    dataProcessing: function (data) {

    },

    renderGraph: function (type, data, element) {

    }

}

// var reports = {
//     el: {
//         body: $("body")
//     },
//     timer: 0,
//     init: function() {
//         reports.bindEvents();
//     },

//     bindEvents: function() {
//     },

//     requestJson: function() {

//     },

//     dataProcessing: function (data) {

//     },

//     renderGraph: function (type, data, element) {

//     }
// }

// reports.init();