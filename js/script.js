const messageArea = document.getElementById("messageArea");
const fileList = document.getElementById("fileList");
const MAX_SIZE_MB = 5;

function showMessage(msg, type = "success") {
    messageArea.textContent = msg;
    messageArea.style.color = type === "error" ? "#e63946" : "#2a9d8f";
}

function upload () {
    const input = document.getElementById("uploadInput");
    const files = [...input.files];

    if (files.length === 0) {
        showMessage("Nenhum arquivo selecionado.", "error");
        return;
    }

    const oversized = files.find(file => file.size > MAX_SIZE_MB * 1024 * 1024);
    if (oversized) {
        showMessage (`Arquivo ${oversized.name} excede 5MB.`, "error");
        return;
    }

    showMessage("Enviando...", "success")

    const su = new SmashUploader ({
        region: "us-east-1",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImViMWY4ZTZjLTMwZGQtNGRmYy04MTA4LWUxMDkyOWNkYmZlZC1ldSIsInVzZXJuYW1lIjoiOWRlMGEwMzItMGI2NC00ZjJlLWI3ZWMtMTMyZTI3M2M2Y2Q3IiwicmVnaW9uIjoidXMtZWFzdC0xIiwiaXAiOiIyMDEuNTkuMTA0Ljg5Iiwic2NvcGUiOiJOb25lIiwiYWNjb3VudCI6ImZiMTU2M2JiLTk0NTYtNDIwMS05ZjViLWIzNGY2MGQ5NDI5YS1lYSIsImlhdCI6MTc0NjQ2OTkyNCwiZXhwIjo0OTAyMjI5OTI0fQ.ddoYsX9rmdhqMXtVYjbLGCCDMrtmCGUVcqXpoXR_La0",
    });

    su.upload({ files })
    .then(result => {
        const link = result?.transfer?.transferUrl;

        if (link) {
            showMessage("Upload concluído!", "success");
    
           files.forEach(file=> {
            const li = document.createElement("li");
            li.innerHTML = `
            ${file.name} —
            <a href= "${link}" target="_blank"; ">Baixar</a>`; 
            fileList.appendChild(li);
           });
        } else {
            showMessage("Upload concluído, mas sem link.", "error");
        }
    })

    .catch(error=> {
        console.error("Error:", error);
        showMessage("Erro ao enviar o arquivo.", "error");
    });

}
