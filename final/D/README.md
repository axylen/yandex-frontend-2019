# D. Ход конём (40 баллов)

Геннадий - интеллектуал. Он любит знакомиться с интересными людьми. Но будучи человеком осмотрительным и недоверчивым, делает он это только в интернете. Недавно Геннадий обнаружил, что сопоставимых по IQ собеседников можно отыскать на шахматном форуме, но вот беда - в шахматы играть Геннадий не умеет, а все обучаторы основаны на javascript-е, который Геннадий осмотрительно отключает, чтобы избежать вероятности подцепить вирус. 

Чтобы помочь Геннадию - предлагаем сделать обучатор для игры в шахматы без javascript, который будет показывать, как ходит конь. Обучатор должен выглядеть как шахматная доска. Кликаешь по клетке - тебе показывают, куда с этой клетки может пойти конь. 

## Формат ввода
html-документ, при загрузке которого рисуется шахматная доска

## Формат вывода

Задание будет протестировано в реальном браузере (Chrome 77). 

В браузере будет загружен ваш html-документ. Робот кликает в различные ячейки шахматного поля и снимает скриншоты после кликов. 

Скриншоты должны соответствовать эталонным 

### Пример
![Поле](img/chess.png)

## Примечания
- Реализация на CSS и HTML. Javascript использовать нельзя.
- Вся верстка должна быть квадратной, без теней, градиентов, скруглений и т.п.
- Ширина и высота ячейки - 30 пикселей
- Шахматное поле находится на странице слева сверху, без отступов
- Цвет выделенной ячейки #ﬀ0000
- Цвет ячейки, на которую может ходить фигура #0000ﬀ
- Цвет светлой ячейки #f4cd8d
- Цвет темной ячейки #745853
- Левая верхняя ячейка светлая
- Изначально ни одна ячейка не выделена
- Выделение происходит по клику в конкретную ячейку и сохраняется до следующего клика