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
        
            ReportsWidget.getReport("1");
    },
    getReport: function (id) {
        $.ajax({
            url: '/api/v1/reports/get_polygon/' + id,
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

        var contempladoGraphData = [{
            key: "Cumulative Return",
            values: [{
                "label": "2014",
                    "value": 0
            }, {
                "label": "2015",
                    "value": 0
            }]
        }];
        var contempladoGraphDataTemp = {};
        contempladoGraphDataTemp["2014"] = 0;
        contempladoGraphDataTemp["2015"] = 0;

        array['2014'].map(function (a) {
            contempladoGraphDataTemp["2014"] += a.contemplado
        })
        array['2015'].map(function (a) {
            contempladoGraphDataTemp["2015"] += a.contemplado
        })
        // array['2016'].map(function (a) {
        //     contempladoGraphDataTemp["2016"] += a.contemplado
        // })
        contempladoGraphData[0].values[0].value = contempladoGraphDataTemp["2014"];
        contempladoGraphData[0].values[1].value = contempladoGraphDataTemp["2015"];
        // contempladoGraphData[0].values[2].value = contempladoGraphDataTemp["2016"];

        var ageGraphChart;
////////////////////////////
        var gestionadoGraphData = [{
            key: "Cumulative Return",
            values: [{
                "label": "2014",
                    "value": 0
            }, {
                "label": "2015",
                    "value": 0
            }]
        }];
        var gestionadoGraphDataTemp = {};
        gestionadoGraphDataTemp["2014"] = 0;
        gestionadoGraphDataTemp["2015"] = 0;

        array['2014'].map(function (a) {
            gestionadoGraphDataTemp["2014"] += a.gestionado
        })
        array['2015'].map(function (a) {
            gestionadoGraphDataTemp["2015"] += a.gestionado
        })
        // array['2016'].map(function (a) {
        //     gestionadoGraphDataTemp["2016"] += a.gestionado
        // })
        gestionadoGraphData[0].values[0].value = gestionadoGraphDataTemp["2014"];
        gestionadoGraphData[0].values[1].value = gestionadoGraphDataTemp["2015"];
        // gestionadoGraphData[0].values[2].value = gestionadoGraphDataTemp["2016"];

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
        var actoresGraphDataTemp = {};
        actoresGraphDataTemp["2014"] = 0;
        actoresGraphDataTemp["2015"] = 0;

        array['2014'].map(function (a) {
            actoresGraphDataTemp["2014"] += a.actores
        })
        array['2015'].map(function (a) {
            actoresGraphDataTemp["2015"] += a.actores
        })
        actoresGraphData[0].values[0].value = actoresGraphDataTemp["2014"];
        actoresGraphData[0].values[1].value = actoresGraphDataTemp["2015"];

////////////////////////////
        var tipoActorTemp = [];
        var tipoActorCount = {};
        var tipoActorGraphData = [{
            "label": "Iniciativa privada",
                "value": 0
        }, {
            "label": "Gobierno",
                "value": 0
        }, {
            "label": "Organización de la sociedad civil",
                "value": 0
        }, {
            "label": "Instituciones de educación",
                "value": 0
        }, {
            "label": "Iglesias",
                "value": 0
        },  {
            "label": "Personas",
                "value": 0
        }];
        array.actores.map(function (a) {
            if (a.tipo in tipoActorCount) tipoActorCount[a.tipo]++;
            else tipoActorCount[a.tipo] = 1;
        })
        tipoActorGraphData[0].value = tipoActorCount["Iniciativa privada"]|| 0;
        tipoActorGraphData[1].value = tipoActorCount["Gobierno"]|| 0;
        tipoActorGraphData[2].value = tipoActorCount["Organización de la sociedad civil"]|| 0;
        tipoActorGraphData[3].value = tipoActorCount["Instituciones de educación"]|| 0;
        tipoActorGraphData[4].value = tipoActorCount["Iglesias"]|| 0;
        tipoActorGraphData[5].value = tipoActorCount["Personas"] || 0;
////////////////////////////   
        var polygonsGraphData = [{
            key: "Cumulative Return",
            values: [{
                "label": "2014",
                    "value": 0
            }, {
                "label": "2015",
                    "value": 0
            }]
        }];
        var polygonsGraphDataTemp = {};
        polygonsGraphDataTemp["2014"] = 0;
        polygonsGraphDataTemp["2015"] = 0;

        array['2014'].map(function (a) {
            polygonsGraphDataTemp["2014"] += 1
        })
        array['2015'].map(function (a) {
            polygonsGraphDataTemp["2015"] += 1
        })
        polygonsGraphData[0].values[0].value = polygonsGraphDataTemp["2014"];
        polygonsGraphData[0].values[1].value = polygonsGraphDataTemp["2015"];  
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
        var poblacionGraphDataTemp = {};
        poblacionGraphDataTemp["2014"] = 0;
        poblacionGraphDataTemp["2015"] = 0;

        array['2014'].map(function (a) {
            poblacionGraphDataTemp["2014"] += a.poblacion
        })
        array['2015'].map(function (a) {
            poblacionGraphDataTemp["2015"] += a.poblacion
        })
        poblacionGraphData[0].values[0].value = poblacionGraphDataTemp["2014"];
        poblacionGraphData[0].values[1].value = poblacionGraphDataTemp["2015"];  
////////////////////////////   
        var beneficiadaGraphData = [{
            key: "Cumulative Return",
            values: [{
                "label": "2014",
                    "value": 0
            }, {
                "label": "2015",
                    "value": 0
            }]
        }];
        var beneficiadaGraphDataTemp = {};
        beneficiadaGraphDataTemp["2014"] = 0;
        beneficiadaGraphDataTemp["2015"] = 0;

        array['2014'].map(function (a) {
            beneficiadaGraphDataTemp["2014"] += a.beneficiada
        })
        array['2015'].map(function (a) {
            beneficiadaGraphDataTemp["2015"] += a.beneficiada
        })
        beneficiadaGraphData[0].values[0].value = beneficiadaGraphDataTemp["2014"];
        beneficiadaGraphData[0].values[1].value = beneficiadaGraphDataTemp["2015"];  
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
        var usuariosGraphDataTemp = {};
        usuariosGraphDataTemp["2014"] = 0;
        usuariosGraphDataTemp["2015"] = 0;

        array['2014'].map(function (a) {
            usuariosGraphDataTemp["2014"] += a.usuarios
        })
        array['2015'].map(function (a) {
            usuariosGraphDataTemp["2015"] += a.usuarios
        })
        usuariosGraphData[0].values[0].value = usuariosGraphDataTemp["2014"];
        usuariosGraphData[0].values[1].value = usuariosGraphDataTemp["2015"];  
////////////////////////////  
        var ideasGraphData = [{
            key: "Cumulative Return",
            values: [{
                "label": "2014",
                    "value": 0
            }, {
                "label": "2015",
                    "value": 0
            }]
        }];
        var ideasGraphDataTemp = {};
        ideasGraphDataTemp["2014"] = 0;
        ideasGraphDataTemp["2015"] = 0;

        array['2014'].map(function (a) {
            ideasGraphDataTemp["2014"] += a.alternatives
        })
        array['2015'].map(function (a) {
            ideasGraphDataTemp["2015"] += a.alternatives
        })
        ideasGraphData[0].values[0].value = ideasGraphDataTemp["2014"];
        ideasGraphData[0].values[1].value = ideasGraphDataTemp["2015"];  
////////////////////////////  
        var numProblemGraphData = [];
        array.problemas_planeados.map(function (a) {
            numProblemGraphData.push(a);
        })
////////////////////////////         
        var ejecucionGraphData = [];
        array.problemas_ejecucion.map(function (a) {
            ejecucionGraphData.push(a);
        })
////////////////////////////         
        var finalizadosGraphData = [];
        array.problemas_finalizados.map(function (a) {
            finalizadosGraphData.push(a);
        })        
//////////////////////////// 
        var eficaciaGraphData = [{
            "label": "Proyectos planeados",
                "value": 0
        }, {
            "label": "Proyectos finalizados",
                "value": 0
        }];
        var eficaciaGraphDataTemp = {};
        eficaciaGraphDataTemp["Proyectos planeados"] = 0;
        eficaciaGraphDataTemp["Proyectos finalizados"] = 0;

        array.problemas_planeados.map(function (a) {
            eficaciaGraphDataTemp["Proyectos planeados"] += a.value
        })
        array.problemas_finalizados.map(function (a) {
            eficaciaGraphDataTemp["Proyectos finalizados"] += a.value
        })
        eficaciaGraphData[0].value = eficaciaGraphDataTemp["Proyectos planeados"];
        eficaciaGraphData[1].value = eficaciaGraphDataTemp["Proyectos finalizados"];     
////////////////////////////
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
        var solucionesGraphData = [{
            key: "Cumulative Return",
            values: [{
                "label": "2014",
                    "value": 0
            }, {
                "label": "2015",
                    "value": 0
            }]
        }];
        var solucionesGraphDataTemp = {};
        solucionesGraphDataTemp["2014"] = 0;
        solucionesGraphDataTemp["2015"] = 0;

        array['2014'].map(function (a) {
            solucionesGraphDataTemp["2014"] += a.soluciones
        })
        array['2015'].map(function (a) {
            solucionesGraphDataTemp["2015"] += a.soluciones
        })
        solucionesGraphData[0].values[0].value = solucionesGraphDataTemp["2014"];
        solucionesGraphData[0].values[1].value = solucionesGraphDataTemp["2015"];  
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
        var eventosGraphDataTemp = {};
        eventosGraphDataTemp["2014"] = 0;
        eventosGraphDataTemp["2015"] = 0;

        array['2014'].map(function (a) {
            eventosGraphDataTemp["2014"] += a.eventos
        })
        array['2015'].map(function (a) {
            eventosGraphDataTemp["2015"] += a.eventos
        })
        eventosGraphData[0].values[0].value = eventosGraphDataTemp["2014"];
        eventosGraphData[0].values[1].value = eventosGraphDataTemp["2015"];  
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

            d3.select("#precontempladoGraph svg")
                .datum(contempladoGraphData)
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

            d3.select("#pregestionadoGraph svg")
                .datum(gestionadoGraphData)
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
        nv.addGraph(function () {
            var chart = nv.models.pieChart()
                .x(function (d) {
                return d.label
            })
                .y(function (d) {
                return d.value
            })
                .showLabels(true);

            chart.valueFormat(d3.format('f'))

            d3.select("#actorestipoGraph svg")
                .datum(tipoActorGraphData)
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

            d3.select("#polygonsGraph svg")
                .datum(polygonsGraphData)
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

            d3.select("#poblacionGraph svg")
                .datum(poblacionGraphData)
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

            d3.select("#beneficiadosGraph svg")
                .datum(beneficiadaGraphData)
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

            d3.select("#validadosGraph svg")
                .datum(solucionesGraphData)
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

            d3.select("#identificadosGraph svg")
                .datum(usuariosGraphData)
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
                .showLabels(true);

            chart.valueFormat(d3.format('f'))

            d3.select("#totalGraph svg")
                .datum(numProblemGraphData)
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
                .showLabels(true);

            chart.valueFormat(d3.format('f'))

            d3.select("#ejecucionGraph svg")
                .datum(ejecucionGraphData)
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
                .showLabels(true);

            chart.valueFormat(d3.format('f'))

            d3.select("#finalizadosGraph svg")
                .datum(finalizadosGraphData)
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
                .showLabels(true);

            chart.valueFormat(d3.format('f'))

            d3.select("#eficaciaGraph svg")
                .datum(eficaciaGraphData)
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

            d3.select("#subCatGraph svg")
                .datum(subcategoriasGraphData)
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

            d3.select("#ideasGraph svg")
                .datum(ideasGraphData)
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
    }

}