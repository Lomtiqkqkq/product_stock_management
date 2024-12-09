# Project: product_stock_management

## Description
***
Данный проект реализует взаимодействие с продуктами и их остатками в заказе или на складе:

1. **Inventory Service** — для работы с товарами и остатками на складах или в заказах.
2. **History Service** — создан для логгирования действий в inventory service и получении этой истории.
3. **User_service** - реализована миграция для заполнения пользователями + реализация работы с флагом problems у юзера
***
### Используемые технологии:
***
- **Node js (+typescript), express, nestJs, postgreSQL, typeorm, JSONRPC, eslint, prettier
***
***
## Установка
***
1. Клонировать репозиторий:

```bash
git clone https://github.com/Lomtiqkqkq/product_stock_managament.git
```
***
# ВАЖНО!!!!
- для запуска inventory_service нужно добавить свою env конфигурацию в файл .env
- для запуска использовать скрипт (слушается на 5000 порту):
```bash
npm run start:dev
```
-для запуска history_service аналогично добавить env
-для запуска скрипт (4000 порт):
```bash
npm run start:dev
```
-для запуска user_service аналогично добавить env,
- скрипт для запуска (6000 порт):
```bash
npm run start:dev
```
