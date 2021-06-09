
$(document).ready(function() {
    $('[data-toggle="select2"]').select2();
    $('#tabela-procedimentos').DataTable({
        "paging":   false,
        "ordering": false,
        "info":     false,
        "searching": false,
        "language": {
            "emptyTable": "nenhum procedimento adicionado",
        },
    });
})

function remover_procedimento(id, procedimento){
    Swal.fire({
        title: "Você tem certeza?",
        html: "O procedimento <strong>" + procedimento + "</strong> será removido!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1abc9c",
        cancelButtonColor: "#f1556c",
        confirmButtonText: "Sim, remover!",
        cancelButtonText: "Não"
        }).then(function (result) {
        if (result.value) {
            Swal.fire({
                title: 'Removido!',
                html: 'O procedimento <strong>' + procedimento + "</strong> foi removido.",
                icon: 'success',
                confirmButtonColor: "#1abc9c",
                confirmButtonText: "Ciente"
            })
            var tabela = $('#tabela-procedimentos').DataTable()
            tabela.rows('#'+id).remove().draw();
            tabela.column(0).nodes().each(function (cell, i) { 
                cell.innerHTML = '#'+(i+1); 
            }).draw();
        }
    });
}

function adicionar_procedimento(){
    var select_procedimento = $('#procedimento')
    var data = select_procedimento.select2('data')[0]

    if (data.id){
        var tabela = $('#tabela-procedimentos').DataTable()

        var row = tabela.row('#'+data.id).data();
        console.log(row)
        if (row){
            Swal.fire({
                icon: 'error',
                title: 'Procedimento já adicionado',
                confirmButtonColor: '#3bafda',
            });
        } else {
            tabela.row.add(
                ['#1',
                '<h5 class="m-0 d-inline-block align-middle">'+ data.text +'</h5>',
                '<div id="validacao_arquivos" class="box_btn_adicionar"><button data-bs-toggle="modal" data-bs-target="#bs-example-modal-lg" type="button" class="btn btn-outline-secondary waves-effect waves-light btn-sm" ><span class="btn-label"><i class=" fas fa-envelope-open-text"></i></span>Adicione Exames Compelmentares</button></div>' +
                '<div id="validacao_arquivos" class="box_btn_visualizar"><button data-bs-toggle="modal" data-bs-target="#modal_visualizar_documentos" type="button" class="btn btn-outline-secondary waves-effect waves-light btn-sm" ><span class="btn-label"><i class=" far fa-eye"></i></span>Visualizar Documentos</button></div>',
                '<a href="javascript:void(0);" id="btn-adicionar-arquivos" class="action-icon" onclick="remover_procedimento(\'' + data.id + '\', \''+ data.text + '\')"> <i class="mdi mdi-delete"></i></a>']).
            draw().node().id = data.id;

            tabela.column(0).nodes().each(function (cell, i) { cell.innerHTML = '#'+(i+1); }).draw();
            select_procedimento.val(null).trigger('change');

            $('.box_btn_adicionar').show();
            $('.box_btn_visualizar').show();
        }

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Nenhum procedimento foi selecionado',
            confirmButtonColor: '#3bafda',
        });
    }

}