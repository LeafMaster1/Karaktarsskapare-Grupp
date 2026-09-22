/**
 * CHRILLEMON — MAMMA MIA VIBE-CODED JS 🇮🇹🍝🛵
 * + Legacy Pride engine behålls för kompatibilitet
 */

// 1. ITALIENSKA NONNA-CITAT
const nonnaQuotes = [
    "“MAMMA MIA! Vilken Chrillemon, perfetto!” 🤌🍝",
    "“NONNA È FIERA DI TE, amore!” 👵✨",
    "“Oddio! Questo Chrillemon è più bello di Vespa nuova!” 🛵💨",
    "“Mangi bene e combatti bene — come una vera Chrillemon!” 🍕⚔️",
    "“Che bella creatura! Direttamente dalla cucina di Toscana!” 🌿🏛️",
    "“NON toccare la mia Chrillemon, capisce?!” 🥄😤",
    "“Bellissimo! 10 su 10 — baci dalla Nonna!” 💋🇮🇹"
];
const edvinQuotes = nonnaQuotes; // alias för legacy

function updateRandomEdvinQuote(){
    const el = document.getElementById("nonnaQuoteText") || document.getElementById("edvinQuoteText");
    if(el){ el.innerText = nonnaQuotes[Math.floor(Math.random()*nonnaQuotes.length)]; }
}
function updateRandomNonnaQuote(){ updateRandomEdvinQuote(); }

// 2. CHRILLEMON PRESET — fyller namn + beskrivning och skickar till CharacterImageService
function fillChrillemon(namnUtanSuffix, beskrivning){
    const namnInput = document.getElementById("chrillemonNamn");
    const descInput = document.getElementById("chrillemonBeskrivning");
    if(namnInput){ namnInput.value = namnUtanSuffix; namnInput.focus(); }
    if(descInput){ descInput.value = beskrivning; }
    launchMiniConfetti();
    updateRandomNonnaQuote();
    // liten wobble på formen
    const card = document.querySelector(".chrillemon-form-card");
    if(card){ card.animate([{transform:'rotate(0deg)'},{transform:'rotate(0.7deg)'},{transform:'rotate(-0.7deg)'},{transform:'rotate(0deg)'}],{duration:400}); }
}
// legacy alias
function setPreset(promptText){
    const input = document.getElementById("chrillemonBeskrivning") || document.getElementById("userPromptInput");
    if(input){ input.value = promptText; input.focus(); launchMiniConfetti(); updateRandomNonnaQuote(); }
}

// 3. PASTA-MODE TOGGLE (vibe-coded kaos)
function togglePastaMode(){
    document.body.classList.toggle("pasta-mode");
    document.body.classList.toggle("trippin");
    const isOn = document.body.classList.contains("pasta-mode");
    const badge = document.getElementById("pastaBadge");
    if(badge){ badge.innerText = isOn ? "🍝 PASTA-MODE: ATTIVO! 🇮🇹" : "🍝 PASTA-MODE: OFF"; }
    launchPastaConfetti();
}
function toggleLsdMode(){ togglePastaMode(); } // legacy

// 4. PASTA CONFETTI — jätteitalienskt
function launchPastaConfetti(){
    const emojis = ['🍝','🍕','🇮🇹','🤌','🫒','🍅','🧀','🛵','🏛️','✨'];
    const colors = ['#008C45','#FFD700','#CD212A','#FF8C00','#fff'];
    for(let i=0;i<90;i++){
        const el = document.createElement('div');
        const isEmoji = Math.random() > 0.45;
        el.style.position='fixed'; el.style.zIndex='99999'; el.style.pointerEvents='none';
        el.style.left = Math.random()*100 + 'vw'; el.style.top='-30px';
        if(isEmoji){
            el.innerText = emojis[Math.floor(Math.random()*emojis.length)];
            el.style.fontSize = (Math.random()*22+16)+'px';
        } else {
            el.style.width = (Math.random()*12+7)+'px'; el.style.height = (Math.random()*12+7)+'px';
            el.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
            el.style.borderRadius = Math.random()>0.5?'50%':'3px';
        }
        document.body.appendChild(el);
        const drift=(Math.random()-0.5)*260;
        const dur=Math.random()*2400+1700;
        el.animate([
            {transform:`translate(0,0) rotate(0deg)`, opacity:1},
            {transform:`translate(${drift}px, ${window.innerHeight+60}px) rotate(${Math.random()*900}deg)`, opacity:0}
        ],{duration:dur, easing:'cubic-bezier(0.25,0.46,0.45,0.94)'}).onfinish=()=>el.remove();
    }
}
function launchRainbowConfetti(){ launchPastaConfetti(); }

