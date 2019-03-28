/*
0 - Obter um usuário
1 - Obter o número de telefone do usuário pelo Id
2 - Obter o endereço do usuário pelo Id
*/
// importamos um módulo interno do Node.JS
const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
    //quando for sucesso -> resolve
    //quando for erro -> reject(erro)
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                id: 001,
                nome: 'Islan Rodrigues',
                dataNasc: new Date(),
            })
        }, 1000);
        
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(() => {
            return resolve({
                telefone: 11223344,
                ddd: 11,
            })        
        }, 2000);        
    });

}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos Bobos',
            numero: 0
        })
    }, 2000);
}

main();

// 1o passo - add a palavra async -> automaticamente ela retornará uma Promise
async function main() {

    try {

        console.time('medida-funcao-main');
        const usuario = await obterUsuario();
        // const telefone = await obterTelefone(usuario.id);
        // const endereco = await obterEnderecoAsync(usuario.id);

        //As funções obterTelefone e obterEnderecoAsync não dependem uma da outra, por isso podem
        //ser executadas de forma assíncrona
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])

        const telefone = resultado[0]
        const endereco = resultado[1]

        console.log(`
            Nome: ${usuario.nome},
            Telefone: (${telefone.ddd}) ${telefone.telefone},
            Endereço: Rua ${endereco.rua}, nº ${endereco.numero}
        `)

        console.timeEnd('medida-funcao-main');

    } catch(error) {
        console.error('DEU RUIM -> ', error);
    }

}


// const usuarioPromise = obterUsuario();
// // para manipular o sucesso usamos o .then
// // para manipular o erro usamos o .catch

// usuarioPromise
//     .then(function(usuario) {
//         return obterTelefone(usuario.id)
//             .then(function resolverTelefone(result) {  
//                 return {
//                     usuario: {
//                         nome: usuario.nome,
//                          id: usuario.id,
//                          dataNasc: usuario.dataNasc,
//                     },
//                     telefone: result
//                 }
//             })
//     })
//     .then(function (resultado) {
//         const endereco = obterEnderecoAsync(resultado.usuario.id)
//         return endereco.then(function(result) {
//             return {
//                 usuario: resultado.usuario,
//                 telefone: resultado.telefone,
//                 endereco: result,  
//             }
//         });
//     })
//     .then(function (resultado) {
//         console.log(`
//             Nome: ${resultado.usuario.nome}
//             Endereço: Rua ${resultado.endereco.rua}, número ${resultado.endereco.numero}
//             Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone} 
//         `);
//     }) 
//     .catch(function (error) {
//         console.error('DEU RUIM!', error);
//     })
    


//--padrão callback (erro, sucesso)
// obterUsuario(function resolverUsuario(errorUser, usuario) {

//     // -- (null || "" || 0) === false
//     if (errorUser) {
//         console.error('Problemas em obter o usuário!', errorUser);
//         return;
//     }
    
//     obterTelefone(usuario.id, function resolverTelefone(errorTel, telefone) {
//         if (errorTel) {
//            console.error('Problemas em obter o telefone do usuário!', errorTel);
//            return; 
//         }
    
//         obterEndereco(usuario.id, function resolverEndereco(errorEnd, endereco) {
//             if (errorEnd) {
//                 console.error('Problemas em obter o endereço do usuário!', errorEnd);
//                 return;
//             }
    

//         console.log(`
//         Nome do usuário: ${usuario.nome},
//         Telefone do usuário: (${telefone.ddd}) ${telefone.telefone}, 
//         Endereço do usuário: Rua ${endereco.rua}, número ${endereco.numero}.
//         `);

//         }); //--obterEndereco
        
//     }); //--obterTelefone

// }); //--obterUsuario

