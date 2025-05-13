FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos HTML, CSS, imagens do site
COPY pagina-inicial/ /usr/share/nginx/html/

EXPOSE 80
