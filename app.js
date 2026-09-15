const DB_KEY="frf_evolution_academy_v5";
const courses=[
 {id:"en-a1",lang:"Inglês",level:"A1",title:"English Foundations",desc:"Apresentação, vocabulário essencial, frases simples e pronúncia inicial.",next:"Greetings & Introductions"},
 {id:"en-a2",lang:"Inglês",level:"A2",title:"Everyday English",desc:"Conversação diária, tempos verbais essenciais e situações práticas.",next:"Daily routines"},
 {id:"en-b1",lang:"Inglês",level:"B1",title:"Confident Communication",desc:"Falar com mais autonomia, compreender textos e desenvolver fluência.",next:"Opinions & reasons"},
 {id:"en-b2",lang:"Inglês",level:"B2",title:"Advanced Communication",desc:"Precisão, argumentação, listening e comunicação académica/profissional.",next:"Debate skills"},
 {id:"fr-a1",lang:"Francês",level:"A1",title:"Français Essentiel",desc:"Saudações, apresentações, vocabulário e estruturas fundamentais.",next:"Se présenter"},
 {id:"fr-a2",lang:"Francês",level:"A2",title:"Français du quotidien",desc:"Situações reais, compreensão e comunicação funcional.",next:"La vie quotidienne"},
 {id:"fr-b1",lang:"Francês",level:"B1",title:"Communication en français",desc:"Interação, produção escrita e oral com maior autonomia.",next:"Donner son opinion"},
 {id:"fr-b2",lang:"Francês",level:"B2",title:"Français avancé",desc:"Argumentação, precisão e comunicação académica/profissional.",next:"Débattre"}
];
const questions=[
 {q:"Choose the correct sentence:",opts:["She are a teacher.","She is a teacher.","She am a teacher."],a:1},
 {q:"What is the meaning of “Good morning”?",opts:["Boa noite","Bom dia","Até amanhã"],a:1},
 {q:"Complete: “I ___ from Angola.”",opts:["am","is","are"],a:0}
];
let db=JSON.parse(localStorage.getItem(DB_KEY)||'{"user":null,"points":0,"progress":0,"streak":0,"students":[]}');
let diagnosticIndex=0, diagnosticScore=0, deferredPrompt=null;

