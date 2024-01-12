// childProcess/child.js

setTimeout(() => {
    process.send('Mensagem do processo filho 1 ');
}, 1000);