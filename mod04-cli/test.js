const { deepEqual, ok } = require('assert');
const database = require('./database');

const DEFAULT_ITEM_HERO = {
    nome: 'Black Panther',
    poder: 'poderes sobre-humanos',
    id: 1
}; 

describe('Suíte de Manipulação de heróis', () => {

    it('Deve pesquisar por heróis, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_HERO;
        const [resultado] = await database.listar(expected.id);

        deepEqual(resultado, expected);
    });

    // it('Deve cadastrar um herói, usando arquivos', async () => {
    //     const expected = DEFAULT_ITEM_HERO;
    //     ok(null, expected);
    // });
   
});

