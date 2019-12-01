'user strict';
const startBtn = document.getElementById('start');
const info = document.querySelector('h1');
const answers = document.getElementById('answers');
const displayquiz = document.getElementById('displayquiz');
const category = document.getElementById('category');
const difficulty = document.getElementById('difficulty');
let choices = [];
let quizIndex = 0;
let correctCount = 0;

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
  
  //問題数の上限に行ったら終了する条件分岐
  if(quizIndex === arrayTrivias.results.length){
    info.textContent =  (`正解数は ${ correctCount}です！`);
    displayquiz.textContent = '再度挑戦する場合はホームに戻るをクリックしてください！'
    category.textContent = '';
    difficulty.textContent = '';
    startBtn.textContent = 'ホームに戻る';
    startBtn.style.display = '';
    quizIndex = 0;

    //問題数上限までは次の問題を表示する
  }else{
    info.innerHTML =  (`問題 ${quizIndex + 1}`);
    displayquiz.textContent = arrayTrivias.results[quizIndex].question;
    category.textContent = (`[ジャンル]　${arrayTrivias.results[quizIndex].category}`);
    difficulty.textContent = (`[難易度]　${arrayTrivias.results[quizIndex].difficulty}`);
  
    //正解
    const correctAnswer = arrayTrivias.results[quizIndex].correct_answer;
  
    //answerarrayに格納
    choices = arrayTrivias.results[quizIndex].incorrect_answers;
    choices.push(correctAnswer);  
  
    // 回答をシャッフル
    let shuffledChoices = shuffle(choices)
  
    //回答を表示
    shuffledChoices.forEach((selectAnswer) =>{
      // 回答選択肢作成、表示
      const answer = document.createElement('li');
      const answerBtn = document.createElement('button');
      answerBtn.textContent = selectAnswer;
      answers.appendChild(answer);
      answer.appendChild(answerBtn);

      //クリックイベントに追加
      answerBtn.addEventListener('click',() => {
        
        //初期化処理
       choices = [];
       shuffledChoices = [];
       answers.textContent = '';
        
        //正解を選択した場合
      if(selectAnswer === correctAnswer){
        correctCount++;
      }
      
      //表示処理
      trivia(arrayTrivias);
      })
    })

    //問題数のカウントプラス
    quizIndex ++;
  }
});

//開始ボタンクリック
startBtn.addEventListener('click', () => {

  //クイズデータを取得、非同期処理
  fetch('https://opentdb.com/api.php?amount=10&type=multiple')
    .then(function(response){
      return response.json();
    })

  //非同期処理２番目
    .then(function(quiz){
      trivia(quiz);
    })

  //同期処理
  startBtn.style.display = 'none';
  info.textContent = '取得中';
  displayquiz .textContent = '少々お待ちください'
});
