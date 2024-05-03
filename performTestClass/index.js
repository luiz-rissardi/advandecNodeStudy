

class User{
    constructor(name,yearsOld,city) {
        this.name = name;
        this.yearsOld = yearsOld;
        this.city = city;
    }

    getName(){
        return this.name + "é seu nome"
    }
    getOld(){
        return this.getOld + "é sua idade"
    }
    getCity(){
        return this.city + "é sua cidade"
    }
    getAll(){
        return this + "é voce "
    }
    getAll2(){
        return this + "é voce "
    }
    getAll3(){
        return this + "é voce "
    }
    getAll4(){
        return this + "é voce "
    }
    getAll5(){
        return this + "é voce "
    }
}

const users = [];

for(let i=0;i<35000000;i++){
    users.push(new User("luzi algustsos ddsdsd",18,"colombo curitiba pr"))
}

console.log(User.prototype);