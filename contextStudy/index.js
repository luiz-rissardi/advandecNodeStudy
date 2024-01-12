

class User {
    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }

    getName() {
        console.log(this);
    }
}

class Execute {
    constructor(string) {
        this.string = string;
    }

    exec(fn) {
        fn("um simples teste");
    }
}

const user = new User("luiz rissardi", 17);
const executador = new Execute("ola mundo");

executador.exec(user.getName)
