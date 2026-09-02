import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyByga5HSKMq7ohPJHPz0gFeWllfQ1ApyE4",
    authDomain: "turkuaz-3e1ea.firebaseapp.com",
    projectId: "turkuaz-3e1ea",
    storageBucket: "turkuaz-3e1ea.firebasestorage.app",
    messagingSenderId: "1083804080928",
    appId: "1:1083804080928:web:fc08d6c6b7820891075545"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
let currentUser = null;

const i18n = {
    tr: {
        subtitle: "Dinamik Haftalık Program ve Takvim Yönetimi",
        quote: "\"İnsana ancak çalıştığının karşılığı vardır. (Necm, 53/39)\"",
        profile: "Profil",
        login: "Google ile Giriş Yap",
        logout: "Çıkış",
        download_png: "PNG İndir",
        calendar: "Takvim",
        important_dates: "Önemli Tarihler",
        no_dates: "Bu ay eklenmiş tarih yok.",
        weekly_todo: "Haftalık Görev Listesi",
        add_todo_placeholder: "Yeni görev ekle...",
        no_todo: "Planlanmış görev yok.",
        weekly_program: "HAFTALIK PROGRAMIM",
        creation_date: "Oluşturulma Tarihi",
        add: "Ekle",
        paste: "Yapıştır",
        months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
        days_short: ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"],
        days_long: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"],
        planned_events: "Planlanan Etkinlikler",
        clear_confirm: "Tüm haftalık programı, görevleri ve tarihleri sıfırlamak istediğinize emin misiniz?",
        logout_confirm: "Hesabınızdan çıkış yapmak istiyor musunuz?",
        login_error: "Giriş esnasında bir sorun oluştu. Detay: ",
        copy_toast: "Kopyalandı! Paneller arası yapıştırabilirsiniz.",
        paste_cancel: "Yapıştırma işlemi iptal edildi.",
        paste_success: "Öğe başarıyla yapıştırıldı!",
        edit_prompt: "Görevi düzenle:",
        note_prompt: "için önemli bir not girin (Silmek için boş bırakın):",
        downloading: "İndiriliyor...",
        modal_plan: "Etkinlik Planla",
        modal_time: "Saat / Zaman Dilimi",
        modal_title: "Etkinlik Başlığı",
        modal_color: "Renk Teması",
        c_mono: "S/B", c_amber: "Sarı", c_rose: "Pembe", c_purple: "Mor", c_emerald: "Yeşil",
        cancel: "İptal",
        save: "Kaydet",
        profile_title: "Başarı Profilim",
        profile_center: "Kişisel Gelişim Merkezi",
        success_rate: "Bugünün başarı oranı",
        current_streak: "Güncel seri",
        longest_streak: "En uzun seri",
        total_usage: "Toplam kullanım",
        weekly_avg: "7 günlük ortalama",
        success_graph: "Son 7 Günlük Görev Grafiği",
        trend_chart_title: "Haftalık Performans ve İstikrar Trendi",
        trend_chart_sub: "Son 4 haftanın başarı marjı ve verimlilik eğrisi",
        trend_legend: "Haftalık Verim",
        task: "görev",
        day: "gün",
        completed_tasks: "görev tamamlandı",
        no_task_msg: "Bugünkü oranını görmek için haftalık görev listene bir görev ekle.",
        full_success_msg: "Harika! Bugünün bütün görevlerini tamamladın.",
        mid_success_msg: "İyi gidiyorsun; birkaç adım daha kaldı.",
        low_success_msg: "Küçük bir görevle başla ve ritmini oluştur.",
        empty_slot: "Sürükle veya Ekle"
    },
    en: {
        subtitle: "Dynamic Weekly Schedule & Calendar Management",
        quote: "\"Man has nothing but what he strives for. (An-Najm, 53/39)\"",
        profile: "Profile",
        login: "Sign in with Google",
        logout: "Logout",
        download_png: "Download PNG",
        calendar: "Calendar",
        important_dates: "Important Dates",
        no_dates: "No dates added this month.",
        weekly_todo: "Weekly To-Do List",
        add_todo_placeholder: "Add new task...",
        no_todo: "No scheduled tasks.",
        weekly_program: "MY WEEKLY SCHEDULE",
        creation_date: "Creation Date",
        add: "Add",
        paste: "Paste",
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        days_short: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        days_long: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        planned_events: "Planned Activities",
        clear_confirm: "Are you sure you want to reset the entire weekly schedule, tasks, and dates?",
        logout_confirm: "Do you want to log out of your account?",
        login_error: "An error occurred during login. Details: ",
        copy_toast: "Copied! You can paste across panels.",
        paste_cancel: "Paste operation cancelled.",
        paste_success: "Item pasted successfully!",
        edit_prompt: "Edit task:",
        note_prompt: "enter an important note (leave blank to delete):",
        downloading: "Downloading...",
        modal_plan: "Plan Event",
        modal_time: "Time / Timezone",
        modal_title: "Event Title",
        modal_color: "Color Theme",
        c_mono: "B/W", c_amber: "Amber", c_rose: "Pink", c_purple: "Purple", c_emerald: "Green",
        cancel: "Cancel",
        save: "Save",
        profile_title: "My Success Profile",
        profile_center: "Personal Development Center",
        success_rate: "Today's success rate",
        current_streak: "Current streak",
        longest_streak: "Longest streak",
        total_usage: "Total usage",
        weekly_avg: "7-day average",
        success_graph: "Last 7 Days Task Chart",
        trend_chart_title: "Weekly Performance & Consistency Trend",
        trend_chart_sub: "Success margin and efficiency curve for the last 4 weeks",
        trend_legend: "Weekly Margin",
        task: "tasks",
        day: "days",
        completed_tasks: "tasks completed",
        no_task_msg: "Add a task to your weekly list to see today's rate.",
        full_success_msg: "Great! You completed all tasks for today.",
        mid_success_msg: "Doing well; just a few steps left.",
        low_success_msg: "Start with a small task to build your rhythm.",
        empty_slot: "Drag or Add"
    }
};

