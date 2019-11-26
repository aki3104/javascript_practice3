'user strict';
const startBtn = document.getElementById('start');
const info = document.querySelector('h1');
const answers = document.getElementById('answers');
const displayquiz = document.getElementById('displayquiz');
const category = document.getElementById('category');
const difficulty = document.getElementById('difficulty');
let choices = []
let index = 0;

//シャフル関数
const shuffle = arr => {
  for(let i = arr.length - 1; i >0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[j],arr[i]] = [arr[i],arr[j]]
  }
  return arr;
}

//問題を表示
const　trivia = ((arrayTrivias) => {
  info.textContent =  (`問題 ${index + 1}`)
  displayquiz.textContent = arrayTrivias.results[index].question
  category.textContent = (`[ジャンル]　${arrayTrivias.results[index].category}`)
  difficulty.textContent = (`[難易度]　${arrayTrivias.results[index].difficulty}`)

  //answerarrayに格納
  choices = arrayTrivias.results[index].incorrect_answers;
  choices.push(arrayTrivias.results[index].correct_answer);

  // 回答をシャッフル
  const shuffledChoices = shuffle(choices)

  //回答を表示
  shuffledChoices.forEach((select_answer) =>{
    // 回答選択肢
    const answer = document.createElement('li');
    const answerBtn = document.createElement('button');
    answerBtn.className = 'answerBtn';
    answerBtn.textContent = select_answer;
    answers.appendChild(answer);
    answer.appendChild(answerBtn);
    console.log(arrayTrivias);
    // console.log(shuffledChoices);
  })
  index ++;

  //配列の初期化
  // choices
  // shuffledChoices

});



//開始ボタンクリック
startBtn.addEventListener('click', () => {
  //クイズデータを取得、非同期処理
  fetch('https://opentdb.com/api.php?amount=10&type=multiple')
    .then(function(response){
      return response.json();
    })

    .then(function(quiz){
      trivia(quiz);
      startBtn.style.display = 'none';
    })

  .then(() => {
    
    const choicesBtn = document.querySelectorAll('button.answerBtn')
    console.log(choicesBtn.value);
  })

    //同期処理
    info.textContent = '取得中';
    displayquiz .textContent = '少々お待ちください'
});


      // quiz.results.forEach((question, index) => {
      // })
        // console.log(quiz);
        // console.log(quiz.results[1].question);
        // console.log(quiz.results.length);