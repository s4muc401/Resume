const btnMenuFinish = document.getElementById("btnMenuFinish");
const btnMenuSummary = document.getElementById("btnMenuSummary");
const btnMenuReturn = document.getElementById("btnMenuReturn");
const footer = document.getElementById("footer");
const container_main = document.getElementById("container-main");
const sectionAdd = document.getElementById("main");
const container_summary = document.getElementById("container-summary");
const container_quiz = document.getElementById("container-quiz");
const question_text = document.getElementById("question");

btnMenuReturn.style.display = "none";
container_summary.style.display = "none";

let numberOfQuestion = 0;
let Questions = [];

function addQuestion() {
    numberOfQuestion += 1;

    Questions.push(question_text.value);
    localStorage.setItem("quizInStorage", JSON.stringify(Questions));

    const numberQuestion = document.createElement("h4");
    numberQuestion.textContent = `QUESTÃO 0${numberOfQuestion}`;
    container_quiz.appendChild(numberQuestion);

    numberQuestion.style.color = "#64B6AC";
    numberQuestion.style.marginTop = "5px";

    const elementTitle = document.createElement("textarea");
    elementTitle.innerHTML = `${question_text.value}`;
    container_quiz.appendChild(elementTitle);

    const input = document.createElement("textarea");
    container_quiz.appendChild(input);

    questStyle(elementTitle, input);

    question_text.value = "";
}

function questStyle(element, element2) {
    element.style.width = "99%";
    element.style.height = "50px";
    element.style.fontSize = "0.9em";
    element.style.border = "none";
    element.style.color = "#999"
    element.style.marginTop = "8px";

    element2.style.width = "99%";
    element2.style.height = "120px";
    element2.placeholder = " Resposta Aqui...";
    element2.style.marginBottom = "40px";
    element2.style.borderStyle = "solid";
    element2.style.borderWidth = "2px";
    element2.style.borderRadius = "8px";
    element2.style.borderColor = "#64B6AC";
    element2.textContent = element2.value;
}

function openAndClosed() {
  let status = (sectionAdd.style.display == "block") ? "none" : "block";  
  sectionAdd.style.display = status;
}

function openSummary() {
    container_main.style.display = "none";
    container_summary.style.display = "block";
    btnMenuSummary.style.display = "none";
    btnMenuReturn.style.display = "inline-block";
}

function returnMain() {
    container_main.style.display = "block";
    container_summary.style.display = "none";
    btnMenuSummary.style.display = "inline-block";
    btnMenuReturn.style.display = "none";
}

function finish() {
    localStorage.removeItem("quizInStorage");
    main.style.display = "none";
    container_quiz.style.marginTop = "39px";
    btnMenuSummary.style.display = "none";
    btnMenuReturn.style.display = "none";
    btnMenuFinish.textContent = "Equipe Ethel";
    btnMenuFinish.style.color = "#64B6AC";
    btnMenuFinish.style.fontSize = "0.45em";
    const btnOpenAndClose = document.getElementById("btnOpenAndClose");
    btnOpenAndClose.style.display = "none";
}

const autoSave=(time)=> {
    setInterval(()=>{
        let summaryText = document.getElementById("summaryText").value;
        localStorage.setItem("summary", summaryText);
    },time);
}
autoSave(1000)

const loadQuiz=()=>{
    let summaryText = document.getElementById("summaryText");
    summaryText.value = localStorage.getItem("summary");

    if (localStorage.getItem("quizInStorage")) {
        const storage = localStorage.getItem("quizInStorage");
        Questions = JSON.parse(storage);

        for (const element of Questions) {
            numberOfQuestion += 1;

            const numberQuestion = document.createElement("h4");
            numberQuestion.textContent = `QUESTÃO 0${numberOfQuestion}`;
            container_quiz.appendChild(numberQuestion);

            numberQuestion.style.color = "#64B6AC";
            numberQuestion.style.marginTop = "5px";

            const elementTitle = document.createElement("textarea");
            elementTitle.innerHTML = `${element}`;
            container_quiz.appendChild(elementTitle);

            const input = document.createElement("textarea");
            container_quiz.appendChild(input);

            questStyle(elementTitle, input);
        }
    }
}
window.addEventListener("load", loadQuiz);