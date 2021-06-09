$(document).ready(function() {
    $('#tabela_arquivos').DataTable({
        "paging":   false,
        "ordering": false,
        "info":     false,
        "searching": false,
        "language": {
            "emptyTable": "nenhum arquivo adicionado",
        },
    });
});

!function ($) {
    "use strict";
    var FileUpload = function () {
        this.$body = $("body")
    };
    /* Initializing */
    FileUpload.prototype.init = function () {
        // Disable auto discovery

        Dropzone.autoDiscover = false;

        $('[data-plugin="dropzone"]').each(function () {
            var actionUrl = $(this).attr('action')
            var previewContainer = $(this).data('previewsContainer');
            var thumbnailWidth = 350;
            var thumbnailHeight = 450;
            var opts = { url: actionUrl};
            if (previewContainer) {
                opts['previewsContainer'] = previewContainer;
                opts['thumbnailWidth'] = thumbnailWidth;
                opts['thumbnailHeight'] = thumbnailHeight;
            }


            var uploadPreviewTemplate = $(this).data("uploadPreviewTemplate");
            if (uploadPreviewTemplate) {
                opts['previewTemplate'] = $(uploadPreviewTemplate).html();
            }
            var dropzoneEl = $(this).dropzone(opts);
        });        

    },

    //init fileupload
    $.FileUpload = new FileUpload, $.FileUpload.Constructor = FileUpload
}(window.jQuery),

//initializing FileUpload
function ($) {
"use strict";
    $.FileUpload.init()
}(window.jQuery);

function verificaTipo(){
    console.log('entrou na função')
    if($('#img_preview').attr('src') == '#'){
        console.log($('#img_preview').attr('src') )
        $('#img_preview').hide()
        $('#sem_thumbnail').show()
    }else{
        console.log($('#img_preview').attr('src') )
        $('#img_preview').show()
        $('#sem_thumbnail').hide()
    }
}
