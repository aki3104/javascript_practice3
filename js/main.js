'user strict';
const startBtn = document.getElementById('start');
const info = document.querySelector('h1');
const answers = document.getElementById('answers');
const displayquiz = document.getElementById('displayquiz');
const category = document.getElementById('category');
const difficulty = document.getElementById('difficulty');
let quizes = [];
let choices = []
let index = 0;
let correct_count = 0;




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
  if(index === quizes.results.length){
    info.textContent =  (`正解数は ${ correct_count}です！`);
    displayquiz.textContent = '再度挑戦する場合はホームに戻るをクリックしてください！'
    category.textContent = '';
    difficulty.textContent = '';
    startBtn.textContent = 'ホームに戻る'
    startBtn.style.display = '';
    index = 0;

    //問題数上限までは次の問題を表示する
  }else{
    info.textContent =  (`問題 ${index + 1}`);
    displayquiz.textContent = arrayTrivias.results[index].question;
    category.textContent = (`[ジャンル]　${arrayTrivias.results[index].category}`);
    difficulty.textContent = (`[難易度]　${arrayTrivias.results[index].difficulty}`);
  
    //正解
    const correct_answer = arrayTrivias.results[index].correct_answer;
  
    //answerarrayに格納
    choices = arrayTrivias.results[index].incorrect_answers;
    choices.push(correct_answer);  
  
    // 回答をシャッフル
    const shuffledChoices = shuffle(choices)
  
    //回答を表示
    shuffledChoices.forEach((select_answer) =>{      
  
      // 回答選択肢作成、表示
      const answer = document.createElement('li');
      const answerBtn = document.createElement('button');
      answerBtn.textContent = select_answer;
      answers.appendChild(answer);
      answer.appendChild(answerBtn);
  
      //クリックイベントに追加
      answerBtn.addEventListener('click',() => {
        
        //初期化処理
        while((choices_length = choices.shift()) !== undefined){
        }
        while((cshuffledChoices_length = shuffledChoices.shift()) !== undefined){
        }
        answers.textContent = '';
        
        //正解を選択した場合
        if(select_answer === correct_answer){
          correct_count++;
        }
        
        //表示処理
        trivia(quizes);
      })
      
    })
    //問題数のカウントプラス
    index ++;
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
      quizes = quiz;
      trivia(quizes);
    })

  //同期処理
  startBtn.style.display = 'none';
  info.textContent = '取得中';
  displayquiz .textContent = '少々お待ちください'
});
