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

        if (checkbox.checked && nome) {
            db.collection("participantes").add({
                topico: topicoTexto,
                nome: nome,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                console.log(`Dados do tópico ${i} salvos com sucesso!`);
                // Atualiza o valor do campo de entrada
                input.value = nome;
            })
            .catch((error) => {
                console.error(`Erro ao salvar dados do tópico ${i}: `, error);
            });
        }
    }
}

// Função para exibir dados
db.collection("participantes").orderBy("timestamp").onSnapshot((querySnapshot) => {
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
});


const button = document.getElementById('salvarBtn');
button.addEventListener('click', () => {
    button.style.transition = 'transform 0.2s';
    button.style.transform = 'scale(1.1)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
});

console.log("Arquivo script.js carregado com sucesso! 1");
