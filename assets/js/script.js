let ruznamaDB = { "January": {}, "February": {}, "March": {}, "April": {}, "May": {}, "June": {}, "July": {}, "August": {}, "September": {}, "October": {}, "November": {}, "December": {} };
const mEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const mRU = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
const mFull = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const pKeys = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
const pNames = ["Фаджр", "Шурук", "Зухр", "Аср", "Магриб", "Иша"];
let currentMonthIdx = new Date().getMonth();

async function init() {
    try {
        const res = await fetch('assets/db/times_db.json');
        if (res.ok) { ruznamaDB = await res.json(); }
    } catch (e) { console.log("Локальный режим"); }
    render();
    startCountdown();
    checkJuma();
}

function checkJuma() {
    const isFriday = new Date().getDay() === 5;
    document.getElementById('juma-banner').style.display = isFriday ? 'block' : 'none';
}

function fmt(time) {
    if (!time) return "--:--";
    const [h, m] = time;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function render() {
    const now = new Date(), day = String(now.getDate()).padStart(2, '0'), month = mEN[now.getMonth()];
    document.getElementById('lbl-today').innerText = `${now.getDate()} ${mRU[now.getMonth()]}`;

    const todayData = ruznamaDB[month] ? ruznamaDB[month][day] : null;

    if (todayData) {
        document.getElementById('list-today').innerHTML = pKeys.map((k, i) => `
                <div class="prayer-item" id="prayer-${i}">
                    <span class="name">${pNames[i]}</span>
                    <span class="time">${fmt(todayData[k])}</span>
                </div>`).join('');
        highlightPrayer(todayData);
        updateProgressBar(todayData);
    }
    renderMonthTable(currentMonthIdx);
    document.getElementById('grid-year').innerHTML = mFull.map((name, i) => `
            <div class="month-tile ${i === now.getMonth() ? 'current' : ''}" onclick="selectMonth(${i})">${name}</div>`).join('');
}

function updateProgressBar(data) {
    const now = new Date(), cur = now.getHours() * 60 + now.getMinutes();
    const bar = document.getElementById('day-progress-bar');
    const start = data.Fajr[0] * 60 + data.Fajr[1], end = data.Isha[0] * 60 + data.Isha[1];
    if (cur < start) bar.style.width = '0%';
    else if (cur > end) bar.style.width = '100%';
    else bar.style.width = ((cur - start) / (end - start)) * 100 + '%';
}

function startCountdown() {
    setInterval(() => {
        const now = new Date(), curSecs = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
        const day = String(now.getDate()).padStart(2, '0'), month = mEN[now.getMonth()];
        const todayData = ruznamaDB[month] ? ruznamaDB[month][day] : null;
        if (!todayData) return;

        let nextIdx = -1;
        for (let i = 0; i < pKeys.length; i++) {
            if ((todayData[pKeys[i]][0] * 60 + todayData[pKeys[i]][1]) * 60 > curSecs) { nextIdx = i; break; }
        }

        const timerEl = document.getElementById('timer-val'), labelEl = document.getElementById('next-prayer-name'), warnEl = document.getElementById('forbidden-tag');
        let diffSecs = 0;

        if (nextIdx !== -1) {
            const [h, m] = todayData[pKeys[nextIdx]];
            diffSecs = (h * 3600 + m * 60) - curSecs;
            timerEl.innerText = `${String(Math.floor(diffSecs / 3600)).padStart(2, '0')}:${String(Math.floor((diffSecs % 3600) / 60)).padStart(2, '0')}:${String(diffSecs % 60).padStart(2, '0')}`;
            warnEl.style.display = (diffSecs <= 900) ? 'block' : 'none';
            if (nextIdx === 1) labelEl.innerText = "До конца Фаджр";
            else if (nextIdx === 2) labelEl.innerText = "До наступления Зухр";
            else if (nextIdx > 0) labelEl.innerText = `До конца ${pNames[nextIdx - 1]}`;
            else labelEl.innerText = `До намаза ${pNames[nextIdx]}`;
        } else {
            labelEl.innerText = "День завершен";
            timerEl.innerText = "00:00:00";
            warnEl.style.display = 'none';
        }
    }, 1000);
}

function renderMonthTable(idx) {
    const mNameEN = mEN[idx], tbody = document.getElementById('tbl-month'), monthData = ruznamaDB[mNameEN] || {}, dNow = new Date().getDate(), mNow = new Date().getMonth();
    document.getElementById('lbl-month').innerText = mFull[idx];
    tbody.innerHTML = Object.keys(monthData).sort((a, b) => a - b).map(d => `
            <tr class="${(parseInt(d) === dNow && idx === mNow) ? 'today-row' : ''}">
                <td><b>${d}</b></td>
                ${pKeys.map(k => `<td>${fmt(monthData[d][k])}</td>`).join('')}
            </tr>`).join('');
}

function selectMonth(i) { currentMonthIdx = i; renderMonthTable(i); switchTab(1, 'month', true); }

function highlightPrayer(data) {
    const cur = new Date().getHours() * 60 + new Date().getMinutes(); let active = -1;
    pKeys.forEach((k, i) => { if (cur >= (data[k][0] * 60 + data[k][1])) active = i; });
    document.querySelectorAll('.prayer-item').forEach(el => el.classList.remove('active-now'));
    if (active !== -1) document.getElementById(`prayer-${active}`)?.classList.add('active-now');
}

function switchTab(idx, id, isManualSelection = false) {
    if (id === 'month' && !isManualSelection) { currentMonthIdx = new Date().getMonth(); renderMonthTable(currentMonthIdx); }
    document.getElementById('nav-indicator').style.transform = `translateX(${idx * 100}%)`;
    document.querySelectorAll('.nav-item').forEach((item, i) => item.classList.toggle('active', i === idx));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(`tab-${id}`).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleTheme() {
    const body = document.body, icon = document.getElementById('theme-icon');
    body.classList.toggle('dark-mode'); const isDark = body.classList.contains('dark-mode');
    icon.innerHTML = isDark ? '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>' : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    localStorage.setItem('ruznama-theme', isDark ? 'dark' : 'light');
}

if (localStorage.getItem('ruznama-theme') === 'dark') document.body.classList.add('dark-mode');
init();
setInterval(() => { render(); checkJuma(); }, 30000);