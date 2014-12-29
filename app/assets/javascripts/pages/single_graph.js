Array.prototype.unique = function () {
    var o = {}, i, l = this.length,
        r = [];
    for (i = 0; i < l; i += 1) o[this[i]] = this[i];
    for (i in o) r.push(o[i]);
    return r;
};
var r,
ReportsWidget = {
    settings: {
        polygonId: null,
        polygonSelect: $("#polygonSelect"),
        moreButton: $("#more-button")
    },
    init: function () {
        r = this.settings;
        this.bindEvents();
    },
    bindEvents: function () {
            ReportsWidget.getReport(polygon_id);
    },
    getReport: function (id) {
        $.ajax({
            url: '/api/v1/reports/get_single_polygon/' + id,
            method: 'GET',
            success: function (response) {
                ReportsWidget.renderGraph(response);
            },
            error: function (response) {
                alert('Error!');
            }
        });
    },

    renderGraph: function (array) {

        var eficaciaGraphData = [{
            key: "Cumulative Return",
            values: [{
                "label": "2014",
                    "value": 0
            }, {
                "label": "2015",
                    "value": 0
            }]
        }];
        eficaciaGraphData[0].values[0].value = array['2014'].eficacia;
        eficaciaGraphData[0].values[1].value = array['2015'].eficacia;
        var ageGraphChart;
////////////////////////////
        var gestionGraphData = [{
            key: "Cumulative Return",
            values: [{
                "label": "2014",
                    "value": 0
            }, {
                "label": "2015",
                    "value": 0
            }]
        }];
        gestionGraphData[0].values[0].value = array['2014'].gestion;
        gestionGraphData[0].values[1].value = array['2015'].gestion;
////////////////////////////
        var poblacionGraphData = [{
            key: "Cumulative Return",
            values: [{
                "label": "2014",
                    "value": 0
            }, {
                "label": "2015",
                    "value": 0
            }]
        }];
        poblacionGraphData[0].values[0].value = array['2014'].poblacion;
        poblacionGraphData[0].values[1].value = array['2015'].poblacion;
////////////////////////////
       
        var distribucionGraphData = [{
            key: "Cumulative Return",
            values: [{
                "label": "2014",
                    "value": 0
            }, {
                "label": "2015",
                    "value": 0
            }]
        }];
        distribucionGraphData[0].values[0].value = array['2014'].distribucion;
        distribucionGraphData[0].values[1].value = array['2015'].distribucion;
////////////////////////////
        var actoresGraphData = [{
            key: "Cumulative Return",
            values: [{
                "label": "2014",
                    "value": 0
            }, {
                "label": "2015",
                    "value": 0
            }]
        }];
        actoresGraphData[0].values[0].value = array['2014'].actores;
        actoresGraphData[0].values[1].value = array['2015'].actores;
///////////////////
        var distribucion_actoresGraphData = [];
        array['distribucion'].map(function (a) {
            distribucion_actoresGraphData.push(a);
        })           
////////////////////////////
        nv.addGraph(function () {
            var chart = nv.models.discreteBarChart()
                .x(function (d) {
                return d.label
            })
                .y(function (d) {
                return d.value
            })
                .staggerLabels(true)
                .tooltips(false)
                .showValues(true);

            chart.valueFormat(d3.format('f'))

            d3.select("#distribucionGraph svg")
                .datum(distribucionGraphData)
                .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);
            ageGraphChart = chart;

            return chart;
        });

        nv.addGraph(function () {
            var chart = nv.models.discreteBarChart()
                .x(function (d) {
                return d.label
            })
                .y(function (d) {
                return d.value
            })
                .staggerLabels(true)
                .tooltips(false)
                .showValues(true);

            chart.valueFormat(d3.format('f'))

            d3.select("#actoresGraph svg")
                .datum(actoresGraphData)
                .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);
            ageGraphChart = chart;

            return chart;
        });

///////////////////    
        var categoriasGraphData = [];
        array.categorias.map(function (a) {
            categoriasGraphData.push(a);
        })       
//////////////////////////// 
        var subcategoriasGraphData = [];
        array.subcategorias.map(function (a) {
            subcategoriasGraphData.push(a);
        })       
//////////////////////////// 
       var tipoEventoGraphData = [];
        array.events.map(function (a) {
            tipoEventoGraphData.push(a);
        })       
//////////////////////////// 
        var usuariosGraphData = [{
            key: "Cumulative Return",
            values: [{
                "label": "2014",
                    "value": 0
            }, {
                "label": "2015",
                    "value": 0
            }]
        }];
        usuariosGraphData[0].values[0].value = array['2014'].problemas;
        usuariosGraphData[0].values[1].value = array['2015'].problemas;
////////////////////////////
        var convocaGraphData = [{
            key: "Cumulative Return",
            values: [{
                "label": "2014",
                    "value": 0
            }, {
                "label": "2015",
                    "value": 0
            }]
        }];
        convocaGraphData[0].values[0].value = array['2014'].convoca;
        convocaGraphData[0].values[1].value = array['2015'].convoca;
