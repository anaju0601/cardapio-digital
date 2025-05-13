FROM nginx:alpine

# Remove arquivos padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia apenas os arquivos de build para a pasta correta
COPY build/ /usr/share/nginx/html/

# Expondo a porta padrão do Nginx
EXPOSE 80