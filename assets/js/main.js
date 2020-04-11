function criaCalculadora() {
    return {
        display: document.querySelector('.display'),
        botoes: document.querySelectorAll('.btn'),
        inicia() {
            this.cliqueBotoes();
            this.pressionarBotoes();
        },
        testaDigitos(e) {
            let evento = e.key
            if (evento == 'C') evento = false
            if (evento == '÷') evento = false
            if (evento == '×') evento = false
            if (evento == '←') evento = false
            if (evento == '=') evento = false
            if (evento == 'Delete') evento = 'C'
            if (evento == '/') evento = '÷'
            if (evento == '*') evento = '×'
            if (evento == ',') evento = '.'
            if (evento == 'Backspace') evento = '←'
            if (evento == 'Enter') evento = '='
            if (evento) {
                for (let i in this.botoes) {
                    if (this.botoes[i].innerText == evento) return i
                }
            } else {
                return evento
            }
        },
        pressionarBotoes() {
            addEventListener('keydown', e => {
                const chave = this.testaDigitos(e)
                if (chave) this.botoes[chave].classList.add('btn-ativo')               
            })
            addEventListener('keyup', e => {
                const chave = this.testaDigitos(e)
                if (chave) { 
                    this.botoes[chave].classList.remove('btn-ativo')
                    if (this.botoes[chave].classList.contains('btn-num')) {
                        this.btnParaDisplay(this.botoes[chave].innerText);
                    } else if (this.botoes[chave].classList.contains('btn-limpa')) {
                        this.limparDisplay();
                    } else if (this.botoes[chave].classList.contains('btn-del')) {
                        this.apagaUm();
                    } else if (this.botoes[chave].classList.contains('btn-igual')) {
                        this.realizaConta();
                    }
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
            for (let letra in conta ) {
                if (conta[letra] == '×') conta = conta.replace('×', '*');
                if (conta[letra] == '÷') conta = conta.replace('÷', '/');
            }
            
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
            if (this.display.value.length < 17) this.display.value += valor;
        }
    };
}

const calculadora = criaCalculadora();
calculadora.inicia();