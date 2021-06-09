// Input aquivo foto
!function ($) {
    "use strict";
    var FileUpload = function () {
        this.$body = $("body")
    };
    /* Initializing */
    FileUpload.prototype.init = function () {
        // Disable auto discovery

        Dropzone.autoDiscover = false;

        $('#form_dropzone_rg_frente').each(function () {
            var actionUrl = $(this).attr('action')
            var previewContainer = $(this).data('previewsContainer');
            var thumbnailWidth = 350;
            var thumbnailHeight = 450;
            var opts = { url: actionUrl,
                init: function () {
                    this.on("error", function(file, erro, response) {
                        if (file.size > 1024*1024) {
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

                        $('.progress').hide()
                        $(".feedback_upload_sucesso").show()
                  
                    });
                },
                maxFilesize: 1,
                acceptedFiles: "image/*"
            };
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



// Input aquivo foto

!function ($) {
    "use strict";
    var FileUpload = function () {
        this.$body = $("body")
    };
    /* Initializing */
    FileUpload.prototype.init = function () {
        // Disable auto discovery

        Dropzone.autoDiscover = false;

        $('#form_dropzone_rg_verso').each(function () {
            var actionUrl = $(this).attr('action')
            var previewContainer = $(this).data('previewsContainer');
            var thumbnailWidth = 350;
            var thumbnailHeight = 450;
            var opts = { url: actionUrl,
                init: function () {
                    this.on("error", function(file, erro, response) {
                        if (file.size > 1024*1024) {
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
                    });
                },
                maxFilesize: 1,
                acceptedFiles: "image/*"
            };
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






!function ($) {
    "use strict";
    var FileUpload = function () {
        this.$body = $("body")
    };
    /* Initializing */
    FileUpload.prototype.init = function () {
        // Disable auto discovery

        Dropzone.autoDiscover = false;

        $('#form_dropzone_selfie').each(function () {
            var actionUrl = $(this).attr('action')
            var previewContainer = $(this).data('previewsContainer');
            var thumbnailWidth = 350;
            var thumbnailHeight = 450;
            var opts = { url: actionUrl};

            var uploadprogress = (this).data("uploadPreviewTemplate");


            if (previewContainer) {
                opts['previewsContainer'] = previewContainer;
                opts['thumbnailWidth'] = thumbnailWidth;
                opts['thumbnailHeight'] = thumbnailHeight;
                opts['uploadProgress'] = uploadprogress;
            }

            var uploadPreviewTemplate = $(this).data("uploadPreviewTemplate");
            if (uploadPreviewTemplate) {
                opts['previewTemplate'] = $(uploadPreviewTemplate).html();
            }
            var dropzoneEl = $(this).dropzone(opts);

        });        
        if($('#img_preview').attr('src') == '#'){
            console.log($('#img_preview').attr('src') )
            $('#img_preview').hide()
            $('#sem_thumbnail').show()
        }
        
         else{
            console.log($('#img_preview').attr('src') )
            $('#img_preview').show()
            $('#sem_thumbnail').hide()
        }
    },

    //init fileupload
    $.FileUpload = new FileUpload, $.FileUpload.Constructor = FileUpload
}(window.jQuery),

//initializing FileUpload
function ($) {
"use strict";
    $.FileUpload.init()
}(window.jQuery);





