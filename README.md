# Sistema Kanban Board com Monitoramento

Este projeto é um sistema completo de Kanban Board (estilo Trello) com autenticação de usuários e monitoramento usando Grafana e Prometheus, desenvolvido como avaliação prática da disciplina de Implantação de Sistemas.

## 📋 Descrição

O sistema consiste em:
- **Frontend**: Interface web Angular com Kanban Board interativo (drag and drop)
- **Backend**: API REST com Node.js/Express, arquitetura robusta (MVC)
- **Autenticação**: Sistema de login/registro com JWT e bcrypt
- **Banco de Dados**: PostgreSQL para persistência de dados (users, boards, lists, cards)
- **Monitoramento**: Prometheus para coleta de métricas e Grafana para visualização
- **Conteinerização**: Todos os serviços executados em containers Docker

## 🚀 Tecnologias Utilizadas

- **Frontend**: Angular 17, TypeScript, RxJS, Drag and Drop nativo
- **Backend**: Node.js, Express.js, pg (PostgreSQL client), prom-client, JWT, bcrypt
- **Banco de Dados**: PostgreSQL 15
- **Monitoramento**: Prometheus, Grafana, Alertmanager
- **Conteinerização**: Docker, Docker Compose, Nginx

## 📦 Pré-requisitos

- Docker instalado
- Docker Compose instalado

## 🔧 Instalação e Execução

1. **Clone o repositório**:
   ```bash
   git clone <url-do-repositorio>
   cd monitoramento
   ```

2. **Inicie todos os serviços com Docker Compose**:
   ```bash
   docker-compose up -d
   ```

3. **Aguarde a inicialização dos serviços** (aproximadamente 3-5 minutos para o primeiro build)

4. **Acesse os serviços**:
   - **Frontend (Kanban Board)**: http://localhost:8080
   - **Backend API**: http://localhost:3000
   - **Prometheus**: http://localhost:9090
   - **Grafana**: http://localhost:3001
     - Usuário: `admin`
     - Senha: `admin`
   - **Alertmanager**: http://localhost:9093

## 📊 Funcionalidades

### Sistema Kanban Board
- **Autenticação**: Registro e login de usuários com JWT
- **Boards**: Criação e gerenciamento de boards (quadros)
- **Lists**: Criação e gerenciamento de listas dentro de boards
- **Cards**: Criação e gerenciamento de cards com título e descrição
- **Drag and Drop**: Arrastar e soltar cards entre listas
- **Interface Moderna**: Design responsivo com gradientes e animações

### Monitoramento
O sistema coleta e exibe as seguintes métricas:
- **Total de Cards**: Número total de cards no sistema
- **Total de Boards**: Número total de boards
- **Cards por Status**: Cards distribuídos por status (todo, in_progress, done)
- **Usuários Ativos**: Número de usuários registrados
- **Taxa de Requisições HTTP**: Quantidade de requisições por segundo
- **Duração das Requisições**: Tempo de resposta das requisições HTTP

### Sistema de Alertas
O sistema possui alertas configurados para monitorar:
- **HighNumberOfCards**: Alerta quando há mais de 50 cards (severidade: warning)
- **HighNumberOfBoards**: Alerta quando há mais de 10 boards (severidade: warning)
- **HighErrorRate**: Alerta quando a taxa de erros HTTP 5xx é superior a 10% (severidade: critical)
- **SlowResponseTime**: Alerta quando o tempo de resposta 95º percentil é superior a 1 segundo (severidade: warning)
- **BackendDown**: Alerta quando o serviço backend não está respondendo (severidade: critical)
- **HighNumberOfDoneCards**: Alerta informativo quando há mais de 20 cards concluídos

Os alertas são gerenciados pelo Alertmanager e podem ser visualizados no Prometheus em "Status" → "Rules".

## 🏗️ Estrutura do Projeto

