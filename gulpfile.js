/*   function tarea( done ){ //Se pasa el done para poder terminar la funcion, se pasa automatico, no es parámetro
    console.log("Desde la primer tarea");
    done();  //Significa que termina la funcion
}

exports.tarea = tarea;  //Hacer disponible la funcion con el comando    gulp tarea    */

const { src, dest, watch, parallel} = require('gulp'); //Retorna multiples funciones por eso las llaves

//Estilos
const sass = require('gulp-sass')(require('sass'));  //Sacar dependencias 
//Ejecutar antes npm install --save-dev gulp-plumber
const plumber = require('gulp-plumber'); //Evitar paro de ejecución por error de compilación
//Post CSS
const autoprefixer = require('autoprefixer');  //Se encarga de que tenga soporte en los navegadores
const cssnano = require('cssnano'); //Comprime el codigo css
const postcss = require('gulp-postcss');  //Hace transformaciones por medio de los dos de arriba
const sourcemaps = require('gulp-sourcemaps'); //Hace que se pueda leer codigo css
//Imagenes
const cache = require('gulp-cache');
const imageMin = require('gulp-imagemin');
const webp = require('gulp-webp');  //Llamar api de gulp webp
const avif = require('gulp-avif');

//Javascript
const terser = require('gulp-terser-js');

function css( done ) {
    //Manda a llamar la proxima accion el pipe     
    src("src/scss/app.scss")   //Identificar archivo .SCSS a compilar  // **/*.scss  Hace que se compilen todos los scss con la nueva sintaxis
        .pipe( sourcemaps.init())  //Se iniializa sourcemaps para guardar la referencia de la ubicación
        .pipe(plumber()) //Evitar detener ejecución en caso de error de compilación
        .pipe(sass())   //Manda a llamar la proxima accion el pipe   //Compilar
        .pipe( postcss([autoprefixer(), cssnano()]))  //Mejorar codigo css
        .pipe( sourcemaps.write('.')) //El punto es para usar la ubicacion de css y esto guarda el archivo
        .pipe( dest('build/css'))      //Almacenarlo
    done();
}

function versionWebp( done ){
    const options = {
        quality: 50
    };

    src('img/**/*.{png,jpg}')
    .pipe(webp(options))
    .pipe(dest('build/img'))

    done();
}


function versionAvif( done ){
    const options = {
        quality: 50
    };

    src('img/**/*.{png,jpg}')
    .pipe(avif(options))
    .pipe(dest('build/img'))

    done();
}

function imagenes( done ){  //Esto aligera las imagenes y las deja en formato png
    const options = {
        optimizationLevel: 3
    };
    src('img/**/*.{png,jpg}')
    .pipe(cache(imageMin(options)))
    .pipe(dest('build/img'))
    done();
}

function javascript( done ){ //Compila hoja de javascript
    src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/js'));

    done();
}

//Funcion Watch para ver cambios cada que se guarde
function dev( done ) {
    watch('src/scss/app.scss', css);  //Identifica el archivo a observar y la funcion que se va a llamar
    watch('src/js/**/*.js', javascript);
    done();
}

exports.css = css;
exports.javascript = javascript;
exports.versionWebp = versionWebp; 
exports.dev = parallel(versionWebp, dev, imagenes, versionAvif, javascript); 