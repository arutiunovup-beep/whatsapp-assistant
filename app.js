'use strict';
const samples=[
{id:'late',group:'Работа',title:'Опоздание',ru:'Привет! Я сегодня немного задержусь. Сообщу, как только буду на месте.',de:'Hallo! Ich werde mich heute etwas verspäten. Ich melde mich, sobald ich da bin.'},
{id:'schedule',group:'Работа',title:'Рабочий график',ru:'Привет! Можешь, пожалуйста, прислать мне график работы на следующую неделю? Спасибо!',de:'Hallo! Kannst du mir bitte den Dienstplan für nächste Woche schicken? Vielen Dank!'},
{id:'bus',group:'Работа',title:'Неисправность автобуса',ru:'Привет! Хочу сообщить о неисправности автобуса. Подробности: [описание]. Номер автобуса: [номер].',de:'Hallo! Ich möchte einen Defekt am Bus melden. Details: [Beschreibung]. Busnummer: [Nummer].'},
{id:'shift',group:'Работа',title:'Обмен сменами',ru:'Привет! Есть возможность поменяться сменами? Напиши, пожалуйста, когда у тебя будет время.',de:'Hallo! Wäre es möglich, die Dienste zu tauschen? Gib mir bitte Bescheid, wenn du Zeit hast.'},
{id:'meeting',group:'Встречи',title:'Подтверждение встречи',ru:'Привет! Хотел уточнить, остаётся ли наша встреча в силе. Спасибо!',de:'Hallo! Ich wollte kurz nachfragen, ob unser Termin noch steht. Danke!'},
{id:'delay',group:'Встречи',title:'Задерживаюсь',ru:'Привет! Я немного опаздываю на встречу. Извини, пожалуйста.',de:'Hallo! Ich komme etwas später zu unserem Termin. Entschuldige bitte.'},
{id:'family',group:'Личное',title:'Как дела?',ru:'Привет! Как у тебя дела? Напиши, когда будет время.',de:'Hallo! Wie geht es dir? Schreib mir, wenn du Zeit hast.'},
{id:'thanks',group:'Личное',title:'Спасибо',ru:'Большое спасибо за твою помощь! Я очень это ценю.',de:'Vielen Dank für deine Hilfe! Ich weiß das sehr zu schätzen.'},
{id:'callback',group:'Личное',title:'Перезвонить',ru:'Привет! Перезвони мне, пожалуйста, когда тебе будет удобно.',de:'Hallo! Ruf mich bitte zurück, wenn es dir passt.'},
{id:'mirror',group:'Работа',title:'Повреждение зеркала',ru:'Здравствуйте! Сообщаю, что во время рейса произошёл контакт бокового зеркала с препятствием. Повреждено зеркало. Место: [место]. Время: [время]. Номер автобуса: [номер].',de:'Hallo! Ich möchte melden, dass es während der Fahrt zu einem Kontakt des Außenspiegels mit einem Hindernis gekommen ist. Der Spiegel ist beschädigt. Ort: [Ort]. Uhrzeit: [Uhrzeit]. Busnummer: [Nummer].'},
{id:'ac',group:'Работа',title:'Кондиционер',ru:'Привет! В автобусе [номер] не работает кондиционер. Прошу проверить неисправность. Спасибо!',de:'Hallo! Die Klimaanlage im Bus [Nummer] funktioniert nicht. Bitte den Defekt überprüfen. Danke!'},
{id:'early',group:'Работа',title:'Просьба о ранней смене',ru:'Привет! Если возможно, хотел бы получить больше ранних смен в следующем графике. Спасибо!',de:'Hallo! Wenn möglich, würde ich im nächsten Dienstplan gerne mehr Frühdienste übernehmen. Danke!'},
{id:'breakdown',group:'Работа',title:'Нужна помощь',ru:'Здравствуйте! Мне нужна помощь по рабочему вопросу: [описание]. Прошу связаться со мной, когда будет возможность.',de:'Hallo! Ich brauche Unterstützung bei einer dienstlichen Angelegenheit: [Beschreibung]. Bitte melde dich, sobald es möglich ist.'},
{id:'appointment',group:'Встречи',title:'Запрос времени',ru:'Здравствуйте! Хотел бы договориться о встрече. Когда вам было бы удобно?',de:'Guten Tag! Ich würde gerne einen Termin vereinbaren. Wann würde es Ihnen passen?'}
];
const $=id=>document.getElementById(id);let group='Все',language='de';const message=$('message');
function notify(s){$('feedback').textContent=s;clearTimeout(notify.timer);notify.timer=setTimeout(()=>$('feedback').textContent='',4500)}
function renderTemplates(){const groups=['Все','Работа','Встречи','Личное'];$('categories').replaceChildren(...groups.map(g=>{const b=document.createElement('button');b.textContent=g;b.className=g===group?'active':'';b.onclick=()=>{group=g;renderTemplates()};return b}));$('templates').replaceChildren(...samples.filter(s=>group==='Все'||s.group===group).map(s=>{const b=document.createElement('button');b.className='template';b.textContent=s.title;const sub=document.createElement('span');sub.textContent=s.group+' · '+language.toUpperCase();b.append(sub);b.onclick=()=>{message.value=s[language];notify('Шаблон добавлен ('+language.toUpperCase()+')')};return b}))}
function setLanguage(l){language=l;$('ru').classList.toggle('selected',l==='ru');$('de').classList.toggle('selected',l==='de');renderTemplates()}
$('ru').onclick=()=>setLanguage('ru');$('de').onclick=()=>setLanguage('de');
function wrap(marker){const a=message.selectionStart,b=message.selectionEnd,v=message.value;const selected=v.slice(a,b);message.value=v.slice(0,a)+marker+(selected||'текст')+marker+v.slice(b);message.focus();message.setSelectionRange(a+marker.length,a+marker.length+(selected||'текст').length)}
document.querySelectorAll('[data-wrap]').forEach(b=>b.addEventListener('click',()=>wrap(b.dataset.wrap)));
// Emoji picker inserts at current caret position or replaces the selection.
const emojiGroups={
'Часто':'😀 😃 😄 😁 😊 😉 😍 🥰 😘 🤗 😂 🤣 👍 👌 🙌 👏 ❤️ 💚 🙏 ✅ 🎉',
'Лица':'🙂 🙃 😌 😎 🤩 🥳 😇 🥲 😅 😆 😋 😜 😝 🤔 🤨 😐 😑 😏 😕 🙁 😢 😭 😡 😴 🤯 😮 😲 🥺 🤫 🤭 🫡',
'Жесты':'👍 👎 👌 ✌️ 🤞 🤝 🙏 👋 🤚 🖐️ 👏 🙌 💪 👊 🤜 🤛 🫶 👀',
'Сердца':'❤️ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💕 💞 💓 💗 💖 💘 💝 💔',
'Работа':'🚌 🚍 🚏 🚦 🚧 🔧 🛠️ ⚠️ 📅 🗓️ ⏰ ⌚ 📍 📞 📱 ✉️ 📩 📝 💼 ✅ ❗ ❓',
'Праздник':'🎉 🎊 🎂 🎁 🎈 🥳 🥂 🌟 ⭐ ✨ 🌹 🌷 🌻 🌞 🌙 ☀️ ☕ 🍀'
};
let emojiCategory='Часто';let caretStart=0,caretEnd=0;
['click','keyup','select','input','focus'].forEach(event=>message.addEventListener(event,()=>{caretStart=message.selectionStart;caretEnd=message.selectionEnd}));
function renderEmoji(){
 $('emojiTabs').replaceChildren(...Object.keys(emojiGroups).map(cat=>{const b=document.createElement('button');b.type='button';b.textContent=cat;b.className=cat===emojiCategory?'active':'';b.setAttribute('aria-pressed',String(cat===emojiCategory));b.onclick=()=>{emojiCategory=cat;renderEmoji()};return b}));
 $('emojiGrid').replaceChildren(...emojiGroups[emojiCategory].split(' ').map(emoji=>{const b=document.createElement('button');b.type='button';b.className='emoji-btn';b.textContent=emoji;b.setAttribute('aria-label','Вставить '+emoji);b.onclick=()=>{
 const start=Math.min(caretStart,message.value.length),end=Math.min(caretEnd,message.value.length);
 message.setRangeText(emoji,start,end,'end');caretStart=caretEnd=message.selectionStart;message.focus({preventScroll:true});notify('Смайлик добавлен');
 };return b}));
}
renderEmoji();
$('list').onclick=()=>{const pos=message.selectionStart;message.setRangeText((pos>0&&message.value[pos-1]!=='\n'?'\n':'')+'- ',pos,pos,'end');message.focus()};
$('date').onclick=()=>{const date=new Intl.DateTimeFormat('de-AT',{day:'2-digit',month:'2-digit',year:'numeric'}).format(new Date());message.value+=(message.value?'\n':'')+date};
$('clear').onclick=()=>{message.value='';notify('Поле очищено')};
$('copy').onclick=async()=>{if(!message.value.trim())return notify('Сначала введи текст');try{await navigator.clipboard.writeText(message.value);notify('Сообщение скопировано')}catch{message.focus();message.select();notify('Выделен текст. Нажми «Копировать» в меню iPhone.')}};
$('wa').onclick=()=>{const value=message.value.trim();if(!value)return notify('Сначала введи текст');const url=selectedContact?'https://wa.me/'+selectedContact+'?text='+encodeURIComponent(value):'https://wa.me/?text='+encodeURIComponent(value);window.location.href=url};
let selectedContact='';
const contactKey='wa-assistant-contacts-v2';
function getContacts(){try{const v=JSON.parse(localStorage.getItem(contactKey)||'[]');return Array.isArray(v)?v:[]}catch{return []}}
function paintContacts(){const target=$('contacts');target.replaceChildren();const list=getContacts();if(!list.length){const p=document.createElement('p');p.className='empty';p.textContent='Контактов пока нет';target.append(p)}list.forEach((c,i)=>{const row=document.createElement('div');row.className='draft';const label=document.createElement('span');label.className='draft-name';label.textContent=c.name+(selectedContact===c.num?' ✓':'');const use=document.createElement('button');use.textContent='Выбрать';use.onclick=()=>{selectedContact=c.num;paintContacts();notify('Получатель: '+c.name)};const del=document.createElement('button');del.textContent='Удалить';del.onclick=()=>{const a=getContacts();a.splice(i,1);localStorage.setItem(contactKey,JSON.stringify(a));if(selectedContact===c.num)selectedContact='';paintContacts()};row.append(label,use,del);target.append(row)})}
$('saveContact').onclick=()=>{const name=$('contactName').value.trim();const num=$('contactNumber').value.replace(/[\s()+-]/g,'');if(!name||!/^\d{7,15}$/.test(num))return notify('Укажи имя и номер с международным кодом (7–15 цифр)');const a=getContacts();if(a.some(x=>x.num===num))return notify('Этот номер уже сохранён');a.push({name,num});try{localStorage.setItem(contactKey,JSON.stringify(a));$('contactName').value='';$('contactNumber').value='';paintContacts();notify('Контакт сохранён')}catch{notify('Не удалось сохранить контакт')}};
$('forgetContact').onclick=()=>{selectedContact='';paintContacts();notify('Будет предложено выбрать чат в WhatsApp')};
$('translate').onclick=()=>{window.open('https://translate.google.com/?sl=auto&tl='+ (language==='de'?'de':'ru') +'&op=translate','_blank','noopener,noreferrer');notify('Скопируй текст и вставь его в переводчик')};
$('checkText').onclick=()=>{window.open('https://languagetool.org/','_blank','noopener,noreferrer');notify('Вставь текст в открывшийся редактор для проверки')};
paintContacts();
const storageKey='wa-assistant-drafts-v1';function readDrafts(){try{let o=JSON.parse(localStorage.getItem(storageKey)||'[]');return Array.isArray(o)?o:[]}catch{return []}}
function renderDrafts(){const rows=readDrafts();$('drafts').replaceChildren();if(!rows.length){const p=document.createElement('p');p.className='empty';p.textContent='Пока нет сохранённых черновиков';$('drafts').append(p);return}rows.forEach((d,i)=>{const row=document.createElement('div');row.className='draft';const name=document.createElement('span');name.className='draft-name';name.textContent=d.name;const load=document.createElement('button');load.textContent='Открыть';load.onclick=()=>{message.value=d.text;message.scrollIntoView({behavior:'smooth'});notify('Черновик загружен')};const del=document.createElement('button');del.textContent='Удалить';del.onclick=()=>{const list=readDrafts();list.splice(i,1);localStorage.setItem(storageKey,JSON.stringify(list));renderDrafts()};row.append(name,load,del);$('drafts').append(row)})}
$('save').onclick=()=>{const value=message.value.trim();if(!value)return notify('Сначала введи текст');const name=$('draftName').value.trim()||value.slice(0,36);const rows=readDrafts();rows.unshift({name,text:value});try{localStorage.setItem(storageKey,JSON.stringify(rows.slice(0,50)));$('draftName').value='';renderDrafts();notify('Черновик сохранён на этом устройстве')}catch{notify('Не удалось сохранить: проверь настройки браузера')}};
if('serviceWorker' in navigator && location.protocol==='https:')navigator.serviceWorker.register('./sw.js').catch(()=>{});
renderTemplates();renderDrafts();
