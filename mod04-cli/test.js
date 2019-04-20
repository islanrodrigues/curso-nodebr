const { deepEqual, ok } = require('assert');
const database = require('./database');

const DEFAULT_ITEM_HERO = {
    nome: 'Black Panther',
    poder: 'poderes sobre-humanos',
    id: 1
}; 

const DEFAULT_ITEM_HERO_UPDATE = {
    id: 2,
    nome: 'Laterna Verde',
    poder: 'Energia do anel'
};

describe('Suíte de Manipulação de heróis', () => {
    before(async () => {
        await database.cadastrarHeroi(DEFAULT_ITEM_HERO);
        await database.cadastrarHeroi(DEFAULT_ITEM_HERO_UPDATE);
    }) 

    it('Deve pesquisar por heróis, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_HERO;
        const [resultado] = await database.listarHeroi(expected.id);

        deepEqual(resultado, expected);
    });


    it('Deve cadastrar um herói, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_HERO;

        const resultado = await database.cadastrarHeroi(expected);
        const [heroiCadastrado] = await database.listarHeroi(expected.id);

        deepEqual(heroiCadastrado, expected);
    });

    it('Deve remover um herói, usando arquivos', async () => {
        const expected = true;
        const resultado = await database.removerHeroi(DEFAULT_ITEM_HERO.id);

        deepEqual(resultado, expected);
    });

    it('Deve atualizar um herói, usando arquivos', async () => {
        
        const expected = {
            ...DEFAULT_ITEM_HERO_UPDATE,
            nome: 'Flash',
            poder: 'Velocidade'
        };

        const novoDado = {
            nome: 'Flash',
            poder: 'Velocidade'
        };

        const atualizacao = await database.atualizarHeroi(DEFAULT_ITEM_HERO_UPDATE.id, novoDado);        
        const [resultado] = await database.listarHeroi(DEFAULT_ITEM_HERO_UPDATE.id);
        
        deepEqual(resultado, expected);  
    });
   
});

