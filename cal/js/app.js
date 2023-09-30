const input = document.querySelector('.input');
const button = document.querySelectorAll('button');

let string = "";

button.forEach(btn => {
    btn.addEventListener('click', () => {
        const btnValue = btn.textContent;

        // Check if the button is AC (Clear) or =
        if(btnValue === 'AC'){
            string = "";
        } else if(btnValue === '='){
            //Perform calculation
            try{

                string = eval(string);
            } catch (error){
                // Handle any errors, e.g., division by zero
                string = 'Error';
            }
        } else{
            string += btnValue;
        }

        //// Update the input field's value
        input.value = string;
    })
})
