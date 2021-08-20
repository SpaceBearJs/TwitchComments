const nombTest = document.querySelector('#Personas');
var nomStreamer='';
//Config bot de audio
let listenForCount=false;
var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
msg.lang = 'es-ES';
localStorage.setItem("cantidad", 150);
var anteriorUser='';

var client= new tmi.Client({
    connection:{
        secure:true,
        reconnect:true
    }
});

client.on('message',(channel, tags, mess, self) =>{

    if(self) return;
    let contador=nombTest.children.length;
    let numMax= localStorage.getItem('cantidad');

    if(contador>=numMax && nombTest.hasChildNodes()){
        nombTest.firstElementChild.remove();
    }

    nombTest.innerHTML += `<p id='mensajes'><b class='users${tags.username}' style='color:${randomColor()}'>${tags.username}</b> : ${mess}</p>`
    let alturaScroll = nombTest.scrollHeight;
    nombTest.scrollTop= alturaScroll;
    msg.text = '';

    // if(mess==='!leer'){
    //     listenForCount=true;
    //     msg.text = 'Bot activado';
    // }else if (mess==='!terminar'){
    //     listenForCount=false;
    //     msg.text = 'Bot desactivado';
    // }
    // else if (listenForCount){
    //     msg.text = tags.username+ ' dijo '+mess;
    // }
    // console.log(mess);
    // if(msg.text != ''){
    //     speechSynthesis.speak(msg);
    // }
    
});

//Opciones de configuración

function mostrar(clase){
    const confTwitch=document.querySelector(`.${clase}`);
    if(confTwitch.style.display == ''){
        confTwitch.style.display='none';
    }else{
        confTwitch.style.display='';
        document.querySelector('.streamer').value = localStorage.getItem('streamer');
        document.querySelector('.numMensajes').value = localStorage.getItem('cantidad');
    }

}

function empezar(){
    let stream = localStorage.getItem('streamer');
    let cantidad = localStorage.getItem('cantidad');
    let nom = document.querySelector('.streamer');

    if(anteriorUser!=''){
        client.part(anteriorUser);
    }

    if(!stream){
        validacion(nom);
    }
    if(cantidad!=150){
        cantidadMax=cantidad;
    }
    client.connect()
    .then((data) => {
        client.join(stream)
        anteriorUser=stream;
    });
}


function guardarInfo(){
    let nom = document.querySelector('.streamer');
    let cant = document.querySelector('.numMensajes');
    validacion(nom);
    localStorage.setItem("streamer", nom.value);
    localStorage.setItem("cantidad", cant.value);
    mostrar('config');
}


function validacion(nom){
    let cnf=document.querySelector('.config');
    if(nom.value==''){
        alert('Debes especificar el nombre del Streamer');
        cnf.style.display='';
        nom.focus();
    }
}