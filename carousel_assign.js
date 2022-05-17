let center = document.querySelector(".list-item");

let inputImg = document.querySelector("#input-img");
let uploadBtn = document.querySelector("#upload-btn");

uploadBtn.addEventListener("click",()=>{
    if(inputImg.files[0]===undefined){
        alert("이미지를 업로드 해주세요.");
        return;
    }
    const imgSrc = URL.createObjectURL(inputImg.files[0]);
    containArr.push(imgSrc);
    initValues();//값 초기화
    // renderCarousel()
});

let containArr = [
    "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/nyaong.png",
    "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/pulin.png",
    "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/weirdseed.png",
    "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/jammanbo.png",
    "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/ev.png?raw=true",
    "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/mazayoung.png?raw=true",
    "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/mobugi.png",
    // "./img/0.png","./img/1.png","./img/2.png","./img/3.png","./img/4.png","./img/5.png",
    // "./img/6.png","./img/7.png","./img/8.png","./img/9.png",
]



let arrPic = [
    "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/nyaong.png",
    "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/pulin.png",
    "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/weirdseed.png",
    "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/jammanbo.png",
    "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/ev.png?raw=true",
    "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/mazayoung.png?raw=true",
    "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/mobugi.png",
    // "./img/0.png","./img/1.png","./img/2.png","./img/3.png","./img/4.png","./img/5.png",
    // "./img/6.png",
];

const perspective = 230;

document.querySelector("#app").setAttribute('style',`perspective:${perspective * arrPic.length}px`);//원근법 계산 코드

arrPic.forEach(i => {
    const elLi = document.createElement('li');
    elLi.innerHTML = `<img src="${i}" alt=''>`;
    center.appendChild(elLi);
});

let items = center.querySelectorAll("li");
let itemsDegree = 360 / items.length;
let itemsRadius = items[0].offsetWidth * items.length / 2 / Math.PI;
items.forEach((i, idx) =>{
    idx = (idx+4)%items.length;
    if(idx===0){
        i.setAttribute('style',`transform:rotateY(0deg) translateZ(${itemsRadius}px)`);
    }else{
        i.setAttribute('style',`transform:rotateY(${itemsDegree * (idx)}deg) translateZ(${itemsRadius}px)`);
    }
});

let angle = 360 / arrPic.length;
let curAngle = 0;
let isPressed = false;


let curLastRight = 0;
let curLastLeft = arrPic.length-1;
let curFirstIdx = 0;
function changeArrPic(dir){
    if(curFirstIdx===containArr.length){
        curFirstIdx = 0;
    }else if(curFirstIdx===-1){
        curFirstIdx = containArr.length-1;
    }
    if(curLastRight===arrPic.length){
        curLastRight=0;
    }else if(curLastRight===-1){
        curLastRight = arrPic.length-1;
    }
    if(curLastLeft===-1){
        curLastLeft = arrPic.length-1;
    }else if(curLastLeft===arrPic.length){
        curLastLeft = 0;
    }
    if(dir==="right"){
        curFirstIdx++;
        let tempIdx = (curFirstIdx + 6)%containArr.length;
        items[curLastRight].firstChild.setAttribute('src',containArr[tempIdx]);
        curLastRight++;
        curLastLeft++;
    }else if(dir==="left"){
        curFirstIdx--;
        if(curFirstIdx<0){
            curFirstIdx=containArr.length - 1;
        }
        let tempIdx = curFirstIdx;
        items[curLastLeft].firstChild.setAttribute('src',containArr[tempIdx]);
        curLastRight--;
        curLastLeft--;
    }
}



// center.addEventListener("click",(event)=>{
//     if(event.clientX < window.innerWidth / 2){
//         curAngle += angle;
//     }else{
//         curAngle -= angle;
//     }
//     center.setAttribute('style',`transform:translate(-50%,-50%) rotateY(${curAngle}deg)`);
// });

center.addEventListener("mousedown",(event)=>{
    isPressed = true;
    console.log("마우스:" +event);
    moveCarousel(event.clientX);
    //각도 돌리고 메인 배열에다 요소 추가
});

center.addEventListener("mouseup",(event)=>{
    isPressed = false;
});


window.addEventListener("keydown",(event)=>{
    isPressed = true;
    console.log("키보드:" +event);
    if(event.key==="ArrowRight"){
        moveCarousel(window.innerWidth/2 + 1);
        //오른쪽
    }else if (event.key==="ArrowLeft"){
        moveCarousel(window.innerWidth/2 - 1);
        //왼쪽
    }
});
window.addEventListener("keyup",(event)=>{
    isPressed = false;
});



function moveCarousel(clickDir){
    if(isPressed){
        if(clickDir<window.innerWidth/2){
            curAngle += angle;
            changeArrPic('left');
        }else{
            curAngle -= angle;
            changeArrPic('right');
        }
        center.setAttribute('style',`transform:translate(-50%,-50%) rotateY(${curAngle}deg)`);
        setTimeout(()=>{
            moveCarousel(clickDir);
        },200);
    }
}




function initValues(){
    curLastRight = 0;
    curLastLeft = arrPic.length-1;
    curFirstIdx = 0;

    curFirstIdx = 0;
    let cnt = 0;
    items.forEach((i, idx) =>{
        idx = (idx+4)%items.length;
        if(idx===0){
            i.setAttribute('style',`transform:rotateY(0deg) translateZ(${itemsRadius}px)`);
        }else{
            i.setAttribute('style',`transform:rotateY(${itemsDegree * (idx)}deg) translateZ(${itemsRadius}px)`);
        }
        i.firstChild.setAttribute('src',containArr[cnt++]);
    });
    curAngle = 0;
    center.setAttribute('style',`transform:translate(-50%,-50%) rotateY(0deg)`);
}





// function renderCarousel(){
//     let curDegree = 360 / arrPic.length;
//     let curRadius = items[0].offsetWidth * arrPic.length / 2 / Math.PI;
//     //배열에 추가 됐으니까 각도 반지름 다시 구하기
//     items = center.querySelectorAll("li");
//     items.forEach((i,idx)=>{
//         i.setAttribute('style',`transform:rotateY(${curDegree * (idx + 1)}deg) translateZ(${curRadius}px)`);
//     });//원래 있던 li들 각도 재설정

//     const newLi = document.createElement('li');
//     newLi.innerHTML = `<img src="${arrPic[arrPic.length-1]}" alt=''>`;
//     center.appendChild(newLi);
//     center.lastChild.setAttribute('style',`transform:rotateY(${curDegree * (arrPic.length)}deg) translateZ(${curRadius}px)`);
//     //추가된 요소 배치

//     document.querySelector("#app").setAttribute('style',`perspective:${perspective * arrPic.length}px`);
//     //요소 추가된 만큼 원근법 좀더 멀게

    // curAngle = 0;
    // angle = 360 / arrPic.length;
    // center.setAttribute('style',`transform:translate(-50%,-50%) rotateY(0deg)`);
//     //이동 각도 초기화 및 조정
// }