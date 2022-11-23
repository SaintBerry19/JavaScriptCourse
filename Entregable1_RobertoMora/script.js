// Consigna: Realizar una función llamada año_bisiesto:
// 1. Recibirá un año por parámetro
// 2. Imprimirá “El año año es bisiesto” si el año es bisiesto
// 3. Imprimirá “El año año no es bisiesto” si el año no es bisiesto
// 4. Si se ingresa algo que no sea número debe indicar que se ingrese un número.
// Se recuerda que los años bisiestos son múltiplos de 4, pero los múltiplos de 100 no lo son, aunque los
// múltiplos de 400 sí. Estos son algunos ejemplos de posibles respuestas: 2012 es bisiesto, 2010 no es
// bisiesto, 2000 es bisiesto, 1900 no es bisiesto.

function bisiesto(){    
    let a=0
    let r=0
    while (a<1){
        try{ 
            let fecha = Number(prompt("Ingrese un año para consultar si es bisiesto o no: "))
            let year= (fecha)
            if (year%4===0 && year%100!==0){
                alert(`El año ${year} es bisiesto`)
            }    
            else if(year%4===0 && year%100===0 && year%400!==0){
                alert(`El año ${year} no es bisiesto`)
            }   
            else if(year%4===0 && year%100===0 && year%400===0){
                alert(`El año ${year} es bisiesto`)
            }    
            else{
                alert(`El año ${year} no es bisiesto`)
            } 
            r=0
            while (r<1){ 
            b=(prompt("Desea hacer otra consulta: "))
             if (b==="si" || b==="SI" || b==="Si" || b==="sI"){
                r=+1
                alert("Introduzca otro valor")
            }
             else if(b=="no" || b=="NO" || b=="No" || b=="nO"){              
                r=+1
                a=+1
                alert("La consulta ha terminado")
            }
             else{
                alert("Introduzca si o no")
             }
              }}
        catch (error) {console.log(error)}
        }
}
bisiesto()
