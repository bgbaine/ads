import { Personagem } from "./personagem";

describe('Treino de ataque', () => {
    it('Deve aumentar o ataque apos treinar ataque', () => {
        // Cenario
        const personagem = new Personagem('Gladimir');
        personagem.ataque = 50;
        personagem.vitalidade = 100;
        const ataqueInicial = personagem.ataque;
    
        // Acao
        personagem.treinar('ataque', 2);
    
        // Verificacao
        expect(personagem.ataque).toBeGreaterThan(ataqueInicial);
    });
    
    it('Nao deve aumentar o ataque apos treinar se o numero de horas do treino for 0', () => {
        // Cenario
        const personagem = new Personagem('Gladimir');
        personagem.ataque = 50;
        personagem.vitalidade = 100;
        const ataqueInicial = personagem.ataque;
    
        // Acao
        personagem.treinar('ataque', 0);
    
        // Verificacao
        expect(personagem.ataque).toEqual(ataqueInicial);
    });
    
    it('Deve morrer quando treinar bastante tempo com baixa vitalidade', () => {
        // Cenario
        const personagem = new Personagem('Gladimir');
        personagem.ataque = 50;
        personagem.vitalidade = 1;
    
        // Acao e verificacao
        expect(() => personagem.treinar('ataque', 24)).toThrow('O heroi morreu!');
    });
});

describe('Treino de defesa', () => {
    it('Deve aumentar a defesa apos treinar defesa', () => {
        // Cenario
        const personagem = new Personagem('Gladimir');
        personagem.defesa = 50;
        personagem.vitalidade = 100;
        const defesaInicial = personagem.defesa;
    
        // Acao
        personagem.treinar('defesa', 2);
    
        // Verificacao
        expect(personagem.defesa).toBeGreaterThan(defesaInicial);
    });
    
    it('Nao deve aumentar a defesa apos treinar se o numero de horas do treino for 0', () => {
        // Cenario
        const personagem = new Personagem('Gladimir');
        personagem.defesa = 50;
        personagem.vitalidade = 100;
        const defesaInicial = personagem.defesa;
    
        // Acao
        personagem.treinar('defesa', 0);
    
        // Verificacao
        expect(personagem.defesa).toBeCloseTo(defesaInicial);
    });
});

describe('Treino de vitalidade', () => {
    it('Deve aumentar a vitalidade apos treinar descansar', () => {
        // Cenario
        const personagem = new Personagem('Gladimir');
        personagem.vitalidade = 50;
        const vitalidadeInicial = personagem.vitalidade;
    
        // Acao
        personagem.descansar(2);
    
        // Verificacao
        expect(personagem.vitalidade).toBeGreaterThan(vitalidadeInicial);
    });

    it('Nao deve ultrapassar a vitalidade de 100 apos descansar', () => {
        // Cenario
        const personagem = new Personagem('Gladimir');
        personagem.vitalidade = 90;
        const vitalidadeInicial = personagem.vitalidade;
    
        // Acao
        personagem.descansar(24);
    
        // Verificacao
        expect(personagem.vitalidade).not.toBeGreaterThan(100);
    });
});
