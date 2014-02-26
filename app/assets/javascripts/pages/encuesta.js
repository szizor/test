$('html, body').animate({
    scrollTop: 0
}, 200);

$('#survey_start_time').val(new Date);

function isYouth() {
    $('#onlyYouth')
        .show()
        .find('input, textarea')
        .prop('disabled', false);

}

function isNotYouth() {
    $('#onlyYouth')
        .hide()
        .find('input, textarea')
        .prop('disabled', true);
}

$('#youthControl').find('input').on("change", function(e) {
    if (e.target.id === 'survey_edad_30-59_aos' || e.target.id === 'survey_edad_mayor_de_60_aos') {
        isNotYouth();
    } else {
        isYouth();
    }
});

$('#survey_municipio_zapopan').on('change', function(e) {
    if ($(this).is(':checked')) {
        $('#coloniaSelector').find('input').removeAttr('disabled').prop("checked", false);
        $('#survey_colonia_santiago_ramrez, #survey_colonia_san_isidro').attr('disabled', 'disabled');
    }
})

$('#survey_municipio_torren').on('change', function(e) {
    if ($(this).is(':checked')) {
        $('#coloniaSelector').find('input').removeAttr('disabled');
        $('#survey_colonia_santiago_ramrez').prop("checked", true);
        $('#survey_colonia_prados_de_santa_luca, #survey_colonia_san_isidro, #survey_colonia_villas_del_centinela').attr('disabled', 'disabled');
    }
})

$('#survey_municipio_lerdo').on('change', function(e) {
    if ($(this).is(':checked')) {
        $('#coloniaSelector').find('input').removeAttr('disabled');
        $('#survey_colonia_san_isidro').prop("checked", true);
        $('#survey_colonia_prados_de_santa_luca, #survey_colonia_santiago_ramrez, #survey_colonia_villas_del_centinela').attr('disabled', 'disabled');
    }
})

$('#survey_solo_si').on('change', function(e) {
    if ($(this).is(':checked')) {
        $('#withWhomLive').find('input').attr("disabled", 'disabled');
        $('#survey_con_quien_vive_no_aplica').removeAttr("disabled").prop("checked", true);
    }
})
$('#survey_solo_no').on('change', function(e) {
    if ($(this).is(':checked')) {
        $('#withWhomLive').find('input').removeAttr("disabled");
        $('#survey_con_quien_vive_no_aplica').prop("checked", false).attr("disabled", "disabled");
    }
})
$('#leftSchool').find('input').on('change', function(e) {
    if ($(this).is(':checked') && $(this).val() === 'Si') {
        $('#causeLeftSchool, #wantReturnSchool, #whyReturnSchool').find('input, textarea').removeAttr("disabled");
        $('#survey_causa_no_aplica, #survey_regresar_no_aplica').prop("checked", false).attr("disabled", 'disabled');
    }
    if ($(this).is(':checked') && $(this).val() === 'No') {
        $('#causeLeftSchool, #wantReturnSchool, #whyReturnSchool').find('input, textarea').attr("disabled", 'disabled');
        $('#survey_causa_no_aplica, #survey_regresar_no_aplica').removeAttr("disabled").prop("checked", true);
    }
})
$('#insecurityVictim').find('input').on('change', function(e) {
    // #victimType
    if ($(this).is(':checked') && $(this).val() === 'Si') {
        $('#victimType').find('input').removeAttr("disabled");
        $('#survey_tipo_delito_no_aplica').prop("checked", false).attr("disabled", 'disabled');
    }
    if ($(this).is(':checked') && $(this).val() === 'No') {
        $('#victimType').find('input').attr("disabled", 'disabled');
        $('#survey_tipo_delito_no_aplica').removeAttr("disabled").prop("checked", true);
    }
})

$('#bandasActivities').find('input').on('change', function(e) {
    var checkedElements = $('#bandasActivities').find('input:checked');
    if (checkedElements.length === 3) {
        $('#bandasActivities').find('input:not(:checked)').attr("disabled", 'disabled');
    } else {
        $('#bandasActivities').find('input').removeAttr("disabled");
    }
});


$('#drugsConsumed').find('input').on('change', function(e) {
    var checkedElements = $('#drugsConsumed').find('input:checked');

    if (checkedElements.length === 2) {

        $('#drugsConsumed').find('input:not(:checked)').attr("disabled", 'disabled');
        if ($(this).is(':checked') && $(this).val() === 'Otro') {
            $(this).closest('.form-group').find('input[type=text]').removeAttr("disabled")
        }

        if ($('#survey_tipo_droga_otro').is(':not(:checked)') && $('#survey_tipo_droga_otro').val() === 'Otro') {
            $(this).closest('.form-group').find('input[type=text]').val('');
        }

    } else {
        $('#drugsConsumed').find('input').removeAttr("disabled");
    }

});

$('#freeTimeActivities').find('input').on('change', function(e) {
    var checkedElements = $('#freeTimeActivities').find('input:checked');
    if (checkedElements.length === 3) {
        $('#freeTimeActivities').find('input:not(:checked)').attr("disabled", 'disabled');
        if ($(this).is(':checked') && $(this).val() === 'Otro') {
            $('#survey_actividades_others').removeAttr("disabled");
        }
    } else {
        $('#freeTimeActivities').find('input').removeAttr("disabled");
    }

});

