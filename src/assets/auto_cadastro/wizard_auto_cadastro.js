$(document).ready(function () {
    "use strict";

    $('#auto_cadastro').bootstrapWizard(
        {
            'onTabShow': function (tab, navigation, index) {
                var $total = navigation.find('li').length;
                var $current = index + 1;
                var $percent = ($current / $total) * 100;

                $('#auto_cadastro').find('.bar').css({ width: $percent + '%' });
            },
            'onNext': function (tab, navigation, index) {
                var form = $($(tab).data("targetForm"));
                form.parsley().validate();
                if (form) {
                    if (form.parsley().isValid()){
                        if (form.attr('id') === 'formDropzoneDOCFrente' && !formulario['formDropzoneDOCFrente']){
                            Swal.fire(
                                'Atenção!',
                                'Antes de prosseguir você deve anexar uma foto da frente do seu documento de identificação.',
                                'warning'
                            );
                            return false;
                        }
                        else if (form.attr('id') === 'formDropzoneDOCVerso' && !formulario['formDropzoneDOCVerso']){
                            Swal.fire(
                                'Atenção!',
                                'Antes de prosseguir você deve anexar uma foto do verso do seu documento de identificação.',
                                'warning'
                            );
                            return false;
                        }else if (form.attr('id') === 'formDropzoneSelfie' && !formulario['formDropzoneSelfie']){
                            Swal.fire(
                                'Atenção!',
                                'Antes de prosseguir você deve anexar uma selfie segurando o seu documento de identificação.',
                                'warning'
                            );
                            return false;
                        }else {
                            if (navigation.find('li').length === index) {
                                Swal.fire({
                                    title: 'Verificando as Informações',
                                    html: '<div class="sweet_loader"><svg viewBox="0 0 140 140" width="140" height="140"><g class="outline"><path d="m 70 28 a 1 1 0 0 0 0 84 a 1 1 0 0 0 0 -84" stroke="rgba(0,0,0,0.1)" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"></path></g><g class="circle"><path d="m 70 28 a 1 1 0 0 0 0 84 a 1 1 0 0 0 0 -84" stroke="#71BBFF" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dashoffset="200" stroke-dasharray="300"></path></g></svg></div>',
                                    showCancelButton: false,
                                    showConfirmButton: false,
                                    allowOutsideClick: false,
                                    didOpen: () => {
                                        $.ajax({
                                            url: '/api/auto_cadastro/',
                                            type: 'POST',
                                            data: {
                                                'phone_number': $('#celular_usuario').val(),
                                                'doc_frente': formulario['formDropzoneDOCFrente'],
                                                'doc_verso': formulario['formDropzoneDOCVerso'],
                                                'selfie': formulario['formDropzoneSelfie']
                                            },
                                            success:function(data) {
                                                swal.fire({
                                                    icon: 'success',
                                                    title: 'Formulário enviado!',
                                                    allowOutsideClick: false,
                                                    customClass: {
                                                        confirmButton: 'btn btn-link',
                                                    },
                                                    buttonsStyling: false,
                                                    confirmButtonText: '<a href="/admin/logout/" class="btn btn-primary waves-effect waves-light">Sair e aguardar a aprovação do cadastro!</a>',
                                                    text: 'Aguarde o email de confirmação para ter acesso ao sistema.',
                                                });
                                            },
                                            error:function(data) {
                                                let msg = '';

                                                if (!data.status){
                                                    msg = 'Verifique sua conexão de internet.';
                                                }else{
                                                    msg = data.responseJSON.msg;
                                                }

                                                swal.fire({
                                                    icon: 'error',
                                                    confirmButtonText: "Ciente",
                                                    text: msg,
                                                });
                                            }
                                        });
                                    }
                                })
                            }
                            return true;
                        }
                    } else {
                        event.preventDefault();
                        event.stopPropagation();
                        return false;
                    }
                }
            }
        }
    );
});