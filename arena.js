module.exports = class Arena {
	constructor(config) {
		this.pontos = config.inicial.pontos;
		this.debug = config.debug;
		this.nome = 'Arena';
		this.turnos = 0;

		this.heroi = null;
		this.vilao = null;
	}

	combater(heroi, vilao) {
		this.heroi = heroi;
		this.vilao = vilao;

		// Temporariamente o herói começa
		while(this.heroi.vivo && this.vilao.vivo) {
			this.turnos++;
			this.bater(this.heroi, this.vilao);
			this.bater(this.vilao, this.heroi);
		}

		this.debugBatalha('A batalha durou ' + this.turnos + ' turnos');

		if(this.heroi.vivo) {
			this.heroi.adicionarPocaoVida(1);
			this.heroi.vencedor();
		} else {
			this.vilao.adicionarPocaoVida(1);
			this.vilao.vencedor();
		}
	}

	bater(atacante, defensor) {
		if(atacante.vivo) {
			defensor.apanhar(atacante.atacar());
		}
	}

	debugBatalha(mensagem){
		if(this.debug.simularBatalhas) {
			console.log(this.nome + ': ' + mensagem);
		}
	}

};