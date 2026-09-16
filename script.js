// // 1 POSTS
// const buscarPosts = async () => {
//       try {
//             const resposta = await fetch('https://jsonplaceholder.typicode.com/posts');
//             const dados = await resposta.json();


//             const nomes = dados.map(n => n.title)
            
//             for (let i = 0; i < 5; i++) {
//                   console.log(nomes[i])
//             }


//       } catch (error) {
//             console.log(`ERRO: ${error}`);
                        
//       }
// }

// buscarPosts()



// // 2 USERS
// const buscarUsers = async () => {
      
//       try {

//             const resposta = await fetch('https://jsonplaceholder.typicode.com/users');
//             const dados = await resposta.json();


//             const users = dados.filter(u => u.id %2 === 0)
//             console.log(users)

//       } catch (error) {
//             console.log(`ERRO: ${error}`);
                        
//       }
// }

// buscarUsers()




// // 3 TODOS
// const buscarTodos = async () => {
//       try {
//             const resposta = await fetch('https://jsonplaceholder.typicode.com/todos');
//             const dados = await resposta.json();

//             let count = 0;
//             dados.forEach(d => {
//                   if(d.completed){
//                         count++
//                   }
//             });

//             console.log(count)

//       } catch (error) {
//             console.log(`ERRO: ${error}`);
                        
//       }
// }

// buscarTodos()




// // 4 USER3
// const buscarUser3 = async () => {
//       try {
//             const resposta = await fetch('https://jsonplaceholder.typicode.com/users/3');
//             const dados = await resposta.json();
//             const nome = dados.name;
//             const email = dados.email;

//             console.log(`${nome} tem o email ${email}`)

//       } catch (error){
//             console.log(`ERRO: ${error}`);
//       }
// }

// buscarUser3()



// // 5 BÓNUS
// const buscarPostsPorId = async () => {
//       try {
//             const resposta = await fetch('https://jsonplaceholder.typicode.com/posts');
//             const dados = await resposta.json();

//             const posts = dados.filter(p => p.userId === 1).map(p => p.title)
//             console.log(posts)

//       } catch (error) {
//             console.log(`ERRO: ${error}`);
                        
//       }
// }

// buscarPostsPorId()