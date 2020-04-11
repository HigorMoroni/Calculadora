function criaCalculadora() {
    return {
        display: document.querySelector('.display'),
        botoes: document.querySelectorAll('.btn'),
        inicia() {
            this.cliqueBotoes();
            this.pressionarBotoes();
        },
        encontraONumero(e) {
            for (let i=0;i<=9;i++){
                if (e.key == i) {
                    for (let j in this.botoes) {
                        if (this.botoes[j].innerText == i) return j
                    }
                }
            }
        },
        pressionarBotoes() {
            addEventListener('keydown', e => {
                const chave = this.encontraONumero(e)
                this.botoes[chave].classList.add('btn-ativo')
                addEventListener('keyup', e => {
                    const chave = this.encontraONumero(e)
                    this.botoes[chave].classList.remove('btn-ativo')
                })
                if (e.keyCode == 13) {
                    this.realizaConta();
                }
            })
        },
        limparDisplay() {
            this.display.value = '';
        },
        apagaUm() {
            this.display.value = this.display.value.slice(0, -1);
        },
        realizaConta() {
            let conta = this.display.value;
            conta = conta.replace('×', '*');
            conta = conta.replace('÷', '/');
            try {
                conta = eval(conta);
                if (!conta) {
                    alert('Conta inválida');
                    return;
                }
                this.display.value = String(conta);
            } catch (e) {
                alert('Conta inválida');
                return;
            }
        },
        cliqueBotoes() {
            document.addEventListener('click', e => {
                const el = e.target;
                if (el.classList.contains('btn-num')) {
                    this.btnParaDisplay(el.innerText);
                } else if (el.classList.contains('btn-limpa')) {
                    this.limparDisplay();
                } else if (el.classList.contains('btn-del')) {
                    this.apagaUm();
                } else if (el.classList.contains('btn-igual')) {
                    this.realizaConta();
                }
            })
        },
        btnParaDisplay(valor) {
            this.display.value += valor;
        }
    };
}

const calculadora = criaCalculadora();
calculadora.inicia();