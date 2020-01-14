module.exports = class Arena {
	constructor(config) {
		this.pontos = config.inicial.pontos;
		this.debug = config.debug;

		this.heroi = null;
		this.vilao = null;
	}

	combater(heroi, vilao) {
		this.heroi = heroi;
		this.vilao = vilao;

		// Temporariamente o herói começa
		while(this.heroi.vivo && this.vilao.vivo) {
			this.bater(this.heroi, this.vilao);
			this.bater(this.vilao, this.heroi);
		}

		if(this.heroi.vivo) {
			this.heroi.vencedor();
		} else {
			this.vilao.vencedor();
		}
	}

	bater(atacante, defensor) {
		if(atacante.vivo) {
			defensor.apanhar(atacante.atacar());
		}
	}

};