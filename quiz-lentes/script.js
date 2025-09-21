// Perguntas do quiz
const quizData = [
    {
        question: "Qual é a principal vantagem das lentes asféricas?",
        options: ["Aumentam o peso da armação", "Reduzem distorções e deixam a lente mais fina", "Melhoram apenas para perto"],
        correct: 1
    },
    {
        question: "As lentes fotossensíveis (Transitions) têm como função:",
        options: ["Clarear a visão em ambientes escuros", "Escurecer em contato com luz UV", "Substituir o uso de lentes polarizadas"],
        correct: 1
    },
    {
        question: "Para clientes com grau alto, a lente mais indicada é:",
        options: ["Lente CR-39 comum", "Lente de policarbonato", "Lente de alto índice (1.67 ou 1.74)"],
        correct: 2
    },
    {
        question: "A principal característica das lentes polarizadas é:",
        options: ["Melhorar contraste e reduzir reflexos horizontais", "Escurecer automaticamente", "Ser mais barata que as comuns"],
        correct: 0
    },
    {
        question: "Qual lente oferece maior resistência a impactos?",
        options: ["Policarbonato", "Cristal mineral", "CR-39"],
        correct: 0
    },
    {
        question: "Para crianças, qual lente é mais recomendada?",
        options: ["Cristal mineral", "Policarbonato", "Alto índice"],
        correct: 1
    },
    {
        question: "O que significa uma lente bifocal?",
        options: ["Corrige astigmatismo", "Possui duas áreas: visão de longe e de perto", "É adaptada para visão noturna"],
        correct: 1
    },
    {
        question: "A lente progressiva é indicada para:",
        options: ["Miopia leve", "Correção de presbiopia sem linhas visíveis", "Pessoas com fotofobia"],
        correct: 1
    },
    {
        question: "Lentes com filtro azul são recomendadas para:",
        options: ["Evitar riscos físicos", "Reduzir fadiga visual diante de telas digitais", "Melhorar contraste ao dirigir"],
        correct: 1
    },
    {
        question: "O tratamento antirreflexo é importante porque:",
        options: ["Deixa a lente mais escura", "Reduz reflexos, melhora estética e conforto visual", "Facilita apenas a limpeza"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let finished = false;

// Elementos conforme seu HTML
const quizForm = document.getElementById("quiz");
const questionTitle = quizForm.querySelector("h2");
const optionInputs = quizForm.querySelectorAll('input[name="resp"]');
const optionLabels = quizForm.querySelectorAll(".option label");
const submitBtn = document.getElementById("btn-conf");
const feedback = document.getElementById("feedback");
const timer = document.querySelector('.timer'); //tempo
const spanPlayer = document.querySelector('.player');

const progEl = document.getElementById("prog");
const pontEl = document.getElementById("pont");
// opcional: use isso se quiser setar um nome
const nomeEl = document.getElementById("nome");

// Carrega pergunta na UI
function loadQuestion() {
    const q = quizData[currentQuestion];

    // Pergunta
    questionTitle.textContent = q.question;

    // Opções (usa os 3 radios existentes)
    q.options.forEach((text, i) => {
        optionLabels[i].textContent = text;
        optionInputs[i].checked = false; // limpa seleção anterior
        // garante um value coerente (não é obrigatório, mas ajuda)
        optionInputs[i].value = i;
    });

    // Atualiza status
    progEl.textContent = `${currentQuestion + 1}/${quizData.length}`;
    pontEl.textContent = `${score}`;
    feedback.textContent = "Sua resposta está:"; // reseta feedback
    feedback.style.color = ""; // reset cor
    submitBtn.textContent = "Confirmar";
}

// Pega índice selecionado
function getSelectedIndex() {
    let idx = null;
    optionInputs.forEach((input, i) => {
        if (input.checked) idx = i;
    });
    return idx;
}

// Mostra resultado final
function showResult() {
    quizForm.classList.add("finalizado"); // caso queira estilizar no CSS
    feedback.textContent = `Fim! Você fez ${score} ponto(s).`;
    feedback.style.color = "#0ea5e9";
    submitBtn.textContent = "Reiniciar";
    finished = true;
}

// Clique no botão
quizForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Reiniciar se terminou
    if (finished) {
        currentQuestion = 0;
        score = 0;
        finished = false;
        quizForm.classList.remove("finalizado");
        loadQuestion();
        return;
    }

    const selected = getSelectedIndex();
    if (selected === null) {
        alert("Por favor, selecione uma opção!");
        return;
    }

    if (selected === quizData[currentQuestion].correct) {
        score += 10;
        feedback.textContent = "Sua resposta está CERTA! +10 pontos";
        feedback.style.color = "#16a34a"; // verde
        feedback.style.fontSize = "20px";
    } else {
        feedback.textContent = "Sua resposta está ERRADA";
        feedback.style.color = "#dc2626"; // vermelho
    }

    // Próxima pergunta
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        // pequena pausa visual (opcional)
        setTimeout(loadQuestion, 1000);
    } else {
        setTimeout(showResult, 1000);
    }
    const quizForm = document.getElementById("quiz");
    const statusContainer = document.getElementById("status-container");
    const finalScreen = document.getElementById("final-screen");
    const finalScore = document.getElementById("final-score");
    const restartBtn = document.getElementById("restart-btn");

    // ...

    function showResult() {
        quizForm.classList.add("hidden");
        finalScreen.classList.remove("hidden");
        finalScore.textContent = `Você fez ${score} ponto(s)!`;
        statusContainer.style.display = "none";
        clearInterval(this.loop);
    }

    restartBtn.addEventListener("click", () => {
        // reseta tudo
        currentQuestion = 0;
        score = 0;
        finalScreen.classList.add("hidden");
        quizForm.classList.remove("hidden");
        statusContainer.style.removeProperty('display');
        loadQuestion();
        startTimer();
    });


});


const startTimer = () => {

    timer.innerHTML = 0;
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
}
startTimer();
spanPlayer.innerHTML = localStorage.getItem('player');


// Inicializa
loadQuestion();