function save(){localStorage.setItem(DB_KEY,JSON.stringify(db))}
function go(id){
 document.querySelectorAll(".screen").forEach(s=>s.classList.toggle("active",s.id===id));
 document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.toggle("active",b.dataset.go===id));
 window.scrollTo({top:0,behavior:"smooth"});
 if(id==="dashboard")renderDashboard();
 if(id==="profile")renderProfile();
 if(id==="admin")renderAdmin();
}
document.addEventListener("click",e=>{
 const b=e.target.closest("[data-go]");
 if(b){e.preventDefault();go(b.dataset.go)}
});
function renderCourses(){
 const el=document.getElementById("courseGrid");
 el.innerHTML=courses.map(c=>`<article class="course"><div class="meta">${c.lang} • ${c.level}</div><h3>${c.title}</h3><p>${c.desc}</p><button class="btn btn-outline" onclick="startLesson('${c.id}')">Abrir aula</button></article>`).join("");
}
function renderDashboard(){
 const u=db.user;
 document.getElementById("welcome").textContent=u?`Olá, ${u.name.split(" ")[0]}!`:"Ainda não tens perfil";
 document.getElementById("goalText").textContent=u?`Objetivo: ${u.goal} • Língua principal: ${u.language}`:"Cria o teu perfil para começar.";
 document.getElementById("points").textContent=db.points;
 document.getElementById("streak").textContent=db.streak;
 document.getElementById("progress").textContent=db.progress+"%";
 document.getElementById("progressBar").style.width=db.progress+"%";
 document.getElementById("levelText").textContent=`Nível recomendado: ${db.level||"A1"} • Continua com pequenas sessões diárias.`;
 const rec=courses.find(c=>c.lang===(u?.language||"Inglês"))||courses[0];
 document.getElementById("recommended").innerHTML=`<div><b>${rec.title}</b><div class="muted">${rec.level} • ${rec.next}</div></div><button class="btn btn-gold" onclick="startLesson('${rec.id}')">Começar</button>`;
}
function renderProfile(){
 const u=db.user;
 document.getElementById("profilePanel").innerHTML=u?`<p><b>Nome:</b> ${u.name}</p><p><b>E-mail:</b> ${u.email}</p><p><b>Objetivo:</b> ${u.goal}</p><p><b>Língua:</b> ${u.language}</p><p><b>Nível:</b> ${db.level||"A1"}</p><button class="btn btn-outline" onclick="logout()">Sair deste dispositivo</button>`:`<p>Nenhum perfil criado neste dispositivo.</p><button class="btn btn-gold" data-go="register">Criar perfil</button>`;
}
function renderAdmin(){document.getElementById("adminStudents").textContent=db.students.length}
document.getElementById("registerForm").addEventListener("submit",e=>{
 e.preventDefault();
 const u={name:document.getElementById("name").value.trim(),email:document.getElementById("email").value.trim(),goal:document.getElementById("goal").value,language:document.getElementById("language").value};
 db.user=u; db.level="A1"; db.points=10; db.progress=2; db.streak=1;
 if(!db.students.some(s=>s.email===u.email))db.students.push(u);
 save(); go("dashboard");
});
function startDiagnostic(){
 diagnosticIndex=0;diagnosticScore=0;renderQuestion();
}
function renderQuestion(){
 const form=document.getElementById("diagnosticForm");
 if(diagnosticIndex>=questions.length){
   db.level=diagnosticScore>=3?"A2":diagnosticScore>=2?"A1+":"A1";
   db.points+=30;db.progress=Math.min(100,db.progress+5);save();
   form.innerHTML=`<h3>Resultado: ${db.level}</h3><p class="muted">Pontuação ${diagnosticScore}/${questions.length}. A recomendação é inicial e poderá ser refinada com avaliações completas.</p><button type="button" class="btn btn-gold" onclick="go('dashboard')">Ver o meu percurso</button>`;
   return;
 }
 const q=questions[diagnosticIndex];
 form.innerHTML=`<h3>${diagnosticIndex+1}/${questions.length}</h3><p><b>${q.q}</b></p><div class="options">${q.opts.map((o,i)=>`<button type="button" class="option" onclick="answerDiagnostic(${i})">${o}</button>`).join("")}</div>`;
}
function answerDiagnostic(i){if(i===questions[diagnosticIndex].a)diagnosticScore++;diagnosticIndex++;renderQuestion()}
function startLesson(id){
 const c=courses.find(x=>x.id===id)||courses[0];
 document.getElementById("lessonTitle").textContent=c.title;
 document.getElementById("lessonTag").textContent=`${c.lang} • ${c.level}`;
 document.getElementById("lessonPrompt").textContent=c.lang==="Inglês"?"Choose the correct answer: “My name ___ Rosário.”":"Choisis la bonne réponse : « Je ___ Rosário. »";
 const opts=c.lang==="Inglês"?["am","is","are"]:["suis","es","est"];
 const correct=0;
 document.getElementById("lessonOptions").innerHTML=opts.map((o,i)=>`<button class="option" onclick="answerLesson(${i},${correct})">${o}</button>`).join("");
 document.getElementById("lessonFeedback").textContent="";
 document.getElementById("lessonContinue").classList.add("hidden");
 go("lesson");
}
function answerLesson(i,correct){
 const f=document.getElementById("lessonFeedback");
 if(i===correct){db.points+=20;db.progress=Math.min(100,db.progress+3);save();f.textContent="Excelente! Resposta correta. +20 Evolution Points";f.className="feedback ok"}
 else{f.textContent="Quase! Revê a estrutura e tenta novamente.";f.className="feedback bad"}
 document.getElementById("lessonContinue").classList.remove("hidden");
}
document.getElementById("lessonContinue").addEventListener("click",()=>go("dashboard"));
function logout(){db.user=null;save();go("home")}
document.getElementById("diagnostic").addEventListener("click",e=>{});
document.querySelector('[data-go="diagnostic"]').addEventListener("click",()=>setTimeout(startDiagnostic,0));
window.startLesson=startLesson;window.answerDiagnostic=answerDiagnostic;window.answerLesson=answerLesson;window.logout=logout;
renderCourses();renderDashboard();renderProfile();renderAdmin();

window.addEventListener("beforeinstallprompt",e=>{
 e.preventDefault();deferredPrompt=e;document.getElementById("installBtn").classList.remove("hidden");
});
document.getElementById("installBtn").addEventListener("click",async()=>{
 if(!deferredPrompt)return;
 deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;document.getElementById("installBtn").classList.add("hidden");
});
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}))}
