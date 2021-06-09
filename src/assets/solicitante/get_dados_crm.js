$(document).ready(function () {
    "use strict";

    function buscar_medico(div_validacao){
        setTimeout(function () {
            $.ajax({
                method: "GET",
                async: false,
                url: "/busca_crm/",
                data: { "cpf": $('#cpf_medico').val(),
                        "crm":  $('#crm_medico').val(),
                        "data_nascimento": $('#nascimento_medico').val()},
                success: function(result) {
                    if (result.status === false){
                        div_validacao.html("<button type=\"button\" class=\"btn btn-danger waves-effect waves-light\" style=\"pointer-events: none;\"><span class=\"btn-label\"><i class=\"mdi mdi-close-circle-outline\"></i></span>Não foi possível validar os dados, favor verificar o CRM informado</button>");
                        crm_medico.disabled = false;
                    } else {
                        div_validacao.html("<button type=\"button\" class=\"btn btn-success waves-effect waves-light\" style=\"pointer-events: none;\"><span class=\"btn-label\"><i class=\"mdi mdi-check-all\"></i></span>Dados validados junto ao Conselho Federal de Medicina</button>");
                    }
                }
            });
        }, 500)
    }

    let crm_medico = document.getElementById('crm_medico');
    let timeout = null;

    crm_medico.addEventListener('keyup', function (e) {
        // Clear the timeout if it has already been set.
        // This will prevent the previous task from executing
        // if it has been less than <MILLISECONDS>
        clearTimeout(timeout);

        // Make a new timeout set to go off in 1000ms (1 second)
        timeout = setTimeout(function () {
            if ($('#cpf_medico').attr('disabled')){
                let div_validacao = $("#validacao_medico");
                div_validacao.html("<button class=\"btn btn-warning waves-effect waves-light\" style=\"pointer-events: none;\"> <span class=\"btn-label\"><div class=\"spinner-border spinner-border-sm\" role=\"status\"></div></span>Validando os Dados Informados</button>");
                crm_medico.disabled = true;
                buscar_medico(div_validacao)
            }
        }, 700);
    });
});