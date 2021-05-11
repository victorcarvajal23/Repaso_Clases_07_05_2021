// console.log(sessionStorage);


// for (let i = 0; i < 100; i++) {
//     localStorage.setItem(`dato ${i}`, `Soy el datos # ${i}`);
// }
// for (let i = 0; i < localStorage.length; i++) {
//     console.log(`LLego en la peticion ${i} : ${localStorage.key(i)}`);
    
// }


// let objJson = {
//     'nombre': 'andres', 
//     'edad':25, 
//     'saludar': `
//         return arg.num1 + arg.num2;
//     `
// }

// localStorage.setItem('informacion', JSON.stringify(objJson));
// let data = JSON.parse(localStorage.getItem('informacion'));
// data.saludar = new Function('{...arg}', data.saludar);
// let arg = {
//     num1 : 5,
//     num2 : 6
// }
// console.log(data);



class almacenamiento{
    constructor(){

    }
    sessionStorage(){
        let obj = {};
        for(let i=0; i<sessionStorage.length; i++) {
            let key = sessionStorage.key(i);
            obj[key] = sessionStorage.getItem(key);
        }
        sessionStorage.clear();
        return obj;
       
    }
    localStorage(){
        let obj = {};
        for(let i=0; i<localStorage.length; i++) {
            let key = localStorage.key(i);
            obj[key] = localStorage.getItem(key);
        }
        localStorage.clear();
        return obj;
    }
}
class configuracion extends almacenamiento{
    constructor(){
        super();
    }
    entidades({...arg}){
        let obj = [];
        for(let data in Object.assign({}, arg.calse)){
            if(data!= `${arg.instancia.split('.')[1]}`) obj[data] = eval(`${arg.instancia}.${data}`);
        }
        return obj;
    }
    Accesos({...arg}, clasePadre, claseHistorial){
        console.log(eval(claseHistorial));
        let obj = [];
        //Crear el historial de Storage de los navegadores 
        obj['Storage'] = {
            sessionStorage: this.sessionStorage(),
            localStorage: this.localStorage()
        };
        //Cargamos las etidades viejas y nuevas de la clase invocada
        eval(claseHistorial).push(this.entidades(
            {
                calse: eval(clasePadre), 
                instancia: clasePadre
            }
        ));
        // ERROR 10 - 05 - 2021
        console.log(clasePadre.split('.')[1]);
        eval(clasePadre) = new humano(arg);
        
        return eval(`this.${clasePadre.split('.')[1]}}`);
    }
}

class humano extends configuracion{
    static ejecutar = null;
    static historico = [];
    constructor({...arg}){
        super();
        this.nombre = arg.nombre;
        this.edad = arg.edad;
    }
    static getInst({...arg}){
        return (this.ejecutar instanceof Object)
                // ERROR 10 - 05 - 2021
                ? this.ejecutar.Accesos(arg, 'humano.ejecutar', 'humano.historico')
                : this.ejecutar = new humano(arg);
    }
    Accesos({...arg}){
        let obj = [];
        //Crear el historial de Storage de los navegadores 
        obj['Storage'] = {
            sessionStorage: this.sessionStorage(),
            localStorage: this.localStorage()
        };
        //Cargamos las etidades viejas y nuevas de la clase invocada
        humano.historico.push(this.entidades(
            {
                calse: humano.ejecutar, 
                instancia: 'humano.ejecutar'
            }
        ));
        humano.ejecutar = new humano(arg);
        return this.ejecutar;
    }
    Saludar(){
        localStorage.setItem('Edad', 23);
        this.saludo = `Hola ${this.nombre} como estas`;
        return this.saludo;
    }
}

humano.getInst({nombre: "victor", edad: 25});
humano.getInst({nombre: "andres", edad: 26});
// humano.ejecutar.Saludar();
humano.getInst({nombre: "y", edad: 23});
console.log(humano.historico);