let rl = document.getElementById('calendarBody')
let table =document.createElement('table')
rl.appendChild(table)
let isFold = true
//周日历依赖
let firstDay, lastDay
//当前时间
let currentDate = new Date();
//当天时间文本
text.innerText = currentDate.toLocaleDateString();




//
// let year = currentDate.getFullYear();
// let month = currentDate.getMonth();
// let day = currentDate.getDate();
//
//
// if(isFold===true){
//     initWeekDate()
// }else{
//     initMonthDate()
// }
//
//
// function initWeekDate() {
//     table.innerHTML='';
//     baseDate();
//     weekDate();
// }
// function initMonthDate() {
//     currentDateText(year, month, day)
//     createRL(year, month, day)
//     console.log(3)
// }
//
// fold.onclick=()=>{
//     isFold = true;
//     initWeekDate();
// }
// unfold.onclick=()=>{
//     isFold = !isFold;
//     if (isFold===true){
//         text.innerText = currentDate.toLocaleDateString();
//         table.innerHTML=''
//         initWeekDate();
//         console.log(1);
//         console.dir (table.innerHTML)
//     } else{
//         initMonthDate()
//         console.log(2)
//     }
//
// }
//
//
//
// pre.onclick = () => {
//     if (isFold===false){
//         month = month - 1
//         if (month < 1) {
//             year = year - 1;
//             month = 12;
//         }
//         initMonthDate();
//     } else{
//         setPreCurrentDate();
//         text.innerText = currentDate.toLocaleDateString();
//         initWeekDate();
//     }
//
// }
//
// next.onclick = () => {
//     if (isFold===false){
//         month = month + 1;
//         if (month > 12) {
//             year = year + 1;
//             month = 1;
//         }
//         initMonthDate();
//     }else{
//         setNextCurrentDate();
//         text.innerText = currentDate.toLocaleDateString();
//         initWeekDate();
//     }
//
//
// }
//
//
// function currentDateText(year, month, day) {
//     month = month + 1
//     if (month < 1) {
//         year = year - 1;
//         month = 12;
//     }
//     if (month > 12) {
//         year = year + 1;
//         month = 1;
//         console.log("a")
//     }
//     text.innerText = year + "年" + month + "月" + day + "日"
// }
// function createRL(year, month, day) {
//     rl.innerHTML = ""
//     let firstDay = new Date(year, month, 1);
//     let firstDayWeek = firstDay.getDay();//获取当月第一天是星期几
//
//     let lastDay = new Date(year, month + 1, 0)
//     let lastDayDate = lastDay.getDate();//获取当月最后一天是什么时候
//
//     let line = Math.ceil((lastDayDate + firstDayWeek) / 7);//获取当月有几个星期
//
//     let table = document.createElement('table')
//     let tr = document.createElement('tr')
//
//     let head = ['日', '一', '二', '三', '四', '五', '六']
//     for (let i = 0; i < 7; i++) {
//         let th = document.createElement('th')
//         th.innerText = head[i]
//         tr.appendChild(th)
//     }
//
//     table.appendChild(tr)
//     rl.appendChild(table)
//
//     for (let i = 0; i < line; i++) {
//         let tr = document.createElement('tr')
//         let current, lineIndex;
//         for (let j = 0; j < 7; j++) {
//             let td = document.createElement('td')
//             lineIndex = i * 7 + j;
//             current = lineIndex - firstDayWeek + 1;
//             current = (current <= 0 || current > lastDayDate) ? "" : current;
//             td.innerText = current;
//             if (current === day) {
//                 td.className += "current"
//             }
//             tr.appendChild(td)
//         }
//         table.appendChild(tr)
//     }
// }
//
//
// //周日历
// //上一周
//
// //上一周当天
// function setPreCurrentDate() {
//     currentDate.setDate(currentDate.getDate() - 7);
// }
// //下一周当天
// function setNextCurrentDate() {
//     currentDate.setDate(currentDate.getDate() + 7);
// }
//
//
// //在表格中显示一周的日期
// function getDays(date) {
//     let days = new Array();
//     for (let i = 1; i <= 7; i++) {
//         days[i - 1] = getInWeek(date,i);
//     }
//     return days;
// }
//
// //取得当前日期一周内的某一天
// function getInWeek(date,i) {
//     let n = date.getDay(); //今天星期几
//     let start = new Date();
//     start.setDate(date.getDate() - n + i -1); //一周内的第i天
//     return start;
// }
//
//
//
// function baseDate() {
//     let tr = document.createElement('tr')
//     let head = ['日', '一', '二', '三', '四', '五', '六']
//     for (let i = 0; i < 7; i++) {
//         let th = document.createElement('th')
//         th.innerText = head[i]
//         tr.appendChild(th)
//     }
//     table.appendChild(tr)
// }
//
// function weekDate() {
//     let days = getDays(currentDate);
//
//     let tr = document.createElement('tr')
//     for (let i = 0; i < 7; i++) {
//         let td = document.createElement('td')
//         td.innerText = days[i].getDate();
//         tr.appendChild(td);
//     }
//     table.appendChild(tr);
//
//     //重新赋值
//     lastDay = getDays(currentDate)[6]; //本周的最后一天
//     firstDay = getDays(currentDate)[0]; //本周的第一天
// }
