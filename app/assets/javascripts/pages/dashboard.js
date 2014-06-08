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
        r.polygonSelect.on("change", function (e) {
            var selectedOption = $(e.target).find('option:selected');
            var str = selectedOption.text();
            var id = selectedOption.attr('value');

            if (id === 'NaN') {
                return;
            }
            $('#polygonName').html(str);
            ReportsWidget.getReport(id);
        });
    },
    getReport: function (id) {
        $.ajax({
            url: '/api/v1/reports/' + id,
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
        var survey = array.survey;

        var coloniaTemp = []
        var coloniaDataCount = {};
        var coloniaGraphData = [];

        survey.map(function (item) {
            coloniaTemp.push(item.colonia);
        });

        coloniaTemp.forEach(function (obj, objIndex) {
            if (obj === null) {
                return;
            }
            if (coloniaDataCount.hasOwnProperty(obj) === false) {
                coloniaDataCount[obj] = 0;
            } else {
                coloniaDataCount[obj] = coloniaDataCount[obj] + 1;
            }
        });

        for (var k in coloniaDataCount) {
            coloniaGraphData.push({
                "label": k,
                "value": coloniaDataCount[k]
            })
        }

        var municipioTemp = []
        var municipioDataCount = {};
        var municipioGraphData = [];

        survey.map(function (item) {
            municipioTemp.push(item.municipio);
        });

        municipioTemp.forEach(function (obj, objIndex) {
            if (obj === null) {
                return;
            }
            if (municipioDataCount.hasOwnProperty(obj) === false) {
                municipioDataCount[obj] = 0;
            } else {
                municipioDataCount[obj] = municipioDataCount[obj] + 1;
            }
        });

        for (var k in municipioDataCount) {
            municipioGraphData.push({
                "label": k,
                "value": municipioDataCount[k]
            })
        }

        var acknowldgeGraphData = [{
            "label": "Si",
                "value": 0
        }, {
            "label": "No",
                "value": 0
        }];

        var genreGraphDataTemp = {};
        var genreGraphData = [{
            "label": "Mujeres",
                "value": 0
        }, {
            "label": "Hombres",
                "value": 0
        }];

        var withWhomYouLiveDataTemp = [];
        var withWhomYouLiveDataCount = {};
        var withWhomYouLiveData = [{
            key: "",
            values: [{
                "label": "Vivo con mi madre",
                    "value": 0
            }, {
                "label": "Vivo con mi padre",
                    "value": 0
            }, {
                "label": "Vivo con mis hermanos o hermanas",
                    "value": 0
            }, {
                "label": "Vivo con mi pareja",
                    "value": 0
            }, {
                "label": "Vivo con mi(s) hijo(s)",
                    "value": 0
            }, {
                "label": "No aplica",
                    "value": 0
            }, {
                "label": "Vivo con mis suegros",
                    "value": 0
            }, {
                "label": "Vivo con amigos o amigas",
                    "value": 0
            }]
        }]

        var jobDataTemp = [];
        var jobDataCount = {};
        var jobData = [{
            key: "",
            values: [{
                "label": "Estudiante",
                    "value": 0
            }, {
                "label": "Empleada(o) de tiempo completo",
                    "value": 0
            }, {
                "label": "Otro",
                    "value": 0
            }, {
                "label": "Empleada(o) por horas",
                    "value": 0
            }, {
                "label": "Al hogar y/o cuidado de los niños en casa",
                    "value": 0
            }, {
                "label": "En este momento no tengo empleo ni estudio",
                    "value": 0
            }, {
                "label": "Tengo un negocio propio",
                    "value": 0
            }, {
                "label": "Ayudo en los quehaceres de mi casa",
                    "value": 0
            }]
        }]

        var manyKidsTemp = [];
        var manyKidsCount = {};
        var manyKidsGraphData = [{
            "label": "1",
                "value": 0
        }, {
            "label": "2",
                "value": 0
        }, {
            "label": "3",
                "value": 0
        }, {
            "label": "Más de 3",
                "value": 0
        }, {
            "label": "No tengo hijos",
                "value": 0
        }];

        var agesGraphData = [{
            key: "Cumulative Return",
            values: [{
                "label": "12-14 años",
                    "value": 0
            }, {
                "label": "15-19 años",
                    "value": 0
            }, {
                "label": "20-24 años",
                    "value": 0
            }, {
                "label": "25-29 años",
                    "value": 0
            }, {
                "label": "30-59 años",
                    "value": 0
            }, {
                "label": "mayor de 60 años",
                    "value": 0
            }]
        }];
        var agesGraphDataTemp = {};


        survey.map(function (a) {
            if (a.genero in genreGraphDataTemp) genreGraphDataTemp[a.genero]++;
            else genreGraphDataTemp[a.genero] = 1;
        })
        genreGraphData[0].value = genreGraphDataTemp["Mujer"]
        genreGraphData[1].value = genreGraphDataTemp["Hombre"]

        survey.map(function (item) {
            if (item.con_quien_vive === null) {
                return;
            }
            item.con_quien_vive.forEach(function (l) {
                withWhomYouLiveDataTemp.push(l)
            })
        });
        withWhomYouLiveDataTemp.forEach(function (obj, objIndex) {
            if (withWhomYouLiveDataCount.hasOwnProperty(obj) === false) {
                withWhomYouLiveDataCount[obj] = 0;
            } else {
                withWhomYouLiveDataCount[obj] = withWhomYouLiveDataCount[obj] + 1;
            }
        });

        withWhomYouLiveData[0].values[0].value = withWhomYouLiveDataCount["Vivo con mi madre"]
        withWhomYouLiveData[0].values[1].value = withWhomYouLiveDataCount["Vivo con mi padre"]
        withWhomYouLiveData[0].values[2].value = withWhomYouLiveDataCount["Vivo con mis hermanos o hermanas"]
        withWhomYouLiveData[0].values[3].value = withWhomYouLiveDataCount["Vivo con mi pareja"]
        withWhomYouLiveData[0].values[4].value = withWhomYouLiveDataCount["Vivo con mi(s) hijo(s)"]
        withWhomYouLiveData[0].values[5].value = withWhomYouLiveDataCount["No aplica"]
        withWhomYouLiveData[0].values[6].value = withWhomYouLiveDataCount["Vivo con mis suegros"]
        withWhomYouLiveData[0].values[7].value = withWhomYouLiveDataCount["Vivo con amigos o amigas"]


        var whatStudiesNowTemp = []
        var whatStudiesNowDataCount = {};
        var whatStudiesNowData = [{
            key: "",
            values: [{
                "label": "Carrera técnica",
                    "value": 0
            }, {
                "label": "Carrera Universitaria",
                    "value": 0
            }, {
                "label": "Curso o diplomado",
                    "value": 0
            }, {
                "label": "No aplica",
                    "value": 0
            }, {
                "label": "Oficio",
                    "value": 0
            }, {
                "label": "Preparatoria",
                    "value": 0
            }, {
                "label": "Primaria",
                    "value": 0
            }, {
                "label": "Secundaria",
                    "value": 0
            }]
        }]

        survey.map(function (item) {
            whatStudiesNowTemp.push(item.estudia);
        });

        whatStudiesNowTemp.forEach(function (obj, objIndex) {
            if (whatStudiesNowDataCount.hasOwnProperty(obj) === false) {
                whatStudiesNowDataCount[obj] = 0;
            } else {
                whatStudiesNowDataCount[obj] = whatStudiesNowDataCount[obj] + 1;
            }
        });

        whatStudiesNowData[0].values[0].value = whatStudiesNowDataCount["Carrera técnica"]
        whatStudiesNowData[0].values[1].value = whatStudiesNowDataCount["Carrera Universitaria"]
        whatStudiesNowData[0].values[2].value = whatStudiesNowDataCount["Curso o diplomado"]
        whatStudiesNowData[0].values[3].value = whatStudiesNowDataCount["No aplica"]
        whatStudiesNowData[0].values[4].value = whatStudiesNowDataCount["Oficio"]
        whatStudiesNowData[0].values[5].value = whatStudiesNowDataCount["Preparatoria"]
        whatStudiesNowData[0].values[6].value = whatStudiesNowDataCount["Primaria"]
        whatStudiesNowData[0].values[7].value = whatStudiesNowDataCount["Secundaria"]

        var leftStudiesTemp = []
        var leftStudiesDataCount = {};
        var leftStudiesGraphData = [];

        survey.map(function (item) {
            leftStudiesTemp.push(item.dejo_estudiar);
        });

        leftStudiesTemp.forEach(function (obj, objIndex) {
            if (leftStudiesDataCount.hasOwnProperty(obj) === false) {
                leftStudiesDataCount[obj] = 0;
            } else {
                leftStudiesDataCount[obj] = leftStudiesDataCount[obj] + 1;
            }
        });

        for (var k in leftStudiesDataCount) {
            leftStudiesGraphData.push({
                "label": k,
                "value": leftStudiesDataCount[k]
            })
        }

        var lastStudiesTemp = []
        var lastStudiesDataCount = {};
        var lastStudiesGraphData = [{
            key: "",
            values: []
        }];

        survey.map(function (item) {
            lastStudiesTemp.push(item.nivel);
        });

        lastStudiesTemp.forEach(function (obj, objIndex) {
            if (lastStudiesDataCount.hasOwnProperty(obj) === false) {
                lastStudiesDataCount[obj] = 0;
            } else {
                lastStudiesDataCount[obj] = lastStudiesDataCount[obj] + 1;
            }
        });

        for (var k in lastStudiesDataCount) {
            lastStudiesGraphData[0].values.push({
                "label": k,
                "value": lastStudiesDataCount[k]
            })
        }

        var leftStudiesCauseTemp = []
        var leftStudiesCauseDataCount = {};
        var leftStudiesCauseGraphData = [{
            key: "",
            values: []
        }];

        survey.map(function (item) {
            leftStudiesCauseTemp.push(item.causa);
        });

        leftStudiesCauseTemp.forEach(function (obj, objIndex) {
            if (leftStudiesCauseDataCount.hasOwnProperty(obj) === false) {
                leftStudiesCauseDataCount[obj] = 0;
            } else {
                leftStudiesCauseDataCount[obj] = leftStudiesCauseDataCount[obj] + 1;
            }
        });

        for (var k in leftStudiesCauseDataCount) {
            leftStudiesCauseGraphData[0].values.push({
                "label": k,
                "value": leftStudiesCauseDataCount[k]
            })
        }

        var backtoStudyTemp = []
        var backtoStudyDataCount = {};
        var backtoStudyGraphData = [];

        survey.map(function (item) {
            backtoStudyTemp.push(item.regresar);
        });

        backtoStudyTemp.forEach(function (obj, objIndex) {
            if (backtoStudyDataCount.hasOwnProperty(obj) === false) {
                backtoStudyDataCount[obj] = 0;
            } else {
                backtoStudyDataCount[obj] = backtoStudyDataCount[obj] + 1;
            }
        });

        for (var k in backtoStudyDataCount) {
            if (k !== "null") {
                backtoStudyGraphData.push({
                    "label": k,
                    "value": backtoStudyDataCount[k]
                })
            }
        }

        var antiguedadTemp = []
        var antiguedadDataCount = {};
        var antiguedadGraphData = [];

        survey.map(function (item) {
            antiguedadTemp.push(item.antiguedad);
        });

        antiguedadTemp.forEach(function (obj, objIndex) {
            if (antiguedadDataCount.hasOwnProperty(obj) === false) {
                antiguedadDataCount[obj] = 0;
            } else {
                antiguedadDataCount[obj] = antiguedadDataCount[obj] + 1;
            }
        });

        for (var k in antiguedadDataCount) {
            if (k !== "null") {
                antiguedadGraphData.push({
                    "label": k,
                    "value": antiguedadDataCount[k]
                })
            }
        }

        var graph16Temp = []
        var graph16DataCount = {};
        var graph16GraphData = [];

        survey.map(function (item) {
            graph16Temp.push(item.se_organizan);
        });

        graph16Temp.forEach(function (obj, objIndex) {
            if (graph16DataCount.hasOwnProperty(obj) === false) {
                graph16DataCount[obj] = 0;
            } else {
                graph16DataCount[obj] = graph16DataCount[obj] + 1;
            }
        });

        for (var k in graph16DataCount) {
            if (k !== "null") {
                graph16GraphData.push({
                    "label": k,
                    "value": graph16DataCount[k]
                })
            }
        }

        var graph17Temp = []
        var graph17DataCount = {};
        var graph17GraphData = [];

        survey.map(function (item) {
            graph17Temp.push(item.participa);
        });

        graph17Temp.forEach(function (obj, objIndex) {
            if (graph17DataCount.hasOwnProperty(obj) === false) {
                graph17DataCount[obj] = 0;
            } else {
                graph17DataCount[obj] = graph17DataCount[obj] + 1;
            }
        });

        for (var k in graph17DataCount) {
            if (k !== "null") {
                graph17GraphData.push({
                    "label": k,
                    "value": graph17DataCount[k]
                })
            }
        }

        var graph18Temp = []
        var graph18DataCount = {};
        var graph18GraphData = [];

        survey.map(function (item) {
            graph18Temp.push(item.quien_vigila);
        });

        graph18Temp.forEach(function (obj, objIndex) {
            if (obj === null) return;
            obj.forEach(function (item) {
                if (graph18DataCount.hasOwnProperty(item) === false) {
                    graph18DataCount[item] = 0;
                } else {
                    graph18DataCount[item] = graph18DataCount[item] + 1;
                }
            })
        });

        for (var k in graph18DataCount) {
            if (k !== "null") {
                graph18GraphData.push({
                    "label": k,
                    "value": graph18DataCount[k]
                })
            }
        }

        var graph19Temp = []

        survey.map(function (item) {
            graph19Temp.push(item.provoca);
        });

        var tableContainer = $('#graph19 tbody')
        tableContainer.empty()
        graph19Temp.forEach(function (obj, objIndex) {
            if (obj.length == 0) {
                return;
            }
            var content = '<tr>\
      <td>{id}</td>\
      <td>{text}</td>\
    </tr>'

            var th = content.replace('{id}', objIndex + 1)
                .replace('{text}', obj)

            tableContainer.append(th);
        });

        var graph2Temp = []

        survey.map(function (item) {
            graph2Temp.push(item.que_conoces);
        });

        var tableContainer = $('#graph-02 tbody')
        tableContainer.empty()
        graph2Temp.forEach(function (obj, objIndex) {
            if (obj == null || obj.length == 0) {
                return;
            }
            var content = '<tr>\
      <td>{id}</td>\
      <td>{text}</td>\
    </tr>'

            var th = content.replace('{id}', objIndex + 1)
                .replace('{text}', obj)

            tableContainer.append(th);
        });

        var graph20Temp = []

        survey.map(function (item) {
            graph20Temp.push(item.soluciones);
        });

        var tableContainer = $('#graph20 tbody')
        tableContainer.empty()
        graph20Temp.forEach(function (obj, objIndex) {
            if (obj.length == 0) {
                return;
            }
            var content = '<tr>\
      <td>{id}</td>\
      <td>{text}</td>\
    </tr>'

            var th = content.replace('{id}', objIndex + 1)
                .replace('{text}', obj)

            tableContainer.append(th);
        });

        var graph21Temp = []
        var graph21DataCount = {};
        var graph21GraphData = [];

        survey.map(function (item) {
            graph21Temp.push(item.victima);
        });

        graph21Temp.forEach(function (obj, objIndex) {
            if (graph21DataCount.hasOwnProperty(obj) === false) {
                graph21DataCount[obj] = 0;
            } else {
                graph21DataCount[obj] = graph21DataCount[obj] + 1;
            }
        });

        for (var k in graph21DataCount) {
            if (k !== "null") {
                graph21GraphData.push({
                    "label": k,
                    "value": graph21DataCount[k]
                })
            }
        }
        var graph22Temp = []
        var graph22DataCount = {};
        var graph22GraphData = [];

        survey.map(function (item) {
            graph22Temp.push(item.tipo_delito);
        });

        graph22Temp.forEach(function (obj, objIndex) {
            if (obj === null) {return;}
            obj.forEach(function (item) {
                if (graph22DataCount.hasOwnProperty(item) === false) {
                    graph22DataCount[item] = 0;
                } else {
                    graph22DataCount[item] = graph22DataCount[item] + 1;
                }
            })
        });

        for (var k in graph22DataCount) {
            if (k !== "null") {
                graph22GraphData.push({
                    "label": k,
                    "value": graph22DataCount[k]
                })
            }
        }

        var graph23Temp = []
        var graph23DataCount = {};
        var graph23GraphData = [];

        survey.map(function (item) {
            graph23Temp.push(item.pandillas);
        });

        graph23Temp.forEach(function (obj, objIndex) {
            if (obj === null) {
                return;
            }
            obj.forEach(function (item) {
                if (graph23DataCount.hasOwnProperty(item) === false) {
                    graph23DataCount[item] = 0;
                } else {
                    graph23DataCount[item] = graph23DataCount[item] + 1;
                }
            })
        });

        for (var k in graph23DataCount) {
            if (k !== "null") {
                graph23GraphData.push({
                    "label": k,
                    "value": graph23DataCount[k]
                })
            }
        }


        var graph24Temp = []
        var graph24DataCount = {};
        var graph24GraphData = [];

        survey.map(function (item) {
            graph24Temp.push(item.consumo);
        });

        graph24Temp.forEach(function (obj, objIndex) {
            if (graph24DataCount.hasOwnProperty(obj) === false) {
                graph24DataCount[obj] = 0;
            } else {
                graph24DataCount[obj] = graph24DataCount[obj] + 1;
            }
        });

        for (var k in graph24DataCount) {
            if (k !== "null") {
                graph24GraphData.push({
                    "label": k,
                    "value": graph24DataCount[k]
                })
            }
        }

        var graph25Temp = []
        var graph25DataCount = {};
        var graph25GraphData = [];

        survey.map(function (item) {
            graph25Temp.push(item.tipo_droga);
        });

        graph25Temp.forEach(function (obj, objIndex) {
            if (obj === null) {
                return;
            }
            obj.forEach(function (item) {
                if (graph25DataCount.hasOwnProperty(item) === false) {
                    graph25DataCount[item] = 0;
                } else {
                    graph25DataCount[item] = graph25DataCount[item] + 1;
                }
            })
        });

        for (var k in graph25DataCount) {
            if (k !== "null") {
                graph25GraphData.push({
                    "label": k,
                    "value": graph25DataCount[k]
                })
            }
        }

        var graph26Temp = []
        var graph26DataCount = {};
        var graph26GraphData = [];

        survey.map(function (item) {
            graph26Temp.push(item.actividades);
        });

        graph26Temp.forEach(function (obj, objIndex) {
            if (obj === null) {
                return;
            }
            obj.forEach(function (item) {
                if (graph26DataCount.hasOwnProperty(item) === false) {
                    graph26DataCount[item] = 0;
                } else {
                    graph26DataCount[item] = graph26DataCount[item] + 1;
                }
            })
        });

        for (var k in graph26DataCount) {
            if (k !== "null") {
                graph26GraphData.push({
                    "label": k,
                    "value": graph26DataCount[k]
                })
            }
        }

        var graph27Temp = []

        survey.map(function (item) {
            graph27Temp.push(item.deporte);
        });

        var tableContainer = $('#graph27 tbody')
        tableContainer.empty()
        graph27Temp.forEach(function (obj, objIndex) {
            if (obj.length == 0) {
                return;
            }
            var content = '<tr>\
      <td>{id}</td>\
      <td>{text}</td>\
    </tr>'

            var th = content.replace('{id}', objIndex + 1)
                .replace('{text}', obj)

            tableContainer.append(th);
        });

        var graph28Temp = []
        var graph28DataCount = {};
        var graph28GraphData = [];

        survey.map(function (item) {
            graph28Temp.push(item.act_reunen);
        });

        graph28Temp.forEach(function (obj, objIndex) {
            if (obj === null) {
                return;
            }
            obj.forEach(function (item) {
                if (graph28DataCount.hasOwnProperty(item) === false) {
                    graph28DataCount[item] = 0;
                } else {
                    graph28DataCount[item] = graph28DataCount[item] + 1;
                }
            })
        });

        for (var k in graph28DataCount) {
            if (k !== "null") {
                graph28GraphData.push({
                    "label": k,
                    "value": graph28DataCount[k]
                })
            }
        }

        var graph29Temp = []
        var graph29DataCount = {};
        var graph29GraphData = [];

        survey.map(function (item) {
            graph29Temp.push(item.convivencia);
        });

        graph29Temp.forEach(function (obj, objIndex) {
            if (obj === null) {
                return;
            }

            if (graph29DataCount.hasOwnProperty(obj) === false) {
                graph29DataCount[obj] = 0;
            } else {
                graph29DataCount[obj] = graph29DataCount[obj] + 1;
            }

        });

        for (var k in graph29DataCount) {
            if (k !== "null") {
                graph29GraphData.push({
                    "label": k,
                    "value": graph29DataCount[k]
                })
            }
        }

        var graph30Temp = []
        var graph30DataCount = {};
        var graph30GraphData = [];

        survey.map(function (item) {
            graph30Temp.push(item.lugares);
        });

        graph30Temp.forEach(function (obj, objIndex) {
            if (obj === null) {
                return;
            }
            obj.forEach(function (item) {
                if (graph30DataCount.hasOwnProperty(item) === false) {
                    graph30DataCount[item] = 0;
                } else {
                    graph30DataCount[item] = graph30DataCount[item] + 1;
                }
            })
        });

        for (var k in graph30DataCount) {
            if (k !== "null") {
                graph30GraphData.push({
                    "label": k,
                    "value": graph30DataCount[k]
                })
            }
        }

        var graph31Temp = []
        var graph31DataCount = {};
        var graph31GraphData = [];

        survey.map(function (item) {
            graph31Temp.push(item.proximo);
        });

        graph31Temp.forEach(function (obj, objIndex) {
            if (obj === null) {
                return;
            }
            obj.forEach(function (item) {
                if (graph31DataCount.hasOwnProperty(item) === false) {
                    graph31DataCount[item] = 0;
                } else {
                    graph31DataCount[item] = graph31DataCount[item] + 1;
                }
            })
        });

        for (var k in graph31DataCount) {
            if (k !== "null") {
                graph31GraphData.push({
                    "label": k,
                    "value": graph31DataCount[k]
                })
            }
        }

        var graph32Temp = []
        var graph32DataCount = {};
        var graph32GraphData = [];

        survey.map(function (item) {
            graph32Temp.push(item.importante);
        });

        graph32Temp.forEach(function (obj, objIndex) {
            if (obj === null) {
                return;
            }
            obj.forEach(function (item) {
                if (graph32DataCount.hasOwnProperty(item) === false) {
                    graph32DataCount[item] = 0;
                } else {
                    graph32DataCount[item] = graph32DataCount[item] + 1;
                }
            })
        });

        for (var k in graph32DataCount) {
            if (k !== "null") {
                graph32GraphData.push({
                    "label": k,
                    "value": graph32DataCount[k]
                })
            }
        }

        var graph33Temp = []
        var graph33DataCount = {};
        var graph33GraphData = [];

        survey.map(function (item) {
            graph33Temp.push(item.fumas);
        });

        graph33Temp.forEach(function (obj, objIndex) {
            if (obj === null) {
                return;
            }
            if (graph33DataCount.hasOwnProperty(obj) === false) {
                graph33DataCount[obj] = 0;
            } else {
                graph33DataCount[obj] = graph33DataCount[obj] + 1;
            }
        });

        for (var k in graph33DataCount) {
            if (k !== "null") {
                graph33GraphData.push({
                    "label": k,
                    "value": graph33DataCount[k]
                })
            }
        }

        var graph34Temp = []
        var graph34DataCount = {};
        var graph34GraphData = [];

        survey.map(function (item) {
            graph34Temp.push(item.edad_fumar);
        });

        graph34Temp.forEach(function (obj, objIndex) {
            if (obj === null) {
                return;
            }
            if (graph34DataCount.hasOwnProperty(obj) === false) {
                graph34DataCount[obj] = 0;
            } else {
                graph34DataCount[obj] = graph34DataCount[obj] + 1;
            }
        });

        for (var k in graph34DataCount) {
            if (k !== "null") {
                graph34GraphData.push({
                    "label": k,
                    "value": graph34DataCount[k]
                })
            }
        }
        var graph35Temp = []
        var graph35DataCount = {};
        var graph35GraphData = [];

        survey.map(function (item) {
            graph35Temp.push(item.frecuencia);
        });

        graph35Temp.forEach(function (obj, objIndex) {
            if (obj === null) {
                return;
            }
            if (graph35DataCount.hasOwnProperty(obj) === false) {
                graph35DataCount[obj] = 0;
            } else {
                graph35DataCount[obj] = graph35DataCount[obj] + 1;
            }
        });

        for (var k in graph35DataCount) {
            if (k !== "null") {
                graph35GraphData.push({
                    "label": k,
                    "value": graph35DataCount[k]
                })
            }
        }

        var graph36Temp = []
        var graph36DataCount = {};
        var graph36GraphData = [];

        survey.map(function (item) {
            graph36Temp.push(item.drogas);
        });

        graph36Temp.forEach(function (obj, objIndex) {
            if (obj === null) {
                return;
            }
            if (graph36DataCount.hasOwnProperty(obj) === false) {
                graph36DataCount[obj] = 0;
            } else {
                graph36DataCount[obj] = graph36DataCount[obj] + 1;
            }
        });

        for (var k in graph36DataCount) {
            if (k !== "null") {
                graph36GraphData.push({
                    "label": k,
                    "value": graph36DataCount[k]
                })
            }
        }

        var graph37Temp = []

        survey.map(function (item) {
            graph37Temp.push(item.como_dejaste);
        });

        var tableContainer = $('#graph37 tbody')
        tableContainer.empty()
        graph37Temp.forEach(function (obj, objIndex) {
            if (obj == null || obj.length == 0) {
                return;
            }
            var content = '<tr>\
      <td>{id}</td>\
      <td>{text}</td>\
    </tr>'

            var th = content.replace('{id}', objIndex + 1)
                .replace('{text}', obj)

            tableContainer.append(th);
        });

        var graph38Temp = []
        var graph38DataCount = {};
        var graph38GraphData = [];

        survey.map(function (item) {
            graph38Temp.push(item.familia);
        });

        graph38Temp.forEach(function (obj, objIndex) {
            if (obj === null) {
                return;
            }
            if (graph38DataCount.hasOwnProperty(obj) === false) {
                graph38DataCount[obj] = 0;
            } else {
                graph38DataCount[obj] = graph38DataCount[obj] + 1;
            }
        });

        for (var k in graph38DataCount) {
            if (k !== "null") {
                graph38GraphData.push({
                    "label": k,
                    "value": graph38DataCount[k]
                })
            }
        }

        var graph39Temp = []
        var graph39DataCount = {};
        var graph39GraphData = [];

        survey.map(function (item) {
            graph39Temp.push(item.primera_vez);
        });

        graph39Temp.forEach(function (obj, objIndex) {
            if (obj === null) {
                return;
            }
            if (graph39DataCount.hasOwnProperty(obj) === false) {
                graph39DataCount[obj] = 0;
            } else {
                graph39DataCount[obj] = graph39DataCount[obj] + 1;
            }
        });

        for (var k in graph39DataCount) {
            if (k !== "null") {
                graph39GraphData.push({
                    "label": k,
                    "value": graph39DataCount[k]
                })
            }
        }

        // parejas_sexuales
        var graph40Temp = []
        var graph40DataCount = {};
        var graph40GraphData = [];

        survey.map(function (item) {
            graph40Temp.push(item.parejas_sexuales);
        });

        graph40Temp.forEach(function (obj, objIndex) {
            if (obj === null) {
                return;
            }
            if (graph40DataCount.hasOwnProperty(obj) === false) {
                graph40DataCount[obj] = 0;
            } else {
                graph40DataCount[obj] = graph40DataCount[obj] + 1;
            }
        });

        for (var k in graph40DataCount) {
            if (k !== "null") {
                graph40GraphData.push({
                    "label": k,
                    "value": graph40DataCount[k]
                })
            }
        }

        // anticonceptivo
        var graph41Temp = []
        var graph41DataCount = {};
        var graph41GraphData = [];

        survey.map(function (item) {
            graph41Temp.push(item.anticonceptivo);
        });

        graph41Temp.forEach(function (obj, objIndex) {
            if (obj === null) {
                return;
            }
            if (graph41DataCount.hasOwnProperty(obj) === false) {
                graph41DataCount[obj] = 0;
            } else {
                graph41DataCount[obj] = graph41DataCount[obj] + 1;
            }
        });

        for (var k in graph41DataCount) {
            if (k !== "null") {
                graph41GraphData.push({
                    "label": k,
                    "value": graph41DataCount[k]
                })
            }
        }

        // motivos
        var graph42Temp = []
        var graph42DataCount = {};
        var graph42GraphData = [];

        survey.map(function (item) {
            graph42Temp.push(item.motivos);
        });

        graph42Temp.forEach(function (obj, objIndex) {
            if (obj === null) {
                return;
            }
            obj.forEach(function (item) {
                if (graph42DataCount.hasOwnProperty(item) === false) {
                    graph42DataCount[item] = 0;
                } else {
                    graph42DataCount[item] = graph42DataCount[item] + 1;
                }
            });
        });

        for (var k in graph42DataCount) {
            if (k !== "null") {
                graph42GraphData.push({
                    "label": k,
                    "value": graph42DataCount[k]
                })
            }
        }

        // grupo
        var graph43Temp = []
        var graph43DataCount = {};
        var graph43GraphData = [];

        survey.map(function (item) {
            graph43Temp.push(item.grupo);
        });

        graph43Temp.forEach(function (obj, objIndex) {
            if (obj === null) {
                return;
            }

            if (graph43DataCount.hasOwnProperty(obj) === false) {
                graph43DataCount[obj] = 0;
            } else {
                graph43DataCount[obj] = graph43DataCount[obj] + 1;
            }

        });

        for (var k in graph43DataCount) {
            if (k !== "null") {
                graph43GraphData.push({
                    "label": k,
                    "value": graph43DataCount[k]
                })
            }
        }

        // tipo_grupo
        var graph44Temp = []
        var graph44DataCount = {};
        var graph44GraphData = [];

        survey.map(function (item) {
            graph44Temp.push(item.tipo_grupo);
        });

        graph44Temp.forEach(function (obj, objIndex) {
            if (obj === null) {
                return;
            }
            obj.forEach(function (item) {
                if (graph44DataCount.hasOwnProperty(item) === false) {
                    graph44DataCount[item] = 0;
                } else {
                    graph44DataCount[item] = graph44DataCount[item] + 1;
                }
            });
        });

        for (var k in graph44DataCount) {
            if (k !== "null") {
                graph44GraphData.push({
                    "label": k,
                    "value": graph44DataCount[k]
                })
            }
        }

        // gustaria_participar
        var graph45Temp = []
        var graph45DataCount = {};
        var graph45GraphData = [];

        survey.map(function (item) {
            graph45Temp.push(item.gustaria_participar);
        });

        graph45Temp.forEach(function (obj, objIndex) {
            if (obj === null) {
                return;
            }
            obj.forEach(function (item) {
                if (graph45DataCount.hasOwnProperty(item) === false) {
                    graph45DataCount[item] = 0;
                } else {
                    graph45DataCount[item] = graph45DataCount[item] + 1;
                }
            });
        });

        for (var k in graph45DataCount) {
            if (k !== "null") {
                graph45GraphData.push({
                    "label": k,
                    "value": graph45DataCount[k]
                })
            }
        }

        // necesario
        var graph46Temp = []
        var graph46DataCount = {};
        var graph46GraphData = [];

        survey.map(function (item) {
            graph46Temp.push(item.necesario);
        });

        graph46Temp.forEach(function (obj, objIndex) {
            if (obj === null) {
                return;
            }
            if (graph46DataCount.hasOwnProperty(obj) === false) {
                graph46DataCount[obj] = 0;
            } else {
                graph46DataCount[obj] = graph46DataCount[obj] + 1;
            }

        });

        for (var k in graph46DataCount) {
            if (k !== "null") {
                graph46GraphData.push({
                    "label": k,
                    "value": graph46DataCount[k]
                })
            }
        }

        var graph47Temp = []

        survey.map(function (item) {
            graph47Temp.push(item.acciones_comunidad);
        });

        var tableContainer = $('#graph47 tbody')
        tableContainer.empty()
        graph47Temp.forEach(function (obj, objIndex) {
            if (obj == null || obj.length == 0) {
                return;
            }
            var content = '<tr>\
      <td>{id}</td>\
      <td>{text}</td>\
    </tr>'

            var th = content.replace('{id}', objIndex + 1)
                .replace('{text}', obj)

            tableContainer.append(th);
        });


        survey.map(function (item) {
            jobDataTemp.push(item.ocupacion)
        });

        jobDataTemp.forEach(function (obj, objIndex) {
            if (jobDataCount.hasOwnProperty(obj) === false) {
                jobDataCount[obj] = 0;
            } else {
                jobDataCount[obj] = jobDataCount[obj] + 1;
            }
        });

        jobData[0].values[0].value = jobDataCount["Estudiante"];
        jobData[0].values[1].value = jobDataCount["Empleada(o) de tiempo completo"];
        jobData[0].values[2].value = jobDataCount["Otro"];
        jobData[0].values[3].value = jobDataCount["Empleada(o) por horas"];
        jobData[0].values[4].value = jobDataCount["Al hogar y/o cuidado de los niños en casa"];
        jobData[0].values[5].value = jobDataCount["En este momento no tengo empleo ni estudio"];
        jobData[0].values[6].value = jobDataCount["Tengo un negocio propio"];
        jobData[0].values[7].value = jobDataCount["Ayudo en los quehaceres de mi casa"];

        survey.map(function (a) {
            if (a.hijos in manyKidsCount) manyKidsCount[a.hijos]++;
            else manyKidsCount[a.hijos] = 1;
        })
        manyKidsGraphData[0].value = manyKidsCount["1"];
        manyKidsGraphData[1].value = manyKidsCount["2"];
        manyKidsGraphData[2].value = manyKidsCount["3"];
        manyKidsGraphData[3].value = manyKidsCount["Más de 3"];
        manyKidsGraphData[4].value = manyKidsCount["No tengo hijos"];

        survey.map(function (a) {
            if (a.edad in agesGraphDataTemp) agesGraphDataTemp[a.edad]++;
            else agesGraphDataTemp[a.edad] = 1;
        })
        agesGraphData[0].values[0].value = agesGraphDataTemp["12-14 años"];
        agesGraphData[0].values[1].value = agesGraphDataTemp["15-19 años"];
        agesGraphData[0].values[2].value = agesGraphDataTemp["20-24 años"];
        agesGraphData[0].values[3].value = agesGraphDataTemp["25-29 años"];
        agesGraphData[0].values[4].value = agesGraphDataTemp["30-59 años"];
        agesGraphData[0].values[5].value = agesGraphDataTemp["mayor de 60 años"];

        survey.filter(function (item) {
            if (item.conoces === 'Si') {
                acknowldgeGraphData[0].value = acknowldgeGraphData[0].value + 1;
            } else if (item.conoces === 'No') {
                acknowldgeGraphData[1].value = acknowldgeGraphData[1].value + 1;
            }
        })
        var ageGraphChart,
        acknowldgeGraphChart,
        withWhomYouLiveGraphChart,
        manyKidsGraphChart,
        jobGraphChart,
        whatStudiesNowDataGraphChart,
        leftStudiesGraphChart,
        lastStudiesGraphChart,
        leftStudiesCauseGraphChart,
        backtoStudyGraphChart,
        graph15,
        graph16,
        genreGraphChart;

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

            d3.select("#acknowldgeGraph svg")
                .datum(acknowldgeGraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            acknowldgeGraphChart = chart;

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

            d3.select("#MunicipioGraph svg")
                .datum(municipioGraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            municipioGraphChart = chart;

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

            d3.select("#ColoniaGraph svg")
                .datum(coloniaGraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            coloniaGraphChart = chart;

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

            d3.select("#genreGraph svg")
                .datum(genreGraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            genreGraphChart = chart;

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

            d3.select("#ageGraph svg")
                .datum(agesGraphData)
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
                .margin({
                bottom: 150
            })
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

            d3.select("#manyKidsGraph svg")
                .datum(manyKidsGraphData)
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
                .margin({
                bottom: 190
            })
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

        nv.addGraph(function () {
            var chart = nv.models.discreteBarChart()
                .x(function (d) {
                return d.label
            })
                .y(function (d) {
                return d.value
            })
                .margin({
                bottom: 190
            })
                .tooltips(false)
                .showValues(true);

            chart.valueFormat(d3.format('f'));
            chart.xAxis.rotateLabels(-45);

            d3.select("#studiesGraph svg")
                .datum(whatStudiesNowData)
                .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);
            whatStudiesNowDataGraphChart = chart;

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

            d3.select("#leftStudiesGraph svg")
                .datum(leftStudiesGraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            leftStudiesGraphChart = chart;

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
                .margin({
                bottom: 190
            })
                .tooltips(false)
                .showValues(true);

            chart.valueFormat(d3.format('f'));
            chart.xAxis.rotateLabels(-45);

            d3.select("#lastStudiesGraph svg")
                .datum(lastStudiesGraphData)
                .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);
            lastStudiesGraphChart = chart;

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
                .margin({
                bottom: 250
            })
                .tooltips(false)
                .showValues(true);

            chart.valueFormat(d3.format('f'));
            chart.xAxis.rotateLabels(-45);

            d3.select("#leftStudiesCauseGraph svg")
                .datum(leftStudiesCauseGraphData)
                .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);
            leftStudiesCauseGraphChart = chart;

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

            d3.select("#graph15 svg")
                .datum(antiguedadGraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph15 = chart;

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

            d3.select("#backtoStudyGraph svg")
                .datum(backtoStudyGraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            backtoStudyGraphChart = chart;

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

            d3.select("#graph16 svg")
                .datum(graph16GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph16 = chart;

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
                .showLabels(false);

            chart.valueFormat(d3.format('f'))

            d3.select("#graph17 svg")
                .datum(graph17GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph17 = chart;

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
                .showLabels(false);

            chart.valueFormat(d3.format('f'))

            d3.select("#graph18 svg")
                .datum(graph18GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph18 = chart;

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

            d3.select("#graph21 svg")
                .datum(graph21GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph21 = chart;

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
                .showLabels(false);

            chart.valueFormat(d3.format('f'))

            d3.select("#graph22 svg")
                .datum(graph22GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph22 = chart;

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
                .showLabels(false);

            chart.valueFormat(d3.format('f'))

            d3.select("#graph23 svg")
                .datum(graph23GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph23 = chart;

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
                .showLabels(false);

            chart.valueFormat(d3.format('f'))

            d3.select("#graph24 svg")
                .datum(graph24GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph24 = chart;

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
                .showLabels(false);

            chart.valueFormat(d3.format('f'))

            d3.select("#graph25 svg")
                .datum(graph25GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph25 = chart;

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
                .showLabels(false);

            chart.valueFormat(d3.format('f'))

            d3.select("#graph26 svg")
                .datum(graph26GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph26 = chart;

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
                .showLabels(false);

            chart.valueFormat(d3.format('f'))

            d3.select("#graph28 svg")
                .datum(graph28GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph28 = chart;

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

            d3.select("#graph29 svg")
                .datum(graph29GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph29 = chart;

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
                .showLabels(false);

            chart.valueFormat(d3.format('f'))

            d3.select("#graph30 svg")
                .datum(graph30GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph30 = chart;

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
                .showLabels(false);

            chart.valueFormat(d3.format('f'))

            d3.select("#graph31 svg")
                .datum(graph31GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph31 = chart;

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
                .showLabels(false);

            chart.valueFormat(d3.format('f'))

            d3.select("#graph32 svg")
                .datum(graph32GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph32 = chart;

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

            d3.select("#graph33 svg")
                .datum(graph33GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph33 = chart;

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
                .showLabels(false);

            chart.valueFormat(d3.format('f'))

            d3.select("#graph34 svg")
                .datum(graph34GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph34 = chart;

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
                .showLabels(false);

            chart.valueFormat(d3.format('f'))

            d3.select("#graph35 svg")
                .datum(graph35GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph35 = chart;

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
                .showLabels(false);

            chart.valueFormat(d3.format('f'))

            d3.select("#graph36 svg")
                .datum(graph36GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph36 = chart;

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
                .showLabels(false);

            chart.valueFormat(d3.format('f'))

            d3.select("#graph38 svg")
                .datum(graph38GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph38 = chart;

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
                .showLabels(false);

            chart.valueFormat(d3.format('f'))

            d3.select("#graph39 svg")
                .datum(graph39GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph39 = chart;

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
                .showLabels(false);

            chart.valueFormat(d3.format('f'))

            d3.select("#graph40 svg")
                .datum(graph40GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph40 = chart;

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
                .showLabels(false);

            chart.valueFormat(d3.format('f'))

            d3.select("#graph41 svg")
                .datum(graph41GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph41 = chart;

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
                .showLabels(false);

            chart.valueFormat(d3.format('f'))

            d3.select("#graph42 svg")
                .datum(graph42GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph42 = chart;

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

            d3.select("#graph43 svg")
                .datum(graph43GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph43 = chart;

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

            d3.select("#graph44 svg")
                .datum(graph44GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph44 = chart;

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
                .showLabels(false);

            chart.valueFormat(d3.format('f'))

            d3.select("#graph45 svg")
                .datum(graph45GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph45 = chart;

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
                .showLabels(false);

            chart.valueFormat(d3.format('f'))

            d3.select("#graph46 svg")
                .datum(graph46GraphData)
                .transition().duration(1200)
                .call(chart);

            nv.utils.windowResize(chart.update);
            graph46 = chart;

            return chart;
        });
    }

}