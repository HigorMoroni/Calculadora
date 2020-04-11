function criaCalculadora() {
    return {
        display: document.querySelector('.display'),
        inicia() {
            this.cliqueBotoes();
            this.pressionaEnter();
        },
        pressionaEnter() {
            this.display.addEventListener('keyup', e => {
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