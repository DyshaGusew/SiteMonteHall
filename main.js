var counter = 0;
var counterChange = 0;
var counterNoChange = 0;
var counterChangeFalse = 0;
var counterNoChangeFalse = 0;

resetGame();

function firstClickOnDoor(event){
    //Назначаю выгрышную дверь
    var vinDoor = Math.ceil(Math.random()*3);
    localStorage.setItem("vinDoor", vinDoor);

    //Закрашиваю выбранную дверь
    var idSelectedDoor = event.target.id;
    var selectedDoor = parseInt(idSelectedDoor.slice(-1));
    document.getElementById(idSelectedDoor).style.backgroundImage = "url('open.png')";
    localStorage.setItem("selectedOneDoor", selectedDoor);

    //Назначаю и закравашиваю проигрышную дверь
    var idFailDoor = "door"+getFailDoor(vinDoor, selectedDoor);
    colorFailDoor(idFailDoor);

    document.getElementById("textGame").innerHTML = "Я открыл дверь, за которой находится коза, измените ли Вы ваш выбор?";

    //Устанавливаю дверям функцию при втором нажатии
    for(var i = 1; i <= 3; i++){
        var idDoor = "door"+i;
        document.getElementById(idDoor).onclick = secondClickOnDoor;
    }
}

function secondClickOnDoor(event){
    //Получаю вторую выбранную дверь
    var idSelectedSecondDoor = event.target.id;
    var selectedSecondDoor = idSelectedSecondDoor.slice(-1);
    localStorage.setItem("selectedTwoDoor", selectedSecondDoor);

    //Если это выгрышная дверь
    if(selectedSecondDoor === localStorage.getItem("vinDoor")){
        document.getElementById("textGame").innerHTML = "Поздравляем, Вы выграли аааавтомобиль!!!";
        document.getElementById(idSelectedSecondDoor).style.backgroundImage = "url('car.jpg')";

        //Убираю у оставшийся двери метку выбора и устанавливаю козу
        for(var i = 1; i <= 3; i++){
            var idDoor = "door"+i;
            if(i !== parseInt(selectedSecondDoor) || i !== parseInt(localStorage.getItem("vinDoor")))
                document.getElementById(idDoor).style.backgroundImage = "url('koza.png')";
        }

        //Проверка было ли изменение двери при победе
        if(localStorage.getItem("selectedTwoDoor") !== localStorage.getItem("selectedOneDoor"))
            document.getElementById("change").innerHTML = ++counterChange;
        else
            document.getElementById("noChange").innerHTML = ++counterNoChange;
    }

    //Если это проигрышная дверь
    else{
        //Открываю все двери
        document.getElementById("textGame").innerHTML = "Увы, за выбранной дверью была коза, попробуте еще раз";
        document.getElementById("door" + localStorage.getItem("vinDoor")).style.backgroundImage = "url('car.jpg')";
        colorFailDoor(idSelectedSecondDoor);      

        //Проверка было ли изменение двери при проигрыше
        if(localStorage.getItem("selectedTwoDoor") !== localStorage.getItem("selectedOneDoor"))
            document.getElementById("changeFalse").innerHTML = ++counterChangeFalse;
        else
            document.getElementById("noChangeFalse").innerHTML = ++counterNoChangeFalse;
    }
    
    //Устанавливаю на картинки возможность кликать для перезапуска игры
    setNevGameClickDoors(); 
    for(var i = 1; i <= 3; i++){
        var idDoor = "door"+i;
        var door = document.getElementById(idDoor);
        door.onmousemove = function(){};
        door.onmouseleave = function(){};
    }
    counter++;
}

function getFailDoor(vinDoor, selectedDoor){
    var i = 1;
    while(i === vinDoor || i === selectedDoor)
        i++;
    return i;
}

function colorFailDoor(idFailDoor){
    document.getElementById(idFailDoor).style.backgroundImage = "url('koza.png')";
    document.getElementById(idFailDoor).style.pointerEvents = 'none';
}

function resetGame(){
    for(var i = 1; i <= 3; i++){
        var idDoor = "door"+i;
        var door = document.getElementById(idDoor);
        door.style.backgroundImage = "url('close.png')";
        door.onclick = firstClickOnDoor;
        door.style.pointerEvents = 'visiblePainted';
        door.onmousemove = openDoor;
        door.onmouseleave = closeDoor;
    }
    document.getElementById("textGame").innerHTML = "Выберите дверь, за которой находится автомобиль";
    document.getElementById("counter").innerHTML = "Количество игр - " + counter;
}

function openDoor(event){
    document.getElementById(event.target.id).style.backgroundImage = "url('open.png')";
}

function closeDoor(event){
    document.getElementById(event.target.id).style.backgroundImage = "url('close.png')";
}

function setNevGameClickDoors(){
    for(var i = 1; i <= 3; i++){
        var idDoor = "door"+i;
        document.getElementById(idDoor).onclick = resetGame;
        document.getElementById(idDoor).style.pointerEvents = 'visiblePainted';
    }  
}