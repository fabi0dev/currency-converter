# Conversor de Moedas

<div>
  <img alt="img-1" src="https://i.imgur.com/50ATCIs.png" />
</div>

# Sobre

Aplicação para converter moedas, feita com React.js,Vite e TailwindCSS. Fiz integração com a [Currency Conversion API](https://currencyapi.com/) para obter dados precisos e confiáveis sobre a referências de moedas. Essa API robusta e de fácil utilização permite manter nossas informações sempre atualizadas, garantindo que suas conversões sejam precisas e confiáveis.

### Como testar o App

1. Clonar o código
   <br />
2. Instale as dependências: `npm install`
   <br />
3. Inicie a aplicação: `npm dev` ou `yarn dev`

<br />
<b>Utilizando Sabiamente a API:</b> 
A API gratuita tem suas limitações, e para garantir uma experiência consistente, na primeira carga da página, os valores mais recentes são persistentemente armazenados no Redux. Isso nos permite oferecer conversões rápidas sem requisitar a API novamente com excessão da moeda base.
