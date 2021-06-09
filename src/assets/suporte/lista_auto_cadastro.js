
$(document).ready(function() {
    var table = $('#tabela_auto_cadastro').DataTable({
        "ordering": false,
        // "buttons": ['excel'],
        "buttons": [{ "extend": 'excel', "className": 'btn-light', "exportOptions": { "columns": [ 0, 1, 2]},
                       "title": 'RegulaRN Ambulatorial - Lista de Autocadastros'}],
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
        "drawCallback": function () {
            $('.dataTables_paginate > .pagination').addClass('pagination-rounded');
        },
    });
    table.buttons().container().appendTo('#tabela_auto_cadastro_wrapper .col-md-6:eq(0)');
})
