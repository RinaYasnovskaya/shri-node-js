# shri-node-js

node v16.3.0

Теперь, если нужно запустить сервер, то:

- npm install
- npm run typescript, чтобы собрать все ts файлы в js, создастся папка bundle
- $env:AUTH_TOKEN="{value}"; npm start

Файлы клиента собираются с помощью конфигураций вебпака, но можно также и с помощью самого typescript

- cd client
- npm install
- npm start (запускает dev сервер)
- npm build (собирает проект)

- cобрать только файлы с кодом: npm run typescript
