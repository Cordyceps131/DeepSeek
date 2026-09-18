import { apiKey } from './api.js';

const buscarPesquisa = async (userInput) => {
    try {
        const resposta = await fetch(`https://www.omdbapi.com/?s=${userInput}&apikey=${apiKey}`);
        const pesquisa = await resposta.json();

        return pesquisa;

    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
}


const moviesContainer = document.getElementById('movies-container');


const renderCard = (filmes) => {
    moviesContainer.innerHTML = ''
    
    const html = filmes
        .filter(f => f.Poster)
        .map(f => `
            <article class="card">
                <a class="card-img" href="#"><img src="${f.Poster}" alt="${f.Title}-img"></a>
                <h3 class="card-title">${f.Title}</h3>
                <p class="card-year">${f.Year}</p>
            </article>
        ` ).join('');

    moviesContainer.innerHTML = html;
};

const btn = document.getElementById('search-btn');
const headerSearchBar = document.getElementById('search-bar');
const msg = document.getElementById('msg');


btn.addEventListener('click', async (e) => {
    e.preventDefault();

    const pesquisa = headerSearchBar.value.trim();

    const filme = await buscarPesquisa(pesquisa);
    const listaFilmes = filme.Search;

    if (!pesquisa) {
        alert('⚠️ Introduza um nome para pesquisar! ⚠️');
        return;
    };

    if (listaFilmes == undefined) {
        alert("🚫 Filme não encontrado 🚫");
        return;
    }

    if (filme.Response === 'False') {
        msg.textContent = 'Não encontrámos nada';
        moviesContainer.innerHTML = '';
        return;
    }

    msg.textContent = `Encontrámos ${filme.Search.length} filmes relacionados com a pesquisa`;
    moviesContainer.innerHTML = '';



    renderCard(listaFilmes);

})



const buscarFiltro = async (nome, ano) => {
    try {
        const resposta = await fetch(`https://www.omdbapi.com/?s=${nome}&y=${ano}&apikey=${apiKey}`);
        const pesquisa = await resposta.json();
        console.log(pesquisa.totalResults);

        return pesquisa;

    } catch (error) {
        console.log(`ERROR: ${error}`);
    };
};


const filterSearchBar = document.getElementById('filter-text');
const filtroBtn = document.getElementById('filter-btn');



filtroBtn.addEventListener('click', async (e) => {

    const nomeFilme = headerSearchBar.value.trim();
    const anoFilme = filterSearchBar.value.trim();

    if (!anoFilme) {
        alert('⚠️ Introduza um ano para filtrar! ⚠️');
        return;
    };

    const filme = await buscarFiltro(nomeFilme, anoFilme);
    const filmes = filme.Search;

    if (filme.Response === 'False') {
        msg.textContent = 'Não encontrámos nada';
        moviesContainer.innerHTML = '';
        return;
    }

    msg.textContent = `Encontrámos ${filme.Search.length} títulos relacionados com a pesquisa`;
    moviesContainer.innerHTML = '';

    renderCard(filmes);

});