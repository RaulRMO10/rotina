// ===== TABELA NUTRICIONAL — DADOS REAIS (FatSecret API) =====
// Gerado por: node gerar_dados_reais.js
// NÃO edite manualmente — rode o script novamente para atualizar.

const MEALS = [
  {
    "id": 1,
    "name": "Café da Manhã",
    "time": "07:15",
    "icon": "☀️",
    "options": [
      {
        "id": "cafe-1",
        "name": "Pão com Ovos e Pera",
        "desc": "Uma base clássica e sustentável para todo dia",
        "ingredients": [
          {
            "food": "Ovos",
            "qty": 4,
            "unit": "un",
            "kcal": 296,
            "prot": 25.2,
            "carb": 1.5,
            "fat": 19.9,
            "shopKey": "ovos"
          },
          {
            "food": "Pão de Forma",
            "qty": 3,
            "unit": "fatias",
            "kcal": 240,
            "prot": 6.9,
            "carb": 45.5,
            "fat": 3,
            "shopKey": "pao_forma"
          },
          {
            "food": "Pera",
            "qty": 1,
            "unit": "un",
            "kcal": 96,
            "prot": 0.6,
            "carb": 25.7,
            "fat": 0.2,
            "shopKey": "pera"
          }
        ]
      },
      {
        "id": "cafe-2",
        "name": "Overnight Oats de Amora e Morango",
        "desc": "Fresco, rico em fibras, pronto ao acordar",
        "ingredients": [
          {
            "food": "Aveia em flocos",
            "qty": 54,
            "unit": "g",
            "kcal": 203,
            "prot": 6.8,
            "carb": 36.5,
            "fat": 4.1,
            "shopKey": "aveia"
          },
          {
            "food": "Semente de Chia",
            "qty": 14,
            "unit": "g",
            "kcal": 69,
            "prot": 2.2,
            "carb": 6.1,
            "fat": 4.3,
            "shopKey": "chia"
          },
          {
            "food": "Iogurte Zero Açúcar (Morango/Ameixa)",
            "qty": 135,
            "unit": "g",
            "kcal": 64,
            "prot": 6.4,
            "carb": 8.7,
            "fat": 0,
            "shopKey": "iogurte"
          },
          {
            "food": "Morangos e Amoras",
            "qty": 68,
            "unit": "g",
            "kcal": 22,
            "prot": 0.5,
            "carb": 5.2,
            "fat": 0.2,
            "shopKey": "frutas_vermelhas"
          }
        ]
      },
      {
        "id": "cafe-3",
        "name": "Vitamina de Abacate e Banana",
        "desc": "Rica em gordura boa e fácil de consumir",
        "ingredients": [
          {
            "food": "Leite",
            "qty": 270,
            "unit": "ml",
            "kcal": 162,
            "prot": 8.7,
            "carb": 12.2,
            "fat": 8.8,
            "shopKey": "leite"
          },
          {
            "food": "Abacate",
            "qty": 68,
            "unit": "g",
            "kcal": 109,
            "prot": 1.4,
            "carb": 5.8,
            "fat": 10,
            "shopKey": "abacate"
          },
          {
            "food": "Banana",
            "qty": 1,
            "unit": "un",
            "kcal": 105,
            "prot": 1.3,
            "carb": 26.9,
            "fat": 0.4,
            "shopKey": "banana"
          },
          {
            "food": "Aveia em flocos",
            "qty": 27,
            "unit": "g",
            "kcal": 101,
            "prot": 3.4,
            "carb": 18.2,
            "fat": 2,
            "shopKey": "aveia"
          }
        ]
      },
      {
        "id": "cafe-4",
        "name": "Crepioca com Queijo Minas + Abacaxi",
        "desc": "Massa leve de tapioca e ovo, com frescor do abacaxi",
        "ingredients": [
          {
            "food": "Goma de tapioca",
            "qty": 54,
            "unit": "g",
            "kcal": 193,
            "prot": 0.1,
            "carb": 47.9,
            "fat": 0,
            "shopKey": "tapioca"
          },
          {
            "food": "Ovos",
            "qty": 3,
            "unit": "un",
            "kcal": 222,
            "prot": 18.9,
            "carb": 1.1,
            "fat": 14.9,
            "shopKey": "ovos"
          },
          {
            "food": "Queijo Minas/Frescal",
            "qty": 54,
            "unit": "g",
            "kcal": 212,
            "prot": 19.3,
            "carb": 1.7,
            "fat": 13.9,
            "shopKey": "queijo_minas"
          },
          {
            "food": "Abacaxi (fatias)",
            "qty": 108,
            "unit": "g",
            "kcal": 52,
            "prot": 0.6,
            "carb": 13.6,
            "fat": 0.1,
            "shopKey": "abacaxi"
          }
        ]
      },
      {
        "id": "cafe-5",
        "name": "Mingau de Aveia Quente com Laranja",
        "desc": "Reconfortante e energético",
        "ingredients": [
          {
            "food": "Aveia em flocos",
            "qty": 54,
            "unit": "g",
            "kcal": 203,
            "prot": 6.8,
            "carb": 36.5,
            "fat": 4.1,
            "shopKey": "aveia"
          },
          {
            "food": "Leite",
            "qty": 270,
            "unit": "ml",
            "kcal": 162,
            "prot": 8.7,
            "carb": 12.2,
            "fat": 8.8,
            "shopKey": "leite"
          },
          {
            "food": "Ovos Cozidos",
            "qty": 3,
            "unit": "un",
            "kcal": 222,
            "prot": 18.9,
            "carb": 1.1,
            "fat": 14.9,
            "shopKey": "ovos"
          },
          {
            "food": "Laranja",
            "qty": 1,
            "unit": "un",
            "kcal": 62,
            "prot": 1.2,
            "carb": 15.4,
            "fat": 0.2,
            "shopKey": "laranja"
          }
        ]
      },
      {
        "id": "cafe-6",
        "name": "Tapioca de Frango com Rúcula",
        "desc": "Usando as sobras da marmita de forma inteligente",
        "ingredients": [
          {
            "food": "Goma de tapioca",
            "qty": 54,
            "unit": "g",
            "kcal": 193,
            "prot": 0.1,
            "carb": 47.9,
            "fat": 0,
            "shopKey": "tapioca"
          },
          {
            "food": "Frango desfiado",
            "qty": 81,
            "unit": "g",
            "kcal": 89,
            "prot": 18.7,
            "carb": 0,
            "fat": 1,
            "shopKey": "frango"
          },
          {
            "food": "Rúcula",
            "qty": 27,
            "unit": "g",
            "kcal": 4,
            "prot": 0.4,
            "carb": 0.8,
            "fat": 0,
            "shopKey": "salada"
          },
          {
            "food": "Melancia",
            "qty": 135,
            "unit": "g",
            "kcal": 41,
            "prot": 0.8,
            "carb": 10.2,
            "fat": 0.2,
            "shopKey": "melancia"
          }
        ]
      },
      {
        "id": "cafe-7",
        "name": "Pão com Mexidos e Batata Doce",
        "desc": "Refeição puramente baseada em carbos de qualidade",
        "ingredients": [
          {
            "food": "Batata doce amassada",
            "qty": 135,
            "unit": "g",
            "kcal": 103,
            "prot": 1.8,
            "carb": 23.9,
            "fat": 0.2,
            "shopKey": "batata_doce"
          },
          {
            "food": "Ovos mexidos",
            "qty": 3,
            "unit": "un",
            "kcal": 222,
            "prot": 18.9,
            "carb": 1.1,
            "fat": 14.9,
            "shopKey": "ovos"
          },
          {
            "food": "Pão de Forma",
            "qty": 1,
            "unit": "fatia",
            "kcal": 80,
            "prot": 2.3,
            "carb": 15.2,
            "fat": 1,
            "shopKey": "pao_forma"
          }
        ]
      },
      {
        "id": "cafe-8",
        "name": "Iogurte Turbinado com Frutas",
        "desc": "Tudo na mesma cumbuca de manhã, bem digestivo",
        "ingredients": [
          {
            "food": "Iogurte Zero Açúcar (Morango/Ameixa)",
            "qty": 230,
            "unit": "g",
            "kcal": 108,
            "prot": 10.8,
            "carb": 14.9,
            "fat": 0,
            "shopKey": "iogurte"
          },
          {
            "food": "Morango e Amora",
            "qty": 68,
            "unit": "g",
            "kcal": 22,
            "prot": 0.5,
            "carb": 5.2,
            "fat": 0.2,
            "shopKey": "frutas_vermelhas"
          },
          {
            "food": "Banana picada",
            "qty": 1,
            "unit": "un",
            "kcal": 105,
            "prot": 1.3,
            "carb": 26.9,
            "fat": 0.4,
            "shopKey": "banana"
          },
          {
            "food": "Semente de Chia",
            "qty": 20,
            "unit": "g",
            "kcal": 98,
            "prot": 3.1,
            "carb": 8.8,
            "fat": 6.2,
            "shopKey": "chia"
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "name": "Café do Serviço",
    "time": "09:40",
    "icon": "☕",
    "options": [
      {
        "id": "lanche1-1",
        "name": "Iogurte com Pera",
        "desc": "Simples, cremoso e rico",
        "ingredients": [
          {
            "food": "Iogurte Zero Açúcar (Morango/Ameixa)",
            "qty": 230,
            "unit": "g",
            "kcal": 108,
            "prot": 10.8,
            "carb": 14.9,
            "fat": 0,
            "shopKey": "iogurte"
          },
          {
            "food": "Pera",
            "qty": 1,
            "unit": "un",
            "kcal": 96,
            "prot": 0.6,
            "carb": 25.7,
            "fat": 0.2,
            "shopKey": "pera"
          }
        ]
      },
      {
        "id": "lanche1-2",
        "name": "Ovos Cozidos + Laranja",
        "desc": "O lanche magro",
        "ingredients": [
          {
            "food": "Ovos cozidos",
            "qty": 3,
            "unit": "un",
            "kcal": 222,
            "prot": 18.9,
            "carb": 1.1,
            "fat": 14.9,
            "shopKey": "ovos"
          },
          {
            "food": "Laranja",
            "qty": 1,
            "unit": "un",
            "kcal": 62,
            "prot": 1.2,
            "carb": 15.4,
            "fat": 0.2,
            "shopKey": "laranja"
          }
        ]
      },
      {
        "id": "lanche1-3",
        "name": "Castanhas + Melancia",
        "desc": "Básico e muito hitratante",
        "ingredients": [
          {
            "food": "Melancia",
            "qty": 270,
            "unit": "g",
            "kcal": 81,
            "prot": 1.6,
            "carb": 20.4,
            "fat": 0.4,
            "shopKey": "melancia"
          },
          {
            "food": "Mix de Castanhas / Amendoim",
            "qty": 34,
            "unit": "g",
            "kcal": 206,
            "prot": 6.1,
            "carb": 7.3,
            "fat": 18.2,
            "shopKey": "castanhas"
          }
        ]
      },
      {
        "id": "lanche1-4",
        "name": "Sanduíche de Frango",
        "desc": "Perfeito para dias em que sente mais fome",
        "ingredients": [
          {
            "food": "Pão de forma",
            "qty": 3,
            "unit": "fatias",
            "kcal": 240,
            "prot": 6.9,
            "carb": 45.5,
            "fat": 3,
            "shopKey": "pao_forma"
          },
          {
            "food": "Frango desfiado",
            "qty": 68,
            "unit": "g",
            "kcal": 75,
            "prot": 15.7,
            "carb": 0,
            "fat": 0.8,
            "shopKey": "frango"
          }
        ]
      },
      {
        "id": "lanche1-5",
        "name": "Amendoim + Amoras e Morango",
        "desc": "Contraste do doce da fruta com amendoim",
        "ingredients": [
          {
            "food": "Morangos e Amoras",
            "qty": 135,
            "unit": "g",
            "kcal": 43,
            "prot": 0.9,
            "carb": 10.4,
            "fat": 0.4,
            "shopKey": "frutas_vermelhas"
          },
          {
            "food": "Amendoim Torrado",
            "qty": 41,
            "unit": "g",
            "kcal": 236,
            "prot": 9.9,
            "carb": 7.5,
            "fat": 18.6,
            "shopKey": "pasta_amendoim"
          }
        ]
      },
      {
        "id": "lanche1-6",
        "name": "YoPRO Protein Rápido",
        "desc": "Pra beber correndo no serviço",
        "ingredients": [
          {
            "food": "YoPRO / Bebida Láctea",
            "qty": 1,
            "unit": "un",
            "kcal": 220,
            "prot": 22.8,
            "carb": 13.6,
            "fat": 8.5,
            "shopKey": "yopro"
          },
          {
            "food": "Abacaxi (sobremesa)",
            "qty": 108,
            "unit": "g",
            "kcal": 52,
            "prot": 0.6,
            "carb": 13.6,
            "fat": 0.1,
            "shopKey": "abacaxi"
          }
        ]
      },
      {
        "id": "lanche1-7",
        "name": "Granola com Banana",
        "desc": "Lanche rico e pastoso",
        "ingredients": [
          {
            "food": "Granola",
            "qty": 41,
            "unit": "g",
            "kcal": 167,
            "prot": 3.8,
            "carb": 29.7,
            "fat": 4.5,
            "shopKey": "granola"
          },
          {
            "food": "Iogurte Zero Açúcar (Morango/Ameixa)",
            "qty": 135,
            "unit": "g",
            "kcal": 64,
            "prot": 6.4,
            "carb": 8.7,
            "fat": 0,
            "shopKey": "iogurte"
          },
          {
            "food": "Banana",
            "qty": 1,
            "unit": "un",
            "kcal": 105,
            "prot": 1.3,
            "carb": 26.9,
            "fat": 0.4,
            "shopKey": "banana"
          }
        ]
      },
      {
        "id": "lanche1-8",
        "name": "Pão com Queijo",
        "desc": "Simples e gostoso",
        "ingredients": [
          {
            "food": "Pão de forma",
            "qty": 3,
            "unit": "fatias",
            "kcal": 240,
            "prot": 6.9,
            "carb": 45.5,
            "fat": 3,
            "shopKey": "pao_forma"
          },
          {
            "food": "Queijo Minas/Frescal",
            "qty": 41,
            "unit": "g",
            "kcal": 161,
            "prot": 14.7,
            "carb": 1.3,
            "fat": 10.6,
            "shopKey": "queijo_minas"
          }
        ]
      }
    ]
  },
  {
    "id": 3,
    "name": "Almoço",
    "time": "12:00",
    "icon": "🍽️",
    "options": [
      {
        "id": "almoco-1",
        "name": "Frango com Salada Pura",
        "desc": "Prato muito limpo, rico em folhas e vegetais",
        "ingredients": [
          {
            "food": "Arroz Branco",
            "qty": 203,
            "unit": "g",
            "kcal": 264,
            "prot": 4.8,
            "carb": 58,
            "fat": 0.4,
            "shopKey": "arroz_branco"
          },
          {
            "food": "Feijão",
            "qty": 135,
            "unit": "g",
            "kcal": 230,
            "prot": 9.6,
            "carb": 25.3,
            "fat": 10.5,
            "shopKey": "feijao"
          },
          {
            "food": "Frango grelhado",
            "qty": 203,
            "unit": "g",
            "kcal": 223,
            "prot": 46.9,
            "carb": 0,
            "fat": 2.5,
            "shopKey": "frango"
          },
          {
            "food": "Alface, Rúcula, Tomate, Pepino",
            "qty": 162,
            "unit": "g",
            "kcal": 24,
            "prot": 2.2,
            "carb": 4.5,
            "fat": 0.2,
            "shopKey": "salada"
          }
        ]
      },
      {
        "id": "almoco-2",
        "name": "Acém Refogado com Abóbora e Quiabo",
        "desc": "Combinação clássica que solta um caldinho incrível",
        "ingredients": [
          {
            "food": "Arroz Branco",
            "qty": 203,
            "unit": "g",
            "kcal": 264,
            "prot": 4.8,
            "carb": 58,
            "fat": 0.4,
            "shopKey": "arroz_branco"
          },
          {
            "food": "Feijão",
            "qty": 135,
            "unit": "g",
            "kcal": 230,
            "prot": 9.6,
            "carb": 25.3,
            "fat": 10.5,
            "shopKey": "feijao"
          },
          {
            "food": "Carne Moída (Acém)",
            "qty": 203,
            "unit": "g",
            "kcal": 467,
            "prot": 57.8,
            "carb": 0,
            "fat": 24.4,
            "shopKey": "acem_moido"
          },
          {
            "food": "Abóbora e Quiabo",
            "qty": 162,
            "unit": "g",
            "kcal": 32,
            "prot": 1.2,
            "carb": 7.9,
            "fat": 0.1,
            "shopKey": "legumes_amarelos"
          }
        ]
      },
      {
        "id": "almoco-3",
        "name": "Sobrecoxa na Batata-inglesa",
        "desc": "Frango assado com legumes suculentos",
        "ingredients": [
          {
            "food": "Batata-inglesa",
            "qty": 270,
            "unit": "g",
            "kcal": 235,
            "prot": 5,
            "carb": 54.4,
            "fat": 0.3,
            "shopKey": "batata_inglesa"
          },
          {
            "food": "Feijão",
            "qty": 135,
            "unit": "g",
            "kcal": 230,
            "prot": 9.6,
            "carb": 25.3,
            "fat": 10.5,
            "shopKey": "feijao"
          },
          {
            "food": "Sobrecoxa assada",
            "qty": 203,
            "unit": "g",
            "kcal": 424,
            "prot": 52.7,
            "carb": 0,
            "fat": 22.1,
            "shopKey": "sobrecoxa"
          },
          {
            "food": "Chuchu e Milho Verde",
            "qty": 108,
            "unit": "g",
            "kcal": 26,
            "prot": 0.7,
            "carb": 5.5,
            "fat": 0.5,
            "shopKey": "legumes_verdes"
          }
        ]
      },
      {
        "id": "almoco-4",
        "name": "Lombo Suíno com Mandioca e Couve",
        "desc": "Comida regional deliciosa, sem fugir da dieta",
        "ingredients": [
          {
            "food": "Mandioca cozida",
            "qty": 203,
            "unit": "g",
            "kcal": 351,
            "prot": 2.7,
            "carb": 76,
            "fat": 4.1,
            "shopKey": "mandioca"
          },
          {
            "food": "Lombo suíno iscas",
            "qty": 203,
            "unit": "g",
            "kcal": 503,
            "prot": 55,
            "carb": 0,
            "fat": 29.7,
            "shopKey": "lombo_suino"
          },
          {
            "food": "Couve refogada",
            "qty": 108,
            "unit": "g",
            "kcal": 55,
            "prot": 2,
            "carb": 5.9,
            "fat": 3.4,
            "shopKey": "couve"
          },
          {
            "food": "Feijão",
            "qty": 135,
            "unit": "g",
            "kcal": 230,
            "prot": 9.6,
            "carb": 25.3,
            "fat": 10.5,
            "shopKey": "feijao"
          }
        ]
      },
      {
        "id": "almoco-5",
        "name": "Tilápia com Pimentão e Tomate",
        "desc": "Peixe magro, com o gosto fresco dos vegetais",
        "ingredients": [
          {
            "food": "Arroz Branco",
            "qty": 203,
            "unit": "g",
            "kcal": 264,
            "prot": 4.8,
            "carb": 58,
            "fat": 0.4,
            "shopKey": "arroz_branco"
          },
          {
            "food": "Tilápia grelhada",
            "qty": 243,
            "unit": "g",
            "kcal": 233,
            "prot": 48.8,
            "carb": 0,
            "fat": 4.1,
            "shopKey": "tilapia"
          },
          {
            "food": "Pimentão verde e Tomate",
            "qty": 135,
            "unit": "g",
            "kcal": 24,
            "prot": 1.2,
            "carb": 5.3,
            "fat": 0.3,
            "shopKey": "vegetais_base"
          },
          {
            "food": "Feijão",
            "qty": 135,
            "unit": "g",
            "kcal": 230,
            "prot": 9.6,
            "carb": 25.3,
            "fat": 10.5,
            "shopKey": "feijao"
          }
        ]
      },
      {
        "id": "almoco-6",
        "name": "Escondidinho de Batata Doce com Frango",
        "desc": "Monta em camadas e sucesso",
        "ingredients": [
          {
            "food": "Batata-doce amassada",
            "qty": 203,
            "unit": "g",
            "kcal": 154,
            "prot": 2.8,
            "carb": 36,
            "fat": 0.3,
            "shopKey": "batata_doce"
          },
          {
            "food": "Frango desfiado",
            "qty": 203,
            "unit": "g",
            "kcal": 223,
            "prot": 46.9,
            "carb": 0,
            "fat": 2.5,
            "shopKey": "frango"
          },
          {
            "food": "Cenoura e Beterraba",
            "qty": 108,
            "unit": "g",
            "kcal": 44,
            "prot": 1,
            "carb": 10.3,
            "fat": 0.3,
            "shopKey": "cenoura"
          }
        ]
      },
      {
        "id": "almoco-7",
        "name": "Macarrão Tradicional Bolonhesa",
        "desc": "Refeição puramente baseada em reposição",
        "ingredients": [
          {
            "food": "Macarrão tradicional (peso cru)",
            "qty": 92,
            "unit": "g",
            "kcal": 121,
            "prot": 4.7,
            "carb": 22.9,
            "fat": 1,
            "shopKey": "macarrao"
          },
          {
            "food": "Carne Moída (Acém)",
            "qty": 203,
            "unit": "g",
            "kcal": 467,
            "prot": 57.8,
            "carb": 0,
            "fat": 24.4,
            "shopKey": "acem_moido"
          },
          {
            "food": "Tomate purê caseiro",
            "qty": 108,
            "unit": "g",
            "kcal": 19,
            "prot": 1,
            "carb": 4.2,
            "fat": 0.2,
            "shopKey": "vegetais_base"
          }
        ]
      },
      {
        "id": "almoco-8",
        "name": "Omeletão Gigante com Arroz e Feijão",
        "desc": "Dia de pressa",
        "ingredients": [
          {
            "food": "Ovos",
            "qty": 5,
            "unit": "un",
            "kcal": 370,
            "prot": 31.4,
            "carb": 1.9,
            "fat": 24.8,
            "shopKey": "ovos"
          },
          {
            "food": "Arroz Branco",
            "qty": 203,
            "unit": "g",
            "kcal": 264,
            "prot": 4.8,
            "carb": 58,
            "fat": 0.4,
            "shopKey": "arroz_branco"
          },
          {
            "food": "Feijão",
            "qty": 135,
            "unit": "g",
            "kcal": 230,
            "prot": 9.6,
            "carb": 25.3,
            "fat": 10.5,
            "shopKey": "feijao"
          },
          {
            "food": "Couve e Tomate batidos",
            "qty": 108,
            "unit": "g",
            "kcal": 55,
            "prot": 2,
            "carb": 5.9,
            "fat": 3.4,
            "shopKey": "couve"
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "name": "Lanche / Pré-Treino",
    "time": "16:00",
    "icon": "⚡",
    "options": [
      {
        "id": "pre-1",
        "name": "Refeição de Força (Batata-doce e Frango)",
        "desc": "A melhor base sólida anti-fadiga muscular",
        "ingredients": [
          {
            "food": "Batata-doce cozida",
            "qty": 203,
            "unit": "g",
            "kcal": 154,
            "prot": 2.8,
            "carb": 36,
            "fat": 0.3,
            "shopKey": "batata_doce"
          },
          {
            "food": "Frango desfiado",
            "qty": 135,
            "unit": "g",
            "kcal": 149,
            "prot": 31.2,
            "carb": 0,
            "fat": 1.7,
            "shopKey": "frango"
          },
          {
            "food": "Beterraba ralada",
            "qty": 68,
            "unit": "g",
            "kcal": 28,
            "prot": 0.6,
            "carb": 6.5,
            "fat": 0.2,
            "shopKey": "cenoura"
          }
        ]
      },
      {
        "id": "pre-2",
        "name": "Pão com Ovos",
        "desc": "Barato, eficiente",
        "ingredients": [
          {
            "food": "Pão de forma",
            "qty": 3,
            "unit": "fatias",
            "kcal": 240,
            "prot": 6.9,
            "carb": 45.5,
            "fat": 3,
            "shopKey": "pao_forma"
          },
          {
            "food": "Ovos mexidos",
            "qty": 3,
            "unit": "un",
            "kcal": 222,
            "prot": 18.9,
            "carb": 1.1,
            "fat": 14.9,
            "shopKey": "ovos"
          }
        ]
      },
      {
        "id": "pre-3",
        "name": "Shake Concentrado (Abacate e Aveia)",
        "desc": "Engolir o amendoim, o leite e a fruta rapidamente",
        "ingredients": [
          {
            "food": "Leite",
            "qty": 338,
            "unit": "ml",
            "kcal": 203,
            "prot": 10.9,
            "carb": 15.3,
            "fat": 11,
            "shopKey": "leite"
          },
          {
            "food": "Banana",
            "qty": 1,
            "unit": "un",
            "kcal": 105,
            "prot": 1.3,
            "carb": 26.9,
            "fat": 0.4,
            "shopKey": "banana"
          },
          {
            "food": "Aveia em flocos",
            "qty": 41,
            "unit": "g",
            "kcal": 154,
            "prot": 5.1,
            "carb": 27.7,
            "fat": 3.1,
            "shopKey": "aveia"
          },
          {
            "food": "Abacate (vitamina)",
            "qty": 68,
            "unit": "g",
            "kcal": 109,
            "prot": 1.4,
            "carb": 5.8,
            "fat": 10,
            "shopKey": "abacate"
          }
        ]
      },
      {
        "id": "pre-4",
        "name": "Crepioca",
        "desc": "Leve que não pesa no treino",
        "ingredients": [
          {
            "food": "Goma de tapioca",
            "qty": 54,
            "unit": "g",
            "kcal": 193,
            "prot": 0.1,
            "carb": 47.9,
            "fat": 0,
            "shopKey": "tapioca"
          },
          {
            "food": "Ovos",
            "qty": 3,
            "unit": "un",
            "kcal": 222,
            "prot": 18.9,
            "carb": 1.1,
            "fat": 14.9,
            "shopKey": "ovos"
          }
        ]
      },
      {
        "id": "pre-5",
        "name": "Iogurte e Amendoim",
        "desc": "Snack de digestão ultra rápida",
        "ingredients": [
          {
            "food": "Iogurte Zero Açúcar (Morango/Ameixa)",
            "qty": 230,
            "unit": "g",
            "kcal": 108,
            "prot": 10.8,
            "carb": 14.9,
            "fat": 0,
            "shopKey": "iogurte"
          },
          {
            "food": "Pasta de amendoim",
            "qty": 27,
            "unit": "g",
            "kcal": 155,
            "prot": 6.5,
            "carb": 4.9,
            "fat": 12.3,
            "shopKey": "pasta_amendoim"
          }
        ]
      },
      {
        "id": "pre-6",
        "name": "Abacaxi com YoPRO e Chia",
        "desc": "Proteico com digestão leve antes de malhar",
        "ingredients": [
          {
            "food": "YoPRO / Bebida Láctea",
            "qty": 1,
            "unit": "un",
            "kcal": 220,
            "prot": 22.8,
            "carb": 13.6,
            "fat": 8.5,
            "shopKey": "yopro"
          },
          {
            "food": "Abacaxi",
            "qty": 135,
            "unit": "g",
            "kcal": 65,
            "prot": 0.7,
            "carb": 17.1,
            "fat": 0.2,
            "shopKey": "abacaxi"
          },
          {
            "food": "Semente de Chia",
            "qty": 14,
            "unit": "g",
            "kcal": 69,
            "prot": 2.2,
            "carb": 6.1,
            "fat": 4.3,
            "shopKey": "chia"
          }
        ]
      },
      {
        "id": "pre-7",
        "name": "Pão com Lombo Desfiado",
        "desc": "Usando as sobras",
        "ingredients": [
          {
            "food": "Pão de forma",
            "qty": 3,
            "unit": "fatias",
            "kcal": 240,
            "prot": 6.9,
            "carb": 45.5,
            "fat": 3,
            "shopKey": "pao_forma"
          },
          {
            "food": "Lombo suíno iscas",
            "qty": 108,
            "unit": "g",
            "kcal": 268,
            "prot": 29.3,
            "carb": 0,
            "fat": 15.8,
            "shopKey": "lombo_suino"
          }
        ]
      },
      {
        "id": "pre-8",
        "name": "Escondidinho Prático de Mandioca e Ovo",
        "desc": "Mandioca amassada faz milagre no pique",
        "ingredients": [
          {
            "food": "Mandioca cozida",
            "qty": 135,
            "unit": "g",
            "kcal": 234,
            "prot": 1.8,
            "carb": 50.6,
            "fat": 2.8,
            "shopKey": "mandioca"
          },
          {
            "food": "Ovos mexidos",
            "qty": 3,
            "unit": "un",
            "kcal": 222,
            "prot": 18.9,
            "carb": 1.1,
            "fat": 14.9,
            "shopKey": "ovos"
          }
        ]
      }
    ]
  },
  {
    "id": 5,
    "name": "Jantar (Pós-Treino)",
    "time": "20:15",
    "icon": "🥘",
    "options": [
      {
        "id": "jantar-1",
        "name": "Tilápia com Batata Doce e Tomate",
        "desc": "Esgotamento muscular compensado perfeitamente",
        "ingredients": [
          {
            "food": "Filé de Tilápia/Peixe",
            "qty": 270,
            "unit": "g",
            "kcal": 259,
            "prot": 54.2,
            "carb": 0,
            "fat": 4.6,
            "shopKey": "tilapia"
          },
          {
            "food": "Batata-doce amassada/cubos",
            "qty": 203,
            "unit": "g",
            "kcal": 154,
            "prot": 2.8,
            "carb": 36,
            "fat": 0.3,
            "shopKey": "batata_doce"
          },
          {
            "food": "Tomate e Pimentão",
            "qty": 108,
            "unit": "g",
            "kcal": 19,
            "prot": 1,
            "carb": 4.2,
            "fat": 0.2,
            "shopKey": "vegetais_base"
          }
        ]
      },
      {
        "id": "jantar-2",
        "name": "Iscas de Lombo Suíno Acebolado",
        "desc": "Recuperação com lombo",
        "ingredients": [
          {
            "food": "Lombo suíno em iscas",
            "qty": 203,
            "unit": "g",
            "kcal": 503,
            "prot": 55,
            "carb": 0,
            "fat": 29.7,
            "shopKey": "lombo_suino"
          },
          {
            "food": "Arroz Branco cozido",
            "qty": 176,
            "unit": "g",
            "kcal": 229,
            "prot": 4.2,
            "carb": 50.3,
            "fat": 0.4,
            "shopKey": "arroz_branco"
          },
          {
            "food": "Feijão",
            "qty": 108,
            "unit": "g",
            "kcal": 184,
            "prot": 7.7,
            "carb": 20.2,
            "fat": 8.4,
            "shopKey": "feijao"
          },
          {
            "food": "Cenoura ralada",
            "qty": 108,
            "unit": "g",
            "kcal": 44,
            "prot": 1,
            "carb": 10.3,
            "fat": 0.3,
            "shopKey": "cenoura"
          }
        ]
      },
      {
        "id": "jantar-3",
        "name": "Macarronada Forte de Acém",
        "desc": "Ressíntese de energia extrema",
        "ingredients": [
          {
            "food": "Macarrão tradicional (peso cru)",
            "qty": 108,
            "unit": "g",
            "kcal": 141,
            "prot": 5.6,
            "carb": 26.9,
            "fat": 1.1,
            "shopKey": "macarrao"
          },
          {
            "food": "Acém ou Patinho moído",
            "qty": 203,
            "unit": "g",
            "kcal": 467,
            "prot": 57.8,
            "carb": 0,
            "fat": 24.4,
            "shopKey": "acem_moido"
          },
          {
            "food": "Molho de tomate com cebola",
            "qty": 135,
            "unit": "g",
            "kcal": 24,
            "prot": 1.2,
            "carb": 5.3,
            "fat": 0.3,
            "shopKey": "vegetais_base"
          }
        ]
      },
      {
        "id": "jantar-4",
        "name": "Frango Grelhado, Arroz e Salada",
        "desc": "Equilíbrio",
        "ingredients": [
          {
            "food": "Peito de Frango",
            "qty": 203,
            "unit": "g",
            "kcal": 223,
            "prot": 46.9,
            "carb": 0,
            "fat": 2.5,
            "shopKey": "frango"
          },
          {
            "food": "Arroz Branco cozido",
            "qty": 176,
            "unit": "g",
            "kcal": 229,
            "prot": 4.2,
            "carb": 50.3,
            "fat": 0.4,
            "shopKey": "arroz_branco"
          },
          {
            "food": "Feijão",
            "qty": 108,
            "unit": "g",
            "kcal": 184,
            "prot": 7.7,
            "carb": 20.2,
            "fat": 8.4,
            "shopKey": "feijao"
          },
          {
            "food": "Rúcula, Alface, Pepino e Tomate",
            "qty": 135,
            "unit": "g",
            "kcal": 20,
            "prot": 1.8,
            "carb": 3.8,
            "fat": 0.2,
            "shopKey": "salada"
          }
        ]
      },
      {
        "id": "jantar-5",
        "name": "Marmita de Acém, Abóbora e Quiabo",
        "desc": "Clássica",
        "ingredients": [
          {
            "food": "Carne Moída (Acém)",
            "qty": 203,
            "unit": "g",
            "kcal": 467,
            "prot": 57.8,
            "carb": 0,
            "fat": 24.4,
            "shopKey": "acem_moido"
          },
          {
            "food": "Arroz Branco",
            "qty": 176,
            "unit": "g",
            "kcal": 229,
            "prot": 4.2,
            "carb": 50.3,
            "fat": 0.4,
            "shopKey": "arroz_branco"
          },
          {
            "food": "Abóbora e Quiabo",
            "qty": 135,
            "unit": "g",
            "kcal": 27,
            "prot": 1,
            "carb": 6.6,
            "fat": 0.1,
            "shopKey": "legumes_amarelos"
          }
        ]
      },
      {
        "id": "jantar-6",
        "name": "Sobrecoxa com Mandioca e Couve",
        "desc": "Noite Mineira pra encher os músculos",
        "ingredients": [
          {
            "food": "Sobrecoxa assada",
            "qty": 203,
            "unit": "g",
            "kcal": 424,
            "prot": 52.7,
            "carb": 0,
            "fat": 22.1,
            "shopKey": "sobrecoxa"
          },
          {
            "food": "Mandioca cozida",
            "qty": 203,
            "unit": "g",
            "kcal": 351,
            "prot": 2.7,
            "carb": 76,
            "fat": 4.1,
            "shopKey": "mandioca"
          },
          {
            "food": "Couve refogada",
            "qty": 108,
            "unit": "g",
            "kcal": 55,
            "prot": 2,
            "carb": 5.9,
            "fat": 3.4,
            "shopKey": "couve"
          }
        ]
      },
      {
        "id": "jantar-7",
        "name": "Escondidinho Clássico Batata Inglesa e Frango",
        "desc": "Batata fácil, frango barato",
        "ingredients": [
          {
            "food": "Batata Inglesa amassada",
            "qty": 270,
            "unit": "g",
            "kcal": 235,
            "prot": 5,
            "carb": 54.4,
            "fat": 0.3,
            "shopKey": "batata_inglesa"
          },
          {
            "food": "Frango desfiado com Tomate",
            "qty": 203,
            "unit": "g",
            "kcal": 223,
            "prot": 46.9,
            "carb": 0,
            "fat": 2.5,
            "shopKey": "frango"
          },
          {
            "food": "Milho Verde",
            "qty": 41,
            "unit": "g",
            "kcal": 10,
            "prot": 0.3,
            "carb": 2.1,
            "fat": 0.2,
            "shopKey": "legumes_verdes"
          }
        ]
      },
      {
        "id": "jantar-8",
        "name": "Omelete Reforçado da Noite",
        "desc": "Rápido demais",
        "ingredients": [
          {
            "food": "Ovos",
            "qty": 5,
            "unit": "un",
            "kcal": 370,
            "prot": 31.4,
            "carb": 1.9,
            "fat": 24.8,
            "shopKey": "ovos"
          },
          {
            "food": "Arroz Branco",
            "qty": 176,
            "unit": "g",
            "kcal": 229,
            "prot": 4.2,
            "carb": 50.3,
            "fat": 0.4,
            "shopKey": "arroz_branco"
          },
          {
            "food": "Feijão",
            "qty": 108,
            "unit": "g",
            "kcal": 184,
            "prot": 7.7,
            "carb": 20.2,
            "fat": 8.4,
            "shopKey": "feijao"
          },
          {
            "food": "Tomate e Cebola picados",
            "qty": 68,
            "unit": "g",
            "kcal": 12,
            "prot": 0.6,
            "carb": 2.7,
            "fat": 0.1,
            "shopKey": "vegetais_base"
          }
        ]
      }
    ]
  },
  {
    "id": 6,
    "name": "Ceia",
    "time": "22:30",
    "icon": "🌙",
    "options": [
      {
        "id": "ceia-1",
        "name": "Cottage, Mel e Castanhas",
        "desc": "Absorção de caseína noturna perfeitamente equilibrada",
        "ingredients": [
          {
            "food": "Queijo cottage / ricota",
            "qty": 108,
            "unit": "g",
            "kcal": 83,
            "prot": 12,
            "carb": 4.6,
            "fat": 2.3,
            "shopKey": "cottage"
          },
          {
            "food": "Mix de Castanhas",
            "qty": 20,
            "unit": "g",
            "kcal": 121,
            "prot": 3.6,
            "carb": 4.3,
            "fat": 10.7,
            "shopKey": "castanhas"
          },
          {
            "food": "Mel (1 colherzinha)",
            "qty": 7,
            "unit": "g",
            "kcal": 21,
            "prot": 0,
            "carb": 5.8,
            "fat": 0,
            "shopKey": "mel"
          }
        ]
      },
      {
        "id": "ceia-2",
        "name": "Iogurte Zero Açúcar (Morango/Ameixa) + Laranja",
        "desc": "Vitamina C no fim da noite refresca a boca",
        "ingredients": [
          {
            "food": "Iogurte Zero Açúcar (Morango/Ameixa)",
            "qty": 230,
            "unit": "g",
            "kcal": 108,
            "prot": 10.8,
            "carb": 14.9,
            "fat": 0,
            "shopKey": "iogurte"
          },
          {
            "food": "Laranja picada",
            "qty": 1,
            "unit": "un",
            "kcal": 62,
            "prot": 1.2,
            "carb": 15.4,
            "fat": 0.2,
            "shopKey": "laranja"
          }
        ]
      },
      {
        "id": "ceia-3",
        "name": "Ovos Cozidos com Chá",
        "desc": "Pra dormir pesadamente e acordar sem fome",
        "ingredients": [
          {
            "food": "Ovos cozidos",
            "qty": 3,
            "unit": "un",
            "kcal": 222,
            "prot": 18.9,
            "carb": 1.1,
            "fat": 14.9,
            "shopKey": "ovos"
          }
        ]
      },
      {
        "id": "ceia-4",
        "name": "Mingau Relaxante",
        "desc": "Leite e aveia em dosagem branda",
        "ingredients": [
          {
            "food": "Leite",
            "qty": 203,
            "unit": "ml",
            "kcal": 122,
            "prot": 6.5,
            "carb": 9.2,
            "fat": 6.6,
            "shopKey": "leite"
          },
          {
            "food": "Aveia em flocos",
            "qty": 27,
            "unit": "g",
            "kcal": 101,
            "prot": 3.4,
            "carb": 18.2,
            "fat": 2,
            "shopKey": "aveia"
          }
        ]
      },
      {
        "id": "ceia-5",
        "name": "Meio Mamão Papaia",
        "desc": "Uma forma purificadora antes de dormir",
        "ingredients": [
          {
            "food": "Mamão Papaia",
            "qty": 1,
            "unit": "un",
            "kcal": 119,
            "prot": 1.9,
            "carb": 29.8,
            "fat": 0.4,
            "shopKey": "mamao"
          }
        ]
      },
      {
        "id": "ceia-6",
        "name": "Morango, Amora e Leite",
        "desc": "Um docinho pra quebrar aquele açúcar",
        "ingredients": [
          {
            "food": "Morangos e Amoras",
            "qty": 135,
            "unit": "g",
            "kcal": 43,
            "prot": 0.9,
            "carb": 10.4,
            "fat": 0.4,
            "shopKey": "frutas_vermelhas"
          },
          {
            "food": "Leite desnatado",
            "qty": 135,
            "unit": "ml",
            "kcal": 81,
            "prot": 4.3,
            "carb": 6.1,
            "fat": 4.4,
            "shopKey": "leite"
          }
        ]
      },
      {
        "id": "ceia-7",
        "name": "Queijo Minas e Melancia",
        "desc": "Protege o estômago",
        "ingredients": [
          {
            "food": "Queijo Minas/Frescal",
            "qty": 41,
            "unit": "g",
            "kcal": 161,
            "prot": 14.7,
            "carb": 1.3,
            "fat": 10.6,
            "shopKey": "queijo_minas"
          },
          {
            "food": "Melancia pura",
            "qty": 135,
            "unit": "g",
            "kcal": 41,
            "prot": 0.8,
            "carb": 10.2,
            "fat": 0.2,
            "shopKey": "melancia"
          }
        ]
      },
      {
        "id": "ceia-8",
        "name": "Fatia de Pão com Pasta de Amendoim",
        "desc": "A melhor guloseima que salva sua fome noturna",
        "ingredients": [
          {
            "food": "Pão de forma",
            "qty": 1,
            "unit": "fatia",
            "kcal": 80,
            "prot": 2.3,
            "carb": 15.2,
            "fat": 1,
            "shopKey": "pao_forma"
          },
          {
            "food": "Pasta de amendoim",
            "qty": 20,
            "unit": "g",
            "kcal": 115,
            "prot": 4.8,
            "carb": 3.6,
            "fat": 9.1,
            "shopKey": "pasta_amendoim"
          }
        ]
      }
    ]
  }
];

const SHOP_MAP = {
  "arroz_branco": {
    "name": "Arroz Branco",
    "cat": "🍚 Carboidratos",
    "buyUnit": "pct",
    "buySize": 1000,
    "unitG": "g",
    "price": [
      5,
      8
    ]
  },
  "feijao": {
    "name": "Feijão",
    "cat": "🍚 Carboidratos",
    "buyUnit": "pct",
    "buySize": 1000,
    "unitG": "g",
    "price": [
      6,
      10
    ]
  },
  "batata_inglesa": {
    "name": "Batata Inglesa",
    "cat": "🍚 Carboidratos",
    "buyUnit": "kg",
    "buySize": 1000,
    "unitG": "g",
    "price": [
      5,
      8
    ]
  },
  "batata_doce": {
    "name": "Batata Doce",
    "cat": "🍚 Carboidratos",
    "buyUnit": "kg",
    "buySize": 1000,
    "unitG": "g",
    "price": [
      4,
      7
    ]
  },
  "mandioca": {
    "name": "Mandioca (Aipim)",
    "cat": "🍚 Carboidratos",
    "buyUnit": "kg",
    "buySize": 1000,
    "unitG": "g",
    "price": [
      3,
      6
    ]
  },
  "pao_forma": {
    "name": "Pão de Forma",
    "cat": "🍚 Carboidratos",
    "buyUnit": "pct",
    "buySize": 18,
    "unitG": "fatias",
    "price": [
      6,
      9
    ]
  },
  "aveia": {
    "name": "Aveia em flocos",
    "cat": "🍚 Carboidratos",
    "buyUnit": "pct",
    "buySize": 500,
    "unitG": "g",
    "price": [
      6,
      10
    ]
  },
  "tapioca": {
    "name": "Goma de tapioca",
    "cat": "🍚 Carboidratos",
    "buyUnit": "pct",
    "buySize": 500,
    "unitG": "g",
    "price": [
      5,
      8
    ]
  },
  "macarrao": {
    "name": "Macarrão Tradicional",
    "cat": "🍚 Carboidratos",
    "buyUnit": "pct",
    "buySize": 500,
    "unitG": "g",
    "price": [
      4,
      6
    ]
  },
  "frango": {
    "name": "Peito de Frango",
    "cat": "🥩 Carnes",
    "buyUnit": "kg",
    "buySize": 1000,
    "unitG": "g",
    "price": [
      20,
      28
    ]
  },
  "sobrecoxa": {
    "name": "Sobrecoxa de Frango",
    "cat": "🥩 Carnes",
    "buyUnit": "kg",
    "buySize": 1000,
    "unitG": "g",
    "price": [
      14,
      18
    ]
  },
  "acem_moido": {
    "name": "Carne Moída (Acém)",
    "cat": "🥩 Carnes",
    "buyUnit": "kg",
    "buySize": 1000,
    "unitG": "g",
    "price": [
      25,
      35
    ]
  },
  "lombo_suino": {
    "name": "Lombo Suíno/Porco",
    "cat": "🥩 Carnes",
    "buyUnit": "kg",
    "buySize": 1000,
    "unitG": "g",
    "price": [
      16,
      22
    ]
  },
  "tilapia": {
    "name": "Filé de Tilápia",
    "cat": "🥩 Carnes",
    "buyUnit": "kg",
    "buySize": 1000,
    "unitG": "g",
    "price": [
      28,
      40
    ]
  },
  "ovos": {
    "name": "Ovos",
    "cat": "🥩 Carnes",
    "buyUnit": "bdj",
    "buySize": 30,
    "unitG": "un",
    "price": [
      16,
      22
    ]
  },
  "castanhas": {
    "name": "Mix Castanhas / Amendoim",
    "cat": "🫒 Gorduras",
    "buyUnit": "pct",
    "buySize": 400,
    "unitG": "g",
    "price": [
      15,
      30
    ]
  },
  "pasta_amendoim": {
    "name": "Pasta de amendoim integral",
    "cat": "🫒 Gorduras",
    "buyUnit": "pote",
    "buySize": 500,
    "unitG": "g",
    "price": [
      15,
      20
    ]
  },
  "chia": {
    "name": "Semente de Chia",
    "cat": "🫒 Gorduras",
    "buyUnit": "pct",
    "buySize": 200,
    "unitG": "g",
    "price": [
      8,
      12
    ]
  },
  "leite": {
    "name": "Leite de vaca",
    "cat": "🥛 Laticínios",
    "buyUnit": "L",
    "buySize": 1000,
    "unitG": "ml",
    "price": [
      4,
      6
    ]
  },
  "iogurte": {
    "name": "Iogurte Zero Açúcar (Morango/Ameixa)",
    "cat": "🥛 Laticínios",
    "buyUnit": "garrafa",
    "buySize": 900,
    "unitG": "g",
    "price": [
      12,
      18
    ]
  },
  "queijo_minas": {
    "name": "Queijo Minas/Frescal",
    "cat": "🥛 Laticínios",
    "buyUnit": "pct",
    "buySize": 400,
    "unitG": "g",
    "price": [
      18,
      28
    ]
  },
  "cottage": {
    "name": "Queijo Cottage/Ricota",
    "cat": "🥛 Laticínios",
    "buyUnit": "pote",
    "buySize": 200,
    "unitG": "g",
    "price": [
      8,
      12
    ]
  },
  "salada": {
    "name": "Alface + Rúcula + Pepino",
    "cat": "🥬 Feira / Salada",
    "buyUnit": "kit",
    "buySize": 500,
    "unitG": "g",
    "price": [
      4,
      8
    ]
  },
  "legumes_amarelos": {
    "name": "Abóbora e Quiabo",
    "cat": "🥬 Feira / Refogos",
    "buyUnit": "kg",
    "buySize": 1000,
    "unitG": "g",
    "price": [
      4,
      8
    ]
  },
  "legumes_verdes": {
    "name": "Chuchu e Milho Verde",
    "cat": "🥬 Feira / Refogos",
    "buyUnit": "kg",
    "buySize": 1000,
    "unitG": "g",
    "price": [
      3,
      7
    ]
  },
  "vegetais_base": {
    "name": "Tomate, Cebola, Pimentão",
    "cat": "🥬 Feira / Base",
    "buyUnit": "kg",
    "buySize": 1000,
    "unitG": "g",
    "price": [
      5,
      10
    ]
  },
  "couve": {
    "name": "Couve folha",
    "cat": "🥬 Feira / Refogos",
    "buyUnit": "maço",
    "buySize": 300,
    "unitG": "g",
    "price": [
      3,
      5
    ]
  },
  "cenoura": {
    "name": "Cenoura / Beterraba",
    "cat": "🥬 Feira / Raízes",
    "buyUnit": "kg",
    "buySize": 1000,
    "unitG": "g",
    "price": [
      4,
      7
    ]
  },
  "banana": {
    "name": "Banana",
    "cat": "🍇 Frutas",
    "buyUnit": "dz",
    "buySize": 12,
    "unitG": "un",
    "price": [
      6,
      12
    ]
  },
  "abacaxi": {
    "name": "Abacaxi",
    "cat": "🍇 Frutas",
    "buyUnit": "un",
    "buySize": 800,
    "unitG": "g",
    "price": [
      5,
      10
    ]
  },
  "melancia": {
    "name": "Melancia Pedaço",
    "cat": "🍇 Frutas",
    "buyUnit": "kg",
    "buySize": 1000,
    "unitG": "g",
    "price": [
      3,
      6
    ]
  },
  "laranja": {
    "name": "Laranja",
    "cat": "🍇 Frutas",
    "buyUnit": "dz",
    "buySize": 12,
    "unitG": "un",
    "price": [
      8,
      14
    ]
  },
  "pera": {
    "name": "Pera",
    "cat": "🍇 Frutas",
    "buyUnit": "un",
    "buySize": 1,
    "unitG": "un",
    "price": [
      2,
      4
    ]
  },
  "frutas_vermelhas": {
    "name": "Amora / Morango",
    "cat": "🍇 Frutas Extras",
    "buyUnit": "bdj",
    "buySize": 200,
    "unitG": "g",
    "price": [
      8,
      15
    ]
  },
  "abacate": {
    "name": "Abacate (p/ vitamina)",
    "cat": "🍇 Frutas",
    "buyUnit": "kg",
    "buySize": 1000,
    "unitG": "g",
    "price": [
      6,
      12
    ]
  },
  "mamao": {
    "name": "Mamão Papaia",
    "cat": "🍇 Frutas",
    "buyUnit": "un",
    "buySize": 1,
    "unitG": "un",
    "price": [
      3,
      5
    ]
  },
  "mel": {
    "name": "Mel de abelha",
    "cat": "🧂 Extras",
    "buyUnit": "pote",
    "buySize": 300,
    "unitG": "g",
    "price": [
      15,
      20
    ]
  },
  "yopro": {
    "name": "YoPRO / Bebida Láctea",
    "cat": "🥛 Laticínios",
    "buyUnit": "un",
    "buySize": 1,
    "unitG": "un",
    "price": [
      6,
      10
    ]
  },
  "granola": {
    "name": "Granola",
    "cat": "🍚 Carboidratos",
    "buyUnit": "pct",
    "buySize": 500,
    "unitG": "g",
    "price": [
      15,
      25
    ]
  }
};

const COOK_INFO = {
  "arroz_branco": {
    "cookRatio": 3,
    "dataState": "cooked",
    "preppable": true,
    "icon": "🍚",
    "rawLabel": "Arroz branco",
    "cookedLabel": "Arroz (cozido)",
    "prepAction": "Cozinhar"
  },
  "feijao": {
    "cookRatio": 2.5,
    "dataState": "cooked",
    "preppable": true,
    "icon": "🫘",
    "rawLabel": "Feijão",
    "cookedLabel": "Feijão (cozido)",
    "prepAction": "Cozinhar pressão"
  },
  "tilapia": {
    "cookRatio": 0.8,
    "dataState": "cooked",
    "preppable": true,
    "icon": "🐟",
    "rawLabel": "Peixe",
    "cookedLabel": "Filé (grelhado)",
    "prepAction": "Grelhar"
  },
  "frango": {
    "cookRatio": 0.75,
    "dataState": "cooked",
    "preppable": true,
    "icon": "🍗",
    "rawLabel": "Peito frango",
    "cookedLabel": "Frango (grelhado)",
    "prepAction": "Grelhar/Cozinhar"
  },
  "sobrecoxa": {
    "cookRatio": 0.7,
    "dataState": "cooked",
    "preppable": true,
    "icon": "🍗",
    "rawLabel": "Sobrecoxa",
    "cookedLabel": "Sobrecoxa (assada)",
    "prepAction": "Assar no forno"
  },
  "lombo_suino": {
    "cookRatio": 0.75,
    "dataState": "cooked",
    "preppable": true,
    "icon": "🥩",
    "rawLabel": "Lombo Suíno",
    "cookedLabel": "Lombo Suíno",
    "prepAction": "Refogar Iscas"
  },
  "acem_moido": {
    "cookRatio": 0.65,
    "dataState": "cooked",
    "preppable": true,
    "icon": "🥩",
    "rawLabel": "Carne moída",
    "cookedLabel": "Carne moída",
    "prepAction": "Refogar"
  },
  "couve": {
    "cookRatio": 0.85,
    "dataState": "cooked",
    "preppable": true,
    "icon": "🥬",
    "rawLabel": "Couve",
    "cookedLabel": "Couve (refogada)",
    "prepAction": "Refogar rapidamente"
  },
  "batata_doce": {
    "cookRatio": 0.9,
    "dataState": "cooked",
    "preppable": true,
    "icon": "🍠",
    "rawLabel": "Batata doce",
    "cookedLabel": "Batata (cozida)",
    "prepAction": "Cozinhar macio"
  },
  "batata_inglesa": {
    "cookRatio": 0.9,
    "dataState": "cooked",
    "preppable": true,
    "icon": "🥔",
    "rawLabel": "Batata",
    "cookedLabel": "Batata (cozida/assada)",
    "prepAction": "Cozinhar/assar"
  },
  "mandioca": {
    "cookRatio": 0.95,
    "dataState": "cooked",
    "preppable": true,
    "icon": "🍠",
    "rawLabel": "Mandioca",
    "cookedLabel": "Mandioca (cozida)",
    "prepAction": "Pressão"
  },
  "macarrao": {
    "cookRatio": 2.2,
    "dataState": "raw",
    "preppable": true,
    "icon": "🍝",
    "rawLabel": "Macarrão",
    "cookedLabel": "Macarrão",
    "prepAction": "Al dente"
  },
  "ovos": {
    "cookRatio": 1,
    "dataState": "raw",
    "preppable": true,
    "icon": "🥚",
    "rawLabel": "Ovos",
    "cookedLabel": "Ovos",
    "prepAction": "Ferver 10 min"
  }
};

const RECIPES = {
  "cafe-2": {
    "prepType": "noite",
    "label": "🌙 Noite Anterior",
    "steps": [
      "Mistura tudo no pote e pronto"
    ]
  },
  "cafe-4": {
    "prepType": "na_hora",
    "label": "⏰ Na Hora (5 min)",
    "steps": [
      "Bate a tapioca com ovos, põe na frigideira fria."
    ]
  },
  "almoco-3": {
    "prepType": "domingo",
    "label": "📅 Domingo",
    "steps": [
      "Asse a sobrecoxa junto com a batata inglesa fatiada. Muito prático."
    ]
  },
  "almoco-4": {
    "prepType": "domingo",
    "label": "📅 Domingo",
    "steps": [
      "Cozinhe a mandioca na pressão, o lombo na panela e jogue a couve nos ultimos 2 min."
    ]
  },
  "jantar-4": {
    "prepType": "domingo",
    "label": "📅 Preparo Completo",
    "steps": [
      "A macarronada aguenta uns 4 dias tranquila.",
      "Tomates no acém moído ajudam a manter a água."
    ]
  }
};

const TRAINING = [
  {
    "day": "Segunda",
    "icon": "🏋️",
    "type": "Academia — Superior",
    "duration": "45–60 min",
    "color": "var(--green)",
    "exercises": [
      {
        "name": "Supino reto (máquina/halteres)",
        "sets": "4 x 10–12",
        "rest": "60s"
      },
      {
        "name": "Remada (máquina/halteres)",
        "sets": "4 x 10–12",
        "rest": "60s"
      },
      {
        "name": "Desenvolvimento ombro",
        "sets": "3 x 12",
        "rest": "60s"
      },
      {
        "name": "Puxada ou pullover",
        "sets": "3 x 12",
        "rest": "60s"
      },
      {
        "name": "Rosca bíceps / Tríceps",
        "sets": "3 x 12–15",
        "rest": "45s"
      }
    ]
  },
  {
    "day": "Terça",
    "icon": "🏊",
    "type": "Natação",
    "duration": "40–50 min",
    "color": "var(--cyan)",
    "exercises": [
      {
        "name": "Aquecimento — nado livre leve",
        "sets": "5 min",
        "rest": "—"
      },
      {
        "name": "Crawl e Costas alternados",
        "sets": "8 x 60m (4 piscinas)",
        "rest": "30s"
      },
      {
        "name": "Sprint crawl (Velocidade)",
        "sets": "4 x 30m (2 piscinas)",
        "rest": "45s"
      },
      {
        "name": "Volta à calma",
        "sets": "5 min",
        "rest": "—"
      }
    ]
  },
  {
    "day": "Quarta",
    "icon": "🏃",
    "type": "Corrida (Iniciante - Esteira ou Rua)",
    "duration": "35 min",
    "color": "var(--orange)",
    "exercises": [
      {
        "name": "Caminhada aquecimento",
        "sets": "10 min",
        "rest": "Passo moderado"
      },
      {
        "name": "Trote leve + Caminhada (1 min trote / 2 min caminhada)",
        "sets": "6 ciclos (18 min total)",
        "rest": "Baixo impacto"
      },
      {
        "name": "Caminhada volta à calma",
        "sets": "7 min",
        "rest": "Diminuir ritmo"
      }
    ]
  },
  {
    "day": "Quinta",
    "icon": "🏋️",
    "type": "Academia — Inferior",
    "duration": "45–60 min",
    "color": "var(--pink)",
    "exercises": [
      {
        "name": "Agachamento (livre/máquina)",
        "sets": "4 x 10–12",
        "rest": "90s"
      },
      {
        "name": "Agachamento Búlgaro",
        "sets": "4 x 10–12",
        "rest": "60s"
      },
      {
        "name": "Cadeira extensora",
        "sets": "3 x 12–15",
        "rest": "60s"
      },
      {
        "name": "Stiff",
        "sets": "3 x 12–15",
        "rest": "60s"
      },
      {
        "name": "Panturrilha em pé",
        "sets": "4 x 15",
        "rest": "45s"
      }
    ]
  },
  {
    "day": "Sexta",
    "icon": "🏊",
    "type": "Natação",
    "duration": "40–50 min",
    "color": "var(--cyan)",
    "exercises": [
      {
        "name": "Aquecimento — nado livre leve",
        "sets": "5 min",
        "rest": "—"
      },
      {
        "name": "Crawl (Ritmo constante)",
        "sets": "5 x 90m (6 piscinas)",
        "rest": "30s"
      },
      {
        "name": "Costas (Foco na técnica)",
        "sets": "2 x 60m (4 piscinas)",
        "rest": "30s"
      },
      {
        "name": "Volta à calma",
        "sets": "5 min",
        "rest": "—"
      }
    ]
  },
  {
    "day": "Sábado",
    "icon": "🏃",
    "type": "Corrida/Caminhada + Abdômen",
    "duration": "40 min",
    "color": "var(--orange)",
    "exercises": [
      {
        "name": "Caminhada vigorosa contínua",
        "sets": "25 min",
        "rest": "Mantenha o fôlego"
      },
      {
        "name": "Prancha frontal",
        "sets": "3 x 30–45s",
        "rest": "45s"
      },
      {
        "name": "Abdominal supra (curto)",
        "sets": "3 x 15",
        "rest": "45s"
      }
    ]
  },
  {
    "day": "Domingo",
    "icon": "🛌",
    "type": "Descanso",
    "duration": "—",
    "color": "var(--text-dim)",
    "exercises": []
  }
];

const SCHEDULE = [
  {
    "time": "07:15",
    "title": "Café da Manhã",
    "desc": "Refeição 1",
    "highlight": true
  },
  {
    "time": "09:40",
    "title": "Café do Serviço",
    "desc": "Refeição 2",
    "highlight": true
  },
  {
    "time": "12:00",
    "title": "Almoço",
    "desc": "Refeição 3",
    "highlight": true
  },
  {
    "time": "16:00",
    "title": "Lanche Pré-Treino",
    "desc": "Refeição 4",
    "highlight": true
  },
  {
    "time": "18:45",
    "title": "TREINO",
    "desc": "Ver grid acima",
    "highlight": true
  },
  {
    "time": "20:15",
    "title": "Jantar Pós-Treino",
    "desc": "Refeição 5",
    "highlight": true
  },
  {
    "time": "22:30",
    "title": "Ceia",
    "desc": "Refeição 6",
    "highlight": true
  }
];
