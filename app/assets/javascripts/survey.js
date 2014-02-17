// This is a manifest file that'll be compiled into survey.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require_self

// onlyYouth

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