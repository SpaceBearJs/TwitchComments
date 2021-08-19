
const nombTest = document.querySelector('#Personas');

const client= new tmi.Client({
    connection:{
        secure:true,
        reconnect:true
    },
    channels: ['knekro']
})
var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
msg.lang = 'es-ES';

let listenForCount=false;
const users = {};

client.connect();
client.on('message',(channel, tags, mess, self) =>{

    if(self) return;
    let contador=nombTest.children.length;

    if(contador>=150 && nombTest.hasChildNodes()){
        nombTest.firstElementChild.remove();
    }

    nombTest.innerHTML += `<p id='mensajes'><b class='users${tags.username}' style='color:${randomColor()}'>${tags.username}</b> : ${mess}</p>`
    let alturaScroll = nombTest.scrollHeight;
    nombTest.scrollTop= alturaScroll;
    msg.text = '';


    if(mess==='!leer'){
        listenForCount=true;
        msg.text = 'Bot activado';
    }else if (mess==='!terminar'){
        listenForCount=false;
        msg.text = 'Bot desactivado';
    }
    else if (listenForCount){
        msg.text = tags.username+ ' dijo '+mess;
    }
    console.log(mess);
    if(msg.text != ''){
        speechSynthesis.speak(msg);
    }
    
});