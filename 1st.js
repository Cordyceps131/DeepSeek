// 1
let nome = 'André Proença'
console.log(`Olá, ${nome}`);


// 2
let x = 10
let y = 5

const soma = x + y
const subtracao = x - y
const multiplicacao = x * y
const divisao = x / y

console.log(`
    Soma: ${soma}\n
    Subtração: ${subtracao}\n
    Multiplicação: ${multiplicacao}\n
    Divisão: ${divisao}\n
`);


// 3
const dobro = (n) => {
    return n * 2;
}

console.log(dobro(7), '\n')


// 4
const verificarIdade = (idade) => (idade >= 18 ? '\nMaior' : '\nMenor')

console.log(verificarIdade(13))
console.log(verificarIdade(19))