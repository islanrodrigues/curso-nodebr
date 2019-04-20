const { readFile, writeFile } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {

    constructor() {
        this.NOME_ARQUIVO = 'herois.json';
    }
    

    async listarHeroi(id) {
        const dados = await this.obterDados();
        const dadosFiltrados = dados.filter(item => id ? (item.id === id) : true);
       
        return dadosFiltrados;
    }   


    async obterDados() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8');
       
        return JSON.parse(arquivo.toString());
    }

    
    async escreverArquivo(dados) {
       await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados));
       return true;
    }


    async cadastrarHeroi(heroi) {
        const dados = await this.obterDados();
        const id = heroi.id <= 2 ? heroi.id : Date.now();

        const heroiComID = {
            id, 
            ...heroi
        };

        const dadosFinal = [
            ...dados,
            heroiComID
        ];

        const resultado = this.escreverArquivo(dadosFinal);

        return resultado;
    }

    async removerHeroi(id) {

        if (!id) {
            return await this.escreverArquivo([]);
        }
        
        const dados = await this.obterDados();
        const index = dados.findIndex(item => item.id === parseInt(id));
        
        if (index === -1) {
            throw Error('O usuário informado não existe!');
        }

        dados.splice(index, 1);

        return await this.escreverArquivo(dados);
    }

    async atualizarHeroi(id, modificacoes) {
        const dados = await this.obterDados();
        const index = dados.findIndex(item => item.id === parseInt(id));
 
        if (index === -1) {
            throw Error('O herói informado não existe!');
        }
        const heroi = dados[index];
        const novoHeroi = {
            ...heroi, 
            ...modificacoes
        };

        dados.splice(index, 1);

        return await this.escreverArquivo([
            ...dados,
            novoHeroi
        ]);
    }


} //closing class


module.exports = new Database();