# Инструкция по запуску

Данный репозиторий содержит исходный код проекта, для запуска не обязательно клонировать весь репозиторий, достаточно будет скачать файлы **docker-compose.yaml** и **.env**.  

После загрузки файлов необходимо разместить их в одной директории, затем выолнить ```docker-compose up``` в данной директории. Запуск может занять некоторое время, так как образы контейнеров будут загружены с Docker Hub.  

Для проверки работоспособности проекта необходимо перейти по адресу http://localhost:3000, где должна отобразиться домашняя страница приложения.

Для того, чтобы пересоздать все контейнеры необходимо прописать в директории, где располагаются **docker-compose.yaml, .env** файлы следующие команды:
- ```docker-compose down```
- ```docker-compose pull```
- ```docker-compose up```

Первая команда остановит и удалит все контейнеры, вторая - загрузит актуальные образы контейнеров с Docker Hub, третья - запустит контейнеры
