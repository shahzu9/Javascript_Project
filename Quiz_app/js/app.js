const questions = [
{

    'que': 'What is HTML?',
    'a': 'Hypertext Markup Language',
    'b': 'Cascading Style Sheet',
    'c': 'Jason Object Nation',
    'd': 'Helicopters Terminal Motorbats Lamborginis',
    'Correct': 'a'
},

{
    'que': "What is Css?",
    'a': "Hypertext Markup Language",
    'b': "Cascading Style Sheet",
    'c': "Jason Object Nation",
    'd': "Helicopters Terminal Motorbats Lamborginis",
    'Correct': "b"
},

{
    'que': "What Year Was Javascript Launched?",
    'a': "1995",
    'b': "1996",
    'c': "1994",
    'd': "None Of The Above",
    'Correct': "b",
}

]

let index = 0;
let total = questions.length;
let right = 0, wrong = 0;
const quesbox = document.getElementById('quesbox');
const optionInputs = document.querySelectorAll('.options');
const loadQuestion = () => {
    if (index == total) {
        return endQuiz()
    }
    reset();
    const data = questions[index]
    quesbox.innerText = `${index+1}) ${data.que}`;
optionInputs[0].nextElementSibling.innerText = data.a;
optionInputs[1].nextElementSibling.innerText = data.b;
optionInputs[2].nextElementSibling.innerText = data.c;
optionInputs[3].nextElementSibling.innerText = data.d;
}

const submitQuiz = () => {
    const data = questions[index]
    const ans = getAnswer()
    if (ans == data.Correct) {
       right++; 
    }else{
        wrong++;
    }
    index++;
    loadQuestion();
    return;
}

const getAnswer = () => {
    let answer;
    optionInputs.forEach(
        (input) => {
            if (input.checked) {
                answer = input.value;
            }
        }
    )
    return answer;
}

const reset = () => {
    optionInputs.forEach(
        (input) => {
            input.checked = false;
        }
    )
}

const endQuiz = () => {
    document.getElementById('box').innerHTML = `
    <div Style="text-align:center">
    <h3>ThankYou For Playing The Quiz</h3> 
      <h2>${right} / ${total} Are Correct</h2>
      </div>  
    `

}

loadQuestion();