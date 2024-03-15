
let fname = document.getElementById('fname');
let lname = document.getElementById('lname');
let age = document.getElementById('age');
let dob = document.getElementById('dob');
let email = document.getElementById('email');
let phono = document.getElementById('phoneno');
let viewd = document.getElementById('viewd');
let selectd = document.getElementById('select');

let editcard  = false;
let index;
// let array  = [];
const getdetails = () =>{
   
   let getdet =JSON.parse(localStorage.getItem('createFun'));

   if (getdet) {

      return getdet;
 
   }else{

       return [];

   } 

}


let array = getdetails(); 



//create

const createFun = () =>{

  event.preventDefault();

  if (!editcard) {
    
    const studetail = {
      fname : fname.value,
      lname : lname.value,
      age : age.value,
      dob : dob.value,
      email : email.value,
      phono : phono.value,
      id : array.length + 1,
    }

    array.push(studetail);
    
    localStorage.setItem('createFun',JSON.stringify(array));

  } else {

    let cardUpdate = array.map((studentd) => {
      if(studentd.id == index){
        return{

          fname : fname.value,
          lname : lname.value,
          age : age.value,
          dob : dob.value,
          email : email.value,
          phono : phono.value,
          id : index,

        }
      }
      return array;
    });
    localStorage.setItem('createFun', JSON.stringify(cardUpdate));
     array = getdetails(); 
  
  }




  
  fname.value = "";
  lname.value = "";
  age.value = "";
  dob.value = "";
  email.value = "";
  phono.value ="";
  editcard = false ;

  viewdetails();
  
 // console.log(studetail,JSON.stringify(array));

}


// read

const viewdetails = () =>{

  if(array.length > 0){

    viewd.innerHTML = '';
    array.forEach(stu => {
       console.log(stu);
       viewd.innerHTML += `
       <div class="col-6 p-3">
       <div class="py-5 px-2 d-flex flex-column gap-3 overflow-hidden justify-content-center bg-warning" style="border-radius: 25px;">
           <div class="d-flex justify-content-center align-items-center">
                <div>
                    <img src="img/01.avif" alt="img" width="200px" height="200px" class="rounded-circle">
                </div>
           </div>
           <div class="ps-5 py-4 w-100 p-3">
           <h4>First Name :- <span>${stu.fname}</span></h4>
           <h4>Last Name :- <span>${stu.lname}</span></h4>
           <h4>Age :- <span>${stu.age}</span></h4>
           <h4>DOB :- <span>${stu.dob}</span></h4>
           <h4>Email :- <span>${stu.email}</span></h4>
           <h4>Phone No :-<span>${stu.phono}</span></h4>
           </div>
           <div class="d-flex justify-content-end justify-content-center gap-3">
               <button class="rounded-pill bg-primary text-white border-0" style="width:25%; padding: 10px 20px;" onclick="editstudent(${stu.id})">Edit</button>
               <button class="rounded-pill bg-danger text-white border-0" style="width:25%; padding: 10px 20px;" onclick="deletes(${stu.id})">Delete</button>
               <button class="rounded-pill bg-success text-white border-0" style="width:25%; padding: 10px 20px;" onclick="select(${stu.id})">select</button>
           </div>
           </div>
 </div> `
    });

  }else{

    viewd.innerHTML = "no data found";

  }


}

viewdetails();



// edit 


const editstudent = (id) =>{


  let edits = array.findIndex((edit) =>{
    return edit.id == id;
  })

  if(edits !== -1){
    let editstu = array[edits];

    fname.value = editstu.fname;
    lname.value= editstu.lname;
    age.value =editstu.age;
    dob.value = editstu.dob;
   email.value = editstu.email;
   phono.value =editstu.phono;

    
  }else{
    viewd.innerHTML ="Student is not found";
  }


  editcard = true;
    index = id;

  

}


//delete


const deletes = (id) => {
  let deletestu = array.findIndex((deleteStudent) => {
    return deleteStudent.id == id;
  })
    if(deletestu != -1){
      array.splice(deletestu,1);
      localStorage.setItem('createFun',JSON.stringify(array));
      
    }else{
      console.log("data is not found");


}
viewdetails();
}

//select

//array = getdetails();
viewdetails(array);

const  showSelect =() =>{

} 

let selectItem = 0;

const select = (id) =>{


  array = getdetails(); 
  let selectData = array.find(stu => stu.id == id);
  getdet = JSON.parse(localStorage.getItem('createFun')) || [];
  getdet.push(selectData);
  // localStorage.setItem('createFun', JSON.stringify(getdet));
  showSelect(selectData);

  selectItem++;
  selectd.innerHTML = `${selectItem}`;
  localStorage.setItem('NewCounting',JSON.stringify(getdet));
  console.log("Data In Local Storag...");
}



//model

 array = getdetails(); 
viewdetails(array);

const showModel1 = () => {

    let showArray = JSON.parse(localStorage.getItem('createFun')) || [];
    let showName = showArray.map(ele => ele.fname).join(" , ");
    document.getElementById('fnames').innerHTML = `${showName}`;

}

let mcount = 0;

const showModel = (id) => {

    array = getdetails();
    let selectData = array.find(data =>  data.id == id);
    let showArray = JSON.parse(localStorage.getItem('createFun')) || [];
    showArray.push(selectData);
    localStorage.setItem('selectData',JSON.stringify(showArray));
    showModel1();

    mcount++;
    selectd.innerHTML = `${mcount} + `;
    localStorage.setItem('selectCount', mcount); 

    console.log("Data Storge In Local Storage..");

}

