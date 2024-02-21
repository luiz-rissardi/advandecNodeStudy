export default class View {
    #form = document.getElementById("form");
    #progressBar = document.getElementById("progressRead");
    #sizeFile = document.getElementById("sizeFile");
    #fileInput = document.getElementById("file");
    #enableWorkerCheck = document.getElementById("enableWorker");

    onSubmitForm(fn){
        this.#form.reset()
        this.#form.addEventListener("submit", el =>{
            el.preventDefault()
            const fileData = this.#fileInput.files[0];
            if(!fileData){
                alert("please insert a file !");
                return;
            }

            const formData = new FormData(el.currentTarget);
            const searchQuery = formData.get("search");

            fn({ file:fileData, searchQuery  })
        })
    }

    onFileChange(fn){
        this.#fileInput.addEventListener("change", el =>{
            fn(el.target.files[0])
        })  
    }

    setSizeFile(size){
        this.#sizeFile.innerHTML = ` the size of the file´s the ${size} ` 
    }

    setProgress(value){
        this.#progressBar.value = value
    }

    workerIsEnabled(){
        return this.#enableWorkerCheck.checked
    }


}