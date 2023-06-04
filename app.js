
// import { employees } from "./employees.js";
const mainContainer = document.getElementById("products-list");
const clearTxt = document.querySelector('.removeSearch');
// const removeEmp = document.querySelector('.closeBtn');

clearTxt.addEventListener('click', () => {
    document.querySelector('.searchBox').value = "";
    searchProduct();
});

const searchProduct = () => {
    const searchTxt = document.querySelector('.searchBox').value.toUpperCase();
    const products = document.querySelectorAll('.product');
    const empQty = document.querySelector('.empQty span');
    let empNum = 0;
    clearTxt.querySelector('i').style.color = "#898686";

    for (let i = 0; i < products.length; i++) {
        let match = products[i].getElementsByTagName('h2')[0];

        if (searchTxt === "") {
            clearTxt.querySelector('i').style.color = "#CDC9C9";
        }
        if (match) {
            let txtValue = match.textContent || match.innerText;
               
            if (txtValue.toUpperCase().indexOf(searchTxt) > -1) {
                empNum += 1;
                products[i].style.display = "";
            } else {
                products[i].style.display = "none";
            }   
        }

        
    }

    if (!empNum) {
        empQty.textContent = "No employee was found!";
    } else {
        empQty.textContent = empNum;
    }
}

// function calcItemsNum() {}

let employees = [
    {
        "id": 1,
        "name": "David William",
        "date": "May 2021",
        "image": "images/user1.jpg",
        "location": "USA",
        "profession": "Dentist",
        "rate": 4.6
    },
    {
        "id": 2,
        "name": "Robert Charles",
        "date": "March 2022",
        "image": "images/user2.jpg",
        "location": "UK",
        "profession": "Trader",
        "rate": 3.9
    },
    {
        "id": 3,
        "name": "James Matthew",
        "date": "Feb 2020",
        "image": "images/user3.jpg",
        "location": "Australia",
        "profession": "Doctor",
        "rate": 4.2
    },
    {
        "id": 4,
        "name": "Michael Daniel",
        "date": "July 2023",
        "image": "images/user4.jpg",
        "location": "Canada",
        "profession": "Teacher",
        "rate": 5.0
    },
    {
        "id": 5,
        "name": "Donald Steven",
        "date": "Jan 2023",
        "image": "images/user5.jpg",
        "location": "Netherlands",
        "profession": "Designer",
        "rate": 2.7
    },
    {
        "id": 6,
        "name": "Kevin Edward",
        "date": "Dec 2022",
        "image": "images/user6.jpg",
        "location": "India",
        "profession": "Developer",
        "rate": 4.8
    }
  ];


  function renderListItems() {
    let mainContainer = document.getElementById("products-list");

        // remove every single item from cart
        mainContainer.innerHTML = '';
        // add new data to cart
        employees.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('product');
            div.innerHTML = `
            <span class="closeBtn removeEmpd" onclick="removeEmp(${item.id})"><i class="fa-solid fa-trash"></i></span>
            <!-- <span class="checkBox">
                <input type="checkbox" name="" id="checkBox" data-id="${item.id}">
            </span> -->
            <img src="${item.image}" alt="">
            <div class="p-details">
                <h2>${item.name}</h2>
                <h3>Joined in ${item.date}</h3>
                <div class="bottom">
                    <span class="location"><i class="fa-solid fa-location-dot red"></i> ${item.location}</span>
                    <span class="profession"><i class="fa-solid fa-briefcase blue"></i> ${item.profession}</span>
                    <span class="rate"><i class="fa-solid fa-star yellow"></i> ${item.rate}</span>
                </div>
            </div>
              `;
    
              mainContainer.appendChild(div);
        })
  }

function removeEmp(itemId) {
    // Delete the index of this ID
    employees = employees.filter(item => item.id != itemId);

    updateList();
}

function updateList() {
    // Render list items with updated data
    renderListItems();
    searchProduct();
}
renderListItems()



// Image uploader 

const selectImage = document.querySelector('.select-image');
const inputFile = document.querySelector('#file');
const imgArea = document.querySelector('.img-area');

imgArea.addEventListener('click', function () {
	inputFile.click();
})

inputFile.addEventListener('change', function () {
	const image = this.files[0]
	if(image.size < 2000000) {
		const reader = new FileReader();
		reader.onload = ()=> {
            // First delete all previous images
			const allImg = imgArea.querySelectorAll('img');
			allImg.forEach(item=> item.remove());
            // Then create a new image element
			const imgUrl = reader.result;
			const img = document.createElement('img');
			img.src = imgUrl;
			imgArea.appendChild(img).classList.add('empImg');
			imgArea.classList.add('active');
			imgArea.dataset.img = image.name;
            // document.querySelector('.empImg').style.display = "block";
            // document.querySelector('.empImg').style.opacity = "1";
		}
		reader.readAsDataURL(image);
	} else {
		alert("Image size more than 2MB");
	}
})


const openBtn = document.querySelector('.addUser');
const closeBtn = document.querySelector('.close');
const newEmpTemplate = document.querySelector('.newEmpTemplate');
const backdrop = document.querySelector('.backdrop');

openBtn.addEventListener('click', openForm);
closeBtn.addEventListener('click', closeForm);
backdrop.addEventListener('click', closeForm);

function openForm() {
    newEmpTemplate.classList.add('open');
    backdrop.style.display = 'block';
    
    setTimeout(() => {
        backdrop.classList.add('show');
    }, 0);
}

