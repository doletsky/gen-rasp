/**
 * Created by orth on 01.02.16.
 */


var countPrist=4;
var prist={
    1:"о.Филипп",
    2:"о.Александр",
    3:"о.Дмитрий",
    4:"о.Михаил",
    все:"все"
}
//var countPrist=3;
//var prist={
//    1:"о.Роман",
//    2:"о.Николай",
//    3:"о.Михаил",
//    все:"все"
//}
//количество служб
var stat={
    все:0
}

//количество выходных
var freeDay={
}
for(var c=1;c<=countPrist;c++){
    stat[c]=0;
    freeDay[c]=0;
}
//месяц для расчета
var month = {
        name:" февраля ",
        first:1,//первый день недели - 1-пн, 2-вт и т.д.
        last:29//дней в месяце
};

var week={
    1:"Пн", 2:"Вт", 3:"Ср", 4:"Чт", 5:"Пт", 6:"Сб", 7:"Вс"
}
//дополнительно даты, когда служат все
var addAll={
    15:"все"
}

var flagWeek=0;//если 5я неделя, то службы распределять

var rasp={}
var weekDey=month.first;
var numWeek=1;

function fun(data)
{

    // Здесь мы получаем данные, отправленные сервером и выводим их на экран.
    req=data;
    var countReq=0;
    for(var key in req) {
        countReq++;
    }
    month.last=countReq;

for(var i=1;i<=month.last;i++){

    rasp[i]={
        wDay:week[weekDey]
    }

    if(weekDey==6 || weekDey==7 || addAll.hasOwnProperty(i)){
        if(i>1 && rasp[i-1].prist!="все") {
            for(var l=1;l<=countPrist;l++){
                if(rasp[i-1].prist!=l)stat[l]++;
            }
        }
        rasp[i].prist="все";
        stat['все']++;
    }

    else{
        if(flagWeek==1){
            var min=31;
            var minId=0;
            for(var j=1;j<=countPrist;j++){
                if(min>stat[j]){
                    min=stat[j];
                    minId=j;
                }
            }
            rasp[i].prist=minId;
            stat[minId]++;
            if(i>1 && rasp[i-1].prist!="все" && rasp[i-1].prist!=rasp[i].prist) {
                stat[rasp[i].prist]++;
            }
        }else{
            rasp[i].prist=numWeek;
            stat[numWeek]++;
            if(i>1 && rasp[i-1].prist!="все" && rasp[i-1].prist!=rasp[i].prist) {
                stat[rasp[i].prist]++;

            }

        }

    }




    weekDey++;
    if(weekDey>7){
        weekDey=1;
        numWeek++;
        if(numWeek>countPrist){
            numWeek=1;
            flagWeek=1;
        }
    }
//console.log(i+': '+stat[2]);
}

for(var f=1;f<=countPrist;f++){
    freeDay[f]=month.last-stat['все']-stat[f];
}

dispRasp();


}

function dispRasp(){
    var i=1;
    for(var key in req){
        var dDay = req[key][0].split(' ');
        var sDay='';
        for(var j=1;j<req[key].length;j++){
            if(req[key][j].length>0) sDay+='<p class="sant">'+req[key][j]+'</p>';
        }
        if(i>1)
        {
            k=i-1;
            $('<tr><td>Вечерня - '+prist[rasp[i].prist]+'</td>').appendTo('.rasp table');
        }
        $('<tr><td rowspan="2">'+dDay[1]+' '+dDay[2]+'<br>'+dDay[0]+'</td><td rowspan="2" id="daysd'+i+'">'+sDay+'</td><td>Литургия - '+prist[rasp[i].prist]+'</td></tr>').appendTo('.rasp table');
        i++;
    }
    for(var f=1;f<=countPrist;f++){
        $('<p>'+prist[f]+': '+freeDay[f]+'</p>').appendTo('.freeDay');
    }

    $('.sant').click(function(){$(this).toggleClass('weight');});
}

$(document).ready(function(){

    var req;
    var today=new Date();
    var mm=today.getMonth()+2;
    var dd=0;//today.getDate();
    var yy=today.getFullYear();

    //init tuning form
    $('.tune .year').children('option:first').html(yy);
    $('.tune .year').children('option:first').val(yy);
    $('.tune .year').children('option:last').html(1+parseInt(yy));
    $('.tune .year').children('option:last').val(1+parseInt(yy));
    $('.tune .month').children('option[value="'+mm+'"]').attr("selected", "selected");

    //if data in localStorage
//    localStorage.prist=JSON.stringify(prist);//"{1:'о.Филипп',2:'о.Александр'}";

    if(window.localStorage.prist){
        //load from localStorage
        var pristLS=JSON.parse(localStorage.prist);
        $('.input_prist_s').html('');//clear list
        var addPrist='';
        for(var key in pristLS){
            if(addPrist.length){
                var cnt=$(".input_prist_s").children("input").length;
                $(".input_prist_s").append('<input type="text" value="'+addPrist+'" name="ips'+cnt+'"><span class="del">x</span>');
            }
            addPrist=pristLS[key];
        }

    }

    $('.input_prist .add').click(function(){
        var litera=$(this).attr('class').slice(0,1);
        var cnt=$(".input_prist_"+litera).children("input").length+1;
        $(".input_prist_"+litera).append('<input type="text" name="ip'+litera+cnt+'"><span class="del">x</span>');
    });
    $('.input_prist').on('click','.del',function(){
        $(this).prev('br:first').remove();
        $(this).prev('input:first').remove();
        $(this).remove();
    });

//    var dt=1;
//    var hh=1;
//    var ll=1;
//    var tt=1;
//    var ss=1;
//    $.ajax({
//        type: 'get',
//        dataType: 'jsonp',
//        url: 'http://j92606we.bget.ru/request.php',
//        data: {
//            month: mm,
//            today: dd,
//            year: yy
//        },
//        jsonpCallback:'fun'
//    });



});


