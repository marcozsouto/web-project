Para rodar usando o docker compose:

```
docker compose up
```

se você não quiser usar o docker deve rodar os seguintes comandos para subir o back e front

```
cd back
npm install
npm start
```

```
cd front
npm install
npm start
```

se você quiser rodar as migrations para gerar o banco sqlite (não esqueca de remover o database.db)

```
npm run migrate:up
```

se você quiser povoar o banco com dados

```
npm run seed:up
```
sempre sera criado o usuario com a seguinte credencial(login e senha)
 
```
saturn@saturn.com
123456 
```