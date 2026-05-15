const clientId = '13fb5a0de2a740b7b07af46abea9b5d8';
const clientSecret = 'bae275a9782840e1bbfa747b4edec033';

async function testFatSecret() {
    try {
        console.log('1. Solicitando o Access Token...');
        
        // Encode credenciais em Base64 para a requisição
        const credentials = btoa(`${clientId}:${clientSecret}`);

        const tokenResponse = await fetch('https://oauth.fatsecret.com/connect/token', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&scope=basic'
        });

        const tokenData = await tokenResponse.json();

        if (!tokenResponse.ok) {
            console.error('Erro ao pegar o token:', tokenData);
            return;
        }

        const accessToken = tokenData.access_token;
        console.log('Token obtido com sucesso!');
        console.log('-----------------------------------');

        console.log('2. Buscando informações de um alimento de teste (ID: 33691)...');

        // Faz a chamada para a API usando a integração baseada em URL que estava no seu print
        const foodResponse = await fetch('https://platform.fatsecret.com/rest/food/v4?food_id=33691&format=json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const foodData = await foodResponse.json();

        if (!foodResponse.ok) {
            console.error('Erro ao buscar o alimento:', foodData);
            return;
        }

        console.log('Resposta da API do FatSecret:');
        console.dir(foodData, { depth: null });
        
    } catch (error) {
        console.error('Erro na execução do script:', error);
    }
}

testFatSecret();
