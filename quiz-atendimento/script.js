// Perguntas do quiz
const quizData = [
    {
        question: "A primeira impressão do cliente na ótica depende principalmente de:",
        options: ["Preço dos produtos", "Atendimento inicial", "Tamanho da loja"],
        correct: 1
    },
    {
        question: "Demonstrar empatia significa:",
        options: ["Repetir o que o cliente disse", "Colocar-se no lugar do cliente e entender sua necessidade", "Oferecer o produto mais caro"],
        correct: 1
    },
    {
        question: "O que aumenta a credibilidade do consultor?",
        options: ["Usar termos técnicos sem explicação", "Explicar de forma clara e personalizada", "Vender rápido"],
        correct: 1
    },
    {
        question: "Um cliente inseguro sobre lentes progressivas deve receber:",
        options: ["Pressão para fechar logo a compra", "Explicações claras, exemplos e casos de sucesso", "Opções mais caras apenas"],
        correct: 1
    },
    {
        question: "O rapport é:",
        options: ["Uma técnica para reduzir preço", "Conexão com o cliente através de afinidade", "Falar mais que o cliente"],
        correct: 1
    },
    {
        question: "Qual postura transmite maior confiança?",
        options: ["Braços cruzados", "Contato visual, sorriso e atenção ativa", "Olhar fixo no computador"],
        correct: 1
    },
    {
        question: "Quando um cliente reclama, o consultor deve:",
        options: ["Justificar rapidamente", "Ouvir com atenção, validar e buscar solução", "Ignorar e passar para outro cliente"],
        correct: 1
    },
    {
        question: "No atendimento óptico, credibilidade vem de:",
        options: ["Falar difícil", "Mostrar conhecimento com clareza e honestidade", "Vender somente promoções"],
        correct: 1
    },
    {
        question: "A principal forma de fidelizar um cliente é:",
        options: ["Desconto agressivo", "Atendimento consultivo e pós-venda", "Rapidez no fechamento"],
        correct: 1
    },
    {
        question: "Qual é o maior erro no atendimento em balcão?",
        options: ["Ouvir pouco e falar demais", "Explicar com calma", "Mostrar diferentes opções"],
        correct: 0
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

