function fileSelected(event, idInput, idPreview) {
    let imagem = event.files[0];
    document.getElementById(`${idPreview}`).src = URL.createObjectURL(imagem);
    alteraComponentes(`${idPreview}`, `${idInput}`);
}
function alteraComponentes(idPreview, idInput) {
    document.getElementById("box-"+idPreview).classList.remove('d-none')
    document.getElementById("box-"+idInput).classList.add('d-none')
}

function limpaInputImagem(idInput, idPreview){
    document.getElementById('box-'+ idInput).classList.remove('d-none')
    document.getElementById("box-"+ idPreview).classList.add('d-none')
    document.getElementById(`${idPreview}`).src = ''
}