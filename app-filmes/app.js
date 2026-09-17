import { apiKey } from './api.js'

const buscar = async (userInput) => {
    try {
        const resposta = await fetch(`http://www.omdbapi.com/?s=${userInput}&apikey=${apiKey}`)
        const pesquisa = await resposta.json()

        return pesquisa

    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
}



const btn = document.getElementById('search-btn')
const moviesContainer = document.getElementById('movies-container')
const headerSearchBar = document.getElementById('search-bar')



btn.addEventListener('click', async (e) => {
    e.preventDefault()

    const pesquisa = headerSearchBar.value.trim()

    const filme = await buscar(pesquisa)
    const listaFilmes = filme.Search

    if(!pesquisa){
        alert('⚠️ Introduza um nome para pesquisar! ⚠️')
    }

    if(listaFilmes == undefined){
        alert("🚫 Filme não encontrado 🚫")
    }

    moviesContainer.innerHTML = ''

    listaFilmes.forEach(filme => {
        if (filme.Poster) {
            moviesContainer.innerHTML += `
            <article class="card" id="card">
                <a id="card-img" href="#"><img src="${filme.Poster}" alt="${filme.Title}-img"></a>
                <h3 id="card-title">${filme.Title}</h3>
                <p id="card-year">${filme.Year}</p>
            </article>
        `
        }
    });

})
