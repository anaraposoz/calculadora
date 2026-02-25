const display = document.getElementById('display');
const operadores = ['+', '-', '*', '/', '%', '.'];

function appendToDisplay(value) {
    const atual = display.value;
    const ultimoCaractere = atual.slice(-1);

    // BLOQUEIO TOTAL: Não deixa começar com NENHUM operador
    if (atual === '' && operadores.includes(value)) {
        return;
    }

    // Impede operadores repetidos (ex: ++ ou */)
    if (operadores.includes(ultimoCaractere) && operadores.includes(value)) {
        display.value = atual.slice(0, -1) + value;
        return;
    }

    display.value += value;
}

// NOVA FUNÇÃO: Alterna entre positivo e negativo
function toggleSign() {
    let atual = display.value;
    if (atual === '') return;

    // Se já houver uma expressão (ex: 10+5), lidamos com o último número
    // Para simplificar: se o número atual começa com -, removemos. Se não, adicionamos.
    if (atual.startsWith('-')) {
        display.value = atual.substring(1);
    } else {
        display.value = '-' + atual;
    }
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = display.value;
        if (expression === '') return;

        // Remove operador perdido no final antes de calcular
        if (operadores.includes(expression.slice(-1))) {
            expression = expression.slice(0, -1);
        }

        expression = expression.replace(/(\d+)%/g, '($1/100)');
        
        // O eval processa o sinal de menos corretamente (ex: -5 * 2 = -10)
        let result = eval(expression);

        // Formata o resultado para não estourar a tela
        display.value = Number.isInteger(result) ? result : result.toFixed(4);
    } catch (error) {
        display.value = "Erro";
    }
}