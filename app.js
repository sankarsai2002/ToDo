function customAlertRed(a,b){
    let alertTitle = document.getElementById('alertTitle');
    let alertSub = document.getElementById('alertSub');
    let mainAlert = document.getElementById('mainAlert');

    alertTitle.innerHTML = a;
    alertSub.innerHTML = b;

    alertTitle.classList.remove("removingForTemp");
    alertSub.classList.remove("removingForTemp");
    mainAlert.classList.add("mainAlertRed");
    mainAlert.classList.add("addAnimationName");

    setInterval(() => {
        alertTitle.classList.add("removingForTemp");
        alertSub.classList.add("removingForTemp");
        mainAlert.classList.remove("mainAlertRed");
        mainAlert.classList.remove("addAnimationName");
    }, 3000);
}

function customAlertGreen(a,b){
    let alertTitle = document.getElementById('alertTitle');
    let alertSub = document.getElementById('alertSub');
    let mainAlert = document.getElementById('mainAlert');

    alertTitle.innerHTML = a;
    alertSub.innerHTML = b;

    alertTitle.classList.remove("removingForTemp");
    alertSub.classList.remove("removingForTemp");
    mainAlert.classList.add("mainAlertGreen");
    mainAlert.classList.add("addAnimationName");

    setInterval(() => {
        alertTitle.classList.add("removingForTemp");
        alertSub.classList.add("removingForTemp");
        mainAlert.classList.remove("mainAlertGreen");
        mainAlert.classList.remove("addAnimationName");
    }, 3000);
}

function defaultImg(){
    let allArray = JSON.parse(localStorage.getItem('allKeys'));
    let displayingImg = document.getElementById('displayingImg');
    if(allArray.length==0){
        displayingImg.classList.remove("displaying1");
    }
    else{
        displayingImg.classList.add("displaying1");
    }
}

function deleteAll(){
    // activating confirmation Box
    let confirmationBox = document.getElementById('confirmationBox');
    confirmationBox.classList.remove('confirmationBox2');

    content.classList.add('toDeactivateBackground');
    // adding heading to confirmation box
    let confirmationBoxTitle = document.getElementById('confirmationBoxTitle');
    let ok = document.getElementById('ok');
    let cancel = document.getElementById('cancel');

    ok.addEventListener('click',()=>{
        let allArray = JSON.parse(localStorage.getItem('allKeys'));
        for(val of allArray){
            let div = document.getElementById(val);
            div.remove();
        }
        localStorage.clear();
        localStorage.setItem('allKeys',JSON.stringify([]));
        localStorage.setItem('keyCount',0);

        confirmationBox.classList.add('confirmationBox2');
        content.classList.remove('toDeactivateBackground');
        defaultImg();
    })

    cancel.addEventListener('click',()=>{
        confirmationBox.classList.add('confirmationBox2');
        content.classList.remove('toDeactivateBackground');
    })

    confirmationBoxTitle.innerText = `Do you want to delete All Tasks`;
}

function presentDateTime(){
    var now = new Date();
    var year = now.getFullYear();
    var month = String(now.getMonth() + 1).padStart(2, '0');
    var day = String(now.getDate()).padStart(2, '0');
    var hours = String(now.getHours()).padStart(2, '0');
    var minutes = String(now.getMinutes()).padStart(2, '0');
    var currentDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    return currentDate;
}

function deleteDone(){
    // activating confirmation Box
    let confirmationBox = document.getElementById('confirmationBox');
    confirmationBox.classList.remove('confirmationBox2');

    content.classList.add('toDeactivateBackground');
    // adding heading to confirmation box
    let confirmationBoxTitle = document.getElementById('confirmationBoxTitle');
    let ok = document.getElementById('ok');
    let cancel = document.getElementById('cancel');

    ok.addEventListener('click',()=>{
        let allArray = JSON.parse(localStorage.getItem('allKeys'));
        let currentDate = presentDateTime();
        let filteredKeys = allArray.filter((value)=>{
            let val = JSON.parse(localStorage.getItem(value));
            if(val.endDate<currentDate){
                localStorage.removeItem(value);
                let div = document.getElementById(value);
                div.remove(); 
                return false;
            }
            return true;
        });
    
        localStorage.setItem('allKeys', JSON.stringify(filteredKeys));    
        confirmationBox.classList.add('confirmationBox2');
        content.classList.remove('toDeactivateBackground');
        defaultImg();

        customAlertGreen("Deleted Expired <br>Tasks","")
    });

    cancel.addEventListener('click',()=>{
        confirmationBox.classList.add('confirmationBox2');
        content.classList.remove('toDeactivateBackground');
    });

    confirmationBoxTitle.innerText = "Do you want to delete Expired Tasks";
}

