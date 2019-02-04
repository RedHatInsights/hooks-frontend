FROM fedora:29
RUN dnf install -y npm git

COPY . /frontend
WORKDIR /frontend

CMD ["rm", "-rf", "node-modules", "package.json"]

RUN npm install

EXPOSE 8002
