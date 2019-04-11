const service = require('./service');

Array.prototype.meuMap = function(callback) {
    const arrayResultados = [];

    for(let index = 0; index < this.length; index++) {
        arrayResultados.push(callback(this[index], index));
    }

    return arrayResultados;
}


async function main() {

    try {
        const result = await service.obterPessoas('a');

        //Trabalhando com ForEach
        // const names = [];
        // result.results.forEach(function(item) {
        //     names.push(item.name);
        // });
        // console.log("Names: ", names);
        

        //Trabalhando com o método map()
        // const names = result.results.map(pessoa => pessoa.name);
        // console.log("Names: ", names);


        //Trabalhando com o método meuMap criado
        const names = result.results.meuMap((pessoa, indice) => {
            return `${indice} - ${pessoa.name}`;
        });

        console.log("Names: ", names);

    } catch (error) {
        console.error("ERROR: ", error);
    }
}

main();