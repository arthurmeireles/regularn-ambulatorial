function detalhar_avaliacao(id_cadastro) {
    document.getElementById("loading_avaliacao").hidden = false;
    document.getElementById("conteudo_avaliacao").hidden = true;
    $('#modal_detalhes_cadastro').modal('show');

    $.ajax({
        url: '/suporte/api/detalhes_avaliacao_autocadastro/',
        type: 'POST',
        data: {
            'id_cadastro': id_cadastro,
        },
        success:function(data) {
            jQuery.each(data.dados, function(key, val) {
             $('#'+key).val(val).attr("src", val);
            });
            document.getElementById("loading_avaliacao").hidden = true;
            document.getElementById("conteudo_avaliacao").hidden = false;
        },
        error:function(data) {
            setTimeout(function(){
              $('#modal_detalhes_cadastro').modal('hide');
              swal.fire({
                icon: 'error',
                confirmButtonText: "Ciente",
                text: 'Verifique sua conexão.'
            });
            }, 2000);
        }
    });
}