'use strict';

// Инициализация переменных и элементов: таблицы, заголовка
let bdy = document.body,
    table = document.createElement('table'),
    header = document.createElement('tr'),
    key = document.createElement('th'),
    value = document.createElement('th');

// Функция для добавления к таблице строк, соответствующих cookie
let addTableRow = function (cookies) {
    let tr = document.createElement('tr'),
        btn = document.createElement('button'),
        cookie = cookies.split('='),
        btn_td = document.createElement('td');

    // Добавить в таблицу имя и значение текущего cookie
    for (let j = 0; j < 2; j++) {
        let td = document.createElement('td');
        td.appendChild(document.createTextNode(cookie[j]));
        tr.appendChild(td);
    }

    // Добавить к строке аттрибут, по которому ее можно удалить
    btn.setAttribute("cookieName", cookie[0]);

    // Добавить строку и кнопку в таблицу
    btn.appendChild(document.createTextNode('Удалить'));
    btn_td.appendChild(btn);
    tr.setAttribute('id', cookie[0]);
    tr.appendChild(btn_td);

    // Возвращаем строку
    return tr;
};

let checkCookies = function () {
    let sweet_cookies = document.cookie.split('; '),
        len = sweet_cookies.length;

    //Очищаем таблицу
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    // Добавление таблицы к документу
    header.appendChild(key);
    header.appendChild(value);
    table.appendChild(header);

    // Цикл по cookie
    for(let i = 0; i < len; i++){
        if (sweet_cookies[i]) {
            let tr = addTableRow(sweet_cookies[i]);

            // Добавляем строку в таблицу
            table.appendChild(tr);
        }
    }
};

//Добавление формы
let newForm = document.createElement('form'),
    inputName = document.createElement('input'),
    inputValue = document.createElement('input'),
    inputExpires = document.createElement('input'),
    pName = document.createElement('p'),
    pValue = document.createElement('p'),
    pExpires = document.createElement('p'),
    inputButton = document.createElement('button');

// Три текстовых поля и кнопка
inputName.setAttribute('type', 'text');
inputValue.setAttribute('type', 'text');
inputExpires.setAttribute('type', 'text');
inputButton.setAttribute('type', 'button');
inputButton.appendChild(document.createTextNode('Добавить'));

// Размещение полей и кнопки на форме
pName.appendChild(document.createTextNode('Имя'));
pName.appendChild(document.createElement('br'));
pName.appendChild(inputName);
pValue.appendChild(document.createTextNode('Значение'));
pValue.appendChild(document.createElement('br'));
pValue.appendChild(inputValue);
pExpires.appendChild(document.createTextNode('Срок годности (Количество дней)'));
pExpires.appendChild(document.createElement('br'));
pExpires.appendChild(inputExpires);
newForm.appendChild(pName);
newForm.appendChild(pValue);
newForm.appendChild(pExpires);
newForm.appendChild(inputButton);
newForm.appendChild(document.createElement('br'));

inputButton.addEventListener('click', function () {
    // Если все поля заполнены добавляем cookie
    if (inputName.value && inputValue.value && inputExpires.value) {
        if (isNaN(inputExpires.value)){
            alert("Введите число");
            return;
        }

        let date = new Date(),
            ckie,
            tr;

        // Новый cookie
        date.setDate(date.getDate() + parseFloat(inputExpires.value));
        ckie = inputName.value + '=' + inputValue.value + '; expires=' + date.toUTCString();
        document.cookie = ckie;
        tr = addTableRow(ckie);
        table.appendChild(tr);

        //Заново просматриваем все cookie
        checkCookies();

        //Очищаем все поля
        inputName.value = "";
        inputValue.value = "";
        inputExpires.value = "";
    }
    // Иначе выводим сообщение об ошибке
    else{
        alert("Заполните все поля формы");
    }
});

// При клике на кнопку "Удалить" спросить у пользователя,
// действительно ли пользователь хочет удалить cookie.
// Если да, то удалить cookie и соответствующую строку в таблице.
bdy.addEventListener('click', function (e) {
    let clickTarget = e.target;
    if(clickTarget.getAttribute("cookieName")){
        let cookieName = clickTarget.getAttribute("cookieName"),
            answer = confirm(`Удалить cookie с именем ${cookieName}?`);

        if(answer){
            let fordel = document.getElementById(cookieName);
            document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            fordel.parentNode.removeChild(fordel);
        }
    }
});

//Добавляем форму
bdy.appendChild(newForm);

// Стиль для таблицы
table.setAttribute("border", "2");

// Добавление текста к заголовкам
key.appendChild(document.createTextNode('Имя'));
value.appendChild(document.createTextNode('Значение'));

// Добавление таблицы к документу
bdy.appendChild(table);

// Выводим все куки в виде таблицы
checkCookies();
