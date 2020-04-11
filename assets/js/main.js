function criaCalculadora() {
    return {
        display: document.querySelector('.display'),
        inicia() {
            this.cliqueBotoes();
        },
        cliqueBotoes() {
            document.addEventListener('click', function(e) {
                const el = e.target;
                if (el.classList.contains('btn-num')) {
                    this.btnParaDisplay();
                }
            })
        },
        btnParaDisplay() {
            
        }
    };
}

const calculadora = criaCalculadora();
calculadora.inicia();