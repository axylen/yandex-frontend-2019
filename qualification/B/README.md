# B. Парсер событий (15 баллов)

Менеджер Евгений решил сделать бота для популярного мессенджера, чтобы автоматически добавлять события в свой календарь. Раз в определенное время бот должен распознавать специально размеченный текст и отправлять его в сервис, который ожидает данные в специальном формате. В силу низкой квалификации в программировании Евгению нужна помощь с модулем, который принимает массив строк и формирует из них строку для сервиса календаря.

## Формат ввода

В каждой строке название мероприятия содержится в кавычках, а дата — в одном из форматов:  
DD.MM.YYYY, DD.MM.YY, DD/MM/YYYY, DD/MM/YY

**Пример входных данных:**
```
[  
  "В это воскресенье (22.09.2019) будет великолепное время, чтобы \"Пробежать марафон\".",  
  "А вот \"Садить деревья\" стоит на следующий день (23/09/19), ведь будет стоять жара."  
]
```

Могут быть и строки, в которых нет нужных данных. Такие строки следует игнорировать.

## Формат вывода
Для примера выше должна вернуться строка:
```
"Пробежать марафон": 22.09.2019  
"Садить деревья": 23.09.19
```

Решение должно быть оформлено в виде commonJS-модуля:

```javascript
module.exports = function(input) {  
 
}
```
