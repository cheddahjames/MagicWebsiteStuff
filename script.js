const questions = [
  {
    question: "Do you like to read (not just books)?",
    answers: [
      { text: "I need pictures along with it", trait: "W" }, // White
      { text: "If you don't read you are an imbecile", trait: "U" }, // Blue
      { text: "I punch walls for fun", trait: "B" }, // Black
      { text: "Only if its a sentence", trait: "R" }, // Red
      { text: "I am illiterate", trait: "G" }, // Green
    ],
  },
  {
    question: "Pick your vacation spot",
    answers: [
      { text: "Prison", trait: "W" },
      { text: "Tsunami", trait: "U" },
      { text: "Hell", trait: "B" },
      { text: "Volcano", trait: "R" },
      { text: "Surrounded by bloodthirsy apes", trait: "G" },
    ],
  },
  {
    question: "What do you value most?",
    answers: [
      { text: "Injustice", trait: "W" },
      { text: "Sarcasm", trait: "U" },
      { text: "Selfishness", trait: "B" },
      { text: "Greed", trait: "R" },
      { text: "Pride", trait: "G" },
    ],
  },
];

// Sarcastic Remarks
const RESULT_INFO = {
  W: { title: "White (Order & Community)", text: "You like boys" },
  U: { title: "Blue (Knowledge & Logic)",  text: "You like boys" },
  B: { title: "Black (Ambition & Will)",   text: "You like boys" },
  R: { title: "Red (Freedom & Passion)",   text: "You are destined for greatness" },
  G: { title: "Green (Nature & Growth)",   text: "You like a lot of boys" },
};

const questionElement = document.getElementById("question");
const answerButtons  = document.getElementById("answer-buttons");
const nextButton     = document.getElementById("next-btn");

let currentQuestionIndex = 0;
// Score tally
let tally = { W:0, U:0, B:0, R:0, G:0 };

function startQuiz() {
  currentQuestionIndex = 0;
  tally = { W:0, U:0, B:0, R:0, G:0 };
  nextButton.textContent = "Next";
  nextButton.style.display = "none";
  showQuestion();
}

function showQuestion() {
  resetState();
  const q = questions[currentQuestionIndex];
  const qNo = currentQuestionIndex + 1;
  questionElement.textContent = `${qNo}. ${q.question}`;

  q.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;
    btn.classList.add("btn");
    btn.dataset.trait = answer.trait; //where points are scored
    btn.addEventListener("click", onAnswerClick);
    answerButtons.appendChild(btn);
  });
}

function resetState() {
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
}

function onAnswerClick(e) {
  // Add points
  const trait = e.currentTarget.dataset.trait;
  tally[trait] = (tally[trait] ?? 0) + 1;

  // Next Question function
  if (currentQuestionIndex < questions.length - 1) {
    nextButton.style.display = "inline-block";
    nextButton.onclick = () => {
      currentQuestionIndex++;
      showQuestion();
    };
  } else {
    showResult();
  }
}

function showResult() {
  resetState();

  // Pick highest score
  const [bestTrait, bestScore] = Object.entries(tally)
    .reduce((best, entry) => entry[1] > best[1] ? entry : best, ["", -Infinity]);

  const info = RESULT_INFO[bestTrait] || { title: "Your result", text: "" };

  questionElement.textContent = `Result: ${info.title}`;
  const p = document.createElement("p");
  p.textContent = info.text + ` (Score: ${bestScore})`;
  answerButtons.appendChild(p);

 //restart
  nextButton.textContent = "Restart";
  nextButton.style.display = "inline-block";
  nextButton.onclick = startQuiz;
}

startQuiz();
