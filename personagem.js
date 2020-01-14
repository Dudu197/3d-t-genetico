module.exports = class Personagem {
	constructor(config) {
		this.pontos = config.inicial.pontos;
		this.debug = config.debug;

		this.pontosVida = 0;
		this.vivo = true;
		this.abates = 0;
		// PdF será ignorado pois será o mesmo que a força nos combates
		this.atributos = {
			forca: 0,
			habilidade: 0,
			resistencia: 0,
			armadura: 0
		};

		for (var i = 0; i < this.pontos; i++) {
			this.evoluir();
		}

		if(this.atributos.resistencia > 0) {
			this.pontosVida = 5 * this.atributos.resistencia;
		} else {
			this.atributos.resistencia = 1;
		}
	}

	evoluir() {
		let atributo = parseInt(Math.random() * 4);
		switch(atributo) {
			case 0: this.atributos.forca++; 		break;
			case 1: this.atributos.habilidade++; 	break;
			case 2: this.atributos.resistencia++; 	break;
			case 3: this.atributos.armadura++; 		break;
		}
	}

	reproduzir(quantidade) {
		let filhos = [];
		for (var i = 0; i < quantidade; i++) {
			let filho = this;
			filho.evoluir();
			filhos.push(filho);
		}
	}

	rolarDados() {
		return parseInt(Math.random() * 6) + 1;
	}

	atacar() {
		let dado = this.rolarDados();
		let forca = this.atributos.forca;
		let habilidade = this.atributos.habilidade;
		if(dado === 6){
			forca *= 2;
		}
		return forca + habilidade + dado;
	}

	defender() {
		let dado = this.rolarDados();
		let armadura = this.atributos.armadura;
		let habilidade = this.atributos.habilidade;
		if(dado === 6){
			armadura *= 2;
		}
		return armadura + habilidade + dado;
	}

	apanhar(dano) {
		dano -= this.defender();
		if(dano > 0){
			this.pontosVida -= dano;
			if(this.pontosVida <= 0) {
				this.vivo = false;
			}
		}
	}

};

// module.exports.Personagem;