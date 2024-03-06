let isSerie = document.getElementById('serie');
let isMovie = document.getElementById('movie');



let types = document.querySelectorAll('input[type=radio][name=type]');

types.forEach(type => {
    type.addEventListener('change', () =>{
        if (type.value == "movie") {
            document.getElementById('season-selector').style.display = "none";
        } else if (type.value == "serie"){
            document.getElementById('season-selector').style.display = "block";
        }
    })
})


function convertMinutes(minutess){
    let hours = Math.floor(minutess / 60) ,
    minutes = Math.floor(minutess % 60),
    total = '';

    if (minutess < 60){
        total = `${minutes}m`
        return total
    } else if (minutess > 60){
      total = `${hours}h ${minutes}m`
      return total
    } else if (minutess = 60){
        total = `${hours}h`
        return total
    }
}



async function searchMoviesAndSeries() {
  const searchQuery = document.getElementById('search-input').value;
  const languaje = "es-MX";

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=b6083b855479a79fd9acdb0a2789f126&language=${languaje}&query=${searchQuery}`);
    const data = await response.json();

    // Mostrar los resultados en la pÃ¡gina
    displaySearchResults(data.results);
  } catch (error) {
    console.log(error);
  }
}




function displaySearchResults(results) {
  const searchResultsContainer = document.getElementById('search-results');
  const moviesContainer = document.getElementById('movies-container');
  const seriesContainer = document.getElementById('series-container');

  // Limpiar resultados anteriores
  moviesContainer.innerHTML = "";
  seriesContainer.innerHTML = "";

  results.forEach((result) => {
    const resultItem = document.createElement('div');
    resultItem.className = "search-result-item";

    // Crear elemento para mostrar la carÃ¡tula o pÃ³ster
    const posterImg = document.createElement('img');
    posterImg.src = `https://image.tmdb.org/t/p/original/${result.poster_path}`;
    posterImg.alt = result.title || result.name;
    resultItem.appendChild(posterImg);

    // Crear elemento para mostrar el nombre de la pelÃ­cula o serie
    const nameElement = document.createElement('span');
    nameElement.textContent = result.title || result.name;
    resultItem.appendChild(nameElement);

    resultItem.addEventListener('click', () => {
      // Al seleccionar un resultado, cierra todos los resultados y actualiza el generador con el ID de la pelÃ­cula o serie seleccionada
      document.getElementById('search-results').style.display = "none";
      document.getElementById('numero').value = result.id;
    });

    // Separar resultados en pelÃ­culas y series
    if (result.media_type === "movie") {
      moviesContainer.appendChild(resultItem);
    } else if (result.media_type === "tv") {
      seriesContainer.appendChild(resultItem);
    }
  });

  // Mostrar los resultados en pantalla
  searchResultsContainer.style.display = "block";
}













