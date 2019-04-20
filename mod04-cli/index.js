const Commander = require('commander');
const database = require('./database');
const Heroi = require('./heroi');

async function main() {
    Commander
    .version('v1')
    .option('-n, --nome [value]', "Nome do herói")
    .option('-p, --poder [value]', "Poder do Herói")
    .option('-i, --id [value]', "ID do Herói")

    .option('-c, --cadastrar', "Cadastrar um Herói")
    .option('-l, --listar', "Listar um Herói")
    .option('-r, --remover [value]', "Remover um Herói")
    .option('-a, --atualizar [value]', "Atualizar um Herói")
    .parse(process.argv);

    const heroi = new Heroi(Commander);

    try {
        //--Comando de cadastrar herói
        if (Commander.cadastrar) {
            delete heroi.id;
            const resultado = await database.cadastrarHeroi(heroi);

            if (!resultado) {
                console.error("Herói não foi cadastrado!");
                return;            
            }

            console.log("Herói cadastrado com sucesso!");
        }

        //-- Comando de listar herói
        if (Commander.listar) {
            const resultado = await database.listarHeroi();
            console.log(resultado);
            return;
        }

        //-- Comando de remover herói
        if (Commander.remover) {
            
            const resultado = await database.removerHeroi(heroi.id);

            if (!resultado) {
                console.error("Não foi possível remover o herói!");
                return;
            }

            console.log("Herói removido com sucesso!");
        }

        //-- Comando de atualizar herói
        if (Commander.atualizar) {            
            const idAtualizar = parseInt(Commander.atualizar);

            //-- Remover todas as chaves desnecessárias: undefined || null
            const dado = JSON.stringify(heroi);
            const modificacoes = JSON.parse(dado);

            const resultado = await database.atualizarHeroi(idAtualizar, modificacoes);

            if (!resultado) {
                console.error("Não foi possível atuaizar o herói");
                return;
            }

            console.log("Herói atualizado com sucesso!");
        }

    } catch (error) {
        console.error("DEU RUIM", error);
    }

}

main();