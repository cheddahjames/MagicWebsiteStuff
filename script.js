const questions = [
  {
    question: "Do you like to read?",
    answers: [
      { text: "I need pictures along with it", trait: "W" }, // White
      { text: "If you don't read you are an imbecile", trait: "U" }, // Blue
      { text: "I punch walls for fun", trait: "B" }, // Black
      { text: "Only if its a sentence", trait: "R" }, // Red
      { text: "I am illiterate", trait: "G" }, // Green
    ],
  },
  {
    question: "Which playstyle do you lean towards?",
    answers: [
      { text: "Enchantments and artifacts are cool", trait: "W" },
      { text: "I want to control the game", trait: "U" },
      { text: "A long combo to end the game", trait: "B" },
      { text: "Do as much damage as possible to everyone", trait: "R" },
      { text: "Big stompy creatures", trait: "G" },
    ],
  },
  {
    question: "When was the last time you touched grass?",
    answers: [
      { text: "Past Month", trait: "W" },
      { text: "What is grass?", trait: "U" },
      { text: "Past Year", trait: "B" },
      { text: "Past Week", trait: "R" },
      { text: "Today", trait: "G" },
    ],
  },
  {
    question: "Which mythical creature do you like the most?",
    answers: [
      { text: "Unicorn", trait: "W" },
      { text: "Lochness Monster", trait: "U" },
      { text: "Duende", trait: "B" },
      { text: "Dragon", trait: "R" },
      { text: "Hydra", trait: "G" },
    ],
  },
  {
    question: "How many friends do you have?",
    answers: [
      { text: "Sigma", trait: "U" },
      { text: "1-2", trait: "B" },
      { text: "3-5", trait: "W" },
      { text: "6-7", trait: "R" },
      { text: "Plenty", trait: "G" },
    ],
  },
  {
    question: "How do you handle conflict?",
    answers: [
      { text: "Diplomatic", trait: "W" },
      { text: "Run Away", trait: "U" },
      { text: "Murder", trait: "B" },
      { text: "Fight", trait: "R" },
      { text: "De-escalate", trait: "G" },
    ],
  },
  {
    question: "Which job would you choose?",
    answers: [
      { text: "Police Officer", trait: "W" },
      { text: "Librarian", trait: "U" },
      { text: "CEO", trait: "B" },
      { text: "Artist", trait: "R" },
      { text: "Park Ranger", trait: "G" },
    ],
  },
  {
    question: "Who is the basketball goat?",
    answers: [
      { text: "Micheal Jordan", trait: "W" },
      { text: "I don't watch sportsball", trait: "U" },
      { text: "Caitlyn Clark", trait: "B" },
      { text: "Kobe Bryant", trait: "R" },
      { text: "Lebron James", trait: "G" },
    ],
  },
  {
    question: "Which youtuber do you like the most?",
    answers: [
      { text: "Tolerian Community College", trait: "W" },
      { text: "Covet Go Blue", trait: "U" },
      { text: "Commander Quarter's", trait: "B" },
      { text: "MoistCritikal", trait: "R" },
      { text: "Nitpicky Nerds", trait: "G" },
    ],
  },
  {
    question: "Which video game genre do you like the most?",
    answers: [
      { text: "Simulators", trait: "W" },
      { text: "MMOs", trait: "U" },
      { text: "Horror", trait: "B" },
      { text: "FPS", trait: "R" },
      { text: "RPG", trait: "G" },
    ],
  },
  {
    question: "How do you feel about interaction(Removal spells)?",
    answers: [
      { text: "Remove everything thats a problem", trait: "W" },
      { text: "I live in the stack", trait: "U" },
      { text: "I'm usually destroying my own stuff", trait: "B" },
      { text: "Having interaction must be nice", trait: "R" },
      { text: "I just want to protect my big creatures", trait: "G" },
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