function launchMiniConfetti(){
    for(let i=0;i<22;i++){
        const star=document.createElement('div');
        star.innerText=['🤌','🍝','✨','🇮🇹','💛'][Math.floor(Math.random()*5)];
        star.style.position='fixed'; star.style.zIndex='99999';
        star.style.left=(window.innerWidth/2)+(Math.random()-0.5)*320+'px';
        star.style.top=(window.innerHeight/2)+(Math.random()-0.5)*180+'px';
        star.style.fontSize=(Math.random()*18+14)+'px'; star.style.pointerEvents='none';
        document.body.appendChild(star);
        star.animate([
            {transform:'translateY(0) scale(0.5)', opacity:1},
            {transform:`translateY(-90px) scale(1.4) rotate(${Math.random()*180}deg)`, opacity:0}
        ],{duration:1100}).onfinish=()=>star.remove();
    }
}

// 5. LEGACY MOCK — behålls men redirectar till Chrillemon
const sampleCharacters = [
    { namn:"Kalle 'Disco-Fjäder' Anka", yrke:"Äventyrlig Skattjägar-Diva", utrustning:[], fardigheter:[], bakgrundshistoria:"", bildUrl:"" }
];
function triggerDemoCharacter(){
    // fyll i en demo-Chrillemon istället
    fillChrillemon('Demo','Eld-typ demo Chrillemon med pasta-hår, attacker: Demo Slap');
}
function renderCharacterInDom(c){
    const sheet=document.getElementById("characterSheetSection");
    if(!sheet) return;
    const nameEl=document.getElementById("charNameDisplay");
    const roleEl=document.getElementById("charRoleDisplay");
    const loreEl=document.getElementById("charLoreDisplay");
    if(nameEl) nameEl.innerText=c.namn||"Okänd Diva";
    if(roleEl) roleEl.innerText=c.yrke||"Ikonisk Legend";
    if(loreEl) loreEl.innerText=c.bakgrundshistoria||"";
    const gearList=document.getElementById("charGearList");
    if(gearList){ gearList.innerHTML=""; (c.utrustning||[]).forEach(item=>{ const li=document.createElement('li'); li.className='gear-item'; li.innerHTML=`<span>✨</span> <span>${item}</span>`; gearList.appendChild(li);});}
    const skillList=document.getElementById("charSkillsList");
    if(skillList){ skillList.innerHTML=""; (c.fardigheter||[]).forEach(s=>{ const span=document.createElement('span'); span.className='skill-pill'; span.innerHTML=`⚡ ${s}`; skillList.appendChild(span);});}
    const portraitImg=document.getElementById("charPortraitImg");
    const portraitPlaceholder=document.getElementById("charPortraitPlaceholder");
    if(c.bildUrl||c.bildBase64){
        const src=c.bildUrl||`data:image/png;base64,${c.bildBase64}`;
        if(portraitImg){ portraitImg.src=src; portraitImg.style.display="block"; }
        if(portraitPlaceholder) portraitPlaceholder.style.display="none";
    } else {
        if(portraitImg) portraitImg.style.display="none";
        if(portraitPlaceholder) portraitPlaceholder.style.display="flex";
    }
    sheet.style.display="block"; sheet.scrollIntoView({behavior:'smooth', block:'start'});
}

document.addEventListener("DOMContentLoaded", () => {
    updateRandomNonnaQuote();
    setInterval(updateRandomNonnaQuote, 9000);
});
