# Тестовое задание

Суть задания состоит в разработке сервиса, способного обрабатывать WebSocket подключения.

Полная схема проекта
![схема проекта](/public/schema.png)

Тесты, которые должны быть покрыты находятся в директории `/tests/websocket.test.js`

Требования:

- Проект должен использовать [Strapi](https://strapi.io/documentation/developer-docs/latest/getting-started/introduction.html) как основу
- Все взаимодействие с базой данных (SQLite) должно происходить через стандартные методы Strapi (`strapi.services`, `strapi.query`, ...). Без явного написания SQL-запросов
