/*
0 - Obter um usuário
1 - Obter o número de telefone do usuário pelo Id
2 - Obter o endereço do usuário pelo Id
*/

function obterUsuario(callback) {
    setTimeout(() => {
        return callback(null, {
            id: 001,
            nome: 'Islan Rodrigues',
            dataNasc: new Date(),
        })
    }, 1000);
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: 11223344,
            ddd: 11,
        })        
    }, 2000);
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos Bobos',
            numero: 0
        })
    }, 2000);
}

//padrão callback (erro, sucesso)
obterUsuario(function resolverUsuario(errorUser, usuario) {

    // -- (null || "" || 0) === false
    if (errorUser) {
        console.error('Problemas em obter o usuário!', errorUser);
        return;
    }
    
    obterTelefone(usuario.id, function resolverTelefone(errorTel, telefone) {
        if (errorTel) {
           console.error('Problemas em obter o telefone do usuário!', errorTel);
           return; 
        }
    
        obterEndereco(usuario.id, function resolverEndereco(errorEnd, endereco) {
            if (errorEnd) {
                console.error('Problemas em obter o endereço do usuário!', errorEnd);
                return;
            }
    

        console.log(`
        Nome do usuário: ${usuario.nome},
        Telefone do usuário: (${telefone.ddd}) ${telefone.telefone}, 
        Endereço do usuário: Rua ${endereco.rua}, número ${endereco.numero}.
        `);

        }); //obterEndereco
        
    }); //obterTelefone

}); //obterUsuario


