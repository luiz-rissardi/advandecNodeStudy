const user = new Set()
const user2 = new WeakSet()

const t = 1
const t2 = 1
user.add(t);
user.add(t2);
user.add({id:2,nome:"nathalia"});


console.log([...user]);