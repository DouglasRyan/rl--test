let pre = document.getElementById('pre')
let next = document.getElementById('next')

var currDT;
var aryDay = new Array("日", "一", "二", "三", "四", "五", "六");//显示星期  
var lastDay;//页面显示的最后一天
var firstDay;//页面显示的第一天

pre.onclick = previousWeek
next.onclick = nextWeek

initDate();

//初始化日期加载
function initDate() {
    currDT = new Date();
    showdate.innerHTML = currDT.toLocaleDateString(); //显示日期  
    var dw = currDT.getDay();//从Date对象返回一周中的某一天(0~6)
    var tdDT;//日期  

    //在表格中显示一周的日期  
    var objTB = document.getElementById("mytable");//取得表格对象
    for (var i = 0; i < 7; i++) {
        tdDT = getDays()[i];
        if (tdDT.toLocaleDateString() == currDT.toLocaleDateString()) {
            objTB.rows[0].cells[i].style.color = "red";//currDT突出显示  
        }
        dw = tdDT.getDay();//星期几
        objTB.rows[0].cells[i].innerHTML = tdDT.getMonth() + 1 + "月" + tdDT.getDate() + "日 星期" + aryDay[dw];//显示 
    }
    //重新赋值
    lastDay = getDays()[6];//本周的最后一天
    firstDay = getDays()[0];//本周的第一天
}

//取得当前日期一周内的某一天
function getWeek(i) {
    var now = new Date();
    var n = now.getDay();
    var start = new Date();
    start.setDate(now.getDate() - n + i);//取得一周内的第一天、第二天、第三天...
    return start;
}

//取得当前日期一周内的七天
function getDays() {
    var days = new Array();
    for (var i = 1; i <= 7; i++) {
        days[i - 1] = getWeek(i);
    }
    return days;
}

//取得下一周的日期数(共七天)
function getNextWeekDatas(ndt) {
    var days = new Array();
    for (var i = 1; i <= 7; i++) {
        var dt = new Date(ndt);
        days[i - 1] = getNextWeek(dt, i);
    }
    return days;
}

//指定日期的下一周(后七天)
function getNextWeek(dt, i) {
    var today = dt;
    today.setDate(today.getDate() + i);
    return today;
}


//取得上一周的日期数(共七天)
function getPreviousWeekDatas(ndt) {
    var days = new Array();
    for (var i = -7; i <= -1; i++) {
        var dt = new Date(ndt);
        days[7 + i] = getPreviousWeek(dt, i);
    }
    return days;
}

//指定日期的上一周(前七天)
function getPreviousWeek(dt, i) {
    var today = dt;
    today.setDate(today.getDate() + i);
    return today;
}

//下一周
function nextWeek() {
    setCurrDTAfter();//重设时间
    showdate.innerHTML = currDT.toLocaleDateString(); //显示日期  

    //在表格中显示一周的日期  
    var objTB = document.getElementById("mytable");//取得表格对象
    var dw = currDT.getDay();//从Date对象返回一周中的某一天(0~6)
    var tdDT;//日期

    for (var i = 0; i < 7; i++) {
        tdDT = getNextWeekDatas(lastDay)[i];
        if (tdDT.toLocaleDateString() == currDT.toLocaleDateString()) {
            objTB.rows[0].cells[i].style.color = "red";//currDT突出显示  
        }
        dw = tdDT.getDay();//星期几
        objTB.rows[0].cells[i].innerHTML = tdDT.getMonth() + 1 + "月" + tdDT.getDate() + "日 星期" + aryDay[dw]; //显示 
    }
    //重新赋值
    firstDay = getNextWeekDatas(lastDay)[0];//注意赋值顺序1
    lastDay = getNextWeekDatas(lastDay)[6];//注意赋值顺序2
}

//上一周
function previousWeek() {
    settCurrDTBefore();
    showdate.innerHTML = currDT.toLocaleDateString(); //显示日期  

    //在表格中显示一周的日期  
    var objTB = document.getElementById("mytable");//取得表格对象
    var dw = currDT.getDay();//从Date对象返回一周中的某一天(0~6)
    var tdDT;//日期

    for (var i = 0; i < 7; i++) {
        tdDT = (firstDay)[i];

        // if (tdDT.toLocaleDateString() == currDT.toLocaleDateString()) {
        //     objTB.rows[0].cells[i].style.color = "red";//currDT突出显示  
        // }
        dw = tdDT.getDay();//星期几
        objTB.rows[0].cells[i].innerHTML = tdDT.getMonth() + 1 + "月" + tdDT.getDate() + "日 星期" + aryDay[dw];//显示
    }
    //重新赋值
    lastDay = getPreviousWeekDatas(firstDay)[6];//注意赋值顺序1
    firstDay = getPreviousWeekDatas(firstDay)[0];//注意赋值顺序2
}

//当前日期后第七天
function setCurrDTAfter() {
    currDT.setDate(currDT.getDate() + 7);
}

//当前日期前第七天
function settCurrDTBefore() {
    currDT.setDate(currDT.getDate() - 7);
}
