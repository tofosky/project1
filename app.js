let btnAdd = document.getElementById('btnadd')
let formQuestions = document.getElementById('formQuestions')
let btnClose = document.getElementById('btnClose')
let btnSave = document.getElementById('btnSave')
let txtQuest = document.getElementById('txtQuest').value
let txtAns  = document.getElementById('txtAns').value
let myUl = document.querySelector('#listing')
let answer = document.getElementById('answers')
let btnUpdate = document.getElementById('btnUpdate')

// creating the array 
let flashCards = []
// getting data from local storage
//flashCards = JSON.parse(localStorage.getItem('cards'))
    //Add the form
    btnAdd.addEventListener('click', (e) =>{
        e.preventDefault()
        formQuestions.style.display = 'block'
    })
    //close the form
    btnClose.addEventListener('click', (e) =>{
        e.preventDefault()
        formQuestions.style.display = 'none'
    })

    //function  add items to the array
    function add(quest,ans){
        if (quest!='' || ans!=''){
            entries = {
                question   :quest,
                answer      : ans
        }
        flashCards.push(entries)
         localStorage.setItem("cards",JSON.stringify(flashCards))
        displa()
        document.getElementById('txtQuest').value = "", document.getElementById('txtAns').value = ""
        }else{
            return alert('nothing inputed')
        }
        
    }

   
    displa()
    // fnction to display items in the dom
    function displa(){
       myUl.innerHTML = ""
       for(i=0; i<flashCards.length; i++){

        li = document.createElement('li')
           li.style.backgroundColor = 'white'
           li.style.border = '1px solid wheat'
           li.style.float = 'left'
           li.style.width = '300px'
           li.style.height = '150px'
           li.style.margin = '20px'
                  li.innerHTML += `
                  <input type="text" class='text1' hidden>
                  <div id='quest'>${flashCards[i].question} </div>
                  
                  <div class='answers' style="display:none">
                  <p>${flashCards[i].answer}</p>
                
                  </div>
                  <a id="btn"  onclick='showAnswer(${i})'>Show/Hide Answer</a> <p></p>
                  <button class='btn btn-primary' style='background-color:white; color:blue' onclick='edit(${i})'>Edit</button>  <button onclick='delite(${i})'class='btn btn-danger' style='background-color:white; color:orange'>Delete</button>
                  `;
                  myUl.append(li)                  
       }  
    }
  
    //function toggle
    function showAnswer(i){
        const answers = document.querySelectorAll(".answers");
        if(answers[i].classList.toggle('showHide')){
            answers[i].style.display="block"
        }
        else{
            answers[i].style.display="none"
        }
    } 
            
    // fnction to delete items
    function delite(index){
           confirmed = confirm('delete selected item?')
           if(confirmed == true){
               flashCards.splice(index,1)
               localStorage.setItem('cards', JSON.stringify(flashCards))
               displa()
           }
    }
    
    // function to edit items
    function edit(k){
        btnUpdate.style.display = 'block'
        btnSave.style.display = 'none'
           db = flashCards[k];
           formQuestions.style.display = 'block'
           document.getElementById('txtQuest').value = db.question;
           document.getElementById('txtAns').value = db.answer;
           document.getElementById("index").value = k
    }

    //fnction to update items
    function update(){ 
         ki= document.getElementById('index').value
        let entries = 
        {
            question   :document.getElementById('txtQuest').value,
            answer      : document.getElementById('txtAns').value
        } 
        flashCards[ki] = entries
        localStorage.setItem("cards",JSON.stringify(flashCards))
        displa()
       }
    

