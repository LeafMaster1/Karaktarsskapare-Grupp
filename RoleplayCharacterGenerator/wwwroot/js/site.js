/**
 * EDVIN TÖRNBLOM ON LSD @ PRIDE JAVASCRIPT ENGINE ✨🌈🪩
 * Innehåller konfettikanon, trippy effekter, presets och live-renderare.
 */

// 1. EDVIN TÖRNBLOM SLOGANS FÖR RANDOM CITAT
const edvinQuotes = [
    "”MÄNNISKA, JAG DÖÖÖÖR FÖR DEN HÄR KARAKTÄREN!” ✨💅",
    "”SLAY QUEEN! Den här outfiten krossar heteronormen!” 🦄🌈",
    "”URSPÅRAT! 10 av 10 bögar och ankor godkänner!” 🪩🦆",
    "”VEM ÄR HON?! Runway-ready och redo för skattjakt!” 💄✨",
    "”Mer glitter! Alltid mer glitter, darling!” 💖🍾",
    "”Det här är ren och skär camp-perfektion!” 👑🦚"
];

function updateRandomEdvinQuote() {
    const el = document.getElementById("edvinQuoteText");
    if (el) {
        const randomQuote = edvinQuotes[Math.floor(Math.random() * edvinQuotes.length)];
        el.innerText = randomQuote;
    }
}

// 2. PRESETS SOM FYLLER I TEXTRUTAN
function setPreset(promptText) {
    const input = document.getElementById("userPromptInput");
    if (input) {
        input.value = promptText;
        input.focus();
        launchMiniConfetti();
        updateRandomEdvinQuote();
    }
}

// 3. TOGGLE HYPER-LSD LÄGE
function toggleLsdMode() {
    document.body.classList.toggle("trippin");
    const isTrippin = document.body.classList.contains("trippin");
    const badge = document.getElementById("lsdStatusBadge");
    if (badge) {
        badge.innerText = isTrippin ? "🌈 HYPER-LSD AKTIVERAD! 🦄" : "🪩 STANDARD PRIDE ✨";
    }
    launchRainbowConfetti();
}

