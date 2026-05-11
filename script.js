const wishesList = [
    "Привет Чебаан. Пишу тебе с наилучшими пожеланиями. Желаю тебе, чтобы ты не служил в третий раз. Удачных тебе обстоятельств на гражданке. Спасибо за службу, спасибо за расставленные наряды. P.S. забери меня с аэропорта plz",
    "Сегодня без пожеланий, просто напомню, что осталось 19 дней до дома)",
    "Желаю чтобы в твоей жизни больше не было никаких \"глюков\"",
    "Привет от твоих любимых Балтийских чурок",
    "Рад, что застал одного из лучших канцеляров этого батальона. P.S. Один из штабных псов :)",
    "Тут должно было быть послание Петюшина, но он забил хуй. Осталось 15 дней)",
    "Желаю чтобы ты больше не злился на маленьких чурок и чтобы у тебя все было прекрасно в жизни. Удачи тебе во всех своих делах. Живи и кайфуй. P.S. твой любимый маленький чурка Магомедушка",
    "Сегодня число 13 - счастливое, ведь осталось совсем ничего до дома",
    "Снова без послания. Осталось 12 дней, Ричард!)",
    "Думаю, стоит сказать тебе спасибо от всего личного состава контрактников. Они тебе благодарны за то, что ты ебанутый Рэкс, но этого никогда не скажут",
    "Осталось 10 дней. 10 ДНЕЙ БРАТ",
    "Мичман забыл про пожелание пока драил ЦП",
    "Спасибо за совместную службу от канцеляров второй роты)",
    "Пожелаю что-нибудь когда будем бухать в Москве",
    "Ричбан, желаю чтобы ты больше никогда не служил в армии потому что третья ходка это слишком и всего тебе самого наилучшего. Твой начальник канцелярии, Г0ш@н4ик_337",
    "Каждый закат приближает мирную жизнь.",
    "Ричард, спасибо тебе за всё! Будет тебя не хватать тут, но ты своё отслужил. Искренне рад был служить с тобой, в добрый путь! P.S. Надеюсь ты сохранишь эту пачку надолго, твой бобрик",
    "Рота",
    "Отбой",
    "Завтра домой!"
];

// ФИКСИРОВАННАЯ ДАТА СТАРТА — 12 МАЯ 2026 ГОДА
const START_DATE = new Date(2026, 4, 12);
START_DATE.setHours(0, 0, 0, 0);

function getCurrentCigaretteIndex() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Если сегодня раньше 12 мая 2026 — ничего не открыто
    if (today < START_DATE) {
        return -1;
    }
    
    // Сколько дней прошло с 12.05.2026
    const diffTime = today - START_DATE;
    const daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Прямой порядок: сигарета 20 в первый день (индекс 0)
    // Теперь первый день (daysPassed = 0) открывает индекс 0 (пожелание №1)
    let cigaretteIndex = daysPassed;
    
    // Не уходим за пределы
    if (cigaretteIndex < 0) cigaretteIndex = 0;
    if (cigaretteIndex >= wishesList.length) cigaretteIndex = wishesList.length - 1;
    
    return cigaretteIndex;
}

function getUnlockedIndices() {
    const currentIdx = getCurrentCigaretteIndex();
    if (currentIdx === -1) return [];
    
    // Открываем все индексы от 0 до currentIdx (прямой порядок)
    const unlocked = [];
    for (let i = 0; i <= currentIdx; i++) {
        unlocked.push(i);
    }
    return unlocked;
}

function renderWishes() {
    const grid = document.getElementById("wishesGrid");
    if (!grid) return;
    
    const currentCigIdx = getCurrentCigaretteIndex();
    const unlocked = getUnlockedIndices();
    
    let remainingCigarettes = 20;
    if (currentCigIdx !== -1) {
        // Сегодняшняя сигарета = currentCigIdx + 1
        // Осталось = 20 - (currentCigIdx + 1)
        remainingCigarettes = 20 - (currentCigIdx + 1);
        if (remainingCigarettes < 0) remainingCigarettes = 0;
    }
    
    const daysLeftSpan = document.getElementById("daysLeft");
    if (daysLeftSpan) daysLeftSpan.innerText = remainingCigarettes;
    
    grid.innerHTML = "";
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isStarted = (today >= START_DATE);
    
    wishesList.forEach((wish, idx) => {
        const cigaretteNumber = idx + 1; // теперь сигарета 1 = индекс 0, сигарета 20 = индекс 19
        const isUnlocked = unlocked.includes(idx);
        
        const card = document.createElement("div");
        
        let isActuallyLocked = false;
        if (!isStarted) {
            isActuallyLocked = true;
        } else {
            isActuallyLocked = !isUnlocked;
        }
        
        card.className = `wish-card ${!isActuallyLocked ? "unlocked" : "locked"}`;
        
        const header = document.createElement("div");
        header.className = "card-header";
        header.innerText = `Сигарета ${cigaretteNumber}`;
        
        const content = document.createElement("div");
        content.className = "wish-content";
        
        if (!isActuallyLocked) {
            content.innerText = wish;
        } else {
            content.innerText = "";
        }
        
        card.appendChild(header);
        card.appendChild(content);
        
        card.addEventListener("click", () => {
            if (!isActuallyLocked) {
                alert(`📣 Боевое пожелание (Сигарета ${cigaretteNumber}):\n\n${wish}`);
            } else {
                if (!isStarted) {
                    alert(`🔒 Отсчёт начнётся 12 мая 2026 года.\nДо этого момента все сигареты засекречены.`);
                } else {
                    const remaining = cigaretteNumber - (currentCigIdx + 1);
                    alert(`🔒 Сигарета ${cigaretteNumber} ещё не выкурена.\nОсталось выкурить ${remaining} сигарет до неё.`);
                }
            }
        });
        
        grid.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", renderWishes);