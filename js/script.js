/**
 * Created by orth on 01.02.16.
 */


var countPrist=4;
var prist={
    1:"�.������",
    2:"�.���������",
    3:"�.�������",
    4:"�.������",
    ���:"���"
}
//var countPrist=3;
//var prist={
//    1:"�.�����",
//    2:"�.�������",
//    3:"�.������",
//    ���:"���"
//}
//���������� �����
var stat={
    ���:0
}

//���������� ��������
var freeDay={
}
for(var c=1;c<=countPrist;c++){
    stat[c]=0;
    freeDay[c]=0;
}
//����� ��� �������
var month = {
        name:" ������� ",
        first:1,//������ ���� ������ - 1-��, 2-�� � �.�.
        last:29//���� � ������
};

var week={
    1:"��", 2:"��", 3:"��", 4:"��", 5:"��", 6:"��", 7:"��"
}
//������������� ����, ����� ������ ���
var addAll={
    15:"���"
}

var flagWeek=0;//���� 5� ������, �� ������ ������������

var rasp={};
var weekDey=month.first;
var numWeek=1;

function fun(data)
{

    // ����� �� �������� ������, ������������ �������� � ������� �� �� �����.
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
        if(i>1 && rasp[i-1].prist!="���") {
            for(var l=1;l<=countPrist;l++){
                if(rasp[i-1].prist!=l)stat[l]++;
            }
        }
        rasp[i].prist="���";
        stat['���']++;
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
            if(i>1 && rasp[i-1].prist!="���" && rasp[i-1].prist!=rasp[i].prist) {
                stat[rasp[i].prist]++;
            }
        }else{
            rasp[i].prist=numWeek;
            stat[numWeek]++;
            if(i>1 && rasp[i-1].prist!="���" && rasp[i-1].prist!=rasp[i].prist) {
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
    freeDay[f]=month.last-stat['���']-stat[f];
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
            $('<tr><td>������� - '+prist[rasp[i].prist]+'</td>').appendTo('.rasp table');
        }
        $('<tr><td rowspan="2">'+dDay[1]+' '+dDay[2]+'<br>'+dDay[0]+'</td><td rowspan="2" id="daysd'+i+'">'+sDay+'</td><td>�������� - '+prist[rasp[i].prist]+'</td></tr>').appendTo('.rasp table');
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
//    localStorage.prist=JSON.stringify(prist);//"{1:'�.������',2:'�.���������'}";

    if(window.localStorage.prist){
        //load from localStorage
        var pristLS=JSON.parse(localStorage.prist);console.log(pristLS);
        var pristLSRule=JSON.parse(localStorage.rulePrist);
        $('.input_prist_s').html('');//clear list
        var addPrist='';
        for(var key in pristLS){
            addPrist=pristLS[key];
            if(addPrist.length){
                var arRuleWday=[];
                for(var k=1;k<=7;k++){
                    if(k in pristLSRule[key]['dweek']){
                        arRuleWday[k]=' '+pristLSRule[key]['dweek'][k];
                    }else{
                        if(k==7) arRuleWday[k]=' act';
                        else arRuleWday[k]='';
                    }
                }
                var cnt=$(".input_prist_s").children("input.person").length;
                $(".input_prist_s")
                    .append('<input class="person" type="text" value="'+addPrist+'" name="ips'+cnt+'"><span name="ips'+cnt+'" class="del">x</span>' +
                        ' <span name="ips'+cnt+'" class="dweek'+arRuleWday[1]+'" value="1">��</span>'+
                        ' <span name="ips'+cnt+'" class="dweek'+arRuleWday[2]+'" value="2">��</span>'+
                        ' <span name="ips'+cnt+'" class="dweek'+arRuleWday[3]+'" value="3">��</span>'+
                        ' <span name="ips'+cnt+'" class="dweek'+arRuleWday[4]+'" value="4">��</span>'+
                        ' <span name="ips'+cnt+'" class="dweek'+arRuleWday[5]+'" value="5">��</span>'+
                        ' <span name="ips'+cnt+'" class="dweek'+arRuleWday[6]+'" value="6">��</span>'+
                        ' <span name="ips'+cnt+'" class="dweek'+arRuleWday[7]+'" value="7">��</span>'+
                        ' <input class="person-data-act" name="ips'+cnt+'" type="text"> <input class="person-data-novalid" name="ips'+cnt+'" type="text">');
            }
            addPrist=pristLS[key];
        }

    }
    if(window.localStorage.diak){
        //load from localStorage
        var diakLS=JSON.parse(localStorage.diak);
        var diakLSRule=JSON.parse(localStorage.ruleDiak);
        $('.input_prist_d').html('');//clear list
        var addDiak='';
        for(var key in diakLS){
            addDiak=diakLS[key];
            if(addDiak.length){
                var arRuleWday=[];
                for(var k=1;k<=7;k++){
                    if(k in diakLSRule[key]['dweek']){
                        arRuleWday[k]=' '+diakLSRule[key]['dweek'][k];
                    }else{
                        if(k==7) arRuleWday[k]=' act';
                        else arRuleWday[k]='';
                    }
                }
                var cnt=$(".input_prist_d").children("input.person").length;
                $(".input_prist_d")
                    .append('<input class="person" type="text" value="'+addDiak+'" name="ipd'+cnt+'"><span name="ipd'+cnt+'" class="del">x</span>' +
                        ' <span name="ipd'+cnt+'" class="dweek'+arRuleWday[1]+'" value="1">��</span>'+
                        ' <span name="ipd'+cnt+'" class="dweek'+arRuleWday[2]+'" value="2">��</span>'+
                        ' <span name="ipd'+cnt+'" class="dweek'+arRuleWday[3]+'" value="3">��</span>'+
                        ' <span name="ipd'+cnt+'" class="dweek'+arRuleWday[4]+'" value="4">��</span>'+
                        ' <span name="ipd'+cnt+'" class="dweek'+arRuleWday[5]+'" value="5">��</span>'+
                        ' <span name="ipd'+cnt+'" class="dweek'+arRuleWday[6]+'" value="6">��</span>'+
                        ' <span name="ipd'+cnt+'" class="dweek'+arRuleWday[7]+'" value="7">��</span>'+
                        ' <input class="person-data-act" name="ipd'+cnt+'" type="text"> <input class="person-data-novalid" name="ipd'+cnt+'" type="text">');
            }
            addDiak=diakLS[key];
        }

    }

    $('.input_prist .add').click(function(){
        var litera=$(this).attr('class').slice(0,1);
        var cnt=$(".input_prist_"+litera).children("input.person").length+1;
        $(".input_prist_"+litera)
            .append('<input class="person" type="text" name="ip'+litera+cnt+'"><span name="ip'+litera+cnt+'" class="del">x</span>' +
            ' <span name="ip'+litera+cnt+'" class="dweek" value="1">��</span>'+
            ' <span name="ip'+litera+cnt+'" class="dweek" value="2">��</span>'+
            ' <span name="ip'+litera+cnt+'" class="dweek" value="3">��</span>'+
            ' <span name="ip'+litera+cnt+'" class="dweek" value="4">��</span>'+
            ' <span name="ip'+litera+cnt+'" class="dweek" value="5">��</span>'+
            ' <span name="ip'+litera+cnt+'" class="dweek" value="6">��</span>'+
            ' <span name="ip'+litera+cnt+'" class="dweek act" value="7">��</span>'+
            ' <input class="person-data-act" name="ip'+litera+cnt+'" type="text"> <input class="person-data-novalid" name="ip'+litera+cnt+'" type="text">');
    });
    $('.input_prist').on('click','.del',function(){
        var nameField=$(this).attr('name');
        $('[name="'+nameField+'"]').remove();
    });
    $('.input_prist').on('click','.dweek',function(){
        if($(this).hasClass('novalid')){
            $(this).removeClass('novalid');
            $(this).addClass('act');
        }
        else{
            if($(this).hasClass('act')){
                $(this).removeClass('act');
            }
            else{
                $(this).addClass('novalid');
            }
        }
    });

    //start genrasp
    $('.start').click(function(){
        //�������� prist
        var cntPerson=1;
        var persons={};
        var rulePerson={};
        $('.input_prist_s .person').each(function(){
            if($(this).val().length>0){
                //name
                persons[cntPerson]=$(this).val();
                //dweek
                var nmdw=$(this).attr('name');
                rulePerson[cntPerson]={};
                rulePerson[cntPerson]['dweek']={};
                rulePerson[cntPerson]['dmonth']={};
                $('.dweek[name="'+nmdw+'"]').each(function(){
                    var dwVal=$(this).attr('value');
                    if($(this).hasClass('novalid')){
                        rulePerson[cntPerson]['dweek'][dwVal]= "novalid";
                    }
                    if($(this).hasClass('act')){
                        rulePerson[cntPerson]['dweek'][dwVal]= "act";
                    }
                });
                var strDmonthAct=$('.person-data-act[name="'+nmdw+'"]').val();
                if(strDmonthAct.length>0){
                    var arDmonthAct= strDmonthAct.split(',');
                    for(var i in arDmonthAct){
                        var arLine=arDmonthAct[i].split('-');
                        if(arLine.length>1){
                            for(var j=parseInt(arLine[0]);j<=parseInt(arLine[1]);j++){
                                rulePerson[cntPerson]['dmonth'][j]='act';
                            }
                        }else{
                            rulePerson[cntPerson]['dmonth'][parseInt(arDmonthAct[i])]='act';
                        }
                    }
                }

                var strDmonthnovalid=$('.person-data-novalid[name="'+nmdw+'"]').val();
                if(strDmonthnovalid.length>0){
                    var arDmonthnovalid= strDmonthnovalid.split(',');
                    for(var i in arDmonthnovalid){
                        var arLine=arDmonthnovalid[i].split('-');
                        if(arLine.length>1){
                            for(var j=parseInt(arLine[0]);j<=parseInt(arLine[1]);j++){
                                rulePerson[cntPerson]['dmonth'][j]='novalid';
                            }
                        }else{
                            rulePerson[cntPerson]['dmonth'][parseInt(arDmonthnovalid[i])]='novalid';
                        }
                    }
                }

                cntPerson++;
            }
        });
        //�������� diakons
        var cntDiak=1;
        var diakons={};
        var ruleDiak={};
        $('.input_prist_d .person').each(function(){
            if($(this).val().length>0){
                //name
                diakons[cntDiak]=$(this).val();
                //dweek
                var nmdw=$(this).attr('name');
                ruleDiak[cntDiak]={};
                ruleDiak[cntDiak]['dweek']={};
                ruleDiak[cntDiak]['dmonth']={};
                $('.dweek[name="'+nmdw+'"]').each(function(){
                    var dwVal=$(this).attr('value');
                    if($(this).hasClass('novalid')){
                        ruleDiak[cntDiak]['dweek'][dwVal]= "novalid";
                    }
                    if($(this).hasClass('act')){
                        ruleDiak[cntDiak]['dweek'][dwVal]= "act";
                    }
                });
                var strDmonthAct=$('.person-data-act[name="'+nmdw+'"]').val();
                if(strDmonthAct.length>0){
                    var arDmonthAct= strDmonthAct.split(',');
                    for(var i in arDmonthAct){
                        var arLine=arDmonthAct[i].split('-');
                        if(arLine.length>1){
                            for(var j=parseInt(arLine[0]);j<=parseInt(arLine[1]);j++){
                                ruleDiak[cntDiak]['dmonth'][j]='act';
                            }
                        }else{
                            ruleDiak[cntDiak]['dmonth'][parseInt(arDmonthAct[i])]='act';
                        }
                    }
                }

                var strDmonthnovalid=$('.person-data-novalid[name="'+nmdw+'"]').val();
                if(strDmonthnovalid.length>0){
                    var arDmonthnovalid= strDmonthnovalid.split(',');
                    for(var i in arDmonthnovalid){
                        var arLine=arDmonthnovalid[i].split('-');
                        if(arLine.length>1){
                            for(var j=parseInt(arLine[0]);j<=parseInt(arLine[1]);j++){
                                ruleDiak[cntDiak]['dmonth'][j]='novalid';
                            }
                        }else{
                            ruleDiak[cntDiak]['dmonth'][parseInt(arDmonthnovalid[i])]='novalid';
                        }
                    }
                }

                cntDiak++;
            }
        });
//        console.log(ruleDiak);
        localStorage.prist=JSON.stringify(persons);
        localStorage.diak=JSON.stringify(diakons);
        localStorage.rulePrist=JSON.stringify(rulePerson);
        localStorage.ruleDiak=JSON.stringify(ruleDiak);
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