////////////////////////////
        var eventosGraphData = [{
            key: "Cumulative Return",
            values: [{
                "label": "2014",
                    "value": 0
            }, {
                "label": "2015",
                    "value": 0
            }]
        }];
        eventosGraphData[0].values[0].value = array['2014'].eventos;
        eventosGraphData[0].values[1].value = array['2015'].eventos;
////////////////////////////
        var projectsGraphData = [{
            key: "Cumulative Return",
            values: [{
                "label": "2014",
                    "value": 0
            }, {
                "label": "2015",
                    "value": 0
            }]
        }];
        projectsGraphData[0].values[0].value = array['2014'].projects;
        projectsGraphData[0].values[1].value = array['2015'].projects;
////////////////////////////
        var adminGraphData = [{
            key: "Cumulative Return",
            values: [{
                "label": "2014",
                    "value": 0
            }, {
                "label": "2015",
                    "value": 0
            }]
        }];
        adminGraphData[0].values[0].value = array['2014'].admin;
        adminGraphData[0].values[1].value = array['2015'].admin;
////////////////////////////
        var planeadosGraphData = [{
            key: "Cumulative Return",
            values: [{
                "label": "2014",
                    "value": 0
            }, {
                "label": "2015",
                    "value": 0
            }]
        }];
        planeadosGraphData[0].values[0].value = array['2014'].planeados;
        planeadosGraphData[0].values[1].value = array['2015'].planeados;
////////////////////////////
        var executionGraphData = [{
            key: "Cumulative Return",
            values: [{
                "label": "2014",
                    "value": 0
            }, {
                "label": "2015",
                    "value": 0
            }]
        }];
        executionGraphData[0].values[0].value = array['2014'].execution;
        executionGraphData[0].values[1].value = array['2015'].execution;
////////////////////////////
        var finalizedGraphData = [{
            key: "Cumulative Return",
            values: [{
                "label": "2014",
                    "value": 0
            }, {
                "label": "2015",
                    "value": 0
            }]
        }];
        finalizedGraphData[0].values[0].value = array['2014'].finalized;
        finalizedGraphData[0].values[1].value = array['2015'].finalized;
////////////////////////////
        var finalizacionGraphData = [{
            key: "Cumulative Return",
            values: [{
                "label": "2014",
                    "value": 0
            }, {
                "label": "2015",
                    "value": 0
            }]
        }];
        finalizacionGraphData[0].values[0].value = array['2014'].finalizacion;
        finalizacionGraphData[0].values[1].value = array['2015'].finalizacion;
