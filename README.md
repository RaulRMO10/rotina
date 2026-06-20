# 🏋️‍♂️🍽️ Minha Rotina

Dashboard pessoal para gestão completa da rotina diária — alimentação, macronutrientes, treinos, compras e organização — com sincronização na nuvem e dados nutricionais reais via API.

![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white)
![FatSecret](https://img.shields.io/badge/API-FatSecret-4053D6)

> 🖼️ _Screenshot do dashboard aqui._

---

## 🎯 Sobre

Projeto pessoal para centralizar e automatizar o acompanhamento da minha rotina de recomposição corporal. A interface reúne, num só lugar, as refeições do dia com metas de macros, o preparo dos alimentos, os treinos (musculação, natação e corrida) e a lista de compras — com os dados nutricionais buscados automaticamente da **FatSecret Platform API** e o estado sincronizado no **Supabase**.

## 🚀 Funcionalidades

- **🍽️ Refeições & Macros** — metas diárias (kcal, proteína, carbo, gordura) divididas por refeição
- **👨‍🍳 Preparo de alimentos** — instruções das refeições da semana
- **🏋️ Treinos** — planos de musculação + planilhas de evolução de natação e corrida
- **🛒 Compras** — lista de mercado baseada na dieta atual
- **📅 Agenda** — cronograma e organização do dia
- **☁️ Sincronização** — autenticação e persistência via Supabase
- **🔌 Integração FatSecret** — busca de dados nutricionais reais (OAuth 1.0 HMAC-SHA1)

## 🛠️ Tecnologias

| Camada | Tecnologia |
|---|---|
| Frontend | HTML5, CSS, JavaScript **Vanilla** (sem frameworks — foco em performance) |
| Sync / Auth | Supabase (`@supabase/supabase-js`) |
| Integração | Node.js + FatSecret Platform API |

## 📂 Estrutura

- `index.html` — estrutura e layout do dashboard
- `styles.css` — estilos globais e componentes
- `app.js` — renderização das abas e interação
- `data.js` — base de dados local (treinos, dietas, macros)
- `db.js` — cliente Supabase (auth + sync)
- `fatsecret_api.js` — integração com a API FatSecret (OAuth 1.0)
- `buscar_alimento.js` · `atualizar_macros.js` · `gerar_dados_reais.js` — scripts de dados nutricionais
- `supabase/` — migrações do banco

## 💡 Como executar

O dashboard é estático (Vanilla JS) — basta abrir o `index.html` num navegador moderno.

Para os scripts de dados nutricionais (Node.js):

```bash
# 1) crie um .env baseado no .env.example
cp .env.example .env

# 2) preencha suas credenciais da FatSecret
#    FATSECRET_CONSUMER_KEY=...
#    FATSECRET_CONSUMER_SECRET=...

# 3) rode um script
node buscar_alimento.js
```

> 🔐 Credenciais ficam **apenas no `.env`** (que está no `.gitignore`) — nunca no código versionado.

---

## 👤 Autor

**Raul Martins** · [GitHub @RaulRMO10](https://github.com/RaulRMO10) · [LinkedIn](https://www.linkedin.com/in/raulrmo/)

> Projeto pessoal em evolução. Consulte um profissional antes de usar dados de treino ou nutrição para si.
