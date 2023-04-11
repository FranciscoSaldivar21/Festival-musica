document.addEventListener('DOMContentLoaded', function() {  //En cuanto carga el DOM ejecuta la funciones dentro
    iniciarApp();
});

function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a'); //Seleccionamos todos los enlaces de navegacion principal
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');
    for (let i = 1; i <= 12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <picture>
                <source srcset="build/img/thumb/${i}.avif" type="image/avif">
                <source srcset="build/img/thumb/${i}.webp" type="image/webp">
                <img width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen">
            </picture>
        `;

        imagen.onclick = function(){  //callback sirve para pasar parametros y que la funcion se llame cada que se de click
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id){
    const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <picture>
                <source srcset="build/img/grande/${id}.avif" type="image/avif">
                <source srcset="build/img/grande/${id}.webp" type="image/webp">
                <img width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imagen">
            </picture>
        `;


        //Crea el overlay con la imagen
        const overlay = document.createElement('DIV');
        overlay.appendChild(imagen); //Agrega la imagen a overlay
        overlay.classList.add('overlay');  //Agrega una clase al elemento overlay creado

        //Este código hace que al dar click en cualquier area se cierre la imagen
        overlay.onclick = function () {
            const body = document.querySelector('body');  //Selecciona body
            body.classList.remove('fijar-body');  //Elimina la clase cuando se presione x
            overlay.remove();  //Elimina el overlay de la pantalla
        }

        //Boton para cerrar el modal
        const cerrarModal = document.createElement('P');  //Crea un parrafo
        cerrarModal.textContent = 'x';
        cerrarModal.classList.add('btn-cerrar');  //Agrega la clase a cerrarModal
        cerrarModal.onclick = function () {
            const body = document.querySelector('body');  //Selecciona body
            body.classList.remove('fijar-body');  //Elimina la clase cuando se presione x
            overlay.remove();  //Elimina el overlay de la pantalla
        }
        overlay.appendChild(cerrarModal);

        //Añadir al HTML
        const body = document.querySelector('body');
        body.appendChild(overlay); //Agrega overlay al body
        body.classList.add('fijar-body');
}

function navegacionFija(){
    const barra =  document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function () {
    if(sobreFestival.getBoundingClientRect().top < 0){
        barra.classList.add('fijo');
        body.classList.add('body-scroll');
    }
    else{
        barra.classList.remove('fijo');
        body.classList.remove('body-scroll')
    }
    })
}