// 4. EGEN UTAN EXTERNA BIBLIOTEK: SUPER-CONFETTI KANON
function launchRainbowConfetti() {
    const colors = ['#ff0055', '#ff7700', '#ffee00', '#00ff66', '#00f0ff', '#bb00ff', '#ff1493'];
    const count = 120;
    
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'sparkle-particle';
        confetti.style.position = 'fixed';
        confetti.style.zIndex = '99999';
        confetti.style.width = Math.random() * 12 + 6 + 'px';
        confetti.style.height = Math.random() * 12 + 6 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-20px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        confetti.style.opacity = Math.random() + 0.5;
        confetti.style.pointerEvents = 'none';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(confetti);

        const fallDuration = Math.random() * 2500 + 1500;
        const drift = (Math.random() - 0.5) * 200;

        confetti.animate([
            { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
            { transform: `translate(${drift}px, ${window.innerHeight + 50}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: fallDuration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => confetti.remove();
    }
}

function launchMiniConfetti() {
    const colors = ['#ff007f', '#00f0ff', '#ffe600'];
    for (let i = 0; i < 25; i++) {
        const star = document.createElement('div');
        star.innerText = ['✨', '💖', '🌈', '🪩', '🦄'][Math.floor(Math.random() * 5)];
        star.style.position = 'fixed';
        star.style.zIndex = '99999';
        star.style.left = (window.innerWidth / 2) + (Math.random() - 0.5) * 300 + 'px';
        star.style.top = (window.innerHeight / 2) + (Math.random() - 0.5) * 200 + 'px';
        star.style.fontSize = Math.random() * 18 + 14 + 'px';
        star.style.pointerEvents = 'none';
        document.body.appendChild(star);

        star.animate([
            { transform: 'translateY(0) scale(0.5)', opacity: 1 },
            { transform: `translateY(-100px) scale(1.5) rotate(${Math.random() * 180}deg)`, opacity: 0 }
        ], { duration: 1200 }).onfinish = () => star.remove();
    }
}

// 5. KLIENT-GENERATOR (Mock & Live demo om backend inte körts ännu)
const sampleCharacters = [
    {
        namn: "Kalle 'Disco-Fjäder' Anka",
        yrke: "Äventyrlig Skattjägar-Diva",
        utrustning: [
            "Glitterdränkt sjömansskjorta i neonblått",
            "Rosa fjäderboa med guldinfattning",
            "Förstoringsglas med UV-ljus för hemliga discon",
            "Karta till Joakim von Ankas hemliga diamantkällare",
            "Champagne-plunta med festbubbel",
            "Vattentäta platå-simfötter (+4 Karisma)"
        ],
        fardigheter: [
            "Dramatisk Vrede (Hulken i fjäderdräkt)",
            "Skattkammar-näsa",
            "Voguing i motvind",
            "Oemotståndlig ankkvackning"
        ],
        bakgrundshistoria: "Kalle har tröttnat på att ständigt jaga 25 öre i timmen hos Farbror Joakim. Efter att ha ramlat in i en hemlig pop-up-klubb under Ankeborgs Pridefestival insåg han sitt sanna kall: Han är inte bara en sjöman – han är världens mest fabulösa äventyrare!\n\nBeväpnad med sin neonfärgade sjömanshatt och en karta som ryktas leda till den mytomspunna Guldpaljetten i Farao Tut-Ank-Amons grav beger han sig ut. Hans häftiga humör har ersatts med dramatisk catwalk-energi, men olyckorna förföljer honom fortfarande med absolut komisk precision.",
        bildUrl: ""
    },
    {
        namn: "Prinsessan Glitter-Smite",
        yrke: "Bimbo-Paladin av Kärlekens Orden",
        utrustning: [
            "Holografisk plåtrustning i regnbågsstål",
            "Enhörnings-stridshammare med konfettikanon",
            "Platina-blond peruk som tål drakeld",
            "Hjärtformade solglasögon med mörkerseende",
            "Doftspray: 'Vanilla Euphoria' (+10 charm)"
        ],
        fardigheter: [
            "Glitter-Smite (förblindar monster med kärlek)",
            "Death Drop Escape",
            "Villkorslös pepptalk",
            "Krossa heteronormativa förbannelser"
        ],
        bakgrundshistoria: "Född i den mest gråa och trista fästningen i landet bestämde sig Prinsessan för att livet var alldeles för kort för tråkiga svärd och depression. Hon svor en helig ed till Disco-Gudinnan och rider nu ut över riket på sin bevingade enhörning för att sprida eufori och rättvisa.",
        bildUrl: ""
    },
    {
        namn: "Ziggy Star-Duck",
        yrke: "Intergalaktisk Glam-Bard",
        utrustning: [
            "El-luta med regnbågslaser",
            "Spandex-overall med rymdmönster",
            "Hårsprej med gravitationstrots",
            "Retro-kassettband med Ankeborgs tyngsta eurobeat"
        ],
        fardigheter: [
            "Hypnotiserande gitarrsolo",
            "Skvaller-telepati",
            "Stjärnfalls-catwalk"
        ],
        bakgrundshistoria: "Nedstigen från en glittrande meteorit mitt på festivalområdet i Ankeborg. Ziggy kommunicerar bäst genom pulserande basgångar och har som livsmål att få alla orcher och drakar att förenas i en gigantisk conga-line.",
        bildUrl: ""
    }
];

function triggerDemoCharacter() {
    launchRainbowConfetti();
    updateRandomEdvinQuote();

    const input = document.getElementById("userPromptInput");
    const promptVal = input ? input.value.trim() : "";
    
    // Välj antingen en matchande eller slumpmässig sample-karaktär
    let chosen = sampleCharacters[Math.floor(Math.random() * sampleCharacters.length)];
    if (promptVal.toLowerCase().includes("bimbo") || promptVal.toLowerCase().includes("paladin")) {
        chosen = sampleCharacters[1];
    } else if (promptVal.toLowerCase().includes("bard") || promptVal.toLowerCase().includes("glam") || promptVal.toLowerCase().includes("ziggy")) {
        chosen = sampleCharacters[2];
    }

    renderCharacterInDom(chosen);
}

function renderCharacterInDom(c) {
    const sheet = document.getElementById("characterSheetSection");
    if (!sheet) return;

    document.getElementById("charNameDisplay").innerText = c.namn || "Okänd Diva";
    document.getElementById("charRoleDisplay").innerText = c.yrke || "Ikonisk Legend";
    document.getElementById("charLoreDisplay").innerText = c.bakgrundshistoria || "";

    // Utrustning
    const gearList = document.getElementById("charGearList");
    if (gearList) {
        gearList.innerHTML = "";
        (c.utrustning || []).forEach(item => {
            const li = document.createElement("li");
            li.className = "gear-item";
            li.innerHTML = `<span>✨</span> <span>${item}</span>`;
            gearList.appendChild(li);
        });
    }

    // Färdigheter
    const skillList = document.getElementById("charSkillsList");
    if (skillList) {
        skillList.innerHTML = "";
        (c.fardigheter || []).forEach(skill => {
            const span = document.createElement("span");
            span.className = "skill-pill";
            span.innerHTML = `⚡ ${skill}`;
            skillList.appendChild(span);
        });
    }

    // Porträtt (om bild finns, annars placeholder)
    const portraitImg = document.getElementById("charPortraitImg");
    const portraitPlaceholder = document.getElementById("charPortraitPlaceholder");
    if (c.bildUrl || c.bildBase64) {
        const src = c.bildUrl || `data:image/png;base64,${c.bildBase64}`;
        portraitImg.src = src;
        portraitImg.style.display = "block";
        if (portraitPlaceholder) portraitPlaceholder.style.display = "none";
    } else {
        portraitImg.style.display = "none";
        if (portraitPlaceholder) portraitPlaceholder.style.display = "flex";
    }

    sheet.style.display = "block";
    sheet.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Initiera event listeners vid sidladdning
document.addEventListener("DOMContentLoaded", () => {
    updateRandomEdvinQuote();
    setInterval(updateRandomEdvinQuote, 12000);
});
