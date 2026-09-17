import { apiKey } from './api.js'

const buscarPesquisa = async (userInput) => {
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
const msg = document.getElementById('msg')


btn.addEventListener('click', async (e) => {
    e.preventDefault()
    
    const pesquisa = headerSearchBar.value.trim()

    const filme = await buscarPesquisa(pesquisa)
    const listaFilmes = filme.Search

    if (!pesquisa) {
        alert('⚠️ Introduza um nome para pesquisar! ⚠️')
    }

    if (listaFilmes == undefined) {
        alert("🚫 Filme não encontrado 🚫")
    }

    msg.textContent = `Encontrámos ${filme.totalResults} filmes relacionados com a pesquisa`
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


const buscarFiltro = async (nome, ano) => {
    try {
        const resposta = await fetch(`http://www.omdbapi.com/?s=${nome}&y=${ano}&apikey=${apiKey}`)
        const pesquisa = await resposta.json()
        console.log(pesquisa.totalResults);
                
        return pesquisa

    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
}


const filterSearchBar = document.getElementById('filter-text')
const filtroBtn = document.getElementById('filter-btn')



filtroBtn.addEventListener('click', async (e) =>{
    
    const nomeFilme = headerSearchBar.value.trim()
    const anoFilme = filterSearchBar.value.trim()

    const filme = await buscarFiltro(nomeFilme, anoFilme)
    const filmes = filme.Search

    if (!anoFilme) {
        alert('⚠️ Introduza um ano para filtrar! ⚠️')
    }


    msg.textContent = filme.totalResults ? `Encontrámos ${filme.totalResults} títulos relacionados com a pesquisa`: 'Não encontrámos nada'
    moviesContainer.innerHTML = ''

    filmes.forEach(filme => {
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