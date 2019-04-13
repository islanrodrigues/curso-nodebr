const {obterPessoas} = require('./service');

Array.prototype.meuReduce = function (callback, initialValue) {
    let valorFinal = typeof initialValue !== undefined ? initialValue : this[0];

    for (let index = 0; index <  this.length; index++) {
        valorFinal = callback(valorFinal, this[index], this);
    }

    return valorFinal;
}


async function main() {

    try {
        const {results} = await obterPessoas('a');
        const pesos = results.map(item => parseInt(item.height));

        // const total = pesos.reduce((anterior, proximo) => {
        //     return anterior + proximo;
        // }, 0);

        // console.log("Pesos: ", pesos);
        // console.log("Total: ", total);


        const total = pesos.meuReduce((anterior, proximo, minhaLista) => {
            return anterior + proximo;
        }, 0);

        console.log("Pesos: ", pesos);
        console.log("soma Pesos: ", total);
         
    } catch (error) {
        console.error("ERROR: ", error);
    }
}

main();