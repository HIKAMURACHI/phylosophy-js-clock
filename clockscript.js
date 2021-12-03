years = 100;
months = 12;
days = 7;
hours = 24;
minutes = 60;
seconds = 60;

last_years  = 0;
last_months = 0;
last_days = 0;
last_hours = 0;
last_minutes = 0;
last_seconds = 0;

current_years  = 0;
current_months = 1;
current_days = 1;
current_hours = 0;
current_minutes = 0;
current_seconds = 0;

function displayCanvas(){    
    const years  = document.getElementById('years');
    const months = document.getElementById('months' );
    const days = document.getElementById('days');
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');    

    var canvasHTML = document.getElementById('myCanvas');
    var contextHTML = canvasHTML.getContext('2d');
    contextHTML.strokeRect(0,0,canvasHTML.width, canvasHTML.height);
    
    if(current_seconds == seconds.value)  {current_minutes = current_minutes + 1; current_seconds = 1;} else {current_seconds = current_seconds + 1;}    
    if(current_minutes == minutes.value)  {current_hours = current_hours + 1; current_minutes = 0;}
    if(current_hours == hours.value)      {current_days = current_days + 1; current_hours = 0;}    
    if(current_days == days.value)        {current_months = current_months + 1; current_days = 0;}
    if(current_months == months.value)    {current_years = current_years + 1; current_months = 1;}  

    //Расчет координат центра и радиуса часов
    var radiusClock = canvasHTML.width/2 - 10;
    var xCenterClock = canvasHTML.width/2;
    var yCenterClock = canvasHTML.height/2;

    //Очистка экрана. 
    contextHTML.fillStyle = "#ffffff";
    contextHTML.fillRect(0,0,canvasHTML.width,canvasHTML.height);
	
    //Рисуем контур часов
    contextHTML.strokeStyle =  "#000000";
    contextHTML.lineWidth = 1;
    contextHTML.beginPath();
    contextHTML.arc(xCenterClock, yCenterClock, radiusClock, 0, 2*Math.PI, true);
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.stroke();
    contextHTML.closePath();
	
    //Рисуем рисочки часов
    var radiusNum = radiusClock - 10; //Радиус расположения рисочек	
    var radiusPoint = 2;
    for(var tm = 0; tm < minutes.value; tm++){ // tm < 60
	  contextHTML.beginPath();
      //if(tm % 5 == 0){radiusPoint = ((3.14*287) / (3*minutes.value));if (radiusPoint > 5) {radiusPoint = 5;}}else{radiusPoint = ((3.14*115) / (3*minutes.value));if (radiusPoint > 2) {radiusPoint = 2;}} //для выделения часовых рисочек первая 5      
	  var xPointM = xCenterClock + radiusNum * Math.cos(-6*tm*(Math.PI/(3*minutes.value)) + Math.PI/2); // math.pi/180 
	  var yPointM = yCenterClock - radiusNum * Math.sin(-6*tm*(Math.PI/(3*minutes.value)) + Math.PI/2); // math.pi/180
	  contextHTML.arc(xPointM, yPointM, radiusPoint, 0, 2*Math.PI, true);
	  contextHTML.stroke();
	  contextHTML.closePath();
    } 
	
    //Оцифровка циферблата часов
    radiusPoint = 5
    for(var th = 1; th <= (hours.value / 2); th++){ // th = 12
	contextHTML.beginPath();
	contextHTML.font = 'bold 25px sans-serif';
	var xText = xCenterClock + (radiusNum - 30) * Math.cos(-30*th*(Math.PI/(15*(hours.value / 2))) + Math.PI/2); // math.pi/180
    var yText = yCenterClock - (radiusNum - 30) * Math.sin(-30*th*(Math.PI/(15*(hours.value / 2))) + Math.PI/2); // math.pi/180
    var xPointM = xCenterClock + radiusNum * Math.cos(-30*th*(Math.PI/(15*(hours.value / 2))) + Math.PI/2); // math.pi/180
	var yPointM = yCenterClock - radiusNum * Math.sin(-30*th*(Math.PI/(15*(hours.value / 2))) + Math.PI/2); // math.pi/180
	if(th <= 9){
		contextHTML.strokeText(th, xText - 5 , yText + 10);
	}else{
		contextHTML.strokeText(th, xText - 15 , yText + 10);
    }
    contextHTML.arc(xPointM, yPointM, radiusPoint, 0, 2*Math.PI, true);
     	contextHTML.stroke();
	contextHTML.closePath();	
    }

	
    //Рисуем стрелки
    var lengthSeconds = radiusNum * 0.85;
    var lengthMinutes = radiusNum * 0.7;
    var lengthHour = lengthMinutes / 1.5;
    var d = new Date();                //Получаем экземпляр даты
    //var t_sec = 6*d.getSeconds();                           //Определяем угол для секунд
    //var t_min = 6*(d.getMinutes() + (1/60)*d.getSeconds()); //Определяем угол для минут 60 
    //var t_hour = 30*(d.getHours() + (1/60)*d.getMinutes()); //Определяем угол для часов 60
	var t_sec = (360/seconds.value)*current_seconds;                           //Определяем угол для секунд
    var t_min = (360/minutes.value)*(current_minutes + (1/seconds.value)*current_seconds); //Определяем угол для минут 60 
    var t_hour = (360/(hours.value/2))*(current_hours + (1/minutes.value)*current_minutes); //Определяем угол для часов 60    

    //Рисуем секунды
    contextHTML.beginPath();
    contextHTML.strokeStyle =  "#FF0000";
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.lineTo(xCenterClock + lengthSeconds*Math.cos(Math.PI/2 - t_sec*(Math.PI/180)),
				yCenterClock - lengthSeconds*Math.sin(Math.PI/2 - t_sec*(Math.PI/180)));
    contextHTML.stroke();
    contextHTML.closePath();

    //Рисуем минуты
    contextHTML.beginPath();
    contextHTML.strokeStyle =  "#000000";
    contextHTML.lineWidth = 3;
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.lineTo(xCenterClock + lengthMinutes*Math.cos(Math.PI/2 - t_min*(Math.PI/180)),
				 yCenterClock - lengthMinutes*Math.sin(Math.PI/2 - t_min*(Math.PI/180)));
    contextHTML.stroke();
    contextHTML.closePath();

    //Рисуем часы
    contextHTML.beginPath();
    contextHTML.lineWidth = 5;
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.lineTo(xCenterClock + lengthHour*Math.cos(Math.PI/2 - t_hour*(Math.PI/180)),
				 yCenterClock - lengthHour*Math.sin(Math.PI/2 - t_hour*(Math.PI/180)));
    contextHTML.stroke();
    contextHTML.closePath();	
	
    //Рисуем центр часов
    contextHTML.beginPath();
    contextHTML.strokeStyle =  "#000000";
    contextHTML.fillStyle = "#ffffff";
    contextHTML.lineWidth = 3;
    contextHTML.arc(xCenterClock, yCenterClock, 5, 0, 2*Math.PI, true);
    contextHTML.stroke();
    contextHTML.fill();
    contextHTML.closePath();

    if ((hours.value != last_hours) || (minutes.value != last_minutes) || (seconds.value != last_seconds)) {
        console.log(hours.value, last_hours, minutes.value, last_minutes, seconds.value, last_seconds);          
    }

    /*----------------------------------------------------------------------------*/
    last_years  = years.value;
    last_months = months.value;
    last_days = days.value;
    last_hours = hours.value;
    last_minutes = minutes.value;
    last_seconds = seconds.value;    

    console.log(current_seconds, current_minutes, current_hours, current_days, current_months, current_years);

    
    /*----------------------------------------------------------------------------*/

    return;
}

window.onload = function(){
    window.setInterval(
	function(){
		var d = new Date();
		document.getElementById("clock").innerHTML = d.toLocaleTimeString();
		displayCanvas();
	}
    , 1000);    
}

/*-------------------------------------------------------------------------------*/