let currentLang = localStorage.getItem('turkuaz_lang') || 'tr';
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();
let activeDayIndex = (new Date().getDay() + 6) % 7;
let daySortableInstance = null;
let todoSortableInstance = null;
window.copiedItem = null;

let appData = {
    weeklyEvents: {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []},
    todoItems: [],
    importantDates: {},
    successHistory: {},
    usage: { firstVisit: null, lastVisit: null, visitedDates: [] }
};

window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem('turkuaz_theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        document.getElementById('theme-icon').classList.replace('fa-moon', 'fa-sun');
    }

    loadDataFromLocalStorage();
    trackDailyVisit();
    snapshotDailySuccess(false);
    initDayTabs(); 
    initDragAndDrop();
    applyLanguage();
    updateHeaderStreak();

    document.getElementById('profile-modal').addEventListener('click', event => {
        if (event.target.id === 'profile-modal') closeProfileDashboard();
    });
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && window.copiedItem) {
        window.copiedItem = null;
        updateAddButtonsState();
        showToast(i18n[currentLang].paste_cancel);
    }
    if (e.key === 'Escape' && !document.getElementById('profile-modal').classList.contains('hidden')) {
        closeProfileDashboard();
    }
});

onAuthStateChanged(auth, (user) => {
    const syncBtnContent = document.getElementById("sync-btn-content");
    if (user) {
        currentUser = user;
        syncBtnContent.innerHTML = `<img src="${user.photoURL || 'https://via.placeholder.com/150'}" class="w-5 h-5 rounded-full border border-blue-400" referrerpolicy="no-referrer"> <span class="truncate max-w-[100px] font-bold hidden sm:inline">${user.displayName.split(' ')[0]} (${i18n[currentLang].logout})</span>`;
    } else {
        currentUser = null;
        syncBtnContent.innerHTML = `<i class="fa-brands fa-google text-xs sm:text-sm"></i> <span class="hidden sm:inline" data-i18n="login">${i18n[currentLang].login}</span>`;
    }
});

window.handleAuthAction = function() {
    if (currentUser) {
        if (confirm(i18n[currentLang].logout_confirm)) signOut(auth).catch(err => console.error(err));
    } else {
        signInWithPopup(auth, googleProvider).catch((error) => alert(i18n[currentLang].login_error + error.message));
    }
}

window.toggleLang = function() {
    currentLang = currentLang === 'tr' ? 'en' : 'tr';
    localStorage.setItem('turkuaz_lang', currentLang);
    applyLanguage();
}

