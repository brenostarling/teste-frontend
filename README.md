# Teste Frontend

![Aiko](imagens/aiko.png)

Neste teste serão avaliados seus conhecimentos em Vue.js, Javascript, HTML e CSS, a criatividade e metodologia aplicada no desenvolvimento, a usabilidade e design da aplicação final.

## O Desafio

Seu objetivo é criar um *dashboard* que exiba dados sobre o transporte público da cidade de São Paulo, consultando a [API **Olho Vivo**](api.md) que provê informações em tempo real do monitoramento da frota de ônibus da cidade de São Paulo.

Todas informações relacionadas a documentação e acesso da API se encontram no arquivo [api.md](api.md). 

## Requisitos

Esses requisitos são obrigatórios e devem ser desenvolvidos para a entrega do teste.

* **Posições dos veículos**: Exibir no mapa onde os veículos estavam na sua última atualização.

* **Linhas**: Exibir informações sobre as linhas de ônibus.

* **Paradas**: Exibir os pontos de parada da cidade no mapa.

* **Previsão de chegada**: Dado uma parada informar a previsão de chegada de cada veículo que passe pela parada selecionada.

* **Pesquisa e Filtros**: Permitir que o usuário pesquise e filtre esses dados, interagindo com a interface.

## O que é permitido

* Framework Vue.js.
* Nuxt.js.
* Bibliotecas de componentes
  * Element-ui, Vuetify, Bootstrap Vue, Buefy, etc.

* Bibliotecas e APIs de Mapas (Leafletjs, Openlayers, Google Maps API, etc).

* Template engines (Pug, Ejs, etc).

* Frameworks CSS (Tailwind, Bulma, Bootstrap, Materialize, etc).

* Pré-processadores CSS (SCSS, SASS, LESS, etc).

* Qualquer tecnologia complementar as citadas anteriormente são permitidas desde que seu uso seja justificável.

## O que não é permitido

* Utilizar componentes ou códigos de terceiros que implementem algum dos requisitos.

## Recomendações

* **Linter**: Desenvolva o projeto utilizando algum padrão de formatação de código.

## Extras

Aqui são listados algumas sugestões para você que quer ir além do desafio inicial. Lembrando que você não precisa se limitar a essas sugestões, se tiver pensado em outra funcionalidade que considera relevante ao escopo da aplicação fique à vontade para implementá-la.

* **Refresh automático**: Que as informações exibidas na aplicação sejam atualizadas de tempo em tempo de forma transparente ao usuário.

* **Cálculo de rotas**: Exibir a possível rota de um ou mais ônibus em relação a uma parada (Utilizando API do Google Maps, Leaflet Routing Machine ou equivalentes).

* **Layout responsivo**: Adaptar o layout da aplicação à diferentes tipos de resoluções; otimizar a experiência mobile.

* **Corredores**: Mostrar informações sobre os corredores de ônibus de SP.

* **Velocidade das vias**: Mostrar informações sobre as velocidades das vias.

* **Testes**: Desenvolva testes que achar necessário para a aplicação.

* **Documentação**: Gerar uma documentação da aplicação. A documentação pode incluir detalhes sobre as decisões tomadas, especificação dos componentes desenvolvidos, instruções de uso dentre outras informações que achar relevantes.

## Entregas

Para realizar a entrega do teste você deve:

* Relizar o fork e clonar esse repositório para sua máquina.
  
* Criar uma branch com o nome de `teste/[NOME]`.
  * `[NOME]`: Seu nome.
  * Exemplos: `teste/fulano-da-silva`; `teste/beltrano-primeiro-gomes`.
  
* Faça um commit da sua branch com a implementação do teste.
  
* Realize o pull request da sua branch nesse repositório.

Além do pull request você **deve gravar um vídeo de no máximo 30 minutos** mostrando o que foi desenvolvido, falando sobre as decisões que foram tomadas, as tecnologias utilizadas, arquitetura e tudo que você achar relevante. A facecam é opcional, mas é sempre um extra. Esse vídeo deve ser postado no youtube (pode ser não listado) e seu link deve estar no `README.md` do projeto.