////////////////////////////
        nv.addGraph(function () {
            var chart = nv.models.discreteBarChart()
                .x(function (d) {
                return d.label
            })
                .y(function (d) {
                return d.value
            })
                .staggerLabels(true)
                .tooltips(false)
                .showValues(true);

            chart.valueFormat(d3.format('f'))

            d3.select("#finalizacionGraph svg")
                .datum(finalizacionGraphData)
                .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);
            ageGraphChart = chart;

            return chart;
        });
        nv.addGraph(function () {
            var chart = nv.models.discreteBarChart()
                .x(function (d) {
                return d.label
            })
                .y(function (d) {
                return d.value
            })
                .staggerLabels(true)
                .tooltips(false)
                .showValues(true);

            chart.valueFormat(d3.format('f'))

            d3.select("#executionGraph svg")
                .datum(executionGraphData)
                .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);
            ageGraphChart = chart;

            return chart;
        });
        nv.addGraph(function () {
            var chart = nv.models.discreteBarChart()
                .x(function (d) {
                return d.label
            })
                .y(function (d) {
                return d.value
            })
                .staggerLabels(true)
                .tooltips(false)
                .showValues(true);

            chart.valueFormat(d3.format('f'))

            d3.select("#finalizedGraph svg")
                .datum(finalizedGraphData)
                .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);
            ageGraphChart = chart;

            return chart;
        });
        nv.addGraph(function () {
            var chart = nv.models.discreteBarChart()
                .x(function (d) {
                return d.label
            })
                .y(function (d) {
                return d.value
            })
                .staggerLabels(true)
                .tooltips(false)
                .showValues(true);

            chart.valueFormat(d3.format('f'))

            d3.select("#planeadosGraph svg")
                .datum(planeadosGraphData)
                .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);
            ageGraphChart = chart;

            return chart;
        });
        nv.addGraph(function () {
            var chart = nv.models.discreteBarChart()
                .x(function (d) {
                return d.label
            })
                .y(function (d) {
                return d.value
            })
                .staggerLabels(true)
                .tooltips(false)
                .showValues(true);

            chart.valueFormat(d3.format('f'))

            d3.select("#projectsGraph svg")
                .datum(projectsGraphData)
                .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);
            ageGraphChart = chart;

            return chart;
        });
        nv.addGraph(function () {
            var chart = nv.models.pieChart()
                .x(function (d) {
                return d.label
            })
                .y(function (d) {
                return d.value
            })
                .showLabels(true).labelType("percent");

            chart.valueFormat(d3.format('f'))

            d3.select("#tipoEventoGraph svg")
                .datum(tipoEventoGraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            manyKidsGraphChart = chart;

            return chart;
        }); 

        nv.addGraph(function () {
            var chart = nv.models.discreteBarChart()
                .x(function (d) {
                return d.label
            })
                .y(function (d) {
                return d.value
            })
                .staggerLabels(true)
                .tooltips(false)
                .showValues(true);

            chart.valueFormat(d3.format('f'))

            d3.select("#usuariosGraph svg")
                .datum(usuariosGraphData)
                .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);
            ageGraphChart = chart;

            return chart;
        });
        nv.addGraph(function () {
            var chart = nv.models.discreteBarChart()
                .x(function (d) {
                return d.label
            })
                .y(function (d) {
                return d.value
            })
                .staggerLabels(true)
                .tooltips(false)
                .showValues(true);

            chart.valueFormat(d3.format('f'))

            d3.select("#convocaGraph svg")
                .datum(convocaGraphData)
                .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);
            ageGraphChart = chart;

            return chart;
        });
        nv.addGraph(function () {
            var chart = nv.models.discreteBarChart()
                .x(function (d) {
                return d.label
            })
                .y(function (d) {
                return d.value
            })
                .staggerLabels(true)
                .tooltips(false)
                .showValues(true);

            chart.valueFormat(d3.format('f'))

            d3.select("#adminGraph svg")
                .datum(adminGraphData)
                .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);
            ageGraphChart = chart;

            return chart;
        });
        nv.addGraph(function () {
            var chart = nv.models.discreteBarChart()
                .x(function (d) {
                return d.label
            })
                .y(function (d) {
                return d.value
            })
                .staggerLabels(true)
                .tooltips(false)
                .showValues(true);

            chart.valueFormat(d3.format('f'))

            d3.select("#eventosGraph svg")
                .datum(eventosGraphData)
                .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);
            ageGraphChart = chart;

            return chart;
        });
        nv.addGraph(function () {
            var chart = nv.models.discreteBarChart()
                .x(function (d) {
                return d.label
            })
                .y(function (d) {
                return d.value
            })
                .staggerLabels(true)
                .tooltips(false)
                .showValues(true);

            chart.valueFormat(d3.format('f'))

            d3.select("#eficaciaGraph svg")
                .datum(eficaciaGraphData)
                .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);
            ageGraphChart = chart;

            return chart;
        });

        nv.addGraph(function () {
            var chart = nv.models.discreteBarChart()
                .x(function (d) {
                return d.label
            })
                .y(function (d) {
                return d.value
            })
                .staggerLabels(true)
                .tooltips(false)
                .showValues(true);

            chart.valueFormat(d3.format('f'))

            d3.select("#gestionGraph svg")
                .datum(gestionGraphData)
                .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);
            ageGraphChart = chart;

            return chart;
        });
        nv.addGraph(function () {
            var chart = nv.models.pieChart()
                .x(function (d) {
                return d.label
            })
                .y(function (d) {
                return d.value
            })
                .showLabels(true).labelType("percent");

            chart.valueFormat(d3.format('f'))

            d3.select("#distribucion_actoresGraph svg")
                .datum(distribucion_actoresGraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            manyKidsGraphChart = chart;

            return chart;
        }); 
         nv.addGraph(function () {
            var chart = nv.models.discreteBarChart()
                .x(function (d) {
                return d.label
            })
                .y(function (d) {
                return d.value
            })
                .staggerLabels(true)
                .tooltips(false)
                .showValues(true);

            chart.valueFormat(d3.format('f'))

            d3.select("#poblacionGraph svg")
                .datum(poblacionGraphData)
                .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);
            ageGraphChart = chart;

            return chart;
        });
        nv.addGraph(function () {
            var chart = nv.models.pieChart()
                .x(function (d) {
                return d.label
            })
                .y(function (d) {
                return d.value
            })
                .showLabels(true).labelType("percent");

            chart.valueFormat(d3.format('f'))

            d3.select("#categoriasGraph svg")
                .datum(categoriasGraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            manyKidsGraphChart = chart;

            return chart;
        });
        nv.addGraph(function () {
            var chart = nv.models.pieChart()
                .x(function (d) {
                return d.label
            })
                .y(function (d) {
                return d.value
            })
                .showLabels(true).labelType("percent");

            chart.valueFormat(d3.format('f'))

            d3.select("#subcategoriasGraphData svg")
                .datum(subcategoriasGraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            manyKidsGraphChart = chart;

            return chart;
        }); 
////////////////////////////   
    }

}