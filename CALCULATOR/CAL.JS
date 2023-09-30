let input = document.getElementById('inputbox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click', (f) =>{
        if(f.target.innerHTML == '='){
            string = eval(string);
            input.value = string;
        }
        else if(f.target.innerHTML == 'AC'){
            string = "";
            input.value = string;

        }
        else if(f.target.innerHTML == 'DEL'){
            string = string.substring(0, string.length-1);
            input.value = string;
        }
        else{
            string += f.target.innerHTML;
            input.value = string;

        }
    })
})