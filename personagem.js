module.exports = class Personagem {
	constructor(nome, config) {
		this.pontos = config.inicial.pontos;
		this.debug = config.debug;

		this.pontosVida = 0;
		this.vivo = true;
		this.abates = 0;
		this.nome = nome;
		this.pocoesVida = config.inicial.pocoesVida;
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

		this.pontosVida = this.vidaMaxima();
	}

	vidaMaxima () {
		if(this.atributos.resistencia > 0) {
			return 5 * this.atributos.resistencia;
		} else {
			return 1;
		}
	};

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
		let dado = parseInt(Math.random() * 6) + 1;
		this.debugBatalha('Rolou o dado: ' + dado);
		return dado;
	}

	atacar() {
		let dado = this.rolarDados();
		let forca = this.atributos.forca;
		let habilidade = this.atributos.habilidade;
		if(dado === 6){
			forca *= 2;
		}
		let dano = forca + habilidade + dado;
		this.debugBatalha('Atacou com o dano ' + dano);
		return dano;
	}

	defender() {
		let dado = this.rolarDados();
		let armadura = this.atributos.armadura;
		let habilidade = this.atributos.habilidade;
		if(dado === 6){
			armadura *= 2;
		}
		let defesa = armadura + habilidade + dado;
		this.debugBatalha('Defendeu ' + defesa);
		return defesa;
	}

	apanhar(dano) {
		dano -= this.defender();
		if(dano > 0){
			this.pontosVida -= dano;
			if(this.pontosVida <= 0) {
				this.vivo = false;
				this.pontosVida = 0;
				this.debugBatalha('Está morto');
			}
		}
	}

	vencedor() {
		this.abates++;
		this.usarPocaoVida();
		this.debugBatalha('Venceu a batalha');
	}

	usarPocaoVida(){
		let vidaMaxima = this.vidaMaxima();
		if(this.pontosVida < vidaMaxima && this.pocoesVida > 0) {
			this.debugBatalha('Utilizou uma poção de vida');
			this.pocoesVida--;
			this.pontosVida += 5;
			if(this.pontosVida > vidaMaxima) {
				this.pontosVida = vidaMaxima;
			}
			// this.pontosVida = vidaMaxima;
		}
	}

	adicionarPocaoVida(quantidade) {
		this.pocoesVida += quantidade;
	}

	debugBatalha(mensagem) {
		if(this.debug.simularBatalhas) {
			console.log(this.nome + ': ' + mensagem);
		}
	}

};