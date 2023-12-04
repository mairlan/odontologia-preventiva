const questions = [
    {
        question : "Qual é a principal abordagem da odontologia preventiva?", 
        VF    : 'false',
        answers  : [
            { text: "A) Tratamento de canal", correct : false},
            { text: "B) Extração de dentes", correct : false},
            { text: "C) Prevenção de doenças bucais", correct : true},
            { text: "D) Cirurgia ortognática", correct : false},
        ]
    },
    {
        question : "Qual é o objetivo do flúor na odontologia preventiva?", 
        VF    : 'false',
        answers  : [
            { text: "A) Remover manchas nos dentes", correct : false},
            { text: "B) Fortalecer o esmalte dentário e prevenir cáries", correct : true},
            { text: "C) Branquear os dentes", correct : false},
            { text: "D) Corrigir a má oclusão dentária", correct : false},
        ]
    },
    {
        question : "O que são as consultas regulares ao dentista na odontologia preventiva destinadas a alcançar?", 
        VF    : 'false',
        answers  : [
            { text: "a) Tratamento de emergência", correct : false},
            { text: "b) Prevenção de doenças bucais e detecção precoce de problemas", correct : true},
            { text: "c) Remoção de dentes permanentes", correct : false},
            { text: "d) Colocação de aparelho ortodôntico", correct : false},
        ]
    },
    {
        question : "Qual é o papel da educação em saúde bucal na odontologia preventiva?", 
        VF    : 'false',
        answers  : [
            { text: "a) Realizar extrações dentárias", correct : false},
            { text: "b) Tratar doenças gengivais avançadas", correct : false},
            { text: "c) Realizar procedimentos estéticos nos dentes", correct : false},
            { text: "d) Promover a conscientização sobre a importância da higiene bucal", correct : true},
        ]
    },
    {
        question : "Qual é o método mais recomendado para escovação dos dentes?", 
        VF    : 'false',
        answers  : [
            { text: "a) Movimentos circulares", correct : true},
            { text: "a) Movimentos horizontais", correct : false},
            { text: "c) Movimentos verticais", correct : false},
            { text: "d) Não importa, desde que os dentes sejam escovados.", correct : false},
        ]
    },
];



// h1 onde vai a pergunta (h1)
const questionElement = document.getElementById("question");
// div onde esta as alternativas
const answerButtons = document.getElementById("answer-buttons");
// Botão de proximo
const nextButton = document.getElementById("next-btn");
// onde ficará a pergunta e as imagens
const header = document.getElementById("header");

const imagen = document.getElementById("img");
// espaço onde vai a dica
const hint = document.getElementById("hint");
//botao dica
const hintBtn = document.getElementById("btnh");
// 
const footer = document.getElementById("footer");
// espaço onde ficara os pontos no HTML
const pontos = document.getElementById("score");
const button = document.createElement("input");

// variaveris do index da questão
let currentQuestionIndex = 0;
// variavel da pontuação
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    // nome do botão de proxima pergunta
    nextButton.innerHTML = "Proxima";
    //shuffle(questions);
    pontos.innerHTML = "pontos: " + score;
    showQuestion();
};
function showQuestion(){
    resetState();
    // variavel para armazenar a array com as questões
    let currentQuestion = questions[currentQuestionIndex];
    // variavel para adicionar mais 1 numero no index do array
    let questionNo = currentQuestionIndex + 1;
    //Adicionar a pergunda ao HTML
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question
    
    
    // para cada resposta no objeto
    currentQuestion.answers.forEach(answer => {
        // variavel que cria um botão dentro do HTML
        const butao = document.createElement("button");
        const button = document.createElement("input");
        const paragrafo = document.createElement("p");
        const div = document.createElement("div");
        //colocar as Alternativas nos botões
        //button.innerHTML = answer.text;
        // chama a variavel para criar com filho da DIV "answer-buttons"

        if(currentQuestion.VF == 'false'){
            answerButtons.appendChild(button);
            button.setAttribute("type", 'button');
            button.setAttribute("value", answer.text);
            button.classList.add("btn");
            paragrafo.style.display = "none"
        }else{
            answerButtons.appendChild(div);
            div.classList.add("alinhar");
            div.appendChild(button);
            button.setAttribute("type", "checkbox");
            button.classList.add("btn-check");
            div.appendChild(paragrafo);
            paragrafo.classList.add("paragrafo");
            paragrafo.innerHTML = answer.text;

        }
        
        if(answer.correct){
            // se sim, define o valor como correto
            button.dataset.correct = answer.correct;
        }else{
            button.dataset.correct = answer.correct;
        }
        // adiciona um evento ao botão e chama a função selectAnswer
        butao.addEventListener("click", selectAnswer);
        button.addEventListener('click', selectAnswer);
    });
}

