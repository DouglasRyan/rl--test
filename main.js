let rl = document.getElementById('calendarBody')
let table =document.createElement('table')
let tds = document.getElementsByTagName('td')
rl.appendChild(table)
let isFold = false
let firstDay, lastDay;//周日历依赖
let day = new Date();//今天
let now = new Date()
let today = day.toDateString();
let currentDate = new Date();//当前时间
text.innerText = currentDate.toLocaleDateString();//当天时间文本
let coor = []

//初始化
initDate()

//移动端事件监听
table.addEventListener('touchstart', enter)
function enter(e){
    e.preventDefault()
    let x = e.changedTouches[0].screenX
    let y = e.changedTouches[0].screenY
    coor[0] = [x,y]
}
table.addEventListener('touchmove', move)
function move(e){
    e.preventDefault()
    let x = e.changedTouches[0].screenX
    let y = e.changedTouches[0].screenY
    coor[1] = [x,y]
    //上下滑动
    if((coor[1][1]-coor[0][1])>30){
        down()
    }else if ((coor[1][1]-coor[0][1])<-30){
        up()
    }
    //左右滑动
    if((coor[1][0]-coor[0][0])>30){
        left()
    }else if ((coor[1][0]-coor[0][0])<-30){
        right()
    }
}
table.addEventListener('touchend', end)
function end(e){
    e.preventDefault()
    let x = e.changedTouches[0].screenX
    let y = e.changedTouches[0].screenY
    coor[1] = [x,y]
    //点击变色
    if (coor[0][0]===coor[1][0] && coor[1][1]===coor[0][1]){
        let tar = e.changedTouches[0].target
        if (tar.tagName === "TD") {
            if (tar.innerText!==""){
                for(let i = 0;i<table.children.length;i++){
                    for(let j = 0;j<table.children[i].children.length;j++){
                        if(table.children[i].children[j]===tar){
                            tar.className = "selected"
                            currentDate.setDate(tar.innerText)
                        }else{
                            table.children[i].children[j].className = ""
                        }
                    }
                }
                initDate()
            }
        }
    }

}
//事件监听
//上拉折叠
function up(){
    isFold=true;
    dropBtn.className = "dropBtn active"
    upBtn.className = "upBtn"
    initWeekDate()
}
// fold.onclick=()=>{
//     isFold=true;
//     initWeekDate()
// }
//下拉展开
function down(){
    isFold=false;
    dropBtn.className = "dropBtn"
    upBtn.className = "upBtn active"
    initMonthDate()
}
// unfold.onclick=()=>{
//     isFold=false;
//     initMonthDate()
// }
//左滑动
function left(){
    if (isFold===true){
        setPreCurrentDate();
        text.innerText = currentDate.toLocaleDateString();
        initWeekDate();
    } else{
        let month = currentDate.getMonth();
        month = month - 1;
        let year = currentDate.getFullYear();
        currentDate.setFullYear(year);
        currentDate.setMonth(month);
        initMonthDate();
    }
}
// pre.onclick = () => {
//     if (isFold===true){
//         setPreCurrentDate();
//         text.innerText = currentDate.toLocaleDateString();
//         initWeekDate();
//     } else{
//         let month = currentDate.getMonth();
//         month = month - 1;
//         let year = currentDate.getFullYear();
//         currentDate.setFullYear(year);
//         currentDate.setMonth(month);
//         initMonthDate();
//     }
// }
//右滑动
function right(){
    if (isFold===true) {
        setNextCurrentDate();
        text.innerText = currentDate.toLocaleDateString();
        initWeekDate()
    }else{
        let month = currentDate.getMonth();
        month = month + 1
        let year = currentDate.getFullYear();
        currentDate.setFullYear(year)
        currentDate.setMonth(month)
        initMonthDate();
    }
}
// next.onclick = ()=>{
//     if (isFold===true) {
//         setNextCurrentDate();
//         text.innerText = currentDate.toLocaleDateString();
//         initWeekDate()
//     }else{
//         let month = currentDate.getMonth();
//         month = month + 1
//         let year = currentDate.getFullYear();
//         currentDate.setFullYear(year)
//         currentDate.setMonth(month)
//         initMonthDate();
//     }
// }
//点击变色
options.onclick = (e)=>{
    e.preventDefault()
    let children = e.target.parentElement.children
    for (let i = 0;i<children.length;i++){
        if(children[i]===e.target){
            children[i].className = "optioned"
        }else{
            children[i].className=""
        }
    }
}
// //table点击变色
// table.onclick = (e)=>{
//     e.preventDefault()
//     if (e.target.tagName === "TD") {
//         for(let i = 0;i<table.children.length;i++){
//             for(let j = 0;j<table.children[i].children.length;j++){
//                 if(table.children[i].children[j]===e.target){
//                     e.target.className = "selected"
//                     currentDate.setDate(e.target.innerText)
//                 }else{
//                     table.children[i].children[j].className = ""
//                 }
//             }
//         }
//     }
//
//     initDate()
// }
//点击今天到达今天
toToday.onclick = (e)=>{
    e.preventDefault()
    currentDate = new Date()
    initDate()
}


//初始化函数
function initDate(){
    if (isFold===true){
        initWeekDate()
    } else{
        initMonthDate()
    }
}
function initWeekDate(){
    table.innerHTML='';
    text.innerText = currentDate.toLocaleDateString();
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
    let day = currentDate.getDay();
    let tr = document.createElement('tr')
    for (let i = 0; i < 7; i++) {
        let td = document.createElement('td')
        td.innerText = days[i].getDate();
        if (i === day){
            td.className += 'selected'
        }
        let a = now.getDate().toString()
        if (td.innerText===a){
            let year = currentDate.getFullYear();
            let month = currentDate.getMonth();
            console.log(year,now.getFullYear())
            console.log(year===now.getFullYear())
            if (year === now.getFullYear() && month ===now.getMonth()){
                td.className = 'current'
            }
        }
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
                td.className += "selected"
                if (today == currentDate.toDateString()){
                    td.className += " current"
                }
            }
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
}
