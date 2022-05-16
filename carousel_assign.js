let center = document.querySelector(".list-item");

let inputImg = document.querySelector("#input-img");
let uploadBtn = document.querySelector("#upload-btn");

uploadBtn.addEventListener("click",()=>{
    if(inputImg.files[0]===undefined){
        alert("이미지를 업로드 해주세요.");
        return;
    }
    const imgSrc = URL.createObjectURL(inputImg.files[0]);
    arrPic.push(imgSrc);
    renderCarousel();
})

const arrPic = [
    "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/jammanbo.png",
    "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/ev.png?raw=true",
    "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/mazayoung.png?raw=true",
    "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/mobugi.png",
    "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/nyaong.png",
    "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/pulin.png",
    "https://raw.githubusercontent.com/nugurejeil/sharingPhoto/main/weirdseed.png"
];

const perspective = 230;

document.querySelector("#app").setAttribute('style',`perspective:${perspective * arrPic.length}px`);

arrPic.forEach(i => {
    const elLi = document.createElement('li');
    elLi.innerHTML = `<img src="${i}" alt=''>`;
    center.appendChild(elLi);
});

let items = center.querySelectorAll("li");
let itemsDegree = 360 / items.length;
let itemsRadius = items[0].offsetWidth * items.length / 2 / Math.PI;
items.forEach((i, idx) =>{
    i.setAttribute('style',`transform:rotateY(${itemsDegree * (idx + 1)}deg) translateZ(${itemsRadius}px)`);
});

let angle = 360 / arrPic.length;
let curAngle = 0;
center.addEventListener("click",(event)=>{
    console.log(curAngle);
    console.log(center);
    if(event.clientX < window.innerWidth / 2){
        curAngle += angle;
    }else{
        curAngle -= angle;
    }
    center.setAttribute('style',`transform:translate(-50%,-50%) rotateY(${curAngle}deg)`);
});


function renderCarousel(){
    let curDegree = 360 / arrPic.length;
    let curRadius = items[0].offsetWidth * arrPic.length / 2 / Math.PI;
    items = center.querySelectorAll("li");
    items.forEach((i,idx)=>{
        i.setAttribute('style',`transform:rotateY(${curDegree * (idx + 1)}deg) translateZ(${curRadius}px)`);
    });//원래 있던 li들 각도 재설정

    const newLi = document.createElement('li');
    newLi.innerHTML = `<img src="${arrPic[arrPic.length-1]}" alt=''>`;
    center.appendChild(newLi);
    center.lastChild.setAttribute('style',`transform:rotateY(${curDegree * (arrPic.length)}deg) translateZ(${curRadius}px)`);
    //추가된 요소 배치

    document.querySelector("#app").setAttribute('style',`perspective:${perspective * arrPic.length}px`);
    //요소 추가된 만큼 원근법 좀더 멀게

    curAngle = 0;
    angle = 360 / arrPic.length;
    center.setAttribute('style',`transform:translate(-50%,-50%) rotateY(0deg)`);
    //이동 각도 초기화 및 조정
}