function applyLanguage() {
    document.getElementById('lang-btn').innerText = currentLang === 'tr' ? 'EN' : 'TR';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[currentLang][key]) {
            if (el.tagName === 'INPUT' && el.type === 'text' && el.hasAttribute('placeholder')) el.placeholder = i18n[currentLang][key];
            else el.innerText = i18n[currentLang][key];
        }
    });

    document.documentElement.style.setProperty('--empty-text', `"${i18n[currentLang].empty_slot}"`);
    const liveDate = document.getElementById('live-date-string');
    if(liveDate) liveDate.innerText = new Date().toLocaleDateString(currentLang === 'tr' ? 'tr-TR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' });

    updateDayTabsState();
    renderActiveDayView();
    renderCalendar();
    renderTodos();
    renderImportantDatesList();
    updateAddButtonsState();
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = "fixed bottom-6 right-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2.5 rounded-xl shadow-2xl font-semibold text-xs sm:text-sm z-[100] transition-transform duration-300 transform translate-y-0 opacity-100 flex items-center gap-2 border border-slate-700/50";
    toast.innerHTML = `<i class="fa-solid fa-check-circle text-turquoise-400 dark:text-turquoise-600"></i> <span>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.transform = 'translateY(15px)'; toast.style.opacity = '0'; }, 2000);
    setTimeout(() => document.body.removeChild(toast), 2300);
}

window.toggleTheme = function() {
    const htmlClasses = document.documentElement.classList;
    const icon = document.getElementById('theme-icon');
    if (htmlClasses.contains('dark')) {
        htmlClasses.remove('dark');
        localStorage.setItem('turkuaz_theme', 'light');
        icon.classList.replace('fa-sun', 'fa-moon');
    } else {
        htmlClasses.add('dark');
        localStorage.setItem('turkuaz_theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
}

function saveDataToLocalStorage() {
    snapshotDailySuccess(false);
    localStorage.setItem("turkuaz_planner_data", JSON.stringify(appData));
}

function loadDataFromLocalStorage() {
    const saved = localStorage.getItem("turkuaz_planner_data");
    if (saved) {
        try {
            appData = Object.assign(appData, JSON.parse(saved));
        } catch (e) { console.error(e); }
    }
}

window.clearAllData = function() {
    if (confirm(i18n[currentLang].clear_confirm)) {
        localStorage.removeItem("turkuaz_planner_data");
        appData = {weeklyEvents: {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []}, todoItems: [], importantDates: {}, successHistory: {}, usage: { firstVisit: null, lastVisit: null, visitedDates: [] }};
        trackDailyVisit();
        saveDataToLocalStorage();
        updateHeaderStreak();
        renderCalendar();
        renderTodos();
        updateDayTabsState();
        renderActiveDayView();
    }
}

function localDateKey(date = new Date()) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function dateFromKey(key) {
    const [y, m, d] = key.split('-').map(Number);
    return new Date(y, m - 1, d, 12, 0, 0);
}

function getRecentDateKeys(count) {
    const dates = [];
    const cursor = new Date();
    cursor.setHours(12, 0, 0, 0);
    for (let i = count - 1; i >= 0; i--) {
        const d = new Date(cursor);
        d.setDate(cursor.getDate() - i);
        dates.push(localDateKey(d));
    }
    return dates;
}

function trackDailyVisit() {
    const today = localDateKey();
    if (!appData.usage.firstVisit) appData.usage.firstVisit = today;
    if (!appData.usage.visitedDates.includes(today)) appData.usage.visitedDates.push(today);
    appData.usage.visitedDates.sort();
    appData.usage.lastVisit = today;
}

function calculateStreakStats() {
    const visitedSet = new Set(appData.usage.visitedDates || []);
    let current = 0, cursor = new Date();
    cursor.setHours(12, 0, 0, 0);
    while (visitedSet.has(localDateKey(cursor))) { current++; cursor.setDate(cursor.getDate() - 1); }
    
    let longest = 0, running = 0, previous = null;
    (appData.usage.visitedDates || []).forEach(key => {
        const value = dateFromKey(key);
        running = (previous && Math.round((value - previous) / 86400000) === 1) ? running + 1 : 1;
        longest = Math.max(longest, running);
        previous = value;
    });
    return { current, longest, total: visitedSet.size };
}

function snapshotDailySuccess(refreshProfile = true) {
    const today = localDateKey();
    const total = appData.todoItems.length;
    const completed = appData.todoItems.filter(item => item.completed).length;
    appData.successHistory[today] = { completed, total, rate: total === 0 ? 0 : Math.round((completed / total) * 100) };
    if (refreshProfile && !document.getElementById('profile-modal').classList.contains('hidden')) renderProfileDashboard();
}

function updateHeaderStreak() {
    const badge = document.getElementById('header-streak-badge');
    if (badge) {
        const streak = calculateStreakStats().current;
        badge.textContent = `🔥 ${streak}`;
        badge.title = `${streak} ${i18n[currentLang].day}`;
    }
}

// DRAG AND DROP (STATE ODAKLI MİMARİ)
function initDragAndDrop() {
    const todoContainer = document.getElementById("todo-items-container");
    const dayContainer = document.getElementById("active-day-events-slot");

    todoSortableInstance = new Sortable(todoContainer, {
        group: 'shared', animation: 150, ghostClass: 'opacity-40', dragClass: 'cursor-grabbing',
        onEnd: handleUniversalDragEnd
    });

    daySortableInstance = new Sortable(dayContainer, {
        group: 'shared', animation: 150, ghostClass: 'opacity-40', dragClass: 'cursor-grabbing',
        onEnd: handleUniversalDragEnd
    });
}

function handleUniversalDragEnd(evt) {
    const fromId = evt.from.id;
    const toId = evt.to.id;
    
    let draggedItem;
    if (fromId === 'todo-items-container') draggedItem = appData.todoItems.splice(evt.oldIndex, 1)[0];
    else draggedItem = appData.weeklyEvents[activeDayIndex].splice(evt.oldIndex, 1)[0];

    if (fromId === 'todo-items-container' && toId === 'active-day-events-slot') draggedItem = { time: '', title: draggedItem.text, color: 'monochrome' };
    else if (fromId === 'active-day-events-slot' && toId === 'todo-items-container') draggedItem = { text: draggedItem.title, completed: false };

    if (toId === 'todo-items-container') appData.todoItems.splice(evt.newIndex, 0, draggedItem);
    else appData.weeklyEvents[activeDayIndex].splice(evt.newIndex, 0, draggedItem);

    saveDataToLocalStorage();
    renderTodos();
    renderActiveDayView();
    updateDayTabsState();
}

function updateAddButtonsState() {
    const dayBtn = document.getElementById('active-day-add-btn');
    const todoBtn = document.getElementById('todo-submit-btn');
    const todoInput = document.getElementById('todo-input');
    if (todoInput) todoInput.required = !window.copiedItem;

    [dayBtn, todoBtn].forEach(btn => {
        if (!btn) return;
        const textSpan = btn.querySelector('.btn-text');
        const icon = btn.querySelector('i');
        if (window.copiedItem) {
            if (textSpan) textSpan.innerText = i18n[currentLang].paste;
            if (icon) icon.className = "fa-solid fa-paste";
            btn.classList.add('animate-pulse', 'bg-amber-600', 'hover:bg-amber-700');
            btn.classList.remove('bg-turquoise-600', 'hover:bg-turquoise-700');
        } else {
            if (textSpan) textSpan.innerText = i18n[currentLang].add;
            if (icon) icon.className = "fa-solid fa-plus";
            btn.classList.remove('animate-pulse', 'bg-amber-600', 'hover:bg-amber-700');
            btn.classList.add('bg-turquoise-600', 'hover:bg-turquoise-700');
        }
    });
}

function initDayTabs() {
    const container = document.getElementById("day-tabs-container");
    container.innerHTML = "";
    for (let i = 0; i < 7; i++) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.id = `day-tab-${i}`;
        btn.onclick = () => selectDay(i);
        btn.className = "day-tab-btn flex items-center justify-between p-2.5 sm:p-3 rounded-xl border text-xs sm:text-sm font-bold shrink-0 md:w-full md:flex-1 transition-colors text-left";
        btn.innerHTML = `<div class="flex items-center gap-2 min-w-0"><span class="tab-indicator w-2.5 h-2.5"></span><span class="tab-name truncate"></span></div><span class="tab-count ml-2 text-[10px] sm:text-xs px-2 py-0.5 rounded-full">0</span>`;
        container.appendChild(btn);
    }
    updateDayTabsState();
}

function updateDayTabsState() {
    const todayIndex = (new Date().getDay() + 6) % 7;
    for (let i = 0; i < 7; i++) {
        const btn = document.getElementById(`day-tab-${i}`);
        if (!btn) continue;
        
        const count = (appData.weeklyEvents[i] || []).length;
        const isToday = i === todayIndex;
        const isActive = i === activeDayIndex;

        btn.querySelector('.tab-name').innerText = i18n[currentLang].days_long[i];
        btn.querySelector('.tab-indicator').innerHTML = isToday ? '<i class="fa-solid fa-play text-[10px] text-turquoise-500 active:text-white" title="Bugün"></i>' : '';
        btn.querySelector('.tab-indicator').className = isToday ? "tab-indicator flex shrink-0" : "tab-indicator w-2.5 h-2.5 shrink-0";
        
        const countBadge = btn.querySelector('.tab-count');
        countBadge.innerText = count;
        countBadge.className = `tab-count ml-2 text-[10px] sm:text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`;

        btn.className = `day-tab-btn flex items-center justify-between p-2.5 sm:p-3 rounded-xl border text-xs sm:text-sm font-bold shrink-0 md:w-full md:flex-1 text-left ${isActive ? 'active border-transparent' : 'bg-white dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`;
    }
}

