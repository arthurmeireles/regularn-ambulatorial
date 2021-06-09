$(document).ready(function () {
    "use strict";
    $('#cpf_paciente').on('keyup', function () {
        let cpf = $('#cpf_paciente');
        let icon_paciente = $("#icon_paciente");
        if (cpf.val().length === 14){
            cpf.attr('disabled', true);
            icon_paciente.html("<div class=\"spinner-border spinner-border-sm\" role=\"status\"></div>");
            $.ajax({
                method: "GET",
                url: "/busca_cpf/",
                data: { "cpf": cpf.val(), "operacao": "get_paciente" },
                success: function(result) {
                    if (result.status === true) {
                        $("#nome_paciente").html("<small><strong>Nome: " + result.nome + "</strong></small>");
                    } else {
                        if (result.operacao === 'get_paciente'){
                            Swal.fire(
                                'Erro!',
                                result.nome + ' é residente de ' + result.municipio +
                                ' e por isso você não pode prosseguir com essa solicitação.',
                                'error'
                            );
                            cpf.attr('disabled', false);

                        }else {
                            Swal.fire(
                                'Erro!',
                                'CPF Inválido.',
                                'error'
                            );
                            cpf.attr('disabled', false);
                        }

                    }
                    icon_paciente.html("<i class=\"fas fa-id-card\"></i>");

                },
                error: function() {
                    Swal.fire(
                        'Erro!',
                        'Um erro inesperado aconteceu, favor tentar novamente.',
                        'error'
                    );
                    cpf.attr('disabled', false);
                    icon_paciente.html("<i class=\"fas fa-id-card\"></i>");
                },
            });
        } else {
            $("#nome_paciente").html("<small><strong></strong></small>");
        }
    });

    $('#cpf_responsavel').on('keyup', function () {
        let cpf = $('#cpf_responsavel');
        let icon_responsavel = $("#icon_responsavel");
        let nome_responsavel = $("#nome_responsavel")

        if (cpf.val().length === 14){
            cpf.attr('disabled', true);
            icon_responsavel.html("<div class=\"spinner-border spinner-border-sm\" role=\"status\"></div>");
            $.ajax({
                method: "GET",
                url: "/busca_cpf/",
                data: { "cpf": cpf.val() },
                success: function(result) {
                    if (result.status === true){
                        nome_responsavel.html("<small><strong>Nome: " + result.nome + "</strong></small>");
                    } else {
                        Swal.fire(
                            'Erro!',
                            'CPF Inválido.',
                            'error'
                        );
                    }
                    icon_responsavel.html("<i class=\"fas fa-id-card\"></i>");
                    cpf.attr('disabled', false);
                },
                error: function() {
                    Swal.fire(
                        'Erro!',
                        'Um erro inesperado aconteceu, favor tentar novamente.',
                        'error'
                    );
                    icon_responsavel.html("<i class=\"fas fa-id-card\"></i>");
                    cpf.attr('disabled', false);
                },
            });

        } else {
            nome_responsavel.html("<small><strong></strong></small>");
        }
    });

    $('#cpf_medico').on('keyup', function () {
        let cpf = $('#cpf_medico');
        let icon_medico = $("#icon_medico");
        let nome_medico = $("#nome_medico");

        if (cpf.val().length === 14){
            cpf.attr('disabled', true);
            icon_medico.html("<div class=\"spinner-border spinner-border-sm\" role=\"status\"></div>");
            $.ajax({
                method: "GET",
                url: "/busca_cpf/",
                data: { "cpf": cpf.val(),
                        "operacao": "get_medico"},
                success: function(result) {
                    if (result.status === true){
                        nome_medico.html("<small><strong>Nome: " + result.nome + "</strong></small>");
                        $('#nascimento_medico').val(result.nascimento);
                        $('#crm_medico').attr('disabled', false);
                    } else {
                        Swal.fire(
                            'Erro!',
                            'CPF Inválido.',
                            'error'
                        );
                        cpf.attr('disabled', false);
                    }
                    icon_medico.html("<i class=\"fas fa-id-card\"></i>");

                },
                error: function() {
                    Swal.fire(
                        'Erro!',
                        'Um erro inesperado aconteceu, favor tentar novamente.',
                        'error'
                    );
                    icon_medico.html("<i class=\"fas fa-id-card\"></i>");
                    cpf.attr('disabled', false);
                },
            });

        } else {
            nome_medico.html("<small><strong></strong></small>");
        }
    });
});