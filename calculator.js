const d = document;

export default function calculator(){
    const $display = d.querySelector(".display"),
        $numeros = d.getElementsByClassName("numero"),
        $operadores = d.getElementsByClassName("operadores"),
        $numerosArray = Array.from($numeros),
        $operadoresArray = Array.from($operadores),
        $borrarTodo = d.querySelector(".borrar-todo"),
        $borrar = d.querySelector(".borrar"),
        $igual = d.querySelector(".igual");
    

        $numerosArray.forEach((e) => e.addEventListener("click", () => {
            imprimirNumeros(e, $display);
        }));
        $operadoresArray.forEach((e) => e.addEventListener("click", () => {
            imprimirOperadores(e, $display);
        }));
        $borrarTodo.addEventListener("click", () => {
            borrarTodo();
        })
        $borrar.addEventListener("click", () => {
            borrar();
        })
        $igual.addEventListener("click", () => {
            calcular($display);
            
        })


        function imprimirNumeros(boton, display){
            
            if(display.textContent.length < 20){
                display.textContent += boton.textContent
            }
        }

        function imprimirOperadores(boton, display){
            let regOperator = /^[+*-]/,
                regNumber = /^[0-9]/;
            
            if(regOperator.test(display.textContent) || display.textContent.includes('+', '-', '*')){
                return
            } else if(regNumber.test(display.textContent)){
                display.textContent += boton.textContent;
            }
            if(display.textContent.length > 15) return
        }

        function borrarTodo(){
            $display.textContent = "";
        }
        function borrar(){
            $display.textContent = $display.textContent.slice(0,-1);
        }
        function calcular(e) {
            $display.textContent = eval(e.textContent)            
        }
}



