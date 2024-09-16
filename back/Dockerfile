# Use uma imagem base do Node.js
FROM node:16

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código do projeto para dentro do contêiner
COPY . .

# Expõe a porta que o app utiliza
EXPOSE 3000

# Define o comando para rodar a aplicação
CMD ["npm", "start"]
