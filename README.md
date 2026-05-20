# 🎌 Maratone Este Anime

Aplicativo mobile desenvolvido em **React Native + Expo** que sorteia animes aleatórios utilizando a API do **Jikan/MyAnimeList**, exibindo informações detalhadas do anime selecionado e a localização atual do usuário em um mapa interativo.

---

## 📱 Sobre o Projeto

O objetivo do projeto é ajudar usuários a descobrirem novos animes de forma divertida e rápida.  
Ao clicar no botão de sorteio, o aplicativo busca um anime aleatório na API do MyAnimeList e exibe:

- Nome do anime
- Capa
- Quantidade de episódios
- Nota
- Sinopse resumida
- Link para o MyAnimeList

Além disso, o app utiliza geolocalização para mostrar a posição atual do usuário em um mapa.

---

## 🚀 Tecnologias Utilizadas

- React Native
- Expo
- JavaScript
- Expo Location
- React Native Maps
- API Jikan (MyAnimeList)

---

## 📦 Dependências

Instale as dependências com:

```bash
npm install
```

Principais bibliotecas utilizadas:

```bash
npm install react-native-maps
npx expo install expo-location
```

---

## ▶️ Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

### 2. Entre na pasta do projeto

```bash
cd nome-do-projeto
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute o projeto

```bash
npx expo start
```

---

## 🌎 Funcionalidades

### 🎲 Sorteio de Anime
- Busca um anime aleatório pela API Jikan
- Exibe imagem, nota, episódios e sinopse
- Possui loading durante a requisição

### 📍 Localização em Tempo Real
- Solicita permissão de localização
- Mostra a posição do usuário no mapa
- Exibe marcador personalizado

### 🔗 Integração com MyAnimeList
- Abre a página oficial do anime no navegador

### 🎨 Interface Moderna
- Layout responsivo
- Tema escuro estilizado
- Componentes organizados e reutilizáveis

---

## 📂 Estrutura do Projeto

```bash
📦 projeto
 ┣ 📜 App.js
 ┣ 📜 package.json
 ┣ 📂 assets
 ┗ 📂 node_modules
```

---

## 🛠️ API Utilizada

### Jikan API
API pública baseada no MyAnimeList.

Endpoint utilizado:

```bash
https://api.jikan.moe/v4/random/anime
```

---

## 📸 Preview

O aplicativo possui:

- Banner inicial
- Botão de sorteio
- Card com informações do anime
- Integração com mapa e localização

---

## ⚠️ Permissões Necessárias

O aplicativo solicita:

- Permissão de localização do dispositivo

Necessária para exibir o mapa com a posição atual do usuário.

---

## 👨‍💻 Autor

Desenvolvido por **Caio Victor de Moura Paschoal**  
Faculdade Senac

---

## 📄 Licença

Este projeto é apenas para fins educacionais.