window.selectDay = function(index) {
    if (activeDayIndex === index) return;
    activeDayIndex = index;
    updateDayTabsState();
    
    const panel = document.getElementById("active-day-detail-panel");
    panel.classList.remove("fade-slide-enter");
    requestAnimationFrame(() => {
        panel.classList.add("fade-slide-enter");
        renderActiveDayView();
    });
}

function renderActiveDayView() {
    document.getElementById("active-day-heading").innerText = i18n[currentLang].days_long[activeDayIndex];
    document.getElementById("active-day-sub").innerText = i18n[currentLang].planned_events;

    const slot = document.getElementById("active-day-events-slot");
    slot.innerHTML = "";

    (appData.weeklyEvents[activeDayIndex] || []).forEach((ev, evIndex) => {
        const card = document.createElement("div");
        let colorClasses = "bg-slate-900 text-slate-100 border-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-200";
        if (ev.color === "amber") colorClasses = "bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200";
        if (ev.color === "rose") colorClasses = "bg-rose-50 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200";
        if (ev.color === "purple") colorClasses = "bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-200";
        if (ev.color === "emerald") colorClasses = "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200";

        card.className = `event-card-item p-3 rounded-xl border shadow-xs relative group cursor-grab active:cursor-grabbing ${colorClasses}`;
        let timeHtml = ev.time ? `<div class="text-xs font-bold opacity-80 mb-1 flex items-center gap-1.5"><i class="fa-regular fa-clock text-[11px]"></i> ${ev.time}</div>` : '';
        
        card.innerHTML = `
            <div class="pr-14 min-h-[1.5rem] flex flex-col justify-center">${timeHtml}<div class="text-sm font-bold leading-snug break-words">${ev.title || ''}</div></div>
            <div class="absolute top-2 right-2 flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition bg-inherit rounded-md pl-1">
                <button onclick="copyEventText(${activeDayIndex}, ${evIndex})" class="text-current opacity-60 hover:opacity-100 p-1.5 rounded hover:bg-white/20 dark:hover:bg-black/20 transition"><i class="fa-regular fa-copy text-xs"></i></button>
                <button onclick="deleteWeeklyEvent(${activeDayIndex}, ${evIndex})" class="text-current opacity-60 hover:opacity-100 p-1.5 rounded hover:bg-white/20 dark:hover:bg-black/20 transition hover:text-rose-500"><i class="fa-solid fa-xmark text-xs"></i></button>
            </div>
        `;
        slot.appendChild(card);
    });
}

