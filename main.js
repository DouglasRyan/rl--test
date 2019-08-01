let firstDay, lastDay
let currentDate = new Date()
let table = document.createElement('table')
rl.appendChild(table)

text.innerText = currentDate.toLocaleDateString();

initDate()

//上一周
pre.onclick = () => {
    setPreCurrentDate();
    text.innerText = currentDate.toLocaleDateString();
    table.innerHTML = null;
    baseDate();
    weekDate();
}

//下一周
next.onclick = ()=>{
    setNextCurrentDate();
    text.innerText = currentDate.toLocaleDateString();
    table.innerHTML = null;
    baseDate();
    weekDate();
}

//上一周当天
function setPreCurrentDate() {
    currentDate.setDate(currentDate.getDate() - 7);
}
//下一周当天
function setNextCurrentDate() {
    currentDate.setDate(currentDate.getDate() + 7);
}

function initDate() {
    baseDate();
    weekDate();
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
    start.setDate(date.getDate() - n + i); //一周内的第i天
    return start;
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

function weekDate() {
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



