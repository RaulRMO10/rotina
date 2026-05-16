// ===== TABELA NUTRICIONAL BASE (por 100g ou unidade) =====

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
            "kcal": 292,
            "prot": 25.1,
            "carb": 1.5,
            "fat": 19.4,
            "shopKey": "ovos"
          },
          {
            "food": "Pão de Forma",
            "qty": 3,
            "unit": "fatias",
            "kcal": 189,
            "prot": 8.1,
            "carb": 32.4,
            "fat": 2.7,
            "shopKey": "pao_forma"
          },
          {
            "food": "Pera",
            "qty": 1,
            "unit": "un",
            "kcal": 81,
            "prot": 0.5,
            "carb": 20.3,
            "fat": 0.1,
            "shopKey": "pera"
          }
        ]
      },
      {
        "id": "cafe-2",
        "name": "Panqueca de Aveia com Banana e Mel",
        "desc": "Doce, macia e fácil de comer — pronto em 5 minutos",
        "ingredients": [
          {
            "food": "Aveia em flocos",
            "qty": 40,
            "unit": "g",
            "kcal": 156,
            "prot": 5.2,
            "carb": 26.8,
            "fat": 2.8,
            "shopKey": "aveia"
          },
          {
            "food": "Ovos",
            "qty": 2,
            "unit": "un",
            "kcal": 146,
            "prot": 12.5,
            "carb": 1,
            "fat": 9.7,
            "shopKey": "ovos"
          },
          {
            "food": "Banana",
            "qty": 1,
            "unit": "un",
            "kcal": 120,
            "prot": 1.5,
            "carb": 30.8,
            "fat": 0.4,
            "shopKey": "banana"
          },
          {
            "food": "Mel",
            "qty": 10,
            "unit": "g",
            "kcal": 29,
            "prot": 0,
            "carb": 7.9,
            "fat": 0,
            "shopKey": "mel"
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
            "kcal": 135,
            "prot": 8.6,
            "carb": 13,
            "fat": 5.4,
            "shopKey": "leite"
          },
          {
            "food": "Abacate",
            "qty": 68,
            "unit": "g",
            "kcal": 108,
            "prot": 1.4,
            "carb": 5.7,
            "fat": 9.9,
            "shopKey": "abacate"
          },
          {
            "food": "Banana",
            "qty": 1,
            "unit": "un",
            "kcal": 120,
            "prot": 1.5,
            "carb": 30.8,
            "fat": 0.4,
            "shopKey": "banana"
          },
          {
            "food": "Aveia em flocos",
            "qty": 27,
            "unit": "g",
            "kcal": 105,
            "prot": 3.5,
            "carb": 18.1,
            "fat": 1.9,
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
            "kcal": 194,
            "prot": 0,
            "carb": 47.5,
            "fat": 0,
            "shopKey": "tapioca"
          },
          {
            "food": "Ovos",
            "qty": 3,
            "unit": "un",
            "kcal": 194,
            "prot": 16.7,
            "carb": 0.9,
            "fat": 13,
            "shopKey": "ovos"
          },
          {
            "food": "Queijo Minas/Frescal",
            "qty": 54,
            "unit": "g",
            "kcal": 144,
            "prot": 9.7,
            "carb": 0.9,
            "fat": 11.3,
            "shopKey": "queijo_minas"
          },
          {
            "food": "Abacaxi (fatias)",
            "qty": 108,
            "unit": "g",
            "kcal": 54,
            "prot": 0.5,
            "carb": 14.2,
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
            "kcal": 211,
            "prot": 7,
            "carb": 36.2,
            "fat": 3.8,
            "shopKey": "aveia"
          },
          {
            "food": "Leite",
            "qty": 270,
            "unit": "ml",
            "kcal": 135,
            "prot": 8.6,
            "carb": 13,
            "fat": 5.4,
            "shopKey": "leite"
          },
          {
            "food": "Ovos Cozidos",
            "qty": 3,
            "unit": "un",
            "kcal": 194,
            "prot": 16.7,
            "carb": 0.9,
            "fat": 13,
            "shopKey": "ovos"
          },
          {
            "food": "Laranja",
            "qty": 1,
            "unit": "un",
            "kcal": 88,
            "prot": 1.6,
            "carb": 21.6,
            "fat": 0.3,
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
            "kcal": 194,
            "prot": 0,
            "carb": 47.5,
            "fat": 0,
            "shopKey": "tapioca"
          },
          {
            "food": "Frango desfiado",
            "qty": 81,
            "unit": "g",
            "kcal": 134,
            "prot": 25.1,
            "carb": 0,
            "fat": 2.8,
            "shopKey": "frango"
          },
          {
            "food": "Rúcula",
            "qty": 27,
            "unit": "g",
            "kcal": 7,
            "prot": 0.7,
            "carb": 0.9,
            "fat": 0.1,
            "shopKey": "salada"
          },
          {
            "food": "Melancia",
            "qty": 135,
            "unit": "g",
            "kcal": 41,
            "prot": 0.8,
            "carb": 10.1,
            "fat": 0.1,
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
            "kcal": 116,
            "prot": 2.2,
            "carb": 27,
            "fat": 0.1,
            "shopKey": "batata_doce"
          },
          {
            "food": "Ovos mexidos",
            "qty": 3,
            "unit": "un",
            "kcal": 194,
            "prot": 16.7,
            "carb": 0.9,
            "fat": 13,
            "shopKey": "ovos"
          },
          {
            "food": "Pão de Forma",
            "qty": 1,
            "unit": "fatia",
            "kcal": 95,
            "prot": 4.1,
            "carb": 16.2,
            "fat": 1.4,
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
            "kcal": 135,
            "prot": 9.2,
            "carb": 10.1,
            "fat": 6.1,
            "shopKey": "iogurte"
          },
          {
            "food": "Morango e Amora",
            "qty": 68,
            "unit": "g",
            "kcal": 27,
            "prot": 0.7,
            "carb": 6.1,
            "fat": 0.3,
            "shopKey": "frutas_vermelhas"
          },
          {
            "food": "Banana picada",
            "qty": 1,
            "unit": "un",
            "kcal": 120,
            "prot": 1.5,
            "carb": 30.8,
            "fat": 0.4,
            "shopKey": "banana"
          },
          {
            "food": "Semente de Chia",
            "qty": 20,
            "unit": "g",
            "kcal": 97,
            "prot": 3.2,
            "carb": 8.5,
            "fat": 6.1,
            "shopKey": "chia"
          }
        ]
      },
      {
        "id": "cafe-9",
        "name": "Tapioca de Queijo com Ovo e Mel",
        "desc": "O melhor da semana 2 no café — tapioca recheada e adocicada",
        "ingredients": [
          {
            "food": "Goma de tapioca",
            "qty": 54,
            "unit": "g",
            "kcal": 194,
            "prot": 0,
            "carb": 47.5,
            "fat": 0,
            "shopKey": "tapioca"
          },
          {
            "food": "Ovos",
            "qty": 2,
            "unit": "un",
            "kcal": 146,
            "prot": 12.5,
            "carb": 1,
            "fat": 9.7,
            "shopKey": "ovos"
          },
          {
            "food": "Queijo Minas/Frescal",
            "qty": 40,
            "unit": "g",
            "kcal": 107,
            "prot": 7.2,
            "carb": 0.7,
            "fat": 8.4,
            "shopKey": "queijo_minas"
          },
          {
            "food": "Mel",
            "qty": 10,
            "unit": "g",
            "kcal": 29,
            "prot": 0,
            "carb": 7.9,
            "fat": 0,
            "shopKey": "mel"
          }
        ]
      },
      {
        "id": "cafe-10",
        "name": "Granola com Iogurte e Morango",
        "desc": "Cremoso, doce e sem esforço — cumbuca de campeão",
        "ingredients": [
          {
            "food": "Granola",
            "qty": 50,
            "unit": "g",
            "kcal": 225,
            "prot": 5,
            "carb": 34.9,
            "fat": 7.4,
            "shopKey": "granola"
          },
          {
            "food": "Iogurte Natural Light",
            "qty": 200,
            "unit": "g",
            "kcal": 117,
            "prot": 8,
            "carb": 8.8,
            "fat": 5.3,
            "shopKey": "iogurte"
          },
          {
            "food": "Morango fresco",
            "qty": 100,
            "unit": "g",
            "kcal": 40,
            "prot": 1,
            "carb": 9,
            "fat": 0.4,
            "shopKey": "frutas_vermelhas"
          },
          {
            "food": "Mel",
            "qty": 10,
            "unit": "g",
            "kcal": 29,
            "prot": 0,
            "carb": 7.9,
            "fat": 0,
            "shopKey": "mel"
          }
        ]
      },
      {
        "id": "cafe-11",
        "name": "Omelete de Queijo e Tomate no Pão",
        "desc": "Café proteico no estilo brunch — ovos com queijo derretido",
        "ingredients": [
          {
            "food": "Ovos",
            "qty": 3,
            "unit": "un",
            "kcal": 194,
            "prot": 16.7,
            "carb": 0.9,
            "fat": 13,
            "shopKey": "ovos"
          },
          {
            "food": "Queijo Minas/Frescal",
            "qty": 40,
            "unit": "g",
            "kcal": 107,
            "prot": 7.2,
            "carb": 0.7,
            "fat": 8.4,
            "shopKey": "queijo_minas"
          },
          {
            "food": "Tomate fatiado",
            "qty": 80,
            "unit": "g",
            "kcal": 20,
            "prot": 0.8,
            "carb": 4,
            "fat": 0.2,
            "shopKey": "vegetais_base"
          },
          {
            "food": "Pão de forma",
            "qty": 2,
            "unit": "fatias",
            "kcal": 126,
            "prot": 5.4,
            "carb": 21.6,
            "fat": 1.8,
            "shopKey": "pao_forma"
          }
        ]
      },
      {
        "id": "cafe-12",
        "name": "Shake de Banana com Chia, Aveia e Pasta de Amendoim",
        "desc": "Engolir rápido, energia longa — o smoothie completo com chia",
        "ingredients": [
          {
            "food": "Leite",
            "qty": 250,
            "unit": "ml",
            "kcal": 125,
            "prot": 8,
            "carb": 12,
            "fat": 5,
            "shopKey": "leite"
          },
          {
            "food": "Banana",
            "qty": 1,
            "unit": "un",
            "kcal": 120,
            "prot": 1.5,
            "carb": 30.8,
            "fat": 0.4,
            "shopKey": "banana"
          },
          {
            "food": "Aveia em flocos",
            "qty": 30,
            "unit": "g",
            "kcal": 117,
            "prot": 3.9,
            "carb": 20.1,
            "fat": 2.1,
            "shopKey": "aveia"
          },
          {
            "food": "Pasta de amendoim",
            "qty": 20,
            "unit": "g",
            "kcal": 127,
            "prot": 5.1,
            "carb": 4.1,
            "fat": 10.1,
            "shopKey": "pasta_amendoim"
          },
          {
            "food": "Semente de Chia",
            "qty": 14,
            "unit": "g",
            "kcal": 68,
            "prot": 2.3,
            "carb": 5.7,
            "fat": 4.1,
            "shopKey": "chia"
          }
        ]
      },
      {
        "id": "cafe-13",
        "name": "Açaí com Granola e Banana",
        "desc": "Tigela energética — carboidrato de qualidade pra começar com força",
        "ingredients": [
          {
            "food": "Açaí polpa",
            "qty": 100,
            "unit": "g",
            "kcal": 60,
            "prot": 1.8,
            "carb": 6,
            "fat": 0.9,
            "shopKey": "acai"
          },
          {
            "food": "Granola",
            "qty": 30,
            "unit": "g",
            "kcal": 135,
            "prot": 3,
            "carb": 21,
            "fat": 4.5,
            "shopKey": "granola"
          },
          {
            "food": "Banana",
            "qty": 1,
            "unit": "un",
            "kcal": 120,
            "prot": 1.5,
            "carb": 30.8,
            "fat": 0.4,
            "shopKey": "banana"
          }
        ]
      },
      {
        "id": "cafe-14",
        "name": "Tapioca Doce com Ovo e Morango",
        "desc": "Recheio adocicado sem sorvete — resolve o problema do overnight",
        "ingredients": [
          {
            "food": "Goma de tapioca",
            "qty": 54,
            "unit": "g",
            "kcal": 194,
            "prot": 0,
            "carb": 47.5,
            "fat": 0,
            "shopKey": "tapioca"
          },
          {
            "food": "Ovos",
            "qty": 2,
            "unit": "un",
            "kcal": 130,
            "prot": 11.1,
            "carb": 0.6,
            "fat": 8.7,
            "shopKey": "ovos"
          },
          {
            "food": "Mel",
            "qty": 10,
            "unit": "g",
            "kcal": 29,
            "prot": 0,
            "carb": 7.9,
            "fat": 0,
            "shopKey": "mel"
          },
          {
            "food": "Morango fresco",
            "qty": 80,
            "unit": "g",
            "kcal": 32,
            "prot": 0.8,
            "carb": 7.2,
            "fat": 0.3,
            "shopKey": "frutas_vermelhas"
          }
        ]
      },
      {
        "id": "cafe-15",
        "name": "Torrada com Queijo, Ovo e Tomate",
        "desc": "Café estilo brunch sem complicação — torrada crocante com proteína",
        "ingredients": [
          {
            "food": "Torrada Multigrãos",
            "qty": 30,
            "unit": "g",
            "kcal": 117,
            "prot": 3.6,
            "carb": 19,
            "fat": 2.9,
            "shopKey": "torrada"
          },
          {
            "food": "Queijo Minas/Frescal",
            "qty": 40,
            "unit": "g",
            "kcal": 107,
            "prot": 7.2,
            "carb": 0.7,
            "fat": 8.4,
            "shopKey": "queijo_minas"
          },
          {
            "food": "Ovo cozido",
            "qty": 1,
            "unit": "un",
            "kcal": 65,
            "prot": 5.6,
            "carb": 0.3,
            "fat": 4.3,
            "shopKey": "ovos"
          },
          {
            "food": "Tomate fatiado",
            "qty": 80,
            "unit": "g",
            "kcal": 20,
            "prot": 0.8,
            "carb": 4,
            "fat": 0.2,
            "shopKey": "vegetais_base"
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
            "kcal": 135,
            "prot": 9.2,
            "carb": 10.1,
            "fat": 6.1,
            "shopKey": "iogurte"
          },
          {
            "food": "Pera",
            "qty": 1,
            "unit": "un",
            "kcal": 81,
            "prot": 0.5,
            "carb": 20.3,
            "fat": 0.1,
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
            "kcal": 194,
            "prot": 16.7,
            "carb": 0.9,
            "fat": 13,
            "shopKey": "ovos"
          },
          {
            "food": "Laranja",
            "qty": 1,
            "unit": "un",
            "kcal": 88,
            "prot": 1.6,
            "carb": 21.6,
            "fat": 0.3,
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
            "carb": 20.3,
            "fat": 0.4,
            "shopKey": "melancia"
          },
          {
            "food": "Mix de Castanhas / Amendoim",
            "qty": 34,
            "unit": "g",
            "kcal": 205,
            "prot": 6.8,
            "carb": 6.8,
            "fat": 17.6,
            "shopKey": "castanhas"
          }
        ]
      },
      {
        "id": "lanche1-4",
        "name": "Sanduíche de Frango com Queijo e Tomate",
        "desc": "Frango úmido com queijo frescal e tomate — bem menos seco",
        "ingredients": [
          {
            "food": "Pão de forma",
            "qty": 3,
            "unit": "fatias",
            "kcal": 189,
            "prot": 8.1,
            "carb": 32.4,
            "fat": 2.7,
            "shopKey": "pao_forma"
          },
          {
            "food": "Frango desfiado",
            "qty": 68,
            "unit": "g",
            "kcal": 111,
            "prot": 20.9,
            "carb": 0,
            "fat": 2.4,
            "shopKey": "frango"
          },
          {
            "food": "Queijo Minas/Frescal",
            "qty": 27,
            "unit": "g",
            "kcal": 72,
            "prot": 4.9,
            "carb": 0.5,
            "fat": 5.7,
            "shopKey": "queijo_minas"
          },
          {
            "food": "Tomate fatiado",
            "qty": 50,
            "unit": "g",
            "kcal": 10,
            "prot": 0.4,
            "carb": 1.9,
            "fat": 0.1,
            "shopKey": "vegetais_base"
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
            "kcal": 54,
            "prot": 1.4,
            "carb": 12.2,
            "fat": 0.5,
            "shopKey": "frutas_vermelhas"
          },
          {
            "food": "Amendoim Torrado",
            "qty": 41,
            "unit": "g",
            "kcal": 243,
            "prot": 9.5,
            "carb": 8.1,
            "fat": 19.6,
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
            "kcal": 160,
            "prot": 25,
            "carb": 15,
            "fat": 0.5,
            "shopKey": "yopro"
          },
          {
            "food": "Abacaxi (sobremesa)",
            "qty": 108,
            "unit": "g",
            "kcal": 54,
            "prot": 0.5,
            "carb": 14.2,
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
            "kcal": 185,
            "prot": 4.1,
            "carb": 28.7,
            "fat": 6.1,
            "shopKey": "granola"
          },
          {
            "food": "Iogurte Zero Açúcar (Morango/Ameixa)",
            "qty": 135,
            "unit": "g",
            "kcal": 78,
            "prot": 5.4,
            "carb": 5.9,
            "fat": 3.5,
            "shopKey": "iogurte"
          },
          {
            "food": "Banana",
            "qty": 1,
            "unit": "un",
            "kcal": 120,
            "prot": 1.5,
            "carb": 30.8,
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
            "kcal": 189,
            "prot": 8.1,
            "carb": 32.4,
            "fat": 2.7,
            "shopKey": "pao_forma"
          },
          {
            "food": "Queijo Minas/Frescal",
            "qty": 41,
            "unit": "g",
            "kcal": 108,
            "prot": 7.3,
            "carb": 0.7,
            "fat": 8.5,
            "shopKey": "queijo_minas"
          }
        ]
      },
      {
        "id": "lanche1-9",
        "name": "Iogurte com Granola e Morango",
        "desc": "Versão leve e prática da cumbuca favorita",
        "ingredients": [
          {
            "food": "Iogurte Natural Light",
            "qty": 200,
            "unit": "g",
            "kcal": 117,
            "prot": 8,
            "carb": 8.8,
            "fat": 5.3,
            "shopKey": "iogurte"
          },
          {
            "food": "Granola",
            "qty": 30,
            "unit": "g",
            "kcal": 135,
            "prot": 3,
            "carb": 20.9,
            "fat": 4.5,
            "shopKey": "granola"
          },
          {
            "food": "Morango fresco",
            "qty": 80,
            "unit": "g",
            "kcal": 32,
            "prot": 0.8,
            "carb": 7.2,
            "fat": 0.3,
            "shopKey": "frutas_vermelhas"
          }
        ]
      },
      {
        "id": "lanche1-10",
        "name": "Tapioca com Pasta de Amendoim e Banana",
        "desc": "Combinação doce e proteica que sustenta bem até o almoço",
        "ingredients": [
          {
            "food": "Goma de tapioca",
            "qty": 40,
            "unit": "g",
            "kcal": 144,
            "prot": 0,
            "carb": 35.2,
            "fat": 0,
            "shopKey": "tapioca"
          },
          {
            "food": "Pasta de amendoim",
            "qty": 20,
            "unit": "g",
            "kcal": 127,
            "prot": 5.1,
            "carb": 4.1,
            "fat": 10.1,
            "shopKey": "pasta_amendoim"
          },
          {
            "food": "Banana",
            "qty": 1,
            "unit": "un",
            "kcal": 120,
            "prot": 1.5,
            "carb": 30.8,
            "fat": 0.4,
            "shopKey": "banana"
          }
        ]
      },
      {
        "id": "lanche1-11",
        "name": "Ovos Cozidos com Queijo e Torrada",
        "desc": "Trio clássico sem fogão — proteína, gordura boa e crocância",
        "ingredients": [
          {
            "food": "Ovos cozidos",
            "qty": 2,
            "unit": "un",
            "kcal": 130,
            "prot": 11.1,
            "carb": 0.6,
            "fat": 8.7,
            "shopKey": "ovos"
          },
          {
            "food": "Queijo Minas/Frescal",
            "qty": 40,
            "unit": "g",
            "kcal": 107,
            "prot": 7.2,
            "carb": 0.7,
            "fat": 8.4,
            "shopKey": "queijo_minas"
          },
          {
            "food": "Torrada Multigrãos",
            "qty": 30,
            "unit": "g",
            "kcal": 117,
            "prot": 3.6,
            "carb": 19,
            "fat": 2.9,
            "shopKey": "torrada"
          }
        ]
      },
      {
        "id": "lanche1-12",
        "name": "Morango com Queijo Frescal e Granola",
        "desc": "Doce do jeito certo — frutas, proteína e crocância",
        "ingredients": [
          {
            "food": "Morango fresco",
            "qty": 150,
            "unit": "g",
            "kcal": 60,
            "prot": 1.5,
            "carb": 13.5,
            "fat": 0.6,
            "shopKey": "frutas_vermelhas"
          },
          {
            "food": "Queijo Minas/Frescal",
            "qty": 50,
            "unit": "g",
            "kcal": 133,
            "prot": 9,
            "carb": 0.9,
            "fat": 10.5,
            "shopKey": "queijo_minas"
          },
          {
            "food": "Granola",
            "qty": 30,
            "unit": "g",
            "kcal": 135,
            "prot": 3,
            "carb": 21,
            "fat": 4.5,
            "shopKey": "granola"
          }
        ]
      },
      {
        "id": "lanche1-13",
        "name": "Vitamina de Abacate com Chia e Mel",
        "desc": "Versão enxuta da vitamina favorita com chia — cabe num potinho",
        "ingredients": [
          {
            "food": "Leite",
            "qty": 200,
            "unit": "ml",
            "kcal": 100,
            "prot": 6.4,
            "carb": 9.6,
            "fat": 4,
            "shopKey": "leite"
          },
          {
            "food": "Abacate",
            "qty": 80,
            "unit": "g",
            "kcal": 127,
            "prot": 1.7,
            "carb": 6.7,
            "fat": 11.7,
            "shopKey": "abacate"
          },
          {
            "food": "Aveia em flocos",
            "qty": 20,
            "unit": "g",
            "kcal": 78,
            "prot": 2.6,
            "carb": 13.4,
            "fat": 1.4,
            "shopKey": "aveia"
          },
          {
            "food": "Mel",
            "qty": 10,
            "unit": "g",
            "kcal": 29,
            "prot": 0,
            "carb": 7.9,
            "fat": 0,
            "shopKey": "mel"
          },
          {
            "food": "Semente de Chia",
            "qty": 14,
            "unit": "g",
            "kcal": 68,
            "prot": 2.3,
            "carb": 5.7,
            "fat": 4.1,
            "shopKey": "chia"
          }
        ]
      },
      {
        "id": "lanche1-14",
        "name": "Banana com Castanhas e Mel",
        "desc": "Trio clássico de energia rápida + gordura boa",
        "ingredients": [
          {
            "food": "Banana",
            "qty": 1,
            "unit": "un",
            "kcal": 120,
            "prot": 1.5,
            "carb": 30.8,
            "fat": 0.4,
            "shopKey": "banana"
          },
          {
            "food": "Mix de Castanhas",
            "qty": 30,
            "unit": "g",
            "kcal": 181,
            "prot": 6,
            "carb": 6,
            "fat": 15.5,
            "shopKey": "castanhas"
          },
          {
            "food": "Mel",
            "qty": 10,
            "unit": "g",
            "kcal": 29,
            "prot": 0,
            "carb": 7.9,
            "fat": 0,
            "shopKey": "mel"
          }
        ]
      },
      {
        "id": "lanche1-15",
        "name": "Mini Crepioca de Queijo",
        "desc": "A crepioca em tamanho de lanche — rápida e proteica",
        "ingredients": [
          {
            "food": "Goma de tapioca",
            "qty": 35,
            "unit": "g",
            "kcal": 126,
            "prot": 0,
            "carb": 30.8,
            "fat": 0,
            "shopKey": "tapioca"
          },
          {
            "food": "Ovos",
            "qty": 2,
            "unit": "un",
            "kcal": 130,
            "prot": 11.1,
            "carb": 0.6,
            "fat": 8.7,
            "shopKey": "ovos"
          },
          {
            "food": "Queijo Minas/Frescal",
            "qty": 30,
            "unit": "g",
            "kcal": 80,
            "prot": 5.4,
            "carb": 0.5,
            "fat": 6.3,
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
            "kcal": 263,
            "prot": 5.1,
            "carb": 56.7,
            "fat": 0.4,
            "shopKey": "arroz_branco"
          },
          {
            "food": "Feijão",
            "qty": 135,
            "unit": "g",
            "kcal": 104,
            "prot": 7,
            "carb": 18.4,
            "fat": 0.7,
            "shopKey": "feijao"
          },
          {
            "food": "Frango grelhado",
            "qty": 203,
            "unit": "g",
            "kcal": 335,
            "prot": 62.8,
            "carb": 0,
            "fat": 7.3,
            "shopKey": "frango"
          },
          {
            "food": "Alface, Rúcula, Tomate, Pepino",
            "qty": 162,
            "unit": "g",
            "kcal": 34,
            "prot": 1.6,
            "carb": 6.8,
            "fat": 0.3,
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
            "kcal": 263,
            "prot": 5.1,
            "carb": 56.7,
            "fat": 0.4,
            "shopKey": "arroz_branco"
          },
          {
            "food": "Feijão",
            "qty": 135,
            "unit": "g",
            "kcal": 104,
            "prot": 7,
            "carb": 18.4,
            "fat": 0.7,
            "shopKey": "feijao"
          },
          {
            "food": "Carne Moída (Acém)",
            "qty": 203,
            "unit": "g",
            "kcal": 385,
            "prot": 50,
            "carb": 0,
            "fat": 20.3,
            "shopKey": "acem_moido"
          },
          {
            "food": "Abóbora e Quiabo",
            "qty": 162,
            "unit": "g",
            "kcal": 61,
            "prot": 2,
            "carb": 10.8,
            "fat": 0.7,
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
            "kcal": 232,
            "prot": 5.4,
            "carb": 54,
            "fat": 0.3,
            "shopKey": "batata_inglesa"
          },
          {
            "food": "Feijão",
            "qty": 135,
            "unit": "g",
            "kcal": 104,
            "prot": 7,
            "carb": 18.4,
            "fat": 0.7,
            "shopKey": "feijao"
          },
          {
            "food": "Sobrecoxa assada",
            "qty": 203,
            "unit": "g",
            "kcal": 338,
            "prot": 44.6,
            "carb": 0,
            "fat": 16.2,
            "shopKey": "sobrecoxa"
          },
          {
            "food": "Chuchu e Milho Verde",
            "qty": 108,
            "unit": "g",
            "kcal": 68,
            "prot": 2.7,
            "carb": 13.5,
            "fat": 0.7,
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
            "kcal": 257,
            "prot": 2,
            "carb": 60.8,
            "fat": 0.4,
            "shopKey": "mandioca"
          },
          {
            "food": "Lombo suíno iscas",
            "qty": 203,
            "unit": "g",
            "kcal": 297,
            "prot": 51.3,
            "carb": 0,
            "fat": 9.5,
            "shopKey": "lombo_suino"
          },
          {
            "food": "Couve refogada",
            "qty": 108,
            "unit": "g",
            "kcal": 41,
            "prot": 2.7,
            "carb": 5.4,
            "fat": 0.7,
            "shopKey": "couve"
          },
          {
            "food": "Feijão",
            "qty": 135,
            "unit": "g",
            "kcal": 104,
            "prot": 7,
            "carb": 18.4,
            "fat": 0.7,
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
            "kcal": 263,
            "prot": 5.1,
            "carb": 56.7,
            "fat": 0.4,
            "shopKey": "arroz_branco"
          },
          {
            "food": "Tilápia grelhada",
            "qty": 243,
            "unit": "g",
            "kcal": 311,
            "prot": 62.1,
            "carb": 0,
            "fat": 5.7,
            "shopKey": "tilapia"
          },
          {
            "food": "Pimentão verde e Tomate",
            "qty": 135,
            "unit": "g",
            "kcal": 41,
            "prot": 1.6,
            "carb": 8.1,
            "fat": 0.4,
            "shopKey": "vegetais_base"
          },
          {
            "food": "Feijão",
            "qty": 135,
            "unit": "g",
            "kcal": 104,
            "prot": 7,
            "carb": 18.4,
            "fat": 0.7,
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
            "kcal": 174,
            "prot": 3.2,
            "carb": 40.5,
            "fat": 0.3,
            "shopKey": "batata_doce"
          },
          {
            "food": "Frango desfiado",
            "qty": 203,
            "unit": "g",
            "kcal": 335,
            "prot": 62.8,
            "carb": 0,
            "fat": 7.3,
            "shopKey": "frango"
          },
          {
            "food": "Cenoura e Beterraba",
            "qty": 108,
            "unit": "g",
            "kcal": 47,
            "prot": 2,
            "carb": 10.1,
            "fat": 0.4,
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
            "kcal": 319,
            "prot": 10.8,
            "carb": 63.5,
            "fat": 1.4,
            "shopKey": "macarrao"
          },
          {
            "food": "Carne Moída (Acém)",
            "qty": 203,
            "unit": "g",
            "kcal": 385,
            "prot": 50,
            "carb": 0,
            "fat": 20.3,
            "shopKey": "acem_moido"
          },
          {
            "food": "Tomate purê caseiro",
            "qty": 108,
            "unit": "g",
            "kcal": 27,
            "prot": 1.1,
            "carb": 5.4,
            "fat": 0.3,
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
            "kcal": 389,
            "prot": 33.5,
            "carb": 1.9,
            "fat": 25.9,
            "shopKey": "ovos"
          },
          {
            "food": "Arroz Branco",
            "qty": 203,
            "unit": "g",
            "kcal": 263,
            "prot": 5.1,
            "carb": 56.7,
            "fat": 0.4,
            "shopKey": "arroz_branco"
          },
          {
            "food": "Feijão",
            "qty": 135,
            "unit": "g",
            "kcal": 104,
            "prot": 7,
            "carb": 18.4,
            "fat": 0.7,
            "shopKey": "feijao"
          },
          {
            "food": "Couve e Tomate batidos",
            "qty": 108,
            "unit": "g",
            "kcal": 34,
            "prot": 2,
            "carb": 6.1,
            "fat": 0.3,
            "shopKey": "couve"
          }
        ]
      },
      {
        "id": "almoco-9",
        "name": "Frango ao Molho de Tomate com Arroz e Legumes",
        "desc": "O frango padrão, mas molhado — nunca seca no prato",
        "ingredients": [
          {
            "food": "Arroz Branco",
            "qty": 203,
            "unit": "g",
            "kcal": 263,
            "prot": 5.1,
            "carb": 56.7,
            "fat": 0.4,
            "shopKey": "arroz_branco"
          },
          {
            "food": "Feijão",
            "qty": 135,
            "unit": "g",
            "kcal": 104,
            "prot": 7,
            "carb": 18.4,
            "fat": 0.7,
            "shopKey": "feijao"
          },
          {
            "food": "Frango desfiado",
            "qty": 203,
            "unit": "g",
            "kcal": 335,
            "prot": 62.8,
            "carb": 0,
            "fat": 7.3,
            "shopKey": "frango"
          },
          {
            "food": "Tomate e Cebola refogados",
            "qty": 108,
            "unit": "g",
            "kcal": 27,
            "prot": 1.1,
            "carb": 5.4,
            "fat": 0.3,
            "shopKey": "vegetais_base"
          }
        ]
      },
      {
        "id": "almoco-10",
        "name": "Acém com Batata Inglesa Ensopado",
        "desc": "Carne bem molhada com batata — fartura e sabor",
        "ingredients": [
          {
            "food": "Batata-inglesa",
            "qty": 270,
            "unit": "g",
            "kcal": 232,
            "prot": 5.4,
            "carb": 54,
            "fat": 0.3,
            "shopKey": "batata_inglesa"
          },
          {
            "food": "Carne Moída (Acém)",
            "qty": 203,
            "unit": "g",
            "kcal": 385,
            "prot": 50,
            "carb": 0,
            "fat": 20.3,
            "shopKey": "acem_moido"
          },
          {
            "food": "Feijão",
            "qty": 135,
            "unit": "g",
            "kcal": 104,
            "prot": 7,
            "carb": 18.4,
            "fat": 0.7,
            "shopKey": "feijao"
          },
          {
            "food": "Abóbora e Quiabo",
            "qty": 108,
            "unit": "g",
            "kcal": 41,
            "prot": 1.3,
            "carb": 7.2,
            "fat": 0.5,
            "shopKey": "legumes_amarelos"
          }
        ]
      },
      {
        "id": "almoco-11",
        "name": "Sobrecoxa ao Molho com Macarrão",
        "desc": "O macarrão que você ama agora com sobrecoxa suculenta",
        "ingredients": [
          {
            "food": "Macarrão (peso cru)",
            "qty": 92,
            "unit": "g",
            "kcal": 319,
            "prot": 10.8,
            "carb": 63.5,
            "fat": 1.4,
            "shopKey": "macarrao"
          },
          {
            "food": "Sobrecoxa assada",
            "qty": 135,
            "unit": "g",
            "kcal": 225,
            "prot": 29.7,
            "carb": 0,
            "fat": 10.8,
            "shopKey": "sobrecoxa"
          },
          {
            "food": "Feijão",
            "qty": 135,
            "unit": "g",
            "kcal": 104,
            "prot": 7,
            "carb": 18.4,
            "fat": 0.7,
            "shopKey": "feijao"
          },
          {
            "food": "Tomate e Pimentão",
            "qty": 108,
            "unit": "g",
            "kcal": 27,
            "prot": 1.1,
            "carb": 5.4,
            "fat": 0.3,
            "shopKey": "vegetais_base"
          }
        ]
      },
      {
        "id": "almoco-12",
        "name": "Carne Moída com Mandioca e Couve",
        "desc": "Comida mineira com proteína — a mandioca que você gostou no lugar do arroz",
        "ingredients": [
          {
            "food": "Carne Moída (Acém)",
            "qty": 203,
            "unit": "g",
            "kcal": 385,
            "prot": 50,
            "carb": 0,
            "fat": 20.3,
            "shopKey": "acem_moido"
          },
          {
            "food": "Mandioca cozida",
            "qty": 203,
            "unit": "g",
            "kcal": 257,
            "prot": 2,
            "carb": 60.8,
            "fat": 0.4,
            "shopKey": "mandioca"
          },
          {
            "food": "Feijão",
            "qty": 135,
            "unit": "g",
            "kcal": 104,
            "prot": 7,
            "carb": 18.4,
            "fat": 0.7,
            "shopKey": "feijao"
          },
          {
            "food": "Couve refogada",
            "qty": 108,
            "unit": "g",
            "kcal": 41,
            "prot": 2.7,
            "carb": 5.4,
            "fat": 0.7,
            "shopKey": "couve"
          }
        ]
      },
      {
        "id": "almoco-13",
        "name": "Tilápia ao Forno com Batata Doce e Couve",
        "desc": "Almoço leve e muito proteico — peixe no forno sem cheiro",
        "ingredients": [
          {
            "food": "Tilápia grelhada",
            "qty": 243,
            "unit": "g",
            "kcal": 311,
            "prot": 62.1,
            "carb": 0,
            "fat": 5.7,
            "shopKey": "tilapia"
          },
          {
            "food": "Batata-doce cozida",
            "qty": 203,
            "unit": "g",
            "kcal": 174,
            "prot": 3.2,
            "carb": 40.5,
            "fat": 0.3,
            "shopKey": "batata_doce"
          },
          {
            "food": "Feijão",
            "qty": 108,
            "unit": "g",
            "kcal": 83,
            "prot": 5.6,
            "carb": 14.7,
            "fat": 0.5,
            "shopKey": "feijao"
          },
          {
            "food": "Couve refogada",
            "qty": 108,
            "unit": "g",
            "kcal": 41,
            "prot": 2.7,
            "carb": 5.4,
            "fat": 0.7,
            "shopKey": "couve"
          }
        ]
      },
      {
        "id": "almoco-14",
        "name": "Frango ao Forno com Batata Doce e Feijão",
        "desc": "Trio dourado da recomposição — simples e certeiro",
        "ingredients": [
          {
            "food": "Frango grelhado",
            "qty": 203,
            "unit": "g",
            "kcal": 335,
            "prot": 62.8,
            "carb": 0,
            "fat": 7.3,
            "shopKey": "frango"
          },
          {
            "food": "Batata-doce cozida",
            "qty": 203,
            "unit": "g",
            "kcal": 174,
            "prot": 3.2,
            "carb": 40.5,
            "fat": 0.3,
            "shopKey": "batata_doce"
          },
          {
            "food": "Feijão",
            "qty": 135,
            "unit": "g",
            "kcal": 104,
            "prot": 7,
            "carb": 18.4,
            "fat": 0.7,
            "shopKey": "feijao"
          },
          {
            "food": "Cenoura ralada",
            "qty": 68,
            "unit": "g",
            "kcal": 28,
            "prot": 1.1,
            "carb": 6.5,
            "fat": 0.1,
            "shopKey": "cenoura"
          }
        ]
      },
      {
        "id": "almoco-15",
        "name": "Escondidinho de Batata Doce com Acém",
        "desc": "Versão almoço do escondidinho — batata doce no lugar da inglesa",
        "ingredients": [
          {
            "food": "Batata-doce amassada",
            "qty": 203,
            "unit": "g",
            "kcal": 174,
            "prot": 3.2,
            "carb": 40.5,
            "fat": 0.3,
            "shopKey": "batata_doce"
          },
          {
            "food": "Carne Moída (Acém)",
            "qty": 203,
            "unit": "g",
            "kcal": 385,
            "prot": 50,
            "carb": 0,
            "fat": 20.3,
            "shopKey": "acem_moido"
          },
          {
            "food": "Feijão",
            "qty": 108,
            "unit": "g",
            "kcal": 83,
            "prot": 5.6,
            "carb": 14.7,
            "fat": 0.5,
            "shopKey": "feijao"
          },
          {
            "food": "Tomate e Cebola",
            "qty": 68,
            "unit": "g",
            "kcal": 17,
            "prot": 0.7,
            "carb": 3.4,
            "fat": 0.2,
            "shopKey": "vegetais_base"
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
        "name": "Marmita Pré-Treino (Arroz, Frango e Cenoura)",
        "desc": "Base salgada e saborosa — sem o doce excessivo",
        "ingredients": [
          {
            "food": "Arroz Branco",
            "qty": 150,
            "unit": "g",
            "kcal": 194,
            "prot": 3.8,
            "carb": 41.9,
            "fat": 0.3,
            "shopKey": "arroz_branco"
          },
          {
            "food": "Frango desfiado",
            "qty": 135,
            "unit": "g",
            "kcal": 223,
            "prot": 41.9,
            "carb": 0,
            "fat": 4.9,
            "shopKey": "frango"
          },
          {
            "food": "Cenoura ralada",
            "qty": 68,
            "unit": "g",
            "kcal": 28,
            "prot": 0.7,
            "carb": 6.5,
            "fat": 0.1,
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
            "kcal": 189,
            "prot": 8.1,
            "carb": 32.4,
            "fat": 2.7,
            "shopKey": "pao_forma"
          },
          {
            "food": "Ovos mexidos",
            "qty": 3,
            "unit": "un",
            "kcal": 194,
            "prot": 16.7,
            "carb": 0.9,
            "fat": 13,
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
            "kcal": 169,
            "prot": 10.8,
            "carb": 16.2,
            "fat": 6.8,
            "shopKey": "leite"
          },
          {
            "food": "Banana",
            "qty": 1,
            "unit": "un",
            "kcal": 120,
            "prot": 1.5,
            "carb": 30.8,
            "fat": 0.4,
            "shopKey": "banana"
          },
          {
            "food": "Aveia em flocos",
            "qty": 41,
            "unit": "g",
            "kcal": 158,
            "prot": 5.3,
            "carb": 27.1,
            "fat": 2.8,
            "shopKey": "aveia"
          },
          {
            "food": "Abacate (vitamina)",
            "qty": 68,
            "unit": "g",
            "kcal": 108,
            "prot": 1.4,
            "carb": 5.7,
            "fat": 9.9,
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
            "kcal": 194,
            "prot": 0,
            "carb": 47.5,
            "fat": 0,
            "shopKey": "tapioca"
          },
          {
            "food": "Ovos",
            "qty": 3,
            "unit": "un",
            "kcal": 194,
            "prot": 16.7,
            "carb": 0.9,
            "fat": 13,
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
            "kcal": 135,
            "prot": 9.2,
            "carb": 10.1,
            "fat": 6.1,
            "shopKey": "iogurte"
          },
          {
            "food": "Pasta de amendoim",
            "qty": 27,
            "unit": "g",
            "kcal": 169,
            "prot": 6.8,
            "carb": 5.4,
            "fat": 13.5,
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
            "kcal": 160,
            "prot": 25,
            "carb": 15,
            "fat": 0.5,
            "shopKey": "yopro"
          },
          {
            "food": "Abacaxi",
            "qty": 135,
            "unit": "g",
            "kcal": 68,
            "prot": 0.7,
            "carb": 17.6,
            "fat": 0.1,
            "shopKey": "abacaxi"
          },
          {
            "food": "Semente de Chia",
            "qty": 14,
            "unit": "g",
            "kcal": 65,
            "prot": 2.2,
            "carb": 5.7,
            "fat": 4.1,
            "shopKey": "chia"
          }
        ]
      },
      {
        "id": "pre-7",
        "name": "Vitamina de Banana com Leite e Aveia",
        "desc": "Shake natural rápido — energético sem pesar antes do treino",
        "ingredients": [
          {
            "food": "Leite",
            "qty": 270,
            "unit": "ml",
            "kcal": 135,
            "prot": 8.6,
            "carb": 13,
            "fat": 5.4,
            "shopKey": "leite"
          },
          {
            "food": "Banana",
            "qty": 1,
            "unit": "un",
            "kcal": 120,
            "prot": 1.5,
            "carb": 30.8,
            "fat": 0.4,
            "shopKey": "banana"
          },
          {
            "food": "Aveia em flocos",
            "qty": 40,
            "unit": "g",
            "kcal": 156,
            "prot": 5.2,
            "carb": 26.8,
            "fat": 2.8,
            "shopKey": "aveia"
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
            "kcal": 169,
            "prot": 1.4,
            "carb": 40.5,
            "fat": 0.3,
            "shopKey": "mandioca"
          },
          {
            "food": "Ovos mexidos",
            "qty": 3,
            "unit": "un",
            "kcal": 194,
            "prot": 16.7,
            "carb": 0.9,
            "fat": 13,
            "shopKey": "ovos"
          }
        ]
      },
      {
        "id": "pre-9",
        "name": "Tapioca de Frango com Queijo",
        "desc": "Leve antes do treino e muito mais saboroso — sem o pão seco",
        "ingredients": [
          {
            "food": "Goma de tapioca",
            "qty": 54,
            "unit": "g",
            "kcal": 194,
            "prot": 0,
            "carb": 47.5,
            "fat": 0,
            "shopKey": "tapioca"
          },
          {
            "food": "Frango desfiado",
            "qty": 80,
            "unit": "g",
            "kcal": 132,
            "prot": 24.8,
            "carb": 0,
            "fat": 2.9,
            "shopKey": "frango"
          },
          {
            "food": "Queijo Minas/Frescal",
            "qty": 40,
            "unit": "g",
            "kcal": 107,
            "prot": 7.2,
            "carb": 0.7,
            "fat": 8.4,
            "shopKey": "queijo_minas"
          }
        ]
      },
      {
        "id": "pre-10",
        "name": "Escondidinho Pré-Treino de Batata Inglesa e Frango",
        "desc": "Versão compacta do jantar favorito — perfeito pra malhar pesado",
        "ingredients": [
          {
            "food": "Batata Inglesa amassada",
            "qty": 200,
            "unit": "g",
            "kcal": 172,
            "prot": 4,
            "carb": 40,
            "fat": 0.2,
            "shopKey": "batata_inglesa"
          },
          {
            "food": "Frango desfiado",
            "qty": 135,
            "unit": "g",
            "kcal": 223,
            "prot": 41.9,
            "carb": 0,
            "fat": 4.9,
            "shopKey": "frango"
          },
          {
            "food": "Queijo Minas/Frescal",
            "qty": 20,
            "unit": "g",
            "kcal": 53,
            "prot": 3.6,
            "carb": 0.4,
            "fat": 4.2,
            "shopKey": "queijo_minas"
          }
        ]
      },
      {
        "id": "pre-11",
        "name": "Arroz com Feijão e Ovo Mexido",
        "desc": "O básico que nunca falha antes do treino",
        "ingredients": [
          {
            "food": "Arroz Branco",
            "qty": 150,
            "unit": "g",
            "kcal": 194,
            "prot": 3.8,
            "carb": 41.9,
            "fat": 0.3,
            "shopKey": "arroz_branco"
          },
          {
            "food": "Feijão",
            "qty": 108,
            "unit": "g",
            "kcal": 83,
            "prot": 5.6,
            "carb": 14.7,
            "fat": 0.5,
            "shopKey": "feijao"
          },
          {
            "food": "Ovos mexidos",
            "qty": 3,
            "unit": "un",
            "kcal": 194,
            "prot": 16.7,
            "carb": 0.9,
            "fat": 13,
            "shopKey": "ovos"
          }
        ]
      },
      {
        "id": "pre-12",
        "name": "Shake de Abacate com Chia e Banana",
        "desc": "Versão pré-treino da vitamina favorita com chia — mais energia e saciedade",
        "ingredients": [
          {
            "food": "Leite",
            "qty": 270,
            "unit": "ml",
            "kcal": 135,
            "prot": 8.6,
            "carb": 13,
            "fat": 5.4,
            "shopKey": "leite"
          },
          {
            "food": "Abacate",
            "qty": 68,
            "unit": "g",
            "kcal": 108,
            "prot": 1.4,
            "carb": 5.7,
            "fat": 9.9,
            "shopKey": "abacate"
          },
          {
            "food": "Banana",
            "qty": 1,
            "unit": "un",
            "kcal": 120,
            "prot": 1.5,
            "carb": 30.8,
            "fat": 0.4,
            "shopKey": "banana"
          },
          {
            "food": "Mel",
            "qty": 10,
            "unit": "g",
            "kcal": 29,
            "prot": 0,
            "carb": 7.9,
            "fat": 0,
            "shopKey": "mel"
          },
          {
            "food": "Semente de Chia",
            "qty": 14,
            "unit": "g",
            "kcal": 68,
            "prot": 2.3,
            "carb": 5.7,
            "fat": 4.1,
            "shopKey": "chia"
          }
        ]
      },
      {
        "id": "pre-13",
        "name": "Pão com Pasta de Amendoim e Banana",
        "desc": "Carbo + gordura boa — clássico pré-treino fácil de montar",
        "ingredients": [
          {
            "food": "Pão de forma",
            "qty": 3,
            "unit": "fatias",
            "kcal": 189,
            "prot": 8.1,
            "carb": 32.4,
            "fat": 2.7,
            "shopKey": "pao_forma"
          },
          {
            "food": "Pasta de amendoim",
            "qty": 27,
            "unit": "g",
            "kcal": 169,
            "prot": 6.8,
            "carb": 5.4,
            "fat": 13.5,
            "shopKey": "pasta_amendoim"
          },
          {
            "food": "Banana",
            "qty": 1,
            "unit": "un",
            "kcal": 120,
            "prot": 1.5,
            "carb": 30.8,
            "fat": 0.4,
            "shopKey": "banana"
          }
        ]
      },
      {
        "id": "pre-14",
        "name": "Macarrão com Frango ao Molho",
        "desc": "Alto carbo, alto proteína — o melhor combustível pré-treino",
        "ingredients": [
          {
            "food": "Macarrão (peso cru)",
            "qty": 70,
            "unit": "g",
            "kcal": 243,
            "prot": 8.2,
            "carb": 48.3,
            "fat": 1.1,
            "shopKey": "macarrao"
          },
          {
            "food": "Frango desfiado",
            "qty": 135,
            "unit": "g",
            "kcal": 223,
            "prot": 41.9,
            "carb": 0,
            "fat": 4.9,
            "shopKey": "frango"
          },
          {
            "food": "Molho de tomate",
            "qty": 80,
            "unit": "g",
            "kcal": 20,
            "prot": 0.8,
            "carb": 4,
            "fat": 0.2,
            "shopKey": "vegetais_base"
          }
        ]
      },
      {
        "id": "pre-15",
        "name": "Batata Doce com Ovo Mexido e Queijo",
        "desc": "Carbo lento + proteína + gordura — concentração e resistência",
        "ingredients": [
          {
            "food": "Batata-doce cozida",
            "qty": 203,
            "unit": "g",
            "kcal": 174,
            "prot": 3.2,
            "carb": 40.5,
            "fat": 0.3,
            "shopKey": "batata_doce"
          },
          {
            "food": "Ovos mexidos",
            "qty": 3,
            "unit": "un",
            "kcal": 194,
            "prot": 16.7,
            "carb": 0.9,
            "fat": 13,
            "shopKey": "ovos"
          },
          {
            "food": "Queijo Minas/Frescal",
            "qty": 30,
            "unit": "g",
            "kcal": 80,
            "prot": 5.4,
            "carb": 0.5,
            "fat": 6.3,
            "shopKey": "queijo_minas"
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
            "kcal": 346,
            "prot": 70.2,
            "carb": 0,
            "fat": 6.5,
            "shopKey": "tilapia"
          },
          {
            "food": "Batata-doce amassada/cubos",
            "qty": 203,
            "unit": "g",
            "kcal": 174,
            "prot": 3.2,
            "carb": 40.5,
            "fat": 0.3,
            "shopKey": "batata_doce"
          },
          {
            "food": "Tomate e Pimentão",
            "qty": 108,
            "unit": "g",
            "kcal": 27,
            "prot": 1.1,
            "carb": 6.1,
            "fat": 0.3,
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
            "kcal": 297,
            "prot": 51.3,
            "carb": 0,
            "fat": 9.5,
            "shopKey": "lombo_suino"
          },
          {
            "food": "Arroz Branco cozido",
            "qty": 176,
            "unit": "g",
            "kcal": 228,
            "prot": 4.3,
            "carb": 49.1,
            "fat": 0.3,
            "shopKey": "arroz_branco"
          },
          {
            "food": "Feijão",
            "qty": 108,
            "unit": "g",
            "kcal": 84,
            "prot": 5.7,
            "carb": 14.7,
            "fat": 0.5,
            "shopKey": "feijao"
          },
          {
            "food": "Cenoura ralada",
            "qty": 108,
            "unit": "g",
            "kcal": 43,
            "prot": 1.1,
            "carb": 10.1,
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
            "kcal": 378,
            "prot": 13,
            "carb": 75.6,
            "fat": 1.6,
            "shopKey": "macarrao"
          },
          {
            "food": "Acém ou Patinho moído",
            "qty": 203,
            "unit": "g",
            "kcal": 385,
            "prot": 50,
            "carb": 0,
            "fat": 20.3,
            "shopKey": "acem_moido"
          },
          {
            "food": "Molho de tomate com cebola",
            "qty": 135,
            "unit": "g",
            "kcal": 47,
            "prot": 1.6,
            "carb": 8.8,
            "fat": 0.4,
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
            "kcal": 335,
            "prot": 62.8,
            "carb": 0,
            "fat": 7.3,
            "shopKey": "frango"
          },
          {
            "food": "Arroz Branco cozido",
            "qty": 176,
            "unit": "g",
            "kcal": 228,
            "prot": 4.3,
            "carb": 49.1,
            "fat": 0.3,
            "shopKey": "arroz_branco"
          },
          {
            "food": "Feijão",
            "qty": 108,
            "unit": "g",
            "kcal": 84,
            "prot": 5.7,
            "carb": 14.7,
            "fat": 0.5,
            "shopKey": "feijao"
          },
          {
            "food": "Rúcula, Alface, Pepino e Tomate",
            "qty": 135,
            "unit": "g",
            "kcal": 27,
            "prot": 1.4,
            "carb": 5.4,
            "fat": 0.3,
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
            "kcal": 385,
            "prot": 50,
            "carb": 0,
            "fat": 20.3,
            "shopKey": "acem_moido"
          },
          {
            "food": "Arroz Branco",
            "qty": 176,
            "unit": "g",
            "kcal": 228,
            "prot": 4.3,
            "carb": 49.1,
            "fat": 0.3,
            "shopKey": "arroz_branco"
          },
          {
            "food": "Abóbora e Quiabo",
            "qty": 135,
            "unit": "g",
            "kcal": 47,
            "prot": 1.6,
            "carb": 8.1,
            "fat": 0.4,
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
            "kcal": 338,
            "prot": 44.6,
            "carb": 0,
            "fat": 16.2,
            "shopKey": "sobrecoxa"
          },
          {
            "food": "Mandioca cozida",
            "qty": 203,
            "unit": "g",
            "kcal": 257,
            "prot": 2,
            "carb": 60.8,
            "fat": 0.4,
            "shopKey": "mandioca"
          },
          {
            "food": "Couve refogada",
            "qty": 108,
            "unit": "g",
            "kcal": 41,
            "prot": 2.7,
            "carb": 5.4,
            "fat": 0.7,
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
            "kcal": 232,
            "prot": 5.4,
            "carb": 54,
            "fat": 0.3,
            "shopKey": "batata_inglesa"
          },
          {
            "food": "Frango desfiado com Tomate",
            "qty": 203,
            "unit": "g",
            "kcal": 335,
            "prot": 62.8,
            "carb": 0,
            "fat": 7.3,
            "shopKey": "frango"
          },
          {
            "food": "Milho Verde",
            "qty": 41,
            "unit": "g",
            "kcal": 41,
            "prot": 1.4,
            "carb": 8.1,
            "fat": 0.4,
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
            "kcal": 389,
            "prot": 33.5,
            "carb": 1.9,
            "fat": 25.9,
            "shopKey": "ovos"
          },
          {
            "food": "Arroz Branco",
            "qty": 176,
            "unit": "g",
            "kcal": 228,
            "prot": 4.3,
            "carb": 49.1,
            "fat": 0.3,
            "shopKey": "arroz_branco"
          },
          {
            "food": "Feijão",
            "qty": 108,
            "unit": "g",
            "kcal": 84,
            "prot": 5.7,
            "carb": 14.7,
            "fat": 0.5,
            "shopKey": "feijao"
          },
          {
            "food": "Tomate e Cebola picados",
            "qty": 68,
            "unit": "g",
            "kcal": 20,
            "prot": 0.7,
            "carb": 4.1,
            "fat": 0.1,
            "shopKey": "vegetais_base"
          }
        ]
      },
      {
        "id": "jantar-9",
        "name": "Frango ao Molho de Tomate com Mandioca",
        "desc": "A mandioca que você curtiu, agora com molho e frango molhado",
        "ingredients": [
          {
            "food": "Frango desfiado",
            "qty": 203,
            "unit": "g",
            "kcal": 335,
            "prot": 62.8,
            "carb": 0,
            "fat": 7.3,
            "shopKey": "frango"
          },
          {
            "food": "Mandioca cozida",
            "qty": 203,
            "unit": "g",
            "kcal": 257,
            "prot": 2,
            "carb": 60.8,
            "fat": 0.4,
            "shopKey": "mandioca"
          },
          {
            "food": "Tomate e Pimentão",
            "qty": 108,
            "unit": "g",
            "kcal": 27,
            "prot": 1.1,
            "carb": 5.4,
            "fat": 0.3,
            "shopKey": "vegetais_base"
          }
        ]
      },
      {
        "id": "jantar-10",
        "name": "Sobrecoxa Assada com Batata Inglesa e Couve",
        "desc": "Frango suculento com batata — conforto e proteína na medida",
        "ingredients": [
          {
            "food": "Sobrecoxa assada",
            "qty": 203,
            "unit": "g",
            "kcal": 338,
            "prot": 44.6,
            "carb": 0,
            "fat": 16.2,
            "shopKey": "sobrecoxa"
          },
          {
            "food": "Batata-inglesa",
            "qty": 270,
            "unit": "g",
            "kcal": 232,
            "prot": 5.4,
            "carb": 54,
            "fat": 0.3,
            "shopKey": "batata_inglesa"
          },
          {
            "food": "Couve refogada",
            "qty": 108,
            "unit": "g",
            "kcal": 41,
            "prot": 2.7,
            "carb": 5.4,
            "fat": 0.7,
            "shopKey": "couve"
          }
        ]
      },
      {
        "id": "jantar-11",
        "name": "Acém Ensopado com Arroz e Abóbora",
        "desc": "Caldinho de acém com arroz — reposição máxima pós-treino",
        "ingredients": [
          {
            "food": "Carne Moída (Acém)",
            "qty": 203,
            "unit": "g",
            "kcal": 385,
            "prot": 50,
            "carb": 0,
            "fat": 20.3,
            "shopKey": "acem_moido"
          },
          {
            "food": "Arroz Branco",
            "qty": 176,
            "unit": "g",
            "kcal": 228,
            "prot": 4.3,
            "carb": 49.1,
            "fat": 0.3,
            "shopKey": "arroz_branco"
          },
          {
            "food": "Abóbora e Quiabo",
            "qty": 135,
            "unit": "g",
            "kcal": 47,
            "prot": 1.6,
            "carb": 8.1,
            "fat": 0.4,
            "shopKey": "legumes_amarelos"
          },
          {
            "food": "Feijão",
            "qty": 108,
            "unit": "g",
            "kcal": 83,
            "prot": 5.6,
            "carb": 14.7,
            "fat": 0.5,
            "shopKey": "feijao"
          }
        ]
      },
      {
        "id": "jantar-12",
        "name": "Tilápia com Macarrão e Molho de Tomate",
        "desc": "Peixe magro com macarrão — combo incomum e altamente proteico",
        "ingredients": [
          {
            "food": "Tilápia grelhada",
            "qty": 270,
            "unit": "g",
            "kcal": 346,
            "prot": 70.2,
            "carb": 0,
            "fat": 6.5,
            "shopKey": "tilapia"
          },
          {
            "food": "Macarrão (peso cru)",
            "qty": 80,
            "unit": "g",
            "kcal": 277,
            "prot": 9.4,
            "carb": 55.2,
            "fat": 1.2,
            "shopKey": "macarrao"
          },
          {
            "food": "Molho de tomate",
            "qty": 108,
            "unit": "g",
            "kcal": 27,
            "prot": 1.1,
            "carb": 5.4,
            "fat": 0.3,
            "shopKey": "vegetais_base"
          }
        ]
      },
      {
        "id": "jantar-13",
        "name": "Lombo Suíno com Mandioca e Abóbora",
        "desc": "Lombo que você não curtiu com mingau — agora com mandioca e abóbora",
        "ingredients": [
          {
            "food": "Lombo suíno iscas",
            "qty": 203,
            "unit": "g",
            "kcal": 297,
            "prot": 51.3,
            "carb": 0,
            "fat": 9.5,
            "shopKey": "lombo_suino"
          },
          {
            "food": "Mandioca cozida",
            "qty": 135,
            "unit": "g",
            "kcal": 171,
            "prot": 1.4,
            "carb": 40.5,
            "fat": 0.3,
            "shopKey": "mandioca"
          },
          {
            "food": "Abóbora e Quiabo",
            "qty": 135,
            "unit": "g",
            "kcal": 51,
            "prot": 1.6,
            "carb": 9,
            "fat": 0.5,
            "shopKey": "legumes_amarelos"
          },
          {
            "food": "Feijão",
            "qty": 108,
            "unit": "g",
            "kcal": 83,
            "prot": 5.6,
            "carb": 14.7,
            "fat": 0.5,
            "shopKey": "feijao"
          }
        ]
      },
      {
        "id": "jantar-14",
        "name": "Frango Desfiado com Arroz, Cenoura e Couve",
        "desc": "Refogado colorido — vitamina A e ferro no prato",
        "ingredients": [
          {
            "food": "Frango desfiado",
            "qty": 203,
            "unit": "g",
            "kcal": 335,
            "prot": 62.8,
            "carb": 0,
            "fat": 7.3,
            "shopKey": "frango"
          },
          {
            "food": "Arroz Branco",
            "qty": 176,
            "unit": "g",
            "kcal": 228,
            "prot": 4.3,
            "carb": 49.1,
            "fat": 0.3,
            "shopKey": "arroz_branco"
          },
          {
            "food": "Feijão",
            "qty": 108,
            "unit": "g",
            "kcal": 83,
            "prot": 5.6,
            "carb": 14.7,
            "fat": 0.5,
            "shopKey": "feijao"
          },
          {
            "food": "Couve e Cenoura",
            "qty": 80,
            "unit": "g",
            "kcal": 30,
            "prot": 1.5,
            "carb": 4.8,
            "fat": 0.4,
            "shopKey": "couve"
          }
        ]
      },
      {
        "id": "jantar-15",
        "name": "Sobrecoxa com Macarrão e Molho de Tomate",
        "desc": "Frango gordinho com macarrão — jantar de reposição sem segredo",
        "ingredients": [
          {
            "food": "Sobrecoxa assada",
            "qty": 203,
            "unit": "g",
            "kcal": 338,
            "prot": 44.6,
            "carb": 0,
            "fat": 16.2,
            "shopKey": "sobrecoxa"
          },
          {
            "food": "Macarrão (peso cru)",
            "qty": 80,
            "unit": "g",
            "kcal": 277,
            "prot": 9.4,
            "carb": 55.2,
            "fat": 1.2,
            "shopKey": "macarrao"
          },
          {
            "food": "Molho de tomate",
            "qty": 108,
            "unit": "g",
            "kcal": 27,
            "prot": 1.1,
            "carb": 5.4,
            "fat": 0.3,
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
            "kcal": 105,
            "prot": 11.9,
            "carb": 3.6,
            "fat": 4.9,
            "shopKey": "cottage"
          },
          {
            "food": "Mix de Castanhas",
            "qty": 20,
            "unit": "g",
            "kcal": 123,
            "prot": 3.2,
            "carb": 4.1,
            "fat": 10.5,
            "shopKey": "castanhas"
          },
          {
            "food": "Mel (1 colherzinha)",
            "qty": 7,
            "unit": "g",
            "kcal": 20,
            "prot": 0,
            "carb": 5.5,
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
            "kcal": 135,
            "prot": 9.2,
            "carb": 10.1,
            "fat": 6.1,
            "shopKey": "iogurte"
          },
          {
            "food": "Laranja picada",
            "qty": 1,
            "unit": "un",
            "kcal": 88,
            "prot": 1.6,
            "carb": 21.6,
            "fat": 0.3,
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
            "kcal": 194,
            "prot": 16.7,
            "carb": 0.9,
            "fat": 13,
            "shopKey": "ovos"
          }
        ]
      },
      {
        "id": "ceia-4",
        "name": "Iogurte Natural com Morango e Mel",
        "desc": "Doce e cremoso — o que faltava pro iogurte ficar gostoso",
        "ingredients": [
          {
            "food": "Iogurte Natural Light",
            "qty": 200,
            "unit": "g",
            "kcal": 117,
            "prot": 8,
            "carb": 8.8,
            "fat": 5.3,
            "shopKey": "iogurte"
          },
          {
            "food": "Morango fresco",
            "qty": 80,
            "unit": "g",
            "kcal": 32,
            "prot": 0.8,
            "carb": 7.2,
            "fat": 0.3,
            "shopKey": "frutas_vermelhas"
          },
          {
            "food": "Mel",
            "qty": 10,
            "unit": "g",
            "kcal": 29,
            "prot": 0,
            "carb": 7.9,
            "fat": 0,
            "shopKey": "mel"
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
            "kcal": 81,
            "prot": 0.8,
            "carb": 20.3,
            "fat": 0.3,
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
            "kcal": 61,
            "prot": 1.5,
            "carb": 13.5,
            "fat": 0.5,
            "shopKey": "frutas_vermelhas"
          },
          {
            "food": "Leite desnatado",
            "qty": 135,
            "unit": "ml",
            "kcal": 47,
            "prot": 4.3,
            "carb": 6.8,
            "fat": 0,
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
            "kcal": 108,
            "prot": 7.3,
            "carb": 0.7,
            "fat": 8.5,
            "shopKey": "queijo_minas"
          },
          {
            "food": "Melancia pura",
            "qty": 135,
            "unit": "g",
            "kcal": 41,
            "prot": 0.8,
            "carb": 10.1,
            "fat": 0.1,
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
            "kcal": 95,
            "prot": 4.1,
            "carb": 16.2,
            "fat": 1.4,
            "shopKey": "pao_forma"
          },
          {
            "food": "Pasta de amendoim",
            "qty": 20,
            "unit": "g",
            "kcal": 127,
            "prot": 5.1,
            "carb": 4.1,
            "fat": 10.1,
            "shopKey": "pasta_amendoim"
          }
        ]
      },
      {
        "id": "ceia-9",
        "name": "Granola com Iogurte e Morango",
        "desc": "Terminar o dia com doce natural e leve",
        "ingredients": [
          {
            "food": "Granola",
            "qty": 30,
            "unit": "g",
            "kcal": 135,
            "prot": 3,
            "carb": 20.9,
            "fat": 4.5,
            "shopKey": "granola"
          },
          {
            "food": "Iogurte Natural Light",
            "qty": 150,
            "unit": "g",
            "kcal": 88,
            "prot": 6,
            "carb": 6.6,
            "fat": 4,
            "shopKey": "iogurte"
          },
          {
            "food": "Morango fresco",
            "qty": 80,
            "unit": "g",
            "kcal": 32,
            "prot": 0.8,
            "carb": 7.2,
            "fat": 0.3,
            "shopKey": "frutas_vermelhas"
          }
        ]
      },
      {
        "id": "ceia-10",
        "name": "Banana com Pasta de Amendoim",
        "desc": "Simples, rápido e muito gostoso antes de dormir",
        "ingredients": [
          {
            "food": "Banana",
            "qty": 1,
            "unit": "un",
            "kcal": 120,
            "prot": 1.5,
            "carb": 30.8,
            "fat": 0.4,
            "shopKey": "banana"
          },
          {
            "food": "Pasta de amendoim",
            "qty": 20,
            "unit": "g",
            "kcal": 127,
            "prot": 5.1,
            "carb": 4.1,
            "fat": 10.1,
            "shopKey": "pasta_amendoim"
          }
        ]
      },
      {
        "id": "ceia-11",
        "name": "Tapioca Doce com Queijo e Mel",
        "desc": "Ceia quentinha e adocicada — o conforto noturno",
        "ingredients": [
          {
            "food": "Goma de tapioca",
            "qty": 40,
            "unit": "g",
            "kcal": 144,
            "prot": 0,
            "carb": 35.2,
            "fat": 0,
            "shopKey": "tapioca"
          },
          {
            "food": "Queijo Minas/Frescal",
            "qty": 40,
            "unit": "g",
            "kcal": 107,
            "prot": 7.2,
            "carb": 0.7,
            "fat": 8.4,
            "shopKey": "queijo_minas"
          },
          {
            "food": "Mel",
            "qty": 10,
            "unit": "g",
            "kcal": 29,
            "prot": 0,
            "carb": 7.9,
            "fat": 0,
            "shopKey": "mel"
          }
        ]
      },
      {
        "id": "ceia-12",
        "name": "Iogurte com Banana, Chia e Mel",
        "desc": "Simples e doce — o iogurte que você gosta com chia pra melhorar o sono",
        "ingredients": [
          {
            "food": "Iogurte Natural Light",
            "qty": 200,
            "unit": "g",
            "kcal": 117,
            "prot": 8,
            "carb": 8.8,
            "fat": 5.3,
            "shopKey": "iogurte"
          },
          {
            "food": "Banana",
            "qty": 1,
            "unit": "un",
            "kcal": 120,
            "prot": 1.5,
            "carb": 30.8,
            "fat": 0.4,
            "shopKey": "banana"
          },
          {
            "food": "Mel",
            "qty": 10,
            "unit": "g",
            "kcal": 29,
            "prot": 0,
            "carb": 7.9,
            "fat": 0,
            "shopKey": "mel"
          },
          {
            "food": "Semente de Chia",
            "qty": 14,
            "unit": "g",
            "kcal": 68,
            "prot": 2.3,
            "carb": 5.7,
            "fat": 4.1,
            "shopKey": "chia"
          }
        ]
      },
      {
        "id": "ceia-13",
        "name": "Cottage com Mel e Morango",
        "desc": "Proteína lenta na ceia — cottage sustenta o sono e evita catabolismo",
        "ingredients": [
          {
            "food": "Cottage 4%",
            "qty": 113,
            "unit": "g",
            "kcal": 110,
            "prot": 13,
            "carb": 5,
            "fat": 5,
            "shopKey": "cottage"
          },
          {
            "food": "Mel",
            "qty": 10,
            "unit": "g",
            "kcal": 29,
            "prot": 0,
            "carb": 7.9,
            "fat": 0,
            "shopKey": "mel"
          },
          {
            "food": "Morango fresco",
            "qty": 100,
            "unit": "g",
            "kcal": 40,
            "prot": 1,
            "carb": 9,
            "fat": 0.4,
            "shopKey": "frutas_vermelhas"
          }
        ]
      },
      {
        "id": "ceia-14",
        "name": "Leite com Aveia e Mel",
        "desc": "Mingau que funciona — o segredo é o mel na medida certa",
        "ingredients": [
          {
            "food": "Leite",
            "qty": 270,
            "unit": "ml",
            "kcal": 135,
            "prot": 8.6,
            "carb": 13,
            "fat": 5.4,
            "shopKey": "leite"
          },
          {
            "food": "Aveia em flocos",
            "qty": 20,
            "unit": "g",
            "kcal": 78,
            "prot": 2.6,
            "carb": 13.4,
            "fat": 1.4,
            "shopKey": "aveia"
          },
          {
            "food": "Mel",
            "qty": 15,
            "unit": "g",
            "kcal": 43,
            "prot": 0,
            "carb": 11.5,
            "fat": 0,
            "shopKey": "mel"
          }
        ]
      },
      {
        "id": "ceia-15",
        "name": "Castanhas com Chia, Frutas Vermelhas e Queijo",
        "desc": "Quarteto antiinflamatório — fecha o dia com potência e fibras",
        "ingredients": [
          {
            "food": "Mix de Castanhas",
            "qty": 30,
            "unit": "g",
            "kcal": 181,
            "prot": 6,
            "carb": 6,
            "fat": 15.5,
            "shopKey": "castanhas"
          },
          {
            "food": "Morango/Amoras",
            "qty": 100,
            "unit": "g",
            "kcal": 40,
            "prot": 1,
            "carb": 9,
            "fat": 0.4,
            "shopKey": "frutas_vermelhas"
          },
          {
            "food": "Queijo Minas/Frescal",
            "qty": 30,
            "unit": "g",
            "kcal": 80,
            "prot": 5.4,
            "carb": 0.5,
            "fat": 6.3,
            "shopKey": "queijo_minas"
          },
          {
            "food": "Semente de Chia",
            "qty": 14,
            "unit": "g",
            "kcal": 68,
            "prot": 2.3,
            "carb": 5.7,
            "fat": 4.1,
            "shopKey": "chia"
          }
        ]
      }
    ]
  }
];
const SHOP_MAP = {
  "torrada": {"name":"Torrada Multigrãos","cat":"🍞 Pães e Massas","buyUnit":"pct","buySize":150,"unitG":"g","price":[5,8]},
  "acai": {"name":"Açaí Polpa","cat":"🍇 Frutas","buyUnit":"pct","buySize":400,"unitG":"g","price":[10,16]},
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
