const apiKey = 'c4a8205'

const buscar = async (userInput) => {
    try {
        const resposta = await fetch(`http://www.omdbapi.com/?s=${userInput}&apikey=${apiKey}`)
        const pesquisa = await resposta.json()

        console.log(pesquisa.Search[0]);
        

        console.log(`
            Título: ${pesquisa.Search[0].Title}\n
            Ano: ${pesquisa.Search[0].Year}\n
            Tipoe: ${pesquisa.Search[0].Type}\n
            Capa: ${pesquisa.Search[0].Poster}\n
        `)

    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
}

let filme = 'interstellar'

buscar(filme);