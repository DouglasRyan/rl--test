
let pre = document.getElementById('pre')
let next = document.getElementById('next')
let current = document.getElementById('current')
let rl = document.getElementById('calendarBody')

//当前时间
let curDate = new Date();
let year = curDate.getFullYear();
let month = curDate.getMonth();
let day = curDate.getDate();

currentDate(year, month, day)
createRL(year, month, day)

pre.onclick = () => {
    month = month - 1
    if (month < 1) {
        year = year - 1;
        month = 12;
    }
    createRL(year, month, day)
    currentDate(year, month, day)
}

next.onclick = () => {
    month = month + 1;
    if (month > 12) {
        year = year + 1;
        month = 1;
    }
    createRL(year, month, day)
    currentDate(year, month, day)
}
function currentDate(year, month, day) {
    month = month + 1
    if (month < 1) {
        year = year - 1;
        month = 12;
    }
    if (month > 12) {
        year = year + 1;
        month = 1;
        console.log("a")
    }
    current.innerText = year + "年" + month + "月" + day + "日"
}
function createRL(year, month, day) {
    rl.innerHTML = ""
    let firstDay = new Date(year, month, 1);
    let firstDayWeek = firstDay.getDay();//获取当月第一天是星期几

    let lastDay = new Date(year, month + 1, 0)
    let lastDayDate = lastDay.getDate();//获取当月最后一天是什么时候

    let line = Math.ceil((lastDayDate + firstDayWeek) / 7);//获取当月有几个星期

    let table = document.createElement('table')
    let tr = document.createElement('tr')

    let head = ['日', '一', '二', '三', '四', '五', '六']
    for (let i = 0; i < 7; i++) {
        let th = document.createElement('th')
        th.innerText = head[i]
        tr.appendChild(th)
    }

    table.appendChild(tr)
    rl.appendChild(table)

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