$('#youthMeetingsActivites').find('input').on('change', function(e) {
    var checkedElements = $('#youthMeetingsActivites').find('input:checked');
    if (checkedElements.length === 3) {
        $('#youthMeetingsActivites').find('input:not(:checked)').attr("disabled", 'disabled');

        if ($(this).is(':checked') && $(this).val() === 'Otro') {
            $(this).closest('.form-group').find('input[type=text]').removeAttr("disabled")
        }

        if ($('#survey_act_reunen_otro').is(':not(:checked)') && $('#survey_act_reunen_otro').val() === 'Otro') {
            $(this).closest('.form-group').find('input[type=text]').val('');
        }

    } else {
        $('#youthMeetingsActivites').find('input').removeAttr("disabled");
    }

});

$('#FuturePlansLife').find('input').on('change', function(e) {
    var checkedElements = $('#FuturePlansLife').find('input:checked');
    if (checkedElements.length === 2) {
        $('#FuturePlansLife').find('input:not(:checked)').attr("disabled", 'disabled');

        if ($(this).is(':checked') && $(this).val() === 'Otros') {
            $(this).closest('.form-group').find('input[type=text]').removeAttr("disabled")
        }

        if ($('#survey_proximo_otros').is(':not(:checked)') && $('#survey_proximo_otros').val() === 'Otros') {
            $(this).closest('.form-group').find('input[type=text]').val('');
        }

    } else {
        $('#FuturePlansLife').find('input').removeAttr("disabled");
    }

});

$('#MotiveNoAntiConceptives').find('input').on('change', function(e) {
    var checkedElements = $('#MotiveNoAntiConceptives').find('input:checked');
    if (checkedElements.length === 3) {
        $('#MotiveNoAntiConceptives').find('input:not(:checked)').attr("disabled", 'disabled');

        if ($(this).is(':checked') && $(this).val() === 'Otro') {
            $(this).closest('.form-group').find('input[type=text]').removeAttr("disabled")
        }

        if ($('#survey_motivos_otro').is(':not(:checked)') && $('#survey_motivos_otro').val() === 'Otro') {
            $(this).closest('.form-group').find('input[type=text]').val('');
        }

    } else {
        $('#MotiveNoAntiConceptives').find('input').removeAttr("disabled");
    }

});

$('#survey_grupo_no').on('change', function(e) {
    if ($(e.target).is(':checked')) {
        $('#survey_tipo_grupo_no_aplica').attr('checked', true)
    }
});
// ColoniaAlcholYDrogas

$('#ColoniaAlcholYDrogas input[type=radio]').on('change', function(e) {
    if ($('#survey_consumo_nicamente_se_consume_alcohol').is(':checked') || $('#survey_consumo_no_se_consume_alcohol_ni_drogas_en_las_calles').is(':checked') || $('#survey_consumo_no_s').is(':checked')) {
        $('#survey_tipo_droga_no_aplica')[0].checked = 'checked';
    } else {
        $('#survey_tipo_droga_no_aplica')[0].checked = false;
    }
});

$('#survey_primera_vez_no_he_tenido_relaciones_sexuales').on('change', function(e) {
    if ($(e.target).is(':checked')) {
        $('#survey_parejas_sexuales_no_aplica').attr('checked', true);
        $('#survey_anticonceptivo_no_aplica').attr('checked', true);
        $('#survey_motivos_no_aplica').attr('checked', true);
        $('html, body').animate({
            scrollTop: $("#ActivadesDedicadasJovenes").offset().top - 60
        }, 200);
    }
});
// FirstSexTime




$('#survey_reunen_no_s').on('change', function(e) {
    if ($(this).is(':checked') && $(this).val() === "No sé") {
        $('#youthMeetingsActivites').find('input').attr("disabled", 'disabled');
        $('#survey_act_reunen_no_aplica').prop("checked", true).removeAttr("disabled");
    } else {
        $('#youthMeetingsActivites').find('input').removeAttr("disabled");
        $('#survey_act_reunen_no_aplica').prop("checked", false).attr("disabled", 'disabled');
    }
})
$('#connivancePlacesCheck').find('input').on('change', function(e) {
    if ($(this).is(':checked') && $(this).val() === "No") {
        $('#placesType').find('input').attr("disabled", 'disabled').prop("checked", false);
        $('#placesType').find('input[type=text]').val('');
        $('#survey_lugares_no_aplica').prop("checked", true).removeAttr("disabled");
    } else {
        $('#placesType').find('input').removeAttr("disabled");
        $('#survey_lugares_no_aplica').prop("checked", false).attr("disabled", 'disabled');
    }
})

$('#mostImportantMyLife').find('input').on('change', function(e) {
    var checkedElements = $('#mostImportantMyLife').find('input:checked');

    if (checkedElements.length === 2) {
        $('#mostImportantMyLife').find('input:not(:checked)').attr("disabled", 'disabled');
        if ($(this).is(':checked') && $(this).val() === 'Otros') {
            $('#survey_importante_others').removeAttr("disabled");
        }
    } else {
        $('#mostImportantMyLife').find('input').removeAttr("disabled");
    }
});