function resetState(){
    // define o display como nenhum(botão desaparece)
    nextButton.style.display = "none";

    // remove os botões antigos para que possa ser substituidos pelos novos com as alternativas
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
// MUDAR ESSE FUNÇÃO PARA QUANDO CLICAR NO BOTAO DE "PROXIMO" ELE VERIFICAR SE ESTA CORRETO
function selectAnswer(e){
    // variavel para receber o valor de qual botão foi clicado
    const selectedBtn = e.target;
    // variavel para receber o valor do botão que for "true"
    const isCorrect = selectedBtn.dataset.correct === "true";
    // se o valor for "true", ira ser colocado a class="correct" do css
    let currentQuestion = questions[currentQuestionIndex];
    if(isCorrect){
        // adiciona a class="correct" a alternativa
        selectedBtn.classList.add("correct");
        // aumenta a variavel da pontuação
        score += 100;
        pontos.innerHTML = "pontos: " + score;

    }

    Array.from(answerButtons.children).forEach(button => {
        // vai verificar qual é o botão que tem o valor "true" e definir ele como "correct"
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        if(button.dataset.correct === "false"){
            button.classList.add("incorrect");
        }

        // desabilita os botões não podendo clickar neles
        button.disabled = true;
    });
    //define o display do botão "proxima" como block
    nextButton.style.display = "block"
}

function showScore(){
    resetState();
    // muda o h1 da questão para a pontuação
    questionElement.innerHTML = 'Você pontuou ' +score+ ' de '+questions.length*100+'!';
    // define o botão de "proximo" como jogar novamente
    nextButton.innerHTML = "Jogar novamente";
    // define o display do botão "proximo" como block
    nextButton.style.display = "block";
}
// ao segurar o botão de proximo
function handleNextButton(){
    // aumentar o index da questão
    currentQuestionIndex++;
    // verifica se o index é maior que o tamanho da array com os objetos das perguntas
    if(currentQuestionIndex < questions.length){
        // se não chama a função de mostrar as perguntas
        showQuestion();
    }else{
        // se for maior chama a função de mostrar a pontuação
        showScore();
    }
}

// adiciona um evento quando "click" for chamado chama a arrow function
nextButton.addEventListener("click", ()=> {
    // verifica se o index das questões é menor que o tamanho da array
    if(currentQuestionIndex < questions.length){
        // se for menor define a função do botão "proximo" para passar para a proxima questão 
        handleNextButton()
    }else{
        // se for maior a função do botão "proximo" vai ser iniciar o quiz novamente; 
        startQuiz()
    }
})

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // enquanto existir elementos para trocar
    while (currentIndex != 0) {
  
      // pegar um elemento que falta para trocar
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // troca os elementos  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }
  let open = false;
function help(){
    let currentQuestion = questions[currentQuestionIndex];
    if(open == false){
        hint.innerText = currentQuestion.hint
        open = true;
        hint.style.background = "cyan";
    }else{
        hint.innerHTML = "";
        open = false;
    }
}
startQuiz();