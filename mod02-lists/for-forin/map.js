const service = require('./service');

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
        const names = result.results.map(pessoa => pessoa.name);
        console.log("Names: ", names);


    } catch (error) {
        console.error("ERROR: ", error);
    }
}

main();