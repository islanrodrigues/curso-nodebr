const {obterPessoas} = require('./service');

async function main() {

    try {
        const {results} = await obterPessoas('a');
        const pesos = results.map(item => parseInt(item.height));

        const total = pesos.reduce((anterior, proximo) => {
            return anterior + proximo;
        }, 0);

        console.log("Pesos: ", pesos);
        console.log("Total: ", total);
         
    } catch (error) {
        console.error("ERROR: ", error);
    }
}

main();