function generar() {
    let serieKey = document.getElementById('numero').value;
    let languaje = "es-MX"
    let seasonNumber = document.getElementById('numeroTemporada').value;

    const cargarPeliculas = async() => {

        if (isSerie.checked) {
            try {

                const respuesta = await fetch(`https://api.themoviedb.org/3/tv/${serieKey}?api_key=b6083b855479a79fd9acdb0a2789f126&language=${languaje}`);
                const respuesta3 = await fetch(`https://api.themoviedb.org/3/tv/${serieKey}/season/${seasonNumber}?api_key=b6083b855479a79fd9acdb0a2789f126&language=${languaje}`);
    
                if (respuesta.status === 200) {
                    const datos = await respuesta.json();
                    const datosTemporada = await respuesta3.json();
                    
                    
let enlace4 = document.getElementById('enlace4').value; // Capturar el valor de enlace4
let enlace14 = document.getElementById('enlace14').value; // Capturar el valor de enlace14
                    
                        
                    let tags = '';
    
                    datos.genres.forEach(genre => {
                        if (genre.name != datos.genres[datos.genres.length - 1].name) {
                            tags += `${genre.name}, `
                        } else {
                            tags += datos.genres[datos.genres.length - 1].name
                        }
                    });

                    let creators = '';
    
                    datos.created_by.forEach((creator, i) => {
                        if (i == datos.created_by.length - 1){
                            creators += creator.name
                        } else{
                            creators += `${creator.name}, `

                        }
                    });
    
                       
                    let episodeList = '';
    
                    datosTemporada.episodes.forEach(episode => {
                        let runtime ;
                        if (episode.runtime != null) {
                            runtime = convertMinutes(episode.runtime);
                        } else {
                            runtime = ''
                        }
                        episodeList += `
                        
                        
                        <a href="#!ENLACEDETUVIDEO" class="capitulo">
                <div class="imagen">
                    <img src="https://image.tmdb.org/t/p/original/${episode.still_path}" alt="CapÃ­tulo 1">
                    <div class="duracion">${runtime}</div>
                    <div class="titulo">${episode.episode_number}. ${episode.name}</div>
<div class="play-icon">
            <i class="fas fa-play"></i>
        </div>                    
                </div>
            </a>
                        
                        
                        `
                    })
    
                    let seasonsOption = '';
    
                    datos.seasons.forEach(season => {
                        
                        if(season.name != "Especiales"){
                            seasonsOption += `<option value="capitulos-temporada${season.season_number}">Temporada ${season.season_number}</option>
                            `
                        }
                    })
    
                    let genSeasonsCount;
    
                    if (datos.number_of_seasons == 1){
                        genSeasonsCount = " Temporada"
                    } else if (datos.number_of_seasons > 1){
                        genSeasonsCount = " Temporadas"
                    }
                    
                    let template = document.getElementById('html-final');
    
                    let justHtml = ` 
                    
<!DOCTYPE html>

<!DOCTYPE html>
<!DOCTYPE html>
<html lang="es">
<head>
<title>cine prime</title>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" rel="stylesheet">

<style>
body{background:#060606;margin:0}.img1 img{width:100%;height:230px}.portada{position:absolute;top:60%;width:81%;height:auto;display:flex;padding:30px;margin-top:-5px;max-width:800px}.portada img{width:110px;height:160px;margin-top:20px;border-radius:10px}.portada .info{margin:25px 10px}h3{color:#fff}.info p{color:#a7a7a7}.cuerpo{margin:0 10px}a button{width:100%;font-size:20px;font-weight:666;color:#fff;background:#d51f39;padding:18px;border-radius:15px;border:0}.cuerpo .fondo{width:100%;height:60px;padding:1px 0;margin-top:10px;background:linear-gradient(to right,transparent,#ffffff,transparent)}.cuerpo p{color:#909090;font-family:Arial,sans-serif;font-weight:700;text-align:justify}.btns{display:flex;width:100%;height:60px;background:#070708;margin:0;align-items:center;justify-content:space-between}.btns a{display:grid;text-align:center;color:#888;padding:10px;text-decoration:none}.btns a i{color:#fff}h2{color:#fff;margin:10px}p{color:#909090}.icon{color:#fff;font-size:25px}.menu{position:fixed;top:0;left:0;width:100%;background:linear-gradient(to bottom,rgba(0,0,0,1) 0%,rgba(0,0,0,.98) 10%,rgba(0,0,0,0) 100%);color:#fff;font-size:28px;padding:20px;z-index:3;transition:background 0.3s}.image-container{background-image:url(https://image.tmdb.org/t/p/original/${datos.poster_path});background-size:cover;background-position:center;background-repeat:no-repeat;background-attachment:fixed;position:relative;width:100%;height:70vh;overflow:hidden}.inner-shadow{position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(to top,rgba(0,0,0,.98) 8%,rgba(0,0,0,0) 40%)}.texto-blanco{position:absolute;bottom:0;left:15px;font-size:28px;color:#e7e5e4;margin:0;z-index:1}.botones-transparentes{display:inline-block}.botones-transparentes button{background:transparent;border:transparent;color:#888;padding:1px 1px;margin-right:5px;cursor:pointer}.texto-largo{color:#e7e5e4;padding:20px;text-align:left;font-size:16px;line-height:1.5}button{border:none;outline:none}#mensaje{user-select:none;display:none;background-color:#4c4c4c;color:#fff;text-align:center;padding:10px 18px 10px 18px;margin:0 auto;position:fixed;bottom:10%;left:0;right:0;width:fit-content;z-index:999;transition:opacity 0.5s ease-in-out;border-radius:20px}#mensaje.mostrando{display:block;opacity:1}#mensaje.ocultando{opacity:0}.open-button{background-color:transparent;color:#fff;border:none;font-size:16px;cursor:pointer;margin-bottom:0;position:relative;width:100%;height:38px;border-bottom:1px solid #fff}#close-button{position:absolute;right:10px;background-color:transparent;color:#fff;border:none;font-size:24px;cursor:pointer;margin-top:-330px}@media only screen and (max-width:600px){.portada{width:90%}.portada img{margin-top:10px}}*{list-style:none;margin:0;padding:0;box-sizing:border-box;color:#fff;font-family:"Source Sans Pro",sans-serif;text-decoration:none;-webkit-tap-highlight-color:transparent}:root{--main:#950000}body{background:#000;font-family:"Source Sans Pro",sans-serif}
</style>
</head>
<body>

<div class="menu">
<i id="flecha" class="fa-solid fa-arrow-left" style="cursor: pointer;"></i>

<script>
document.getElementById('flecha').addEventListener('click', function() {
redirigir();
});

function redirigir() {
var ultimoIdentificador = localStorage.getItem("ultimaPagina");
if (ultimoIdentificador) {
window.location.href = "go:" + ultimoIdentificador;
} else {
alert("No hay última página registrada");
}
}
</script>

<!-- Add the heart icon button to the right side of the screen -->
<button class="favoritoBtn" fav-id="TV${datos.name}-${datos.first_air_date.slice(0,4)}" style="position: fixed; top: px; right: 20px; background: transparent; border: none; color: white; font-size: 28px; cursor: pointer;">
<i class="fa-regular fa-bookmark"></i>
</button>
<!-- Add the heart icon button to the right side of the screen -->


</div>

<div class="image-container">
<!-- Sombreado interior -->
<div class="inner-shadow">
<!-- Contenedor de texto -->
<div class="portada">
<img src="https://image.tmdb.org/t/p/original/${datos.poster_path}" alt="">
<div class="info">
<h3>${datos.name}</h3>
<br>
<p>${datos.first_air_date.slice(0,4)}</p>
<p>${datos.number_of_seasons + genSeasonsCount}</p>
<p>${tags}</p>
</div>
</div>
<!-- Contenedor de texto -->
</div>

<div id="mensaje" class="oculto">¡Serie añadida a tu lista!</div>
</div>


<div class="cuerpo">
<a href="link lista">
<button><i class="fa-solid fa-play icon"></i> Play</button>
</a>
<div class="fondo">
<div class="btns">
<a href="http://Action_share"><i class="fa-solid fa-share-nodes icon"></i>Compartir</a>
<a href="http://Action_share"><i class="fa-solid fa-font-awesome icon"></i>Reportar</a>
<a ><i class="fa-solid fa-star  icon" style="color: #FFD43B;"></i>${datos.vote_average.toFixed(1)}</a>
</div>
</div>
<h2>Sinopsis</h2>
<p>${datos.overview} </p>
</div>

<script>


const favoritoBtns = document.querySelectorAll(".favoritoBtn");

favoritoBtns.forEach(button => {
const elementoAgregado = {
id: button.getAttribute("fav-id"),
src: "https://image.tmdb.org/t/p/original/${datos.poster_path}",
alt: "${datos.name}",
url: "${enlace4}",
};

const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
const isAdded = favoritos.some(item => item.id === elementoAgregado.id);
updateButtonContent(button, isAdded);

button.addEventListener("click", () => {
const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
const index = favoritos.findIndex(item => item.id === elementoAgregado.id);

if (index === -1) {
favoritos.push(elementoAgregado);
mostrarMensajeEmergente();
} else {
favoritos.splice(index, 1);
}

localStorage.setItem("favoritos", JSON.stringify(favoritos));
updateButtonContent(button, index === -1);
});
});

function updateButtonContent(button, isAdded) {
if (isAdded) {
button.innerHTML = '<i class="fa-solid fa-bookmark"></i> ';
} else {
button.innerHTML = '<i class="fa-regular fa-bookmark"></i> ';
}
}

function mostrarMensajeEmergente() {
const mensaje = document.getElementById('mensaje');
mensaje.classList.add('mostrando');

setTimeout(function () {
mensaje.classList.add('ocultando');

setTimeout(function () {
mensaje.classList.remove('mostrando');
}, 500);

setTimeout(function () {
mensaje.classList.remove('ocultando');
}, 1000);
}, 3000);
}

</script>

</body>
</html>


                    `;
                    
                    let seasonOnly = `
                    <div class="capitulos" id="capitulos-temporada${seasonNumber}">
            <!-- CapÃ­tulos  temporada ${seasonNumber} -->
            
            ${episodeList}
        </div>
    
    
    
                    `;
    
                    const btnCopiar = document.getElementById('copiar');
    
                    if (seasonNumber == 1) {
                        template.innerText = justHtml;
                    } else if (seasonNumber > 1){
                        template.innerText = seasonOnly;
                    }
    
                    let templateHTML = template.innerText;
                    console.log(justHtml, typeof justHtml)
                    btnCopiar.addEventListener('click', () => {
                        navigator.clipboard.writeText(templateHTML);
                    })

                    
                    let genPoster = document.getElementById('info-poster');
                    let genTitle = document.getElementById('info-title');
                    let genSeasons = document.getElementById('info-seasons');
                    let genYear = document.getElementById('info-year');
    
                    genPoster.setAttribute('src', `https://image.tmdb.org/t/p/original/${datos.poster_path}`)
                    genTitle.innerText = datos.name;
                    genSeasons.innerText = datos.number_of_seasons + genSeasonsCount;
                    genYear.innerText = datos.first_air_date.slice(0,4);
    
    
    
                } else if (respuesta.status === 401) {
                    console.log('Wrong key');
                } else if (respuesta.status === 404) {
                    console.log('No existe');
                }
    
            } catch (error) {
                console.log(error);
            }
        } else
        if(isMovie.checked){
            try {

            const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${serieKey}?api_key=b6083b855479a79fd9acdb0a2789f126&language=${languaje}`);

            if (respuesta.status === 200) {
                const datos = await respuesta.json();
                console.log(datos);
                
let enlaceY1 = document.getElementById('enlaceY1').value;         
let enlaceY2 = document.getElementById('enlaceY2').value;            
let enlaceY3 = document.getElementById('enlaceY3').value;           
let enlace4 = document.getElementById('enlace4').value; // Capturar el valor de enlace4
let enlace14 = document.getElementById('enlace14').value; // Capturar el valor de enlace14     
let enlace43 = document.getElementById('enlace43').value; // Capturar el valor de enlace43    



                let tags = '';

                datos.genres.forEach(genre => {
                    if (genre.name != datos.genres[datos.genres.length - 1].name) {
                        tags += `${genre.name}, `
                    } else {
                        tags += datos.genres[datos.genres.length - 1].name
                    }
                });


                    let template = document.getElementById('html-final');

                    let justHtml = `
<!DOCTYPE html>
<!DOCTYPE html>
<html lang="es">
<head>
    <title>cine prime</title>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" rel="stylesheet">

    <style>
 body{background:#060606;margin:0}.img1 img{width:100%;height:230px}.portada{position:absolute;top:60%;width:81%;height:auto;display:flex;padding:30px;margin-top:-5px;max-width:800px}.portada img{width:110px;height:160px;margin-top:20px;border-radius:10px}.portada .info{margin:25px 10px}h3{color:#fff}.info p{color:#a7a7a7}.cuerpo{margin:0 10px}a button{width:100%;font-size:20px;font-weight:666;color:#fff;background:#d51f39;padding:18px;border-radius:15px;border:0}.cuerpo .fondo{width:100%;height:60px;padding:1px 0;margin-top:10px;background:linear-gradient(to right,transparent,#ffffff,transparent)}.cuerpo p{color:#909090;font-family:Arial,sans-serif;font-weight:700;text-align:justify}.btns{display:flex;width:100%;height:60px;background:#070708;margin:0;align-items:center;justify-content:space-between}.btns a{display:grid;text-align:center;color:#888;padding:10px;text-decoration:none}.btns a i{color:#fff}h2{color:#fff;margin:10px}p{color:#909090}.icon{color:#fff;font-size:25px}.menu{position:fixed;top:0;left:0;width:100%;background:linear-gradient(to bottom,rgba(0,0,0,1) 0%,rgba(0,0,0,.98) 10%,rgba(0,0,0,0) 100%);color:#fff;font-size:28px;padding:20px;z-index:3;transition:background 0.3s}.image-container{background-image:url(https://image.tmdb.org/t/p/original/${datos.poster_path});background-size:cover;background-position:center;background-repeat:no-repeat;background-attachment:fixed;position:relative;width:100%;height:70vh;overflow:hidden}.inner-shadow{position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(to top,rgba(0,0,0,.98) 8%,rgba(0,0,0,0) 40%)}.texto-blanco{position:absolute;bottom:0;left:15px;font-size:28px;color:#e7e5e4;margin:0;z-index:1}.botones-transparentes{display:inline-block}.botones-transparentes button{background:transparent;border:transparent;color:#888;padding:1px 1px;margin-right:5px;cursor:pointer}.texto-largo{color:#e7e5e4;padding:20px;text-align:left;font-size:16px;line-height:1.5}button{border:none;outline:none}#mensaje{user-select:none;display:none;background-color:#4c4c4c;color:#fff;text-align:center;padding:10px 18px 10px 18px;margin:0 auto;position:fixed;bottom:10%;left:0;right:0;width:fit-content;z-index:999;transition:opacity 0.5s ease-in-out;border-radius:20px}#mensaje.mostrando{display:block;opacity:1}#mensaje.ocultando{opacity:0}.open-button{background-color:transparent;color:#fff;border:none;font-size:16px;cursor:pointer;margin-bottom:0;position:relative;width:100%;height:38px;border-bottom:1px solid #fff}#close-button{position:absolute;right:10px;background-color:transparent;color:#fff;border:none;font-size:24px;cursor:pointer;margin-top:-330px}@media only screen and (max-width:600px){.portada{width:90%}.portada img{margin-top:10px}}*{list-style:none;margin:0;padding:0;box-sizing:border-box;color:#fff;font-family:"Source Sans Pro",sans-serif;text-decoration:none;-webkit-tap-highlight-color:transparent}:root{--main:#950000}body{background:#000;font-family:"Source Sans Pro",sans-serif}
    </style>
</head>
<body>

<div class="menu">
    <i id="flecha" class="fa-solid fa-arrow-left" style="cursor: pointer;"></i>

    <script>
        document.getElementById('flecha').addEventListener('click', function() {
            redirigir();
        });

        function redirigir() {
            var ultimoIdentificador = localStorage.getItem("ultimaPagina");
            if (ultimoIdentificador) {
                window.location.href = "go:" + ultimoIdentificador;
            } else {
                alert("No hay última página registrada");
            }
        }
    </script>

    <!-- Add the heart icon button to the right side of the screen -->
    <button class="favoritoBtn"  fav-id="M${datos.title}-${datos.release_date.slice(0,4)}-${convertMinutes(datos.runtime)}" style="position: fixed; top: px; right: 20px; background: transparent; border: none; color: white; font-size: 28px; cursor: pointer;">
        <i class="fa-regular fa-bookmark"></i>
    </button>
    <!-- Add the heart icon button to the right side of the screen -->


</div>

<div class="image-container">
    <!-- Sombreado interior -->
    <div class="inner-shadow">
        <!-- Contenedor de texto -->
        <div class="portada">
            <img src="https://image.tmdb.org/t/p/original/${datos.poster_path}" alt="">
            <div class="info">
                <h3>${datos.title}</h3>
                <br>
                <p>${datos.release_date.slice(0,4)}</p>
                <p>${convertMinutes(datos.runtime)}</p>
                <p>${tags}</p>
            </div>
        </div>
        <!-- Contenedor de texto -->
    </div>

    <div id="mensaje" class="oculto">¡Película añadida a tu lista!</div>
</div>


<div class="cuerpo">
    <a href="https://02028z.blogspot.com/p/player-para-plantilla-de-apk-de.html?file=${enlace43}&title=${datos.title}&poster=https://image.tmdb.org/t/p/original${datos.backdrop_path}">
        <button><i class="fa-solid fa-play  icon"></i> Play</button>
    </a>
    <div class="fondo">
        <div class="btns">
            <a href="http://Action_share"><i class="fa-solid fa-share-nodes  icon"></i>Compartir</a>
            <a href="http://Action_share"><i class="fa-solid fa-font-awesome  icon"></i>Reportar</a>
            <a id="flag-button"><i class="fa-brands fa-chromecast  icon"></i>Transmitir</a>
        </div>
    </div>
    <h2>Sinopsis</h2>
    <p>${datos.overview} </p>
</div>

<script>
    function abrirVideo() {
        var videoURL = "${enlace43}";
        var secureURL = encodeURIComponent(videoURL) + "&secure_uri=true";
        window.location.href = "wvc-x-callback://open?url=" + secureURL;
        setTimeout(function () {
            window.location.href = "market://launch?id=com.instantbits.cast.webvideo";
        }, 3000);
    }

    document.getElementById("flag-button").addEventListener("click", abrirVideo);

    const favoritoBtns = document.querySelectorAll(".favoritoBtn");

    favoritoBtns.forEach(button => {
        const elementoAgregado = {
            id: button.getAttribute("fav-id"),
            src: "https://image.tmdb.org/t/p/original/${datos.poster_path}",
            alt: "${datos.title}",
            url: "${enlace14}",
        };

        const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        const isAdded = favoritos.some(item => item.id === elementoAgregado.id);
        updateButtonContent(button, isAdded);

        button.addEventListener("click", () => {
            const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
            const index = favoritos.findIndex(item => item.id === elementoAgregado.id);

            if (index === -1) {
                favoritos.push(elementoAgregado);
                mostrarMensajeEmergente();
            } else {
                favoritos.splice(index, 1);
            }

            localStorage.setItem("favoritos", JSON.stringify(favoritos));
            updateButtonContent(button, index === -1);
        });
    });

    function updateButtonContent(button, isAdded) {
        if (isAdded) {
            button.innerHTML = '<i class="fa-solid fa-bookmark"></i> ';
        } else {
            button.innerHTML = '<i class="fa-regular fa-bookmark"></i> ';
        }
    }

    function mostrarMensajeEmergente() {
        const mensaje = document.getElementById('mensaje');
        mensaje.classList.add('mostrando');

        setTimeout(function () {
            mensaje.classList.add('ocultando');

            setTimeout(function () {
                mensaje.classList.remove('mostrando');
            }, 500);

            setTimeout(function () {
                mensaje.classList.remove('ocultando');
            }, 1000);
        }, 3000);
    }

</script>

</body>
</html>


`;                  
                    template.innerText = justHtml;
                    let templateHTML = template.innerText;
                    
                    const btnCopiar = document.getElementById('copiar');
                    
                    btnCopiar.addEventListener('click', () => {
                        navigator.clipboard.writeText(templateHTML);
                    })
    
    
                    let genPoster = document.getElementById('info-poster');
                    let genTitle = document.getElementById('info-title');
                    
                                   
                    
                    
                    let genSeasons = document.getElementById('info-seasons');
                    let genYear = document.getElementById('info-year');
    
                    genPoster.setAttribute('src', `https://image.tmdb.org/t/p/original/${datos.poster_path}`)
                    genTitle.innerText = datos.title;
                    genSeasons.innerText = "";
                    genYear.innerText = datos.release_date.slice(0,4);
    
    
    
                } else if (respuesta.status === 401) {
                    console.log('Wrong key');
                } else if (respuesta.status === 404) {
                    console.log('No existe');
                }
    
            } catch (error) {
                console.log(error);
            }           
        }

    }

    cargarPeliculas();

}


generar();


