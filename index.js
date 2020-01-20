'use strict';
const Personagem = require('./personagem');
const Arena = require('./arena');

const NOMES = require('./nomes.json');

let config = {
	inicial: {
		pontos: 5,
		populacao: 1000,
		pocoesVida: 0
	},
	subirLevel: {
		meta: 3,
		pontos: 1
	},
	debug: {
		simularBatalhas: false,
		simularMelhorBatalha: false
	}
};

let nomeAleatorio =  () => {
	return NOMES[parseInt(Math.random() * NOMES.length)];
};

let gerarPersonagem = () => {
	return new Personagem(nomeAleatorio() + ' ' + nomeAleatorio(), config);
};

let personagens = [];
let viloes = [];
let vilao = gerarPersonagem();

for (var i = 0; i < config.inicial.populacao; i++) {
	personagens.push(gerarPersonagem());
	// viloes.push(vilao);
}


for (var i = 0; i < 15; i++) {
	viloes.push(gerarPersonagem());
}

let arena = new Arena(config);
for (var i = 0; i < personagens.length; i++) {
	for (var j = 0; j < viloes.length; j++) {
		if(personagens[i].vivo) {
			arena.combater(personagens[i], Object.create(viloes[j]));
		} else {
			break;
		}
	}
}

let sobreviventes = personagens.filter(personagem => personagem.vivo);

console.log('Personagens: ', personagens.length)
console.log('Sobreviventes: ', sobreviventes.length)

if(sobreviventes.length > 0){
	console.log(sobreviventes[parseInt(Math.random() * sobreviventes.length)]);
}