window.handleActiveDayAddOrPaste = function() {
    if (window.copiedItem) {
        let newEvent = window.copiedItem.type === 'event' ? { ...window.copiedItem.data } : { time: '', title: window.copiedItem.data.text, color: 'monochrome' };
        appData.weeklyEvents[activeDayIndex].push(newEvent);
        saveDataToLocalStorage();
        showToast(i18n[currentLang].paste_success);
        renderActiveDayView();
        updateDayTabsState();
    } else {
        openAddEventModal(activeDayIndex);
    }
}

window.copyEventText = function(dayIndex, evIndex) {
    window.copiedItem = { type: 'event', data: appData.weeklyEvents[dayIndex][evIndex] };
    showToast(i18n[currentLang].copy_toast);
    updateAddButtonsState();
}

window.openAddEventModal = function(dayIndex) {
    document.getElementById("modal-day-index").value = dayIndex;
    document.getElementById("event-time").value = "";
    document.getElementById("event-title").value = "";
    const modal = document.getElementById("event-modal");
    modal.classList.remove("hidden");
    requestAnimationFrame(() => { modal.classList.remove("opacity-0"); document.getElementById("modal-card").classList.remove("scale-95"); });
}

window.closeEventModal = function() {
    const modal = document.getElementById("event-modal");
    modal.classList.add("opacity-0");
    document.getElementById("modal-card").classList.add("scale-95");
    setTimeout(() => { modal.classList.add("hidden"); }, 200);
}

window.saveEventItem = function(e) {
    e.preventDefault();
    const dayIndex = parseInt(document.getElementById("modal-day-index").value);
    appData.weeklyEvents[dayIndex].push({
        time: document.getElementById("event-time").value.trim(),
        title: document.getElementById("event-title").value.trim(),
        color: document.querySelector('input[name="event-color"]:checked').value
    });
    saveDataToLocalStorage();
    renderActiveDayView();
    updateDayTabsState();
    closeEventModal();
}

window.deleteWeeklyEvent = function(dayIndex, evIndex) {
    appData.weeklyEvents[dayIndex].splice(evIndex, 1);
    saveDataToLocalStorage();
    renderActiveDayView();
    updateDayTabsState();
}

function renderCalendar() {
    document.getElementById("current-month-name").innerText = `${i18n[currentLang].months[currentMonth]} ${currentYear}`;
    document.getElementById("active-year-badge").innerText = currentYear;
    document.getElementById("calendar-days-header").innerHTML = i18n[currentLang].days_short.map(d => `<div>${d}</div>`).join('');
    
    const daysGrid = document.getElementById("calendar-days-grid");
    daysGrid.innerHTML = "";
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const adjustedFirstDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date(), todayDate = today.getDate(), isCurrentMonthAndYear = (today.getFullYear() === currentYear && today.getMonth() === currentMonth);

    for (let i = 0; i < adjustedFirstDay; i++) daysGrid.innerHTML += `<div class="py-1.5"></div>`;
    for (let day = 1; day <= totalDays; day++) {
        const dayStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isImportant = !!appData.importantDates[dayStr], isTodayReal = isCurrentMonthAndYear && day === todayDate;
        
        const dayCell = document.createElement("button");
        dayCell.type = "button";
        dayCell.onclick = () => promptImportantDate(dayStr, day);
        dayCell.className = `py-1.5 text-xs font-semibold rounded-lg relative flex flex-col items-center justify-center transition hover:bg-slate-100 dark:hover:bg-slate-700 ${isTodayReal ? 'bg-turquoise-500/10 text-turquoise-600 dark:text-turquoise-400 font-bold ring-1.5 ring-turquoise-500/40' : isImportant ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-bold border border-amber-200 dark:border-amber-700' : 'text-slate-700 dark:text-slate-300'}`;
        dayCell.innerHTML = `${isTodayReal ? `<span class="absolute -top-1 w-1.5 h-1.5 bg-turquoise-500 rounded-full"></span>` : ''}<span>${day}</span>${isImportant ? `<span class="absolute bottom-0.5 w-1 h-1 bg-amber-500 rounded-full"></span>` : ''}`;
        daysGrid.appendChild(dayCell);
    }
    renderImportantDatesList();
}

window.changeMonth = function(direction) {
    currentMonth += direction;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    else if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendar();
}

window.promptImportantDate = function(dateStr, dayNum) {
    const userNote = prompt(`${dayNum} ${i18n[currentLang].months[currentMonth]} ${currentYear} ${i18n[currentLang].note_prompt}`, appData.importantDates[dateStr] || "");
    if (userNote === null) return;
    if (userNote.trim() === "") delete appData.importantDates[dateStr];
    else appData.importantDates[dateStr] = userNote.trim();
    saveDataToLocalStorage();
    renderCalendar();
}

