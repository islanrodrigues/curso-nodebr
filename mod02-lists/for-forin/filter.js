const {obterPessoas} = require('./service');


async function main() {

    try {
        /* Utilizando a técnica de desestruturação no Javascript 
            Trazendo do resultado de obterPessoas apenas a lista results
        */
        const {results} = await obterPessoas('a');

        const larsFamily = results.filter(item => {
            /* Por default precisa retornar um booleano para informar 
            se deve manter ou remover da lista
            - false --> não adiciona na variável larsFamily
            - true --> adiciona na vairável larsFamily */

            const result = item.name.toLowerCase().indexOf('skywalker') !== -1;
            return result;
        });

        const names = larsFamily.map(pessoa => pessoa.name);
        console.log("Família Lars: ", names);
        
    } catch (error) {
        console.error("ERROR: ", error);
    }
}

main();
