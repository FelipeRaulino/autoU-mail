📩 Backend de Classificação de Emails

Bem-vindo(a)! Este backend foi desenvolvido para classificar emails como Produtivos ou Improdutivos, sugerir respostas automáticas e armazenar os registros em um banco de dados no Supabase.

🚀 Funcionalidades

Este backend possui duas rotas principais:

POST /v1/classify
Recebe emails (texto e/ou arquivos anexos), classifica-os como Produtivo ou Improdutivo, sugere uma resposta automática e salva o registro no banco.

GET /v1/history
Retorna todos os emails já armazenados no banco de dados.

📊 Critérios de Classificação

Produtivo
Emails que requerem uma ação ou resposta específica.
Exemplos: solicitações de suporte técnico, dúvidas sobre o sistema, atualização de casos em aberto.

Improdutivo
Emails que não demandam ação imediata.
Exemplos: mensagens de agradecimento, felicitações.

⚙️ Pré-requisitos

Antes de rodar o projeto, certifique-se de ter:

Uma conta no Supabase
e um projeto configurado.

Uma conta no Hugging Face
para acessar modelos de IA.

🔑 Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto e preencha com suas credenciais:

HF_TOKEN=seu_token_huggingface
SUPABASE_URL=sua_url_supabase
SUPABASE_KEY=sua_chave_supabase

🛠️ Instalação e Execução

Clone o repositório e instale as dependências:

pip install -r requirements.txt

Execute o servidor com Uvicorn:

uvicorn main:app --host 0.0.0.0 --port 8000

O backend estará disponível em:
👉 http://localhost:8000
