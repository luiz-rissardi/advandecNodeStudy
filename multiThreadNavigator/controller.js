

export default class Controller{

    #view
    #service
    #worker
    #events = {
        alive:() => console.log("I am alive"),
        progress: ({ total })=>{
            this.#view.setProgress(total);
        }
    }

    constructor({ service,view,worker }) {
        this.#service = service;
        this.#view = view;
        this.#worker = this.configureWorker(worker);
    }

    static init(deps){
        const controller = new Controller(deps);
        controller.init();
        return controller;
    }

    init(){
        this.#view.onSubmitForm(this.#submitForm.bind(this));
        this.#view.onFileChange(this.#fileChange.bind(this));
    }

    configureWorker(worker){
        worker.onmessage = ({ data }) => {
            this.#events[data.eventType](data)
        }

        return worker
    }

    #submitForm({ file,searchQuery }){

        this.#worker.postMessage({ file,searchQuery })
        
    }

    #fileChange(file){
        const bytes = file.size;
        this.#view.setSizeFile(this.#formatBytes(bytes))
    }

    #formatBytes(bytes){
        const sizetype = ['B', 'KB', 'MB', 'GB', 'TB'];

        let i = 0;
        for(i; bytes >= 1024 && bytes > 4;i++){
            bytes = bytes / 1024
        } 

        return `${String(bytes).slice(0,3)} ${sizetype[i]}`  
        
    }
}