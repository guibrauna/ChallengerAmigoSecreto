let amigos = [];

function adicionarAmigo() {
    const input = document.getElementById("amigo");
    const nome = input.value.trim();

    if (nome === "") {
        alert("Digite um nome válido!");
        return;
    }
    if (amigos.includes(nome)) {
        alert("Esse nome já foi adicionado!");
        return;
    }

    amigos.push(nome);
    atualizarLista();
    input.value = "";
    input.focus();
}

document.getElementById("amigo").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evita que o formulário seja enviado
        adicionarAmigo();
    }
});

function atualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    
    amigos.forEach(nome => {
        const li = document.createElement("li");
        li.textContent = nome;
        li.style.opacity = "0"; // Começa invisível
        lista.appendChild(li);

        // Efeito de fade-in
        setTimeout(() => {
            li.style.opacity = "1";
            li.style.transition = "opacity 0.5s ease-in";
        }, 100);
    });
}

function sortearAmigo() {
    if (amigos.length === 0) {
        alert("Adicione pelo menos um nome para sortear.");
        return;
    }

    const listaResultado = document.getElementById("resultado");
    listaResultado.innerHTML = "";

    let i = 0;
    let intervalo = setInterval(() => {
        const nomeAleatorio = amigos[Math.floor(Math.random() * amigos.length)];
        listaResultado.innerHTML = `<li style="color: gray;">Sorteando... ${nomeAleatorio}</li>`;
        i++;

        if (i > 15) {  // Após 15 trocas, finaliza o sorteio
            clearInterval(intervalo);
            const nomeSorteado = amigos[Math.floor(Math.random() * amigos.length)];
            listaResultado.innerHTML = `<li style="color: green; font-size: 1.5em;">🎉 Nome sorteado: ${nomeSorteado} 🎉</li>`;
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }, 100);
}

function reiniciarJogo() {
    amigos = [];
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
}

// Removendo evento de clique global para evitar sorteio acidental
document.removeEventListener("click", sortearAmigo);
