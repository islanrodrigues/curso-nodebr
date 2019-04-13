const {obterPessoas} = require('./service');

Array.prototype.meuFilter = function(callback) {
    const novoArrayFiltrado = [];

    for (indice in this) {
        if (callback(this[indice], indice, this)) {
            novoArrayFiltrado.push(this[indice]);
        }
    }

    return novoArrayFiltrado;
}


async function main() {

    try {
        /* Utilizando a técnica de desestruturação no Javascript 
            Trazendo do resultado de obterPessoas apenas a lista results
        */
        const {results} = await obterPessoas('a');

        // const skywalkerFamily = results.filter(item => {
        //     /* Por default precisa retornar um booleano para informar 
        //     se deve manter ou remover da lista
        //     - false --> não adiciona na variável skywalkerFamily
        //     - true --> adiciona na vairável skywalkerFamily */

        //     const result = item.name.toLowerCase().indexOf('skywalker') !== -1;
        //     return result;
        // });

        // const names = skywalkerFamily.map(pessoa => pessoa.name);
        // console.log("Família Skywalker: ", names);

        larsFamily = results.meuFilter((pessoa, index, lista) => {
            return pessoa.name.toLowerCase().indexOf('lars') !== -1;
        });

        const names = larsFamily.map(item => item.name);

        console.log("Família Lars: ", names);
        
    } catch (error) {
        console.error("ERROR: ", error);
    }
}

main();
