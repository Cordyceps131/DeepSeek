// 1
const nums = [5, 10, 15, 20, 25]

const numsSquare = nums.map(num => num * num)
console.log(numsSquare)


// 2
const nomes = ['Ana', 'Bruno', 'Carlos']
const saudacao = nomes.map(nome => `Olá ${nome}`)
console.log(saudacao)


// 3
const nums1 = [3, 8, 12, 5, 20, 7]
const pares = nums1.filter(num => num %2 === 0)
console.log(pares)


// 4
const filmes = [
    {titulo: 'Halloween', ano: 1997}, 
    {titulo: 'Toy Story 2', ano: 2008}, 
    {titulo: 'Resident Evil', ano: 2020}
]

const titulosRecentes = filmes.filter(filme => filme.ano > 2010).map(filme => filme.titulo)
console.log(titulosRecentes)