window.deleteImportantDate = function(dateStr) {
    delete appData.importantDates[dateStr];
    saveDataToLocalStorage();
    renderCalendar();
}

function renderImportantDatesList() {
    const listContainer = document.getElementById("important-dates-list");
    listContainer.innerHTML = "";
    const prefix = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
    const dates = Object.keys(appData.importantDates).filter(d => d.startsWith(prefix)).sort();
    if (!dates.length) return listContainer.innerHTML = `<div class="text-xs text-slate-400 dark:text-slate-500 italic py-3 text-center">${i18n[currentLang].no_dates}</div>`;

    dates.forEach(date => {
        const day = parseInt(date.split("-")[2]);
        const item = document.createElement("div");
        item.className = "flex items-center justify-between gap-2 p-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition shadow-xs";
        item.innerHTML = `<div class="flex items-start gap-2 flex-1 min-w-0 cursor-pointer" onclick="promptImportantDate('${date}', ${day})"><span class="font-bold bg-white dark:bg-slate-800 text-turquoise-700 dark:text-turquoise-400 border border-turquoise-200 dark:border-turquoise-700/50 w-6 h-6 rounded-md flex items-center justify-center shrink-0 shadow-xs text-xs">${day}</span><span class="text-slate-700 dark:text-slate-200 font-medium pt-0.5 flex-1 break-words leading-tight text-xs">${appData.importantDates[date]}</span></div><button onclick="deleteImportantDate('${date}')" class="text-slate-400 hover:text-rose-500 transition p-1 text-xs shrink-0"><i class="fa-solid fa-trash"></i></button>`;
        listContainer.appendChild(item);
    });
}

function renderTodos() {
    const container = document.getElementById("todo-items-container");
    container.innerHTML = "";
    let completedCount = 0;
    
    appData.todoItems.forEach((todo, index) => {
        if (todo.completed) completedCount++;
        const row = document.createElement("div");
        row.className = `flex items-center justify-between p-2.5 rounded-xl border transition group cursor-grab active:cursor-grabbing ${todo.completed ? 'bg-slate-50/80 dark:bg-slate-900/30 border-slate-200/60 dark:border-slate-700/50' : 'bg-white dark:bg-slate-700/30 border-slate-200 dark:border-slate-600 hover:border-turquoise-300 shadow-xs'}`;
        row.innerHTML = `<div class="flex items-center gap-2.5 flex-1 min-w-0 pr-2"><input type="checkbox" ${todo.completed ? 'checked' : ''} onclick="toggleTodoStatus(${index})" class="w-3.5 h-3.5 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-turquoise-600 focus:ring-turquoise-500 accent-turquoise-600 shrink-0 cursor-pointer"><span class="text-xs font-medium break-words ${todo.completed ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200'}">${todo.text}</span></div><div class="flex items-center gap-1 shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition"><button onclick="copyTodoItem(${index})" class="text-slate-400 hover:text-turquoise-500 transition p-1"><i class="fa-regular fa-copy text-xs"></i></button><button onclick="editTodoItem(${index})" class="text-slate-400 hover:text-amber-500 transition p-1"><i class="fa-solid fa-pen text-xs"></i></button><button onclick="deleteTodoItem(${index})" class="text-slate-400 hover:text-rose-500 transition p-1"><i class="fa-solid fa-trash text-xs"></i></button></div>`;
        container.appendChild(row);
    });
    
    document.getElementById("todo-count-badge").innerText = `${completedCount}/${appData.todoItems.length}`;
    document.getElementById("todo-progress-bar").style.width = `${appData.todoItems.length === 0 ? 0 : Math.round((completedCount / appData.todoItems.length) * 100)}%`;
}

window.copyTodoItem = function(index) {
    window.copiedItem = { type: 'todo', data: appData.todoItems[index] };
    showToast(i18n[currentLang].copy_toast);
    updateAddButtonsState();
};

window.editTodoItem = function(index) {
    const newText = prompt(i18n[currentLang].edit_prompt, appData.todoItems[index].text);
    if (newText !== null && newText.trim() !== "") {
        appData.todoItems[index].text = newText.trim();
        saveDataToLocalStorage(); renderTodos();
    }
};

window.handleAddTodoOrPaste = function(e) {
    e.preventDefault();
    if (window.copiedItem) {
        appData.todoItems.push({ text: window.copiedItem.type === 'todo' ? window.copiedItem.data.text : window.copiedItem.data.title, completed: false });
        saveDataToLocalStorage(); showToast(i18n[currentLang].paste_success); renderTodos();
    } else {
        const input = document.getElementById("todo-input");
        if (!input.value.trim()) return;
        appData.todoItems.push({ text: input.value.trim(), completed: false });
        input.value = ""; saveDataToLocalStorage(); renderTodos();
    }
}

window.toggleTodoStatus = function(index) { appData.todoItems[index].completed = !appData.todoItems[index].completed; saveDataToLocalStorage(); renderTodos(); }
window.deleteTodoItem = function(index) { appData.todoItems.splice(index, 1); saveDataToLocalStorage(); renderTodos(); }

