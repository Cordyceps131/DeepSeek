// const produtos = [
//   { id: 1, nome: 'Teclado', preco: 50, stock: 10 },
//   { id: 2, nome: 'Rato', preco: 20, stock: 0 },
//   { id: 3, nome: 'Monitor', preco: 200, stock: 5 },
//   { id: 4, nome: 'Cabo HDMI', preco: 10, stock: 0 },
//   { id: 5, nome: 'Webcam', preco: 80, stock: 3 },
// ];

// // 1 Obter o produto com o id: 3
// const id3 = produtos.find(p => p.id === 3)
// console.log(id3);

// // 2 Verificar se existe algum produto com preco > 150
// const preco = produtos.some(p => p.preco > 150)
// console.log(preco);

// // 3 Verificar se todoas os produtos têm stock > 0
// const stock = produtos.every(p => p.stock > 0)
// console.log(stock);

// // 4 calcular o valor total do stock: soma de preco * stock de cada produto
// const total = produtos.reduce((ac, i) => ac + (i.preco * i.stock), 0)
// console.log(total);

// // 5 Contar quantos produtos estão sem stock
// const produtosSemStock = produtos.reduce((ac, i) => i.stock === 0 ? ac + 1 : ac, 0)
// console.log(produtosSemStock);

// // 6 Obter um array só com os nomes dos produtos que têm stock > 0
// const nomeStock = produtos.filter(p => p.stock > 0).map(p => p.nome)
// console.log(nomeStock); 


