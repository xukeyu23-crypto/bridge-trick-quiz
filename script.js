const questions = [
  {
    cards: { west: "♥7", north: "♥K", east: "♥3", south: "♥10" },
    answer: "north",
    explanation: "首出花色是红心，红心里 K 最大，所以北赢。"
  },
  {
    cards: { west: "♠9", north: "♠Q", east: "♠4", south: "♠A" },
    answer: "south",
    explanation: "首出花色是黑桃，黑桃里 A 最大，所以南赢。"
  },
  {
    cards: { west: "♦2", north: "♦J", east: "♦8", south: "♦5" },
    answer: "north",
    explanation: "首出花色是方块，方块里 J 最大，所以北赢。"
  },
  {
    cards: { west: "♣5", north: "♣K", east: "♥A", south: "♣9" },
    answer: "north",
    explanation: "首出花色是梅花，红心 A 不能赢这一墩，梅花 K 最大。"
  },
  {
    cards: { west: "♥Q", north: "♠A", east: "♥3", south: "♥K" },
    answer: "south",
    explanation: "首出花色是红心，所以比较红心。红心 K 比红心 Q 大。"
  },
  {
    cards: { west: "♠J", north: "♠2", east: "♦A", south: "♠Q" },
    answer: "south",
    explanation: "首出花色是黑桃，所以比较黑桃。黑桃 Q 最大。"
  },
  {
    cards: { west: "♦10", north: "♣A", east: "♦K", south: "♦3" },
    answer: "east",
    explanation: "首出花色是方块，所以比较方块。方块 K 最大。"
  },
  {
    cards: { west: "♣Q", north: "♣2", east: "♣A", south: "♥K" },
    answer: "east",
    explanation: "首出花色是梅花，所以比较梅花。梅花 A 最大。"
  },
  {
    cards: { west: "♥4", north: "♦A", east: "♠A", south: "♣A" },
    answer: "west",
    explanation: "首出花色是红心，其他花色的 A 不能赢这一墩，所以红心 4 赢。"
  },
  {
    cards: { west: "♠K", north: "♠A", east: "♠3", south: "♦2" },
    answer: "north",
    explanation: "首出花色是黑桃，所以比较黑桃。黑桃 A 最大。"
  }
];

const seats = {
  west: "西",
  north: "北",
  east: "东",
  south: "南"
};

const suitNames = {
  "♥": "红心",
  "♠": "黑桃",
  "♦": "方块",
  "♣": "梅花"
};

let currentQuestion = 0;
let score = 0;
let answered = false;

const screens = {
  home: document.querySelector("#home-screen"),
  quiz: document.querySelector("#quiz-screen"),
  result: document.querySelector("#result-screen")
};

const questionNumber = document.querySelector("#question-number");
const liveScore = document.querySelector("#live-score");
const leadSuit = document.querySelector("#lead-suit");
const choices = document.querySelector("#choices");
const feedback = document.querySelector("#feedback");
const feedbackTitle = document.querySelector("#feedback-title");
const feedbackAnswer = document.querySelector("#feedback-answer");
const feedbackExplanation = document.querySelector("#feedback-explanation");
const finalScore = document.querySelector("#final-score");
const finalMessage = document.querySelector("#final-message");
const nextButton = document.querySelector("#next-button");

document.querySelector("#start-button").addEventListener("click", startQuiz);
document.querySelector("#restart-button").addEventListener("click", startQuiz);
nextButton.addEventListener("click", goNext);

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.remove("is-active"));
  screens[name].classList.add("is-active");
}

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  showScreen("quiz");
  renderQuestion();
}

function renderQuestion() {
  const question = questions[currentQuestion];
  answered = false;
  questionNumber.textContent = currentQuestion + 1;
  liveScore.textContent = score;
  feedback.hidden = true;
  feedback.className = "feedback";

  Object.entries(question.cards).forEach(([seat, card]) => {
    const cardElement = document.querySelector(`#card-${seat}`);
    cardElement.textContent = card;
    cardElement.classList.toggle("red", card.startsWith("♥") || card.startsWith("♦"));
  });

  const lead = question.cards.west.slice(0, 1);
  leadSuit.textContent = `首出：${suitNames[lead]}`;

  choices.innerHTML = "";
  Object.entries(seats).forEach(([seat, label]) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", () => submitAnswer(seat, button));
    choices.appendChild(button);
  });
}

function submitAnswer(selectedSeat, selectedButton) {
  if (answered) return;

  const question = questions[currentQuestion];
  const isCorrect = selectedSeat === question.answer;
  answered = true;

  if (isCorrect) score += 1;

  document.querySelectorAll(".choice-button").forEach((button) => {
    button.disabled = true;
    button.classList.remove("is-selected");
  });
  selectedButton.classList.add("is-selected");

  feedback.hidden = false;
  feedback.classList.add(isCorrect ? "correct" : "wrong");
  feedbackTitle.textContent = isCorrect ? "答对啦！" : "差一点点";
  feedbackAnswer.textContent = `正确答案：${seats[question.answer]}`;
  feedbackExplanation.textContent = question.explanation;
  nextButton.textContent = currentQuestion === questions.length - 1 ? "查看成绩" : "下一题";
  liveScore.textContent = score;
}

function goNext() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion += 1;
    renderQuestion();
    return;
  }

  renderResult();
}

function renderResult() {
  showScreen("result");
  finalScore.textContent = `${score}/10`;
  finalMessage.textContent = getResultMessage(score);
}

function getResultMessage(value) {
  if (value === 10) return "太稳了！你已经抓住了无将牌赢墩规则的核心。";
  if (value >= 8) return "很棒！大多数时候你都能准确找到首出花色里的最大牌。";
  if (value >= 5) return "不错，继续练习“只比较首出花色”，速度会越来越快。";
  return "刚开始完全正常。先盯住第一张牌的花色，再找同花色最大牌。";
}
