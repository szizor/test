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
var ageGraphChart,
    acknowldgeGraphChart,
    withWhomYouLiveGraphChart,
    manyKidsGraphChart,
    jobGraphChart,
    genreGraphChart;

nv.addGraph(function() {
  var chart = nv.models.pieChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .showLabels(true);

      chart.valueFormat(d3.format('f'))

    d3.select("#acknowldgeGraph svg")
        .datum(acknowldgeGraphData)
      .transition().duration(1200)
        .call(chart);

    nv.utils.windowResize(chart.update);
    acknowldgeGraphChart = chart;

  return chart;
});

nv.addGraph(function() {
  var chart = nv.models.pieChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .showLabels(true);

    chart.valueFormat(d3.format('f'))

    d3.select("#genreGraph svg")
        .datum(genreGraphData)
      .transition().duration(1200)
        .call(chart);

    nv.utils.windowResize(chart.update);
    genreGraphChart = chart;

  return chart;
});

nv.addGraph(function() {
  var chart = nv.models.discreteBarChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .staggerLabels(true)
      .tooltips(false)
      .showValues(true);

  chart.valueFormat(d3.format('f'))

  d3.select("#ageGraph svg")
      .datum(agesGraphData)
    .transition().duration(500)
      .call(chart);

  nv.utils.windowResize(chart.update);
  ageGraphChart = chart;

  return chart;
});

nv.addGraph(function() {
  var chart = nv.models.discreteBarChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .margin({bottom: 150})
      .tooltips(false)
      .showValues(true);

  chart.valueFormat(d3.format('f'));
  chart.xAxis.rotateLabels(-45);

  d3.select("#withWhomYouLiveGraph svg")
      .datum(withWhomYouLiveData)
    .transition().duration(500)
      .call(chart);

  nv.utils.windowResize(chart.update);
  withWhomYouLiveGraphChart = chart;

  return chart;
});

nv.addGraph(function() {
  var chart = nv.models.pieChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .showLabels(true);

    chart.valueFormat(d3.format('f'))

    d3.select("#manyKidsGraph svg")
        .datum(manyKidsGraphData)
      .transition().duration(1200)
        .call(chart);

    nv.utils.windowResize(chart.update);
    manyKidsGraphChart = chart;

  return chart;
});

nv.addGraph(function() {
  var chart = nv.models.discreteBarChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .margin({bottom: 190})
      .tooltips(false)
      .showValues(true);

  chart.valueFormat(d3.format('f'));
  chart.xAxis.rotateLabels(-45);

  d3.select("#jobGraph svg")
      .datum(jobData)
    .transition().duration(500)
      .call(chart);

  nv.utils.windowResize(chart.update);
  jobGraphChart = chart;

  return chart;
});