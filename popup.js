//
function notifywith2but(message, ony=(e, nb)=>{}, onn=(e, nb)=>{}, yesbutc="Yes", nobutc="No", link=""){
    var mainnotify=document.createElement('div');
    mainnotify.style.position="fixed"
    mainnotify.style.height="100%";
    mainnotify.style.width="100%";
    mainnotify.style.top="0";
    mainnotify.style.bottom="0";
    var blur=document.createElement('div');
    blur.style.zIndex=500;
    blur.style.position="absolute"
    blur.style.height="100%";
    blur.style.width="100%";
    blur.style.top="0";
    blur.style.bottom="0";
    blur.style.backgroundColor="white"
    blur.style.opacity=0.5;
    mainnotify.appendChild(blur)
    var mainpop=document.createElement('div');
    mainpop.style.zIndex=1000;
    mainpop.style.position="fixed";
    mainpop.style.boxSizing="border-box";
    mainpop.style.height="50%";
    mainpop.style.width="50%";
    mainpop.style.top="20%";
    mainpop.style.left="25%";
    mainpop.style.boxSizing="border-box";
    mainpop.style.background="white";
    mainpop.style.boxSizing="border-box";
    mainpop.style.textAlign="center"
    mainpop.style.borderRadius="50px"
    var mess=document.createElement('div');
    mess.style.height="70%"
    mess.style.backgroundColor="lightblue"
    mess.style.borderRadius="50px"
    mess.style.lineHeight="25px"
    var messtext=document.createElement('a');
    if(link!="")
    {
        messtext.href=link;
    }
    messtext.innerHTML=message;
    mess.style.display="flex"
    mess.style.alignItems="center"
    mess.style.justifyContent="center"
    mess.style.alignContent="center"    
    mess.appendChild(messtext)
    mainpop.appendChild(mess)
    var yesbut=document.createElement('button');
    yesbut.onclick=(e)=>{
        ony(e, mainnotify)
    }
    yesbut.style.backgroundColor="green";
    yesbut.style.height="15%"
    yesbut.style.width="40%"
    yesbut.style.position="absolute";
    yesbut.style.left="55%" 
    yesbut.style.top="75%" 
    yesbut.style.borderRadius="70px"
    yesbut.innerHTML=yesbutc
    mainpop.appendChild(yesbut)
    var nobut=document.createElement('button');
    nobut.style.backgroundColor="red";
    nobut.style.height="15%"
    nobut.style.width="40%"
    nobut.style.position="absolute";
    nobut.style.left="5%" 
    nobut.style.top="75%" 
    nobut.style.borderRadius="70px"
    nobut.innerHTML=nobutc
    nobut.onclick=(e)=>{
        onn(e, mainnotify)
    }
    mainpop.appendChild(nobut)
    mainnotify.appendChild(mainpop)
    document.body.appendChild(mainnotify)

    return mainnotify;
}


  

//await, it will return true or false
async function waitnotifywith2but(message, yesbutc="Yes", nobutc="No", link=""){
    return await new Promise((resolve, reject) => {
        notifywith2but(message, ony=(e, nb)=>{
            nb.remove();
            resolve(true)
        }, onn=(e, nb)=>{
            nb.remove();
            resolve(false)
        }, yesbutc, nobutc, link)
    })
}

function notifywith1but(message, ony=(e, nb)=>{}, butc, link=""){
    var mainnotify=document.createElement('div');
    mainnotify.style.position="fixed"
    mainnotify.style.height="100%";
    mainnotify.style.width="100%";
    mainnotify.style.top="0";
    mainnotify.style.bottom="0";
    var blur=document.createElement('div');
    blur.style.zIndex=500;
    blur.style.position="absolute"
    blur.style.height="100%";
    blur.style.width="100%";
    blur.style.top="0";
    blur.style.bottom="0";
    blur.style.backgroundColor="white"
    blur.style.opacity=0.5;
    mainnotify.appendChild(blur)
    var mainpop=document.createElement('div');
    mainpop.style.zIndex=1000;
    mainpop.style.position="fixed";
    mainpop.style.boxSizing="border-box";
    mainpop.style.height="50%";
    mainpop.style.width="50%";
    mainpop.style.top="20%";
    mainpop.style.left="25%";
    mainpop.style.boxSizing="border-box";
    mainpop.style.background="white";
    mainpop.style.boxSizing="border-box";
    mainpop.style.textAlign="center"
    mainpop.style.borderRadius="50px"
    var mess=document.createElement('div');
    mess.style.height="70%"
    mess.style.backgroundColor="lightblue"
    mess.style.borderRadius="50px"
    mess.style.lineHeight="25px"
    var messtext=document.createElement('a');
    if(link!="")
    {
        messtext.href=link;
    }
    messtext.innerHTML=message;
    mess.style.display="flex"
    mess.style.alignItems="center"
    mess.style.justifyContent="center"
    mess.style.alignContent="center" 
    mess.appendChild(messtext)
    mainpop.appendChild(mess)
    var yesbut=document.createElement('button');
    yesbut.onclick=(e)=>{
        ony(e, mainnotify)
    }
    yesbut.style.backgroundColor="green";
    yesbut.style.height="15%"
    yesbut.style.width="70%"
    yesbut.style.position="absolute";
    yesbut.style.left="15%" 
    yesbut.style.top="75%" 
    yesbut.style.borderRadius="70px"
    yesbut.innerHTML=butc;
    mainpop.appendChild(yesbut)
    mainnotify.appendChild(mainpop)
    document.body.appendChild(mainnotify)
    return mainnotify;
}

//await, it will return true
async function waitnotifywith1but(message , butc, link=""){
    return await new Promise((resolve, reject) => {
        notifywith1but(message, ony=(e, nb)=>{
            nb.remove();
            resolve(true)
        }, butc, link)
    })
}


// creating function for pop up notification

// function popupnotify(message, link=""){
//     var popn=document.createElement('div');
//     popn.style.zIndex=1000; // to be on top
//     // popn.innerHTML=message;
//     popn.style.position="fixed";
//     popn.style.boxSizing="border-box";
//     popn.style.height="50%";
//     popn.style.width="50%";
//     popn.style.top="20%";
//     popn.style.left="25%";
//     popn.style.boxSizing="border-box";
//     popn.style.background="white";
//     popn.style.boxSizing="border-box";
//     popn.style.textAlign="center"
//     popn.style.borderRadius="50px"
//     popn.style.padding="auto"
//     var popnl=document.createElement('a');
//     // popnl.href=link;
//     // popnl.style
//     popnl.innerHTML=message;
//     popn.onclick=() => {
//         popn.remove();
//     }
//     popn.appendChild(popnl)
//     document.body.appendChild(popn)
//     // popn.remove();
// }


// notification destroyer

// function nfd(e, nf){
//     nf.remove();
// }

// ask to functions
// async function asktologin(){
//     notifywith2but("You want to login. Right?", (e, f)=>{
//         window.location="/login"}, (e, f)=>{
//             f.remove();
//         }
//     )
// }

// define sleep function, use await sleep(seconds)
function sleep(s){
    return new Promise(resolve=>setTimeout(resolve, s*1000));
}





// test

// async function respose(){
//     r=await waitnotifywith1but("Hello", "Kya?");
//     console.log(r)
// }