function updateTag(key){
    let heading = document.getElementById(key+"Head");
    let startDate = document.getElementById(key+"Start");
    let endDate = document.getElementById(key+"End");

    let data = JSON.parse(localStorage.getItem(key));

    heading.innerText = data.remainder;
    endDate.innerText = data.endDate;
    startDate.innerText = data.startDate;
    
    sortByDate();
    
}

function addingElement(val){

    let data = JSON.parse(localStorage.getItem(val));
    let content = document.getElementById('content');

    
    let div = document.createElement('div');
    let h1 = document.createElement('h1');
    let h3 = document.createElement('h3');
    let button = document.createElement('button');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    let editBtn = document.createElement('button');
    let sepDiv = document.createElement('div');
    let sepDiv1 = document.createElement('div');

    // let icon = document.createElement('i');

    div.setAttribute('id',val);
    h1.setAttribute('id',val+"Title");
    h3.setAttribute('id',val+"Head");
    button.setAttribute('id',val+"Del");
    p1.setAttribute("id", val+"Start");
    p2.setAttribute("id", val+"End");
    editBtn.setAttribute('id',val+"Edit");
    sepDiv.setAttribute('id',val+"SepDiv");
    sepDiv1.setAttribute('id',val+"SepDiv1");

    h1.innerText = "Task";
    button.innerText = "Delete";
    h3.innerText = data.remainder;
    p1.innerText = "Added on : "+data.startDate;
    p2.innerText = "To Do On : "+data.endDate;
    editBtn.innerHTML = 'Edit <i class="fa-solid fa-pen-to-square"></i>';

    // editBtn.appendChild(icon);

    div.appendChild(h1);
    div.appendChild(sepDiv);
    sepDiv.appendChild(h3);
    sepDiv.appendChild(sepDiv1);
    sepDiv1.appendChild(p1);
    sepDiv1.appendChild(p2);
    div.appendChild(button);    
    div.appendChild(editBtn);

    div.classList.add('infoBoxing');


    // document.body.appendChild(div);
    content.appendChild(div);

    button.addEventListener('click',()=>{
        let btnId = button.getAttribute('id');
        // console.log(btnId.substring(0,btnId.length-3));
        let tagsId = btnId.substring(0,btnId.length-3);
        let tag = document.getElementById(tagsId);


        // activating confirmation Box
        let confirmationBox = document.getElementById('confirmationBox');
        confirmationBox.classList.remove('confirmationBox2');

        content.classList.add('toDeactivateBackground');
        // adding heading to confirmation box
        let confirmationBoxTitle = document.getElementById('confirmationBoxTitle');
        let ok = document.getElementById('ok');
        let cancel = document.getElementById('cancel');

        ok.addEventListener('click',()=>{
            //removing from local Storage
            localStorage.removeItem(tagsId)
            console.log(tagsId);
            let allArray = JSON.parse(localStorage.getItem('allKeys'));
            let newallArray = allArray.filter((value)=>{
                return value != tagsId;
            });
            localStorage.setItem('allKeys',JSON.stringify(newallArray));

            tag.remove();
            button.remove();


            confirmationBox.classList.add('confirmationBox2');
            content.classList.remove('toDeactivateBackground');
            defaultImg();   
        })

        cancel.addEventListener('click',()=>{
            confirmationBox.classList.add('confirmationBox2');
            content.classList.remove('toDeactivateBackground');
        })

        confirmationBoxTitle.innerText = `Do you want to delete the Task : ${data.remainder} `;
    });

    editBtn.addEventListener('click',()=>{

        let inputRemainder = document.getElementById('inputRemainder');
        let inputDate = document.getElementById('inputDate');
        let btnId = editBtn.getAttribute('id');
        let elementId = btnId.substring(0,btnId.length-4);
        let Add = document.getElementById('Add');
        let cancelEdit = document.getElementById('cancelEdit');
        let confirmEdit = document.getElementById('confirmEdit');

        // inputRemainder.scrollIntoView({behavior: 'smooth'});

        let existingContent = JSON.parse(localStorage.getItem(elementId));
        inputRemainder.value = existingContent.remainder;
        inputDate.value = existingContent.endDate;

        Add.classList.add('removingForTemp');
        cancelEdit.classList.remove('removingForTemp');
        confirmEdit.classList.remove('removingForTemp');

        confirmEdit.addEventListener('click',()=>{
            let flag = true;
            while(inputRemainder.value!="" && inputDate.value!=null && flag==true){
                if(inputRemainder.value!="" && inputDate.value!=null){
                    existingContent.remainder = inputRemainder.value;
                    existingContent.endDate = inputDate.value;
                    existingContent.startDate = presentDateTime();
                    localStorage.setItem(elementId,JSON.stringify(existingContent));
                    updateTag(elementId);
                    flag = false;
                }
                else{
                    alert("Change is invalid");
                }
            }
            flag = true;

            inputDate.value = "";
            inputRemainder.value = "";
            Add.classList.remove('removingForTemp');
            cancelEdit.classList.add('removingForTemp');
            confirmEdit.classList.add('removingForTemp');

            console.log(document.getElementById(elementId));
            
            document.getElementById(elementId).scrollIntoView({behavior:"smooth"});
        });

        cancelEdit.addEventListener('click', ()=>{
            inputDate.value = "";
            inputRemainder.value = "";
            Add.classList.remove('removingForTemp');
            cancelEdit.classList.add('removingForTemp');
            confirmEdit.classList.add('removingForTemp');
        });

    });
}

