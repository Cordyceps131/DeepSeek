import { apiKey } from './api.js';

const procurarPorTitulo = async (userInput) => {
    try {
        const resposta = await fetch(`https://www.omdbapi.com/?s=${userInput}&apikey=${apiKey}`);
        const filmes = await resposta.json();
        return filmes
    } catch (error) {
        console.log(`ERRO: ${error}`)
    }
}


const movieContainer = document.getElementById('movie-container')

const renderer = (filmes) => {
    movieContainer.innerHTML = '';
    const html = filmes
        .filter(f => f.Poster)
        .map(f => `
            <article class="card">
                <img src="${f.Poster}" alt="capa">
                <h3 class="titulo">${f.Title}</h3>
                <p class="ano">${f.Year}</p>
            </article>
    `).join('');
    movieContainer.innerHTML = html;
}


const btn = document.getElementById('btn')
const input = document.getElementById('search')
const msg = document.getElementById('msg')

btn.addEventListener('click', async (e) => {
    e.preventDefault();

    const pesquisa = input.value.trim();
    if (!pesquisa) {
        msg.textContent = '⚠️ Tem que inserir um titulo para poder pesquisar ⚠️';
        return;
    }

    const filmes = await procurarPorTitulo(pesquisa);
    if (filmes.Response === 'False') {
        msg.textContent = '🚫 Filme não encontrado 🚫';
        return;
    };

    msg.textContent = '';
    renderer(filmes.Search)
    msg.textContent = `Encontrámos ${filmes.Search.length} títulos relacionados com a pesquisa`

})


const procurarPorTituloEAno = async (nomeFilme, anoFilme) => {
    try {
        const resposta = await fetch(`https://www.omdbapi.com/?s=${nomeFilme}&y=${anoFilme}&apikey=${apiKey}`);
        const filmes = resposta.json();
        return filmes;
    } catch (error) {
        console.log(`ERRO: ${error}`);

    }
}


const filter = document.getElementById('filter')
const filterBtn = document.getElementById('filter-btn')

filterBtn.addEventListener('click', async () => {
    const nomeFilme = input.value.trim();
    const anoFilme = filter.value.trim();
    if (!anoFilme) {
        msg.textContent = '⚠️ Introduza um Ano para filtrar! ⚠️';
        return;
    };
    const filmes = await procurarPorTituloEAno(nomeFilme, anoFilme);
    if (filmes.Response === 'False') {
        msg.textContent = "🚫 Filme não encontrado 🚫";
        return;
    }
    msg.textContent = `Encontrámos ${filmes.Search.length} títulos com o nomw "${nomeFilme}" para o ano "${anoFilme}" `;
    renderer(filmes.Search)
})