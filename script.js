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
    const topico = document.getElementById('topico1');
    const nome = document.getElementById('nome1').value;

    if (topico.checked && nome) {
        db.collection("participantes").add({
            topico: "Apresentação dos palestrantes e do tema do seminário.",
            nome: nome,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
            .then(() => {
                console.log("Dados salvos com sucesso!");
                document.getElementById('nome1').value = '';
                topico.checked = false;
            })
            .catch((error) => {
                console.error("Erro ao salvar dados: ", error);
            });
    }
}

// Função para exibir dados
db.collection("participantes").orderBy("timestamp").onSnapshot((querySnapshot) => {
    const lista = document.getElementById('listaNomes');
    lista.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const dados = doc.data();
        const div = document.createElement('div');
        div.textContent = `${dados.nome} - ${dados.topico}`;
        lista.appendChild(div);
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

console.log("Arquivo script.js carregado com sucesso!");
