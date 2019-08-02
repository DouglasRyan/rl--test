let rl = document.getElementById('calendarBody')
let table =document.createElement('table')
rl.appendChild(table)
let isFold = false
//周日历依赖
let firstDay, lastDay
//当前时间
let currentDate = new Date();
//当天时间文本
text.innerText = currentDate.toLocaleDateString();

//初始化
if (isFold===true){
    initWeekDate()
} else{
    initMonthDate()
}

//上拉折叠
fold.onclick=()=>{
    isFold=true;
    initWeekDate()
}
//下拉展开
unfold.onclick=()=>{
    isFold=false;
    initMonthDate()
}

//上一个
pre.onclick = () => {
    if (isFold===true){
        setPreCurrentDate();
        text.innerText = currentDate.toLocaleDateString();
        initWeekDate();
    } else{
        let month = currentDate.getMonth();
        month = month - 1;
        year = currentDate.getFullYear();
        currentDate.setFullYear(year);
        currentDate.setMonth(month);
        initMonthDate();
    }

}
//下一个
next.onclick = ()=>{
    if (isFold===true) {
        setNextCurrentDate();
        text.innerText = currentDate.toLocaleDateString();
        initWeekDate()
    }else{
        let month = currentDate.getMonth();
        month = month + 1
        year = currentDate.getFullYear();
        currentDate.setFullYear(year)
        currentDate.setMonth(month)
        initMonthDate();
    }
}

//初始化函数
function initWeekDate(){
    table.innerHTML='';
    baseDate();
    setWeekDate();
}
function initMonthDate() {
    text.innerText = currentDate.toLocaleDateString();
    table.innerHTML='';
    baseDate();
    setMonthDate();
}
function baseDate() {
    let tr = document.createElement('tr')
    let head = ['日', '一', '二', '三', '四', '五', '六']
    for (let i = 0; i < 7; i++) {
        let th = document.createElement('th')
        th.innerText = head[i]
        tr.appendChild(th)
    }
    table.appendChild(tr)
}

//周
//渲染一周日期
function setWeekDate() {
    let days = getDays(currentDate);

    let tr = document.createElement('tr')
    for (let i = 0; i < 7; i++) {
        let td = document.createElement('td')
        td.innerText = days[i].getDate();
        tr.appendChild(td);
    }
    table.appendChild(tr);
    //重新赋值
    lastDay = getDays(currentDate)[6]; //本周的最后一天
    firstDay = getDays(currentDate)[0]; //本周的第一天
}

//上一周当天
function setPreCurrentDate() {
    currentDate.setDate(currentDate.getDate() - 7);
}

//下一周当天
function setNextCurrentDate() {
    currentDate.setDate(currentDate.getDate() + 7);
}

//在表格中显示一周的日期
function getDays(date) {
    let days = new Array();
    for (let i = 1; i <= 7; i++) {
        days[i - 1] = getInWeek(date,i);
    }
    return days;
}

//取得当前日期一周内的某一天
function getInWeek(date,i) {
    let n = date.getDay(); //今天星期几
    let start = new Date();
    start.setDate(date.getDate() - n + i -1); //一周内的第i天
    return start;
}

//月
//渲染一月日期
function setMonthDate() {
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let day = currentDate.getDate();

    let firstDay = new Date(year, month, 1);
    let firstDayWeek = firstDay.getDay();//获取当月第一天是星期几

    let lastDay = new Date(year, month + 1, 0)
    let lastDayDate = lastDay.getDate();//获取当月最后一天是什么时候

    let line = Math.ceil((lastDayDate + firstDayWeek) / 7);//获取当月有几个星期

    for (let i = 0; i < line; i++) {
        let tr = document.createElement('tr')
        let current, lineIndex;
        for (let j = 0; j < 7; j++) {
            let td = document.createElement('td')
            lineIndex = i * 7 + j;
            current = lineIndex - firstDayWeek + 1;
            current = (current <= 0 || current > lastDayDate) ? "" : current;
            td.innerText = current;
            if (current === day) {
                td.className += "current"
            }
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
}
