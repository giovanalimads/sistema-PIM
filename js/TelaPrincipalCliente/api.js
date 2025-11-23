const API = "http://localhost:5030/api";

// ---------------- USUÁRIOS ----------------

async function getUsuarios() {
  return fetch(`${API}/usuarios`).then(r => r.json());
}

async function getUsuarioById(id) {
  return fetch(`${API}/usuarios/${id}`).then(r => r.json());
}

async function criarUsuario(data) {
  return fetch(`${API}/usuarios`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  }).then(r => r.json());
}

// ---------------- CHAMADOS ----------------

async function getChamados() {
  return fetch(`${API}/chamados`).then(r => r.json());
}

async function getChamadoById(id) {
  return fetch(`${API}/chamados/${id}`).then(r => r.json());
}

async function criarChamado(data) {
  return fetch(`${API}/chamados`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  }).then(r => r.json());
}

// ---------- HISTÓRICO CHAMADOS ----------

async function getHistorico() {
  return fetch(`${API}/historicochamados`).then(r => r.json());
}

async function criarHistorico(data) {
  return fetch(`${API}/historicochamados`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  }).then(r => r.json());
}

// ---------------- AVALIAÇÕES ----------------

async function getAvaliacoes() {
  return fetch(`${API}/avaliacoes`).then(r => r.json());
}

async function criarAvaliacao(data) {
  return fetch(`${API}/avaliacoes`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  }).then(r => r.json());
}
