FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY index.html pasteis-doces.html pasteis-salgados.html bebidas.html style.css *.jpg *.png *.webp ./

EXPOSE 80