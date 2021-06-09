$(document).ready(function () {
    "use strict";

    $('#solicitacao_ambulatorial').bootstrapWizard(
        {
            'onTabShow': function (tab, navigation, index) {
                var $total = navigation.find('li').length;
                var $current = index + 1;
                var $percent = ($current / $total) * 100;
                $('#solicitacao_ambulatorial').find('.bar').css({ width: $percent + '%' });
            },
            'onNext': function (tab, navigation, index) {
                let form = $($(tab).data("targetForm"));
                let segue = false

                if (form) {
                    form.parsley().validate();

                    if (form.parsley().isValid()){
                        if ($(tab).data("targetForm") === '#medicoForm'){
                            if ($('#cpf_medico').attr('disabled') && $('#crm_medico').attr('disabled')){
                                segue = true
                            } else {
                                Swal.fire(
                                    'Erro!',
                                    'Todos os campos precisam estar validados para prosseguir.',
                                    'error'
                                );
                            }
                        } else if($(tab).data("targetForm") === '#pacienteForm'){
                            if ($('#cpf_paciente').attr('disabled')){
                                segue = true
                            } else{
                                Swal.fire(
                                    'Erro!',
                                    'Certifique-se que todos os campos foram preenchidos corretamente.',
                                    'error'
                                );
                            }
                        }else {
                            segue = true
                        }
                        return segue
                    } else {
                        event.preventDefault();
                        event.stopPropagation();
                        return false
                    }

                }
            }
        }
    );
});