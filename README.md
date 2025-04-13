# MBA Marketplace Mobile

Uma aplicação mobile para plataforma de marketplace, construída com React Native e TypeScript. Esta aplicação permite que usuários se cadastrem, façam login, naveguem por produtos e gerenciem seus perfis.

## Funcionalidades

- **Sistema de Autenticação**

  - Cadastro de usuário com upload de foto de perfil
  - Login com gerenciamento seguro de tokens
  - Mecanismo de refresh token para sessões persistentes

- **Gerenciamento de Produtos**

  - Navegação e busca de produtos
  - Visualização de detalhes do produto
  - Filtragem de produtos por categoria

- **Perfil de Usuário**
  - Visualização e edição de informações de perfil
  - Upload e gerenciamento de fotos de perfil

## Stack Tecnológica

- **Framework:** React Native com Expo
- **Linguagem:** TypeScript
- **Estilização:** NativeWind (Tailwind CSS para React Native)
- **Gerenciamento de Estado:** React Hooks
- **Manipulação de Formulários:** React Hook Form com validação Zod
- **Navegação:** Expo Router
- **Componentes UI:**
  - Gluestack UI
  - Componentes personalizados
- **Integração com API:** Axios
- **Armazenamento:** AsyncStorage para persistência de dados local

## Estrutura do Projeto

```
├── app/                  # Telas da aplicação usando roteamento baseado em arquivos
│   ├── (tabs)/           # Telas de navegação baseada em abas
│   │   └── product/      # Telas relacionadas a produtos
│   ├── index.tsx         # Tela de login
│   └── sign-up.tsx       # Tela de cadastro
├── assets/               # Imagens, fontes e outros recursos estáticos
├── components/           # Componentes UI reutilizáveis
├── dtos/                 # Objetos de Transferência de Dados
├── hooks/                # Hooks personalizados do React
├── services/             # Serviços de API
├── storage/              # Gerenciamento de armazenamento local
└── utils/                # Funções utilitárias
```

## Como Começar

### Pré-requisitos

- Node.js (v16 ou posterior)
- npm ou yarn
- Expo CLI

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/felipe-jm/mba-marketplace-mobile.git
   cd mba-marketplace-mobile
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npx expo
   ```

4. Execute em uma plataforma específica:
   ```bash
   # iOS
   npm run ios
   # Android
   npm run android
   ```

## Desenvolvimento

Este projeto segue uma arquitetura baseada em componentes com roteamento baseado em arquivos usando Expo Router. A UI é construída com uma combinação de componentes NativeWind (Tailwind CSS) e Gluestack UI.

### Componentes Principais

- **Fluxo de Autenticação:** Gerenciado através de hooks personalizados e armazenamento de tokens
- **Validação de Formulários:** Usando React Hook Form com esquemas Zod
- **Integração com API:** Serviço de API centralizado com interceptadores para gerenciamento de tokens
- **Componentes UI:** Componentes reutilizáveis com estilização consistente

## Integração com Backend

Repositorio do backend: https://github.com/felipe-jm/mba-marketplace-api

A aplicação se conecta a uma API RESTful backend rodando em `http://localhost:3333`. A API gerencia:

- Autenticação de usuário e gerenciamento de sessão
- Dados de produtos e filtragem
- Gerenciamento de perfil de usuário

## Licença

Este projeto está licenciado sob a Licença MIT.
