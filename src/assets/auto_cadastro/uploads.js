// Dropzone
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
            var opts = { url: actionUrl,
                init: function () {
                    this.on("error", function(file, erro, response) {
                        if (file.size > 10*1024*1024) {
                            this.removeFile(file);
                            Swal.fire(
                                'Erro!',
                                'O arquivo deve ter no máximo 10mb.',
                                'error'
                            );
                        } else if(!file.type.match('image.*')) {
                            this.removeFile(file);
                            Swal.fire(
                                'Erro!',
                                'Apenas arquivos de imagem são aceitos.',
                                'error'
                            );
                        } else if (response){
                            this.removeFile(file);
                            Swal.fire(
                                'Erro!',
                                'Verifique sua conexão com a internet e tente novamente.',
                                'error'
                            );
                        } else {
                            this.removeAllFiles();
                            this.addFile(file);
                        }

                    });
                    this.on("removedfile", function(file) {
                        formulario[this.element.id] = null;
                        $.ajax({
                            url: '/upload/',
                            type: 'DELETE',
                            data: {
                                server_id: file.server_id,
                            },
                        });
                    });
                    this.on("success", function(file, response) {
                        file.server_id = response.server_id;
                        formulario[this.element.id] = response.server_id;
                        feedback()
                    });

                },
                maxFilesize: 10,
                acceptedFiles: "image/*"};

            if (previewContainer) {
                opts['previewsContainer'] = previewContainer;
                opts['thumbnailWidth'] = thumbnailWidth;
                opts['thumbnailHeight'] = thumbnailHeight;
            }

            var uploadPreviewTemplate = $(this).data("uploadPreviewTemplate");
            if (uploadPreviewTemplate) {
                opts['previewTemplate'] = $(uploadPreviewTemplate).html();
            }

            opts['maxFiles'] = 1;
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


    function feedback(){
        $('.progress-upload').hide()
        $('.upload_sucesso').removeClass('d-none')
    }