window.toggleTodoList = function() {
    const c = document.getElementById("todo-collapsible-content"), i = document.getElementById("todo-toggle-icon");
    c.classList.toggle("hidden"); c.classList.toggle("flex"); i.classList.toggle("rotate-180");
}

window.openProfileDashboard = function() {
    snapshotDailySuccess(false); renderProfileDashboard();
    const modal = document.getElementById('profile-modal');
    modal.classList.remove('hidden');
    requestAnimationFrame(() => { modal.classList.remove('opacity-0'); document.getElementById('profile-panel').classList.remove('scale-[0.98]'); });
    document.body.style.overflow = 'hidden';
}

window.closeProfileDashboard = function() {
    const modal = document.getElementById('profile-modal');
    modal.classList.add('opacity-0'); document.getElementById('profile-panel').classList.add('scale-[0.98]');
    setTimeout(() => modal.classList.add('hidden'), 200); document.body.style.overflow = '';
}

function renderProfileDashboard() {
    const today = appData.successHistory[localDateKey()] || { completed: 0, total: 0, rate: 0 };
    const streaks = calculateStreakStats(), recent = getRecentDateKeys(7).map(key => appData.successHistory[key] || { completed: 0, total: 0, rate: 0 });
    const dict = i18n[currentLang];

    document.getElementById('profile-date-label').textContent = dateFromKey(localDateKey()).toLocaleDateString(currentLang === 'tr' ? 'tr-TR' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' });
    document.getElementById('daily-success-rate').textContent = `${today.rate}%`;
    document.getElementById('daily-success-detail').textContent = `${today.completed} / ${today.total} ${dict.task}`;
    document.getElementById('daily-success-ring').style.setProperty('--progress', `${today.rate}%`);
    document.getElementById('daily-success-message').textContent = today.total === 0 ? dict.no_task_msg : today.rate === 100 ? dict.full_success_msg : today.rate >= 60 ? dict.mid_success_msg : dict.low_success_msg;
    document.getElementById('current-streak-value').textContent = `${streaks.current} ${dict.day}`;
    document.getElementById('longest-streak-value').textContent = `${streaks.longest} ${dict.day}`;
    document.getElementById('total-days-value').textContent = `${streaks.total} ${dict.day}`;
    document.getElementById('weekly-average-value').textContent = `${Math.round(recent.reduce((sum, item) => sum + item.rate, 0) / 7)}%`;
    document.getElementById('completed-total-label').textContent = `${today.completed} ${dict.completed_tasks}`;

    document.getElementById('success-chart').innerHTML = '<div class="h-full flex items-end justify-between gap-2">' + recent.map((item, index) => `<div class="h-full flex-1 flex flex-col items-center justify-end gap-1.5"><span class="text-[10px] font-bold text-slate-400">${item.rate}%</span><div class="w-full max-w-10 rounded-t-lg bg-slate-100 dark:bg-slate-700 relative overflow-hidden" style="height:75px"><div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-turquoise-600 to-cyan-400 rounded-t-lg transition-all duration-300" style="height:${Math.max(item.rate, 6)}%"></div></div><span class="text-[10px] font-semibold text-slate-500 capitalize">${dateFromKey(getRecentDateKeys(7)[index]).toLocaleDateString(currentLang === 'tr' ? 'tr-TR' : 'en-US', { weekday: 'short' }).replace('.', '')}</span></div>`).join('') + '</div>';

    renderWeeklyPerformanceTrend(); updateHeaderStreak();
}

function renderWeeklyPerformanceTrend() {
    const svg = document.getElementById("trend-line-svg"), all28Keys = getRecentDateKeys(28), weeklyRates = [];
    svg.innerHTML = "";
    for (let w = 0; w < 4; w++) {
        let total = 0;
        all28Keys.slice(w * 7, (w + 1) * 7).forEach(k => { if(appData.successHistory[k]) total += appData.successHistory[k].rate; });
        weeklyRates.push(Math.round(total / 7));
    }
    
    [0, 25, 50, 75, 100].forEach(p => svg.innerHTML += `<line x1="50" y1="${150 - (p/100)*130}" x2="660" y2="${150 - (p/100)*130}" stroke="#94a3b8" stroke-dasharray="3 3" stroke-opacity="0.25"/><text x="40" y="${150 - (p/100)*130 + 3}" fill="#94a3b8" font-size="10" font-weight="600" text-anchor="end">${p}%</text>`);
    const points = weeklyRates.map((r, i) => ({ x: 50 + (i * 203.3), y: 150 - (r/100)*130, r }));
    
    svg.innerHTML += `<defs><linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#06b6d4" stop-opacity="0.35"/><stop offset="100%" stop-color="#06b6d4" stop-opacity="0.0"/></linearGradient></defs>`;
    svg.innerHTML += `<path d="M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ') + ` L ${points[3].x} 150 L ${points[0].x} 150 Z" fill="url(#trendGradient)"/><path d="M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ') + `" fill="none" stroke="#0891b2" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`;
    
    const wL = currentLang === 'tr' ? ["3 Hafta Önce", "2 Hafta Önce", "Geçen Hafta", "Bu Hafta"] : ["3 Weeks Ago", "2 Weeks Ago", "Last Week", "This Week"];
    points.forEach((p, idx) => svg.innerHTML += `<circle cx="${p.x}" cy="${p.y}" r="6" fill="#06b6d4" stroke="#ffffff" stroke-width="2.5"/><rect x="${p.x - 18}" y="${p.y - 24}" width="36" height="18" rx="5" fill="#0f172a" opacity="0.85"/><text x="${p.x}" y="${p.y - 12}" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">${p.r}%</text><text x="${p.x}" y="172" fill="#64748b" font-size="11" font-weight="700" text-anchor="middle">${wL[idx]}</text>`);
}

window.exportPlannerAsPNG = async function() {
    const btn = document.getElementById('png-download-btn'), og = btn.innerHTML;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span class="hidden sm:inline">${i18n[currentLang].downloading}</span>`; btn.disabled = true;

    const title = document.getElementById('planner-title-input').value.trim() || 'Turkuaz Plan';
    const allDays = i18n[currentLang].days_long.map((name, i) => ({ name, events: appData.weeklyEvents[i] || [] }));
    const weights = allDays.map(d => d.events.length === 0 ? 0.8 : d.events.reduce((a, ev) => a + 1 + (ev.title.length > 25 ? 0.5 : 0), 1));
    const pal = { monochrome: ['#0f172a', '#ffffff', '#1e293b'], amber: ['#fffbeb', '#92400e', '#fde68a'], rose: ['#fff1f2', '#9f1239', '#fecdd3'], purple: ['#faf5ff', '#6b21a8', '#e9d5ff'], emerald: ['#ecfdf5', '#065f46', '#a7f3d0'] };

    const board = document.createElement('section');
    board.style.cssText = 'position:fixed;left:-10000px;top:0;width:1920px;height:auto;padding:48px 52px;background:#f8fafc;color:#0f172a;font-family:Inter,sans-serif;display:flex;flex-direction:column;';
    board.innerHTML = `<header style="display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2px solid #cbd5e1;padding-bottom:20px;margin-bottom:24px;"><div><div style="font-size:16px;font-weight:800;letter-spacing:.2em;color:#0891b2;margin-bottom:8px;">TURKUAZ - ${i18n[currentLang].weekly_program}</div><div style="font-size:36px;font-weight:800;">${title.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}</div></div><div style="text-align:right;"><div style="font-size:16px;color:#64748b;margin-bottom:6px;font-weight:600;">${new Date().toLocaleDateString(currentLang === 'tr' ? 'tr-TR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</div><div style="font-size:15px;font-weight:700;color:#0891b2;">${allDays.reduce((s, d) => s + d.events.length, 0)} ${i18n[currentLang].task}</div></div></header><div id="export-flex" style="flex:1;display:flex;gap:14px;width:100%;"></div><footer style="margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;color:#64748b;font-size:13px;font-weight:600;"><span>Haftanı net gör, adımlarını istikrarlı at.</span><span style="font-weight:800;color:#0891b2;">TURKUAZ</span></footer>`;

    const flex = board.querySelector('#export-flex');
    allDays.forEach((d, i) => {
        let evs = d.events.length === 0 ? `<div style="padding:16px 8px;border:1px dashed #cbd5e1;border-radius:10px;text-align:center;font-size:12px;color:#94a3b8;font-style:italic;">-</div>` : d.events.map(ev => `<div style="padding:10px 12px;border-radius:10px;border:1px solid ${(pal[ev.color]||pal.monochrome)[2]};background:${(pal[ev.color]||pal.monochrome)[0]};color:${(pal[ev.color]||pal.monochrome)[1]};font-size:13px;margin-bottom:8px;">${ev.time ? `<div style="font-size:11px;font-weight:800;opacity:0.8;margin-bottom:3px;">${ev.time.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}</div>` : ''}<div style="font-weight:700;">${ev.title.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}</div></div>`).join('');
        flex.innerHTML += `<div style="flex:${weights[i]};background:#fff;border:1.5px solid #e2e8f0;border-radius:16px;padding:16px 14px;box-shadow:0 1px 3px rgba(0,0,0,0.04);"><div style="margin-bottom:12px;padding-bottom:12px;border-bottom:1.5px solid #f1f5f9;font-size:16px;font-weight:800;color:#1e293b;">${d.name}</div>${evs}</div>`;
    });

    document.body.appendChild(board);
    try {
        const cvs = await html2canvas(board, { scale: 2, useCORS: true, backgroundColor: '#f8fafc', logging: false });
        const a = document.createElement('a');
        a.download = `${title.toLocaleLowerCase(currentLang === 'tr' ? 'tr-TR' : 'en-US').replace(/[^a-z0-9ğüşıöç]/gi, '_')}_export.png`;
        a.href = cvs.toDataURL('image/png', 1); a.click();
    } catch (e) { alert('PNG Export Error.'); } finally { board.remove(); btn.innerHTML = og; btn.disabled = false; }
}