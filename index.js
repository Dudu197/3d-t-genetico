'use strict';
const Personagem = require('./personagem')
const Arena = require('./arena')

let config = {
	inicial: {
		pontos: 5,
		populacao: 100
	},
	subirLevel: {
		meta: 3,
		pontos: 1
	},
	debug: {
		simularBatalhas: true,
		simularMelhorBatalha: false
	}
};

let heroi = new Personagem('Herói', config);
let vilao = new Personagem('Vilão', config);
console.log('Herói: ', heroi);
console.log('Vilão: ', vilao);

console.log('=======================');
console.log('=Que comece a batalha!=');
console.log('=======================');

let arena = new Arena(config);
arena.combater(heroi, vilao);

console.log('Herói: ', heroi);
console.log('Vilão: ', vilao);
