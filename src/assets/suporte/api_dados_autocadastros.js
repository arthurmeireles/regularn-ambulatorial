
$(document).ready(function () {
    "use strict";
    var tabela_data ={};
    var tabela_autocadastros = $('#tabela_autocadastros').DataTable( {
        "processing": true,
        "serverSide": true,
        "searching": false,
        "ordering": false,
        "columns": [
            {"data": "parecer", "sortable": false},
            {"data": "dt_cadastro", "sortable": false},
            {"data": "nome_avaliador", "sortable": false},
            {"data": "dt_avaliacao", "sortable": false},
            {"data": "acao", "sortable": false}
        ],
        "ajax": {
            "url": "/suporte/api/listar_autocadastros_user/",
            "data": function ( d ) {
                return  $.extend(d, tabela_data);
            },
            "datatype": "JSON",
            "type": "POST"
        },
        "language": {
            "emptyTable": "nenhum registro encontrado",
            "search": "Buscar:",
            "loadingRecords": "Carregando dados...",
            "processing": "Buscando...",
            "lengthMenu": "Exibindo até _MENU_ registros por página",
            "info": "Registros de _START_ a _END_ para um total de _TOTAL_",
            "infoEmpty": "",
            "paginate": {
                "previous": "<i class='mdi mdi-chevron-left'>",
                "next": "<i class='mdi mdi-chevron-right'>"
            }
        },
    } );

    $('#id_usuario_detalhar').on('select2:select', function (e) {
        tabela_data.id_user = e.params.data.id;
        tabela_autocadastros.ajax.reload();
    });
});
