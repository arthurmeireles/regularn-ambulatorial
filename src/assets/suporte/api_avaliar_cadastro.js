
function transmitir_avaliacao_cadastro(id_cadastro, apr, parecer, observacoes){
    let msg = 'O cadastro de '+ $('#nome_cadastro').val()+ ' será <strong>' + ((apr) ? 'APROVADO' : 'REJEITADO') +'</strong> e essa operação é irreversível.'
    Swal.fire({
        title: 'Você tem certeza?',
        html: msg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, avaliar autocadastro!',
        cancelButtonText: 'Não'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: '/suporte/api/auto_cadastro_avaliar/',
                type: 'POST',
                data: {
                    'id_cadastro': id_cadastro,
                    'id_parecer': parecer,
                    'observacoes': observacoes
                },
                success:function(data) {
                    swal.fire({
                        icon: 'success',
                        allowOutsideClick: false,
                        showCancelButton: true,
                        customClass: {
                            confirmButton: 'btn btn-link',
                            cancelButton: 'btn btn-link',
                        },
                        buttonsStyling: false,
                        confirmButtonText: '<a href="/suporte/lista_auto_cadastro/" class="btn btn-primary waves-effect waves-light">Analisar outros cadastros</a>',
                        cancelButtonText: '<a href="/index/" class="btn btn-success waves-effect waves-light">Voltar a tela inicial</a>',
                        text: data.msg,
                    });
                },
                error:function(data) {
                    swal.fire({
                        icon: 'error',
                        confirmButtonText: "Ciente",
                        text: `Erro ${data.status}`
                    });
                }
            });
        }
    })
}


function avaliar_auto_cadastro(id_cadastro){
    let parecer = $('#parecer');
    let observacao = $('#observacao');

    if (parecer.parsley().validate() === true){
        $.ajax({
            url: '/suporte/api/pareceres_check/',
            type: 'POST',
            data: {
                'id_parecer': parecer.val(),
            },
            success:function(data) {
                if(data.results !== true && observacao.parsley().validate() !== true){
                    {}
                } else {
                    transmitir_avaliacao_cadastro(id_cadastro, data.results, parecer.val(), observacao.val());
                }
            },
            error:function(data) {
                swal.fire({
                    icon: 'error',
                    text: 'Verifique sua conexão.'
                });
            }
        });
    }
}