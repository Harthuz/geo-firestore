// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAFgcyFu8NTYisUstSinzA1cmVdtsxVyU4",
    authDomain: "geogra-b53f7.firebaseapp.com",
    projectId: "geogra-b53f7",
    storageBucket: "geogra-b53f7.firebasestorage.app",
    messagingSenderId: "335004312628",
    appId: "1:335004312628:web:3bfc52a6d3e55585651661"
};


// Inicializar o Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Função para salvar dados
function salvarDados() {
    for (let i = 1; i <= 21; i++) {
        const checkbox = document.getElementById(`topico${i}`);
        const input = document.getElementById(`nome${i}`);
        const nome = input.value.trim();
        const topicoTexto = checkbox.nextElementSibling.textContent.trim();

        // Referência à coleção 'participantes'
        const participantesRef = db.collection("participantes");

        // Consulta para encontrar documentos com o tópico correspondente
        participantesRef
            .where("topico", "==", topicoTexto)
            .get()
            .then((querySnapshot) => {
                if (checkbox.checked && nome) {
                    // Se marcado e nome preenchido, adiciona ou atualiza
                    if (querySnapshot.empty) {
                        // Adiciona novo documento
                        participantesRef.add({
                            topico: topicoTexto,
                            nome: nome,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        });
                    } else {
                        // Atualiza documento existente
                        querySnapshot.forEach((doc) => {
                            doc.ref.update({
                                nome: nome,
                                timestamp: firebase.firestore.FieldValue.serverTimestamp()
                            });
                        });
                    }
                } else {
                    // Se desmarcado ou nome vazio, remove documentos existentes
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete();
                    });
                }
            })
            .catch((error) => {
                console.error(`Erro ao processar o tópico ${i}: `, error);
            });
    }
}


// Função para exibir dados uma única vez
db.collection("participantes").orderBy("timestamp").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const dados = doc.data();
        // Percorre todos os tópicos para encontrar correspondências
        for (let i = 1; i <= 21; i++) {
            const topicoElement = document.getElementById(`topico${i}`);
            const nomeInput = document.getElementById(`nome${i}`);
            if (topicoElement && nomeInput) {
                const label = topicoElement.nextElementSibling;
                if (label && label.textContent.trim() === dados.topico.trim()) {
                    nomeInput.value = dados.nome;
                    topicoElement.checked = true;
                    break;
                }
            }
        }
    });
}).catch((error) => {
    console.error("Erro ao buscar dados:", error);
});


const button = document.getElementById('salvarBtn');
button.addEventListener('click', () => {
    button.style.transition = 'transform 0.2s';
    button.style.transform = 'scale(1.1)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
});

console.log("Arquivo script.js carregado com sucesso! 18-4-2025 14:48");
