
const t  = new User("luyiz","dsds")
const t1 = {}
const t2 = {}


function User(name,sobrenome){
    this.name = name;
    this.sobrenome = sobrenome;
}

function UserActions(){
}

UserActions.prototype.getName = function(){
    return this.name
}

User.prototype = Object.create(UserActions.prototype);
User.prototype.constructor = User;

console.log(User.prototype.__proto__.__proto__);
