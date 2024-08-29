# 🚀 FIAP Engineers

Bem-vindo ao **FIAP Engineers**! Este é um MVP de um CRM desenvolvido em React e Node.js, que integra o front-end e o back-end em uma única aplicação. Este README fornece uma visão geral de como configurar e executar a aplicação, bem como uma descrição das principais funcionalidades.

## 🌟 Visão Geral

**FIAP Engineers** é uma aplicação projetada para gerenciar e responder a chamados de clientes. Com uma interface de usuário interativa e um sistema de gerenciamento de atendimento, a aplicação oferece uma solução completa para atendimento ao cliente.

## 🛠️ Funcionalidades

### Front-end

A aplicação possui dois principais caminhos de acesso:

1. **Tela de Formulário e Chat com GPT:**
   - **URL:** [http://localhost:5173/](http://localhost:5173/)
   - Esta tela exibe um formulário para coleta de informações do usuário e redireciona para um chat integrado com GPT, oferecendo assistência imediata e respostas automáticas.
   - [Tela de Formulário e Chat](https://github.com/user-attachments/assets/e5cf53a8-4cc9-4b10-9f31-dcfab8ffceb6) ***(Preview)***

2. **CRM para Atendimento:**
   - **URL:** [http://localhost:5173/crm](http://localhost:5173/crm)
   - No CRM você encontrará:
     - **Home:** Lista de todos os chamados com opções de visualização.
       - [Tela Home](https://github.com/user-attachments/assets/66ac6210-cec4-4bee-acb6-cf30ac9e0bd8) ***(Preview)***
     - **Gráficos e Status dos Chamados:** Cards com gráficos mostrando o status de cada chamado.
     - **Navbar com IA para auxiliar o atendente durante os chamados
     - **Tela de Chamados:** Detalhes do chamado selecionado, incluindo informações do contrato do cliente, dados do cliente que entrou em contato e um chat lateral para comunicação contínua.
       - [Tela de Chamado](https://github.com/user-attachments/assets/f92b40a7-bf86-409c-bb90-acb5cb8dbc59) ***(Preview)***
     - **Sugestão de Solução pelo GPT:** Sugestões de solução geradas pelo GPT para auxiliar o atendente na resolução dos problemas.

## ⚙️ Como Rodar a Aplicação

### Requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) e [npm](https://www.npmjs.com/) instalados em sua máquina.

### Passos para Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/itsjessmenezes/softtek.git
   ```
2. Verifique se o terminal está apontando para a raiz do projeto, caso não esteja navegue para o diretorio 
  ```bash
   cd softtek-challenge
   ```
3. Instale as dependências:
```bash
   npm install
   ```

### Rodando a Aplicação
1. No primeiro terminal, inicie o servidor:
    ```bash
      node src/server/index.js
    ```
2. No segundo terminal, inicie o front-end:
   ```bash
      npm run dev
   ```

O front-end estará disponível em dois caminhos:
- [Tela de Formulário e Chat](http://localhost:5173/)
- [Tela de Chamado](http://localhost:5173/crm)


### 🔧 Configuração Adicional
Para acessar o chat integrado com o GPT, você precisa utilizar dados de uma das empresas listadas no arquivo que se encontra em `src/utils/bdClients.json`. Insira os dados de uma empresa existente para garantir que a validação funcione corretamente. Aqui estão alguns exemplos:
```json
{
  "client": {
    "company_name": "Farmacity",
    "document_type": "CPF",
    "document_number": "06014255532"
  },
  "client": {
    "company_name": "Copiadora Bell",
    "document_type": "CNPJ",
    "document_number": "52462015/0001-75"
  },
  "client": {
    "company_name": "Café Aroma",
    "document_type": "CNPJ",
    "document_number": "91430651/0001-77"
  }
}

```

Obrigado por utilizar o FIAP Engineers! 🚀
