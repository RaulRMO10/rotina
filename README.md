# Minha Rotina — Raul 🏋️‍♂️🍽️

Um dashboard pessoal para gerenciamento completo da minha rotina diária, focando em alimentação, treinos, compras e organização do dia a dia.

## 🎯 Objetivo

O objetivo deste projeto é centralizar e automatizar o acompanhamento da minha rotina de recomposição corporal (195cm, 105kg). O sistema fornece uma interface simples e direta para visualizar refeições diárias, bater metas de macronutrientes, gerenciar preparo de alimentos, acompanhar treinos de musculação e aeróbicos (natação e corrida) e manter uma lista de compras atualizada.

## 🚀 Funcionalidades

- **🍽️ Refeições e Macros:** Acompanhamento de metas diárias (Kcal, Proteína, Carboidrato e Gordura) e divisão por refeições.
- **👨‍🍳 Preparo de Alimentos:** Instruções detalhadas para preparo das refeições da semana.
- **🏋️ Treinos:** Planejamento completo de treinos de musculação (adaptado para os equipamentos disponíveis na academia), além de planilhas de evolução para natação e corrida.
- **🛒 Compras:** Lista de mercado baseada na dieta atual.
- **📅 Agenda:** Cronograma e organização da rotina.
- **🔌 Integração FatSecret (Scripts):** Scripts auxiliares em Node.js para buscar informações nutricionais de alimentos diretamente da API do FatSecret e atualizar os dados automaticamente.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, Vanilla CSS, e JavaScript (Sem frameworks, focado em performance e simplicidade).
- **Dados:** Estrutura de dados centralizada e mantida localmente via JavaScript (`data.js`).
- **Integrações/Backend:** Scripts Node.js para comunicação com a FatSecret Platform API.

## 📂 Estrutura do Projeto

- `index.html`: Estrutura principal do dashboard e layout da página.
- `styles.css`: Estilos globais e componentes visuais modernos.
- `app.js`: Lógica de renderização das abas e interação com a interface.
- `data.js`: Banco de dados local (JSON/Objetos JS) contendo todos os treinos, dietas e macros.
- `update.js` / `test_fatsecret.js`: Scripts de teste e integração com a API FatSecret para atualização automatizada de dados nutricionais.
- `alimentos q eu como` / `fatsecret_api_info.txt`: Documentação e rascunhos de planejamento de dieta e chaves/info da API.

## 💡 Como executar localmente

1. Clone o repositório ou baixe os arquivos.
2. Como se trata de um projeto estático em Vanilla JS, basta abrir o arquivo `index.html` em qualquer navegador moderno.
3. *Para usar os scripts de atualização nutricional:* É necessário possuir o [Node.js](https://nodejs.org/) instalado, preencher as credenciais da API do FatSecret no script correspondente e executá-los via terminal (ex: `node test_fatsecret.js`).

---
*Projeto pessoal em constante evolução. Consulte um profissional antes de utilizar os dados de treino ou nutrição para si.*