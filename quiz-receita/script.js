// Perguntas do quiz
const quizData = [
    {
        question: "O campo 'OD' significa:",
        options: ["Olho direito", "Olho esquerdo", "Olho dominante"],
        correct: 0
    },
    {
        question: "O campo 'OE' representa:",
        options: ["Olho direito", "Olho esquerdo", "Olho extra"],
        correct: 1
    },
    {
        question: "Em receitas, 'ESF' indica:",
        options: ["Grau esférico", "Grau cilíndrico", "Distância pupilar"],
        correct: 0
    },
    {
        question: "O termo 'CIL' significa:",
        options: ["Grau cilíndrico (astigmatismo)", "Grau de miopia", "Distância entre lentes"],
        correct: 0
    },
    {
        question: "O sinal '+' em uma receita representa:",
        options: ["Hipermetropia/presbiopia", "Miopia", "Astigmatismo"],
        correct: 0
    },
    {
        question: "O sinal '-' representa:",
        options: ["Miopia", "Hipermetropia", "Catarata"],
        correct: 0
    },
    {
        question: "O 'Eixo' em uma receita está associado a:",
        options: ["Localização do astigmatismo", "Distância interpupilar", "Grau de longe"],
        correct: 0
    },
    {
        question: "A sigla 'DP' significa:",
        options: ["Distância pupilar", "Distorção progressiva", "Deslocamento da prescrição"],
        correct: 0
    },
    {
        question: "Se um cliente tem receita: OD: -2,00 ESF, isso significa:",
        options: ["Hipermetropia olho direito", "Miopia olho direito", "Astigmatismo olho direito"],
        correct: 1
    },
    {
        question: "Para montar uma lente multifocal, é essencial conferir:",
        options: ["Grau esférico apenas", "Adição (ADD) na receita", "Apenas DP"],
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