```
monitoramento/
├── backend/
│   ├── src/
│   │   ├── config/           # Configurações (database, prometheus)
│   │   ├── controllers/      # Controladores (auth, boards, lists, cards)
│   │   ├── models/           # Modelos de dados (user, board, list, card)
│   │   ├── routes/           # Rotas da API
│   │   ├── middleware/       # Middleware (auth, error handler)
│   │   ├── services/         # Serviços (metrics)
│   │   └── server.js         # Ponto de entrada do servidor
│   ├── package.json          # Dependências do backend
│   ├── Dockerfile            # Configuração do container do backend
│   └── .dockerignore         # Arquivos ignorados no build
├── frontend/
│   ├── src/
│   │   ├── app/              # Componentes Angular
│   │   │   ├── login/        # Componente de login/registro
│   │   │   └── kanban-board/ # Componente do Kanban Board
│   │   ├── services/         # Serviços Angular (auth, api)
│   │   ├── models/           # Interfaces TypeScript
│   │   ├── environments/     # Configurações de ambiente
│   │   └── main.ts           # Ponto de entrada Angular
│   ├── package.json          # Dependências do frontend
│   ├── angular.json          # Configuração do Angular CLI
│   ├── nginx.conf            # Configuração do Nginx
│   ├── Dockerfile            # Configuração do container do frontend
│   └── .dockerignore         # Arquivos ignorados no build
├── prometheus/
│   ├── prometheus.yml        # Configuração do Prometheus
│   └── alerts.yml            # Regras de alerta
├── grafana/
│   ├── provisioning/
│   │   ├── datasources/      # Configuração de datasources
│   │   └── dashboards/       # Configuração de dashboards
│   └── dashboards/           # Dashboards pré-configurados
├── alertmanager/
│   └── alertmanager.yml      # Configuração do Alertmanager
├── docker-compose.yml        # Orquestração dos containers
└── README.md                 # Este arquivo
```

## 🔌 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registro de novo usuário
- `POST /api/auth/login` - Login de usuário
- `GET /api/auth/profile` - Obter perfil do usuário (requer autenticação)

### Boards
- `GET /api/boards` - Lista todos os boards
- `GET /api/boards/user` - Lista boards do usuário autenticado
- `GET /api/boards/:id` - Busca um board específico
- `POST /api/boards` - Cria um novo board (requer autenticação)
- `PUT /api/boards/:id` - Atualiza um board (requer autenticação)
- `DELETE /api/boards/:id` - Exclui um board (requer autenticação)

### Lists
- `GET /api/lists/board/:boardId` - Lista lists de um board
- `GET /api/lists/:id` - Busca uma list específica
- `POST /api/lists` - Cria uma nova list (requer autenticação)
- `PUT /api/lists/:id` - Atualiza uma list (requer autenticação)
- `DELETE /api/lists/:id` - Exclui uma list (requer autenticação)

### Cards
- `GET /api/cards/list/:listId` - Lista cards de uma list
- `GET /api/cards/board/:boardId` - Lista cards de um board
- `GET /api/cards/:id` - Busca um card específico
- `POST /api/cards` - Cria um novo card (requer autenticação)
- `PUT /api/cards/:id` - Atualiza um card (requer autenticação)
- `DELETE /api/cards/:id` - Exclui um card (requer autenticação)

### Sistema
- `GET /metrics` - Métricas Prometheus
- `GET /health` - Health check

## 📈 Dashboard Grafana

O dashboard pré-configurado "Kanban Board Dashboard" exibe:
- Total de cards em tempo real
- Total de boards em tempo real
- Taxa de requisições HTTP ao longo do tempo
- Duração das requisições HTTP

Para acessar:
1. Faça login no Grafana (admin/admin)
2. O dashboard já estará disponível automaticamente

## 🛠️ Comandos Úteis

**Iniciar todos os serviços**:
```bash
docker-compose up -d
```

**Parar todos os serviços**:
```bash
docker-compose down
```

**Visualizar logs dos serviços**:
```bash
docker-compose logs -f
```

**Visualizar logs de um serviço específico**:
```bash
docker-compose logs -f backend
```

**Reiniciar um serviço**:
```bash
docker-compose restart backend
```

**Reconstruir e iniciar serviços**:
```bash
docker-compose up -d --build
```

## 🧪 Testando a Aplicação

1. Acesse o frontend em http://localhost:8080
2. Clique em "Register" e crie uma conta com username, email e senha
3. Faça login com suas credenciais
4. Crie um novo board clicando no botão "+ Add List"
5. Adicione cards às lists arrastando ou clicando em "+ Add Card"
6. Use o drag and drop para mover cards entre lists
7. Acesse o Grafana em http://localhost:3001 para ver as métricas atualizadas em tempo real

## 📝 Notas Importantes

- O banco de dados PostgreSQL é inicializado automaticamente na primeira execução
- As métricas são coletadas a cada 15 segundos pelo Prometheus
- O Grafana é provisionado automaticamente com o datasource Prometheus e dashboard pré-configurado
- Todos os dados são persistidos em volumes Docker
- O frontend é servido pelo Nginx em produção
- O sistema de autenticação usa tokens JWT com validade de 7 dias

## 🔒 Segurança

- Senhas são hasheadas com bcrypt antes de serem armazenadas
- Tokens JWT são usados para autenticação de rotas protegidas
- Helmet é usado para headers de segurança HTTP
- CORS está configurado para permitir requisições do frontend

## 👨‍💻 Autor

Desenvolvido para avaliação prática da disciplina de Implantação de Sistemas - Centro Universitário SENAI Santa Catarina

## 📅 Data de Entrega

24/06/2026