function display(){
    let allArray = JSON.parse(localStorage.getItem('allKeys'));
    for(val of allArray){
        addingElement(val);
    }
    defaultImg();
}

(()=>{
    if(!localStorage.getItem('allKeys'))
    localStorage.setItem('allKeys',JSON.stringify([])); 
    if(!localStorage.getItem('keyCount'))
    localStorage.setItem('keyCount',0);
    display();
})()



function removingAllElements(){
    let allArray = JSON.parse(localStorage.getItem('allKeys'));
    for(val of allArray){
        let div = document.getElementById(val);
        div.remove();
    }
}

function addingToDisplay(){

    let allArray = JSON.parse(localStorage.getItem('allKeys'));
    
    let newArray = allArray.sort((a,b)=>{
        let t1 = JSON.parse(localStorage.getItem(a));
        let t2 = JSON.parse(localStorage.getItem(b));
        let t1date = new Date(t1.endDate);
        let t2date = new Date(t2.endDate);
        return t1date-t2date;
    })

    localStorage.setItem('allKeys', JSON.stringify(newArray));
    display();
}


function add(){

    let allArray = JSON.parse(localStorage.getItem('allKeys'));
    let keyCount = localStorage.getItem('keyCount');

    let inputRemainder = document.getElementById('inputRemainder');
    let inputDate = document.getElementById('inputDate');

    if(inputRemainder.value!='' && inputRemainder.value!=null && inputDate.value !=""){
        var currentDate = presentDateTime();
        removingAllElements(); // removing all the existing elements so that the sorted order can be inserted newly

        inputRemainder.value = inputRemainder.value.charAt(0).toUpperCase() + inputRemainder.value.slice(1).toLowerCase();        
        localStorage.setItem(`rem${keyCount}`, JSON.stringify({remainder: inputRemainder.value, startDate : currentDate ,endDate: inputDate.value}));

        allArray.push(`rem${keyCount}`);

        localStorage.setItem('allKeys',JSON.stringify(allArray));
        // console.log(localStorage.getItem('allKeys'));
        keyCount++;
        localStorage.setItem('keyCount',keyCount);
        addingToDisplay();
        inputRemainder.value = "";
        inputDate.value = "";

        customAlertGreen("Task Added<br><u>Successfully</u>","");
    }
    else{
        customAlertRed("Unable to Add","The input is invalid",);
    }
}

function sortByDate(){
    let myDropDown = document.getElementById('myDropDown');
    
    let allArray = JSON.parse(localStorage.getItem('allKeys'));
    if(myDropDown.value=="enteredDate"){
        let newArray = allArray.sort((a,b)=>{
            let t1 = JSON.parse(localStorage.getItem(a));
            let t2 = JSON.parse(localStorage.getItem(b));
            let t1date = new Date(t1.startDate);
            let t2date = new Date(t2.startDate);
            return t1date-t2date;
        })
    
        localStorage.setItem('allKeys',JSON.stringify(newArray));
        for(val of newArray){
            let div = document.getElementById(val);
            div.remove();
        }
        myDropDown.value = "completionDate";

        customAlertGreen("Tasks sorted<br in order of<br><u>Entered Date</u>","");
    }
    else{
        let newArray = allArray.sort((a,b)=>{
            let t1 = JSON.parse(localStorage.getItem(a));
            let t2 = JSON.parse(localStorage.getItem(b));
            let t1date = new Date(t1.endDate);
            let t2date = new Date(t2.endDate);
            return t1date-t2date;
        })
    
        localStorage.setItem('allKeys',JSON.stringify(newArray));
        for(val of newArray){
            let div = document.getElementById(val);
            div.remove();
        }

        customAlertGreen("Tasks sorted<br> in order of<br><u>Completion Date</u>","");
    }

    display();
}


// confirmation Box

