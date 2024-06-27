
/*
um detalhe que observamos ao estudarmos contextos seria que toda vez que uma funçaõ é delegada 
para outra ela definitivamente perde o contexto na qual estava, funções, agora quando uma variavel
recebe uma função ela não perde o contexto emsmo sendo delegada, deve ser uam questão de memoria,
outro ponto também é em questão do 'contexto' de closures onde de fatp não é perdido o lugar da qual ea foi 
definido, se ela perde o contexto mas nãpo o lugar da onde foi definido, por que se perde o contexto ?

o this do obejto é nada mais que a referencia o objeto, e esse this é determinado conforme a 
função dentro do objeto é chamada, casos em que o this original e perde e fica undefined ou global,
 - delegação de funções do obejeto
 - desetruturação de função
 - mudança de contexto(bind apply, ou call)
*/

export function user() {
    const name = "Luiz"
    return {
        luiz:"2",
        getName() {
            console.log(this);
            return name
        }
    }
}

export function teste(fn) {
    this.luiz = "alana"
    const result = fn.bind(this)();
    console.log(result);
}

const teste2 = user();
console.log(teste2.getName());