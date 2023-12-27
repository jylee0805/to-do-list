const txt = document.querySelector(".txt");
const addBtn = document.querySelector(".addBtn");
const todo = document.querySelector(".todo");
const choose = document.querySelector(".choose");
const del1 = document.querySelector(".del");
const check1 =document.querySelector(".check");
const todoTotal = document.querySelector(".todoTotal");
const clear = document.querySelector(".clear");

let data = [];
let testStr = "";
let total = 0;
init(data);

function init(showData){
    let str = "";
    
    if(showData==""){
        todo.innerHTML = str;
    }
    showData.forEach(function(item,index){
        
        let isCheck="";

        if(item.isCheck){ //已完成
            isCheck = "checked"
            str+=`<li data-num="${index}" style="text-decoration: line-through;color:rgba(51,51,51,.3)"><input type="checkbox" class="check" ${isCheck} >${item.content}<img src="img/cross.png" alt="" class="del" ></li>`;
            
        }else{ //未完成
            isCheck = "unchecked";

            str+=`<li data-num="${index}" style="text-decoration: none;color:rgba(51,51,51,1)"><input type="checkbox" class="check" ${isCheck} >${item.content}<img src="img/cross.png" class="del" style="display:block"></img></li>`;
            
        }
        
        todo.innerHTML = str;
    })
    const todoData = data.filter(function(item){
        return !item.isCheck;
   })
    total = todoData.length;
    todoTotal.innerHTML = total;
}

//新增待辦事項
addBtn.addEventListener("click",function(e){

    if(txt.value==""){
        alert("請輸入代辦事項");
        return;
    }
    let item = {};
    item.content = txt.value;
    data.push(item);
    txt.value = "";
    init(data);
})

//選擇篩選清單
choose.addEventListener("click",function(e){
    const chooseChild = choose.children;
    for(let i = 0; i<chooseChild.length;i++){
        if(chooseChild[i].innerHTML==e.target.innerHTML){
            e.target.classList.add("select");
            if(e.target.innerHTML=="全部"){
                init(data);
            }else if(e.target.innerHTML=="已完成"){
                //篩選有打勾的事項     
               const finish = data.filter(function(item){
                    return item.isCheck;
               })
               init(finish);
            }else if(e.target.innerHTML=="待完成"){
                 //篩選沒有打勾的事項
                const todoData = data.filter(function(item){
                    return !item.isCheck;
                })
               init(todoData);
            }else{
                return;
            }
        }else {
            chooseChild[i].classList.remove("select");
        }
    }

    
})

//執行check和刪除
todo.addEventListener("click",function(e){
    
    switch(e.target.getAttribute("class")){
        
        case 'del':{ //按叉執行刪除
            let num = e.target.parentNode.getAttribute('data-num');
            data.splice(num,1);
            init(data);
            break;
        }
        case 'check':{ //打勾執行
            
            let num = e.target.parentNode.getAttribute('data-num');
            data[num].isCheck = e.target.checked;
            init(data);
            e.target.nodeName = "IMG";
            console.log(e);
            
            break;
        }
        default:{
            break;
        }
    }
})

//清除所有已完成事項
clear.addEventListener("click",function(e){
    data = data.filter(function(item){
        return !item.isCheck;
    })
    init(data);
})