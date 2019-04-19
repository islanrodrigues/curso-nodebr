const { deepEqual, ok } = require('assert');
const database = require('./database');

const DEFAULT_ITEM_HERO = {
    nome: 'Black Panther',
    poder: 'poderes sobre-humanos',
    id: 1
}; 

describe('Suíte de Manipulação de heróis', () => {
    before(async () => {
        await database.cadastrarHeroi(DEFAULT_ITEM_HERO);
    })

    it('Deve pesquisar por heróis, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_HERO;
        const [resultado] = await database.listarHeroi(expected.id);

        deepEqual(resultado, expected);
    });

    it('Deve cadastrar um herói, usando arquivos', async () => {
        const expected = {
            ...DEFAULT_ITEM_HERO,
            id: 2,
            nome: 'Lanterna Verde',
            poder: 'Criar construtos com o poder do anel'
        };

        const resultado = await database.cadastrarHeroi(expected);
        const [heroiCadastrado] = await database.listarHeroi(expected.id);

        deepEqual(heroiCadastrado, expected);
    });
   
});