function closeForm() {
    newEmpTemplate.classList.remove('open');
    backdrop.classList.remove('show');

    setTimeout(() => {
        backdrop.style.display = 'none';
        clearForm();
    }, 500);
}

function getData(form) {
    var formData = new FormData(form);

    var object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });
    
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const date = new Date();
    const dateJoined = monthNames[date.getMonth()] + " " + date.getFullYear();

    object['id'] = employees.length + 1;
    object['image'] = document.querySelector('.empImg').src;
    object['rate'] = parseFloat(showValue.textContent);
    object['date'] = dateJoined;

    employees.push(object);
    
    console.log(employees);
    console.log(parseFloat(showValue.textContent));

    renderListItems();
}
  
document.getElementById("empForm").addEventListener("submit", function (e) {
    e.preventDefault();
    if (validateForm()) {
        getData(e.target);
        closeForm();
    }
});

// Rating system
let star = document.querySelectorAll('.rating input');
let showValue = document.querySelector('#rating-value');
showValue.textContent = "0.0";

for (let i = 0; i < star.length; i++) {
	star[i].addEventListener('click', function() {
		i = this.value;

		showValue.innerHTML = i;    
	});
}

function clearForm() {
    // Clear Image
    let empImg = document.querySelector('.empImg')
    imgArea.classList.remove('active');
    imgArea.dataset.img = "";
    imgArea.querySelector('span').innerHTML = "";
    if (empImg) {
        // empImg.style.display = "none";
        // empImg.style.opacity = "0";
        empImg.remove();
    }

    // Clear Input Fields
    let inputFields = document.querySelectorAll('#empForm .input, fieldset input, #empForm span');
    inputFields.forEach(element => {
        element.value = "";
        element.innerHTML = "";
        element.checked = false;
        showValue.textContent = "";
    });
}



// Checking form validity

// Declarign and initializing variables
let nameError = document.getElementById('name-error');
let locationError = document.getElementById('location-error');
let professionError = document.getElementById('profession-error');
let imageError = document.getElementById('img-error');
let rateError = document.getElementById('rate-error');
let submitError = document.getElementById('submit-error');

function validateImage() {
    let imgUploaded = imgArea.dataset.img;
    if (!imgUploaded) {
        imageError.innerHTML = `Upload Image`
        return false;
    }
    return true;
}
function validateName() {
    let name = document.getElementById('name').value;
    
    if (name.length == 0) {
        nameError.innerHTML = `Name is required`;
        return false;
    } 
    nameError.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
    return true;
}
function validateLocation() {
    let location = document.getElementById('location').value;
    
    if (location.length == 0) {
        locationError.innerHTML = `Location is required`;
        return false;
    } 
    locationError.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
    return true;
}
function validateProfession() {
    let profession = document.getElementById('profession').value;
    
    if (profession.length == 0) {
        professionError.innerHTML = `Profession is required`;
        return false;
    } 
    professionError.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
    return true;
}
function validateRating() {
    let inputFields = document.querySelectorAll('fieldset input');
    let rateChecked = false;
    inputFields.forEach(element => {
        if (element.checked) {
            rateChecked = true;
        }     
    });
    if (!rateChecked) {
        rateError.innerHTML = `Rate is required`;
        return false;
    }
    rateError.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
    return true;
}

function validateForm() {

    if ( !validateImage() || !validateName() || !validateLocation() || !validateProfession() ) {
        // submitError.style.display = "block";
        // submitError.innerHTML = `*Please fix the errors`;
        // setTimeout(() => {
        //    submitError.style.display = "none"; 
        // }, 3000);
        return false;    
    } else {
        return true;   
    }
}

function removeSelected() {
    let checked = document.querySelectorAll(".checkBox input[type='checkbox']:checked");
    console.log(checked);
    checked.forEach((elem) => {
        let empId = elem.dataset.id;
        removeEmp(empId);
        console.log("Remove");
    })
}

// function handleSubmit(event) {
//     event.preventDefault();
  
//     const data = new FormData(event.target);
  
//     const value = data.get('email');
  
//     console.log({ value });
//   }
  
//   const form = document.getElementById('empForm');
//   form.addEventListener('submit', handleSubmit);





  // fetch('employees.json', { mode: 'no-cors'})
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//     appendData(data);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });


//   function appendData(data) {
//     var mainContainer = document.getElementById("products-list");
//     for (var i = 0; i < data.length; i++) {
//       var div = document.createElement("div");
//       div.classList.add('product');
//       div.innerHTML = `
//       <span class="closeBtn removeEmp"><i class="fa-solid fa-trash"></i></span>
//       <span class="checkBox">
//           <input type="checkbox" name="" id="checkBox">
//       </span>
//       <img src="${data[i].image}" alt="">
//       <div class="p-details">
//           <h2>${data[i].name}</h2>
//           <h3>Joined in ${data[i].date}</h3>
//           <div class="bottom">
//               <span class="location"><i class="fa-solid fa-location-dot red"></i> ${data[i].location}</span>
//               <span class="profession"><i class="fa-solid fa-briefcase blue"></i> ${data[i].profession}</span>
//               <span class="rate"><i class="fa-solid fa-star yellow"></i> ${data[i].rate}</span>
//           </div>
//       </div>
//       `;
//       mainContainer.appendChild(div);
//     }
//   }
