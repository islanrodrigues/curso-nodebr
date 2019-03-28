const service = require('./service');

async function main() {

    try {
        const result = await service.obterPessoas('a');
        const nomes = [];

        // manipulando pelo for
        console.time('for');
        for (let i = 0; i < result.results.length; i++) {
            const pessoa = result.results[i];
            nomes.push(pessoa.name);
        }

        console.timeEnd('for');

        //manipulando pelo forIn
        console.time('forIn');
        for (let i in result.results) {
            const pessoa = result.results[i];
            nomes.push(pessoa.name);
        }

        console.timeEnd('forIn');

        //manipulando pelo forOf
        console.time('forOf');
        for(pessoa of result.results) {
            nomes.push(pessoa.name);
        }

        console.timeEnd('forOf');


        console.log('nomes ', nomes);

    } catch (error) {
        console.log('Erro Interno: ',
        error);
    }
}

main();