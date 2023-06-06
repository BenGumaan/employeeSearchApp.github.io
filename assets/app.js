

// Employees data

let employees = [
    {
        "id": 1,
        "name": "David William",
        "date": "May 2021",
        "image": "assets/images/user1.jpg",
        "location": "USA",
        "profession": "Dentist",
        "rate": 4.5
    },
    {
        "id": 2,
        "name": "Robert Charles",
        "date": "March 2022",
        "image": "assets/images/user2.jpg",
        "location": "UK",
        "profession": "Trader",
        "rate": 2.5
    },
    {
        "id": 3,
        "name": "James Matthew",
        "date": "Feb 2020",
        "image": "assets/images/user3.jpg",
        "location": "Australia",
        "profession": "Doctor",
        "rate": 4.5
    },
    {
        "id": 4,
        "name": "Michael Daniel",
        "date": "July 2023",
        "image": "assets/images/user4.jpg",
        "location": "Canada",
        "profession": "Teacher",
        "rate": 5.0
    },
    {
        "id": 5,
        "name": "Donald Steven",
        "date": "Jan 2023",
        "image": "assets/images/user5.jpg",
        "location": "Netherlands",
        "profession": "Designer",
        "rate": 2.5
    },
    {
        "id": 6,
        "name": "Kevin Edward",
        "date": "Dec 2022",
        "image": "assets/images/user6.jpg",
        "location": "India",
        "profession": "Developer",
        "rate": 3.0
    }
];

// Rendering the employees list

function renderEmpList() {
    let mainContainer = document.getElementById("employees-list");
    let empQty = document.querySelector('.empQty span');

    // remove every single item from cart
    mainContainer.innerHTML = '';
    // add new data to cart
    employees.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('employee');
        div.innerHTML = `
        <span class="closeBtn removeEmpd" onclick="removeEmp(${item.id})"><i class="fa-solid fa-trash"></i></span>
        <!-- <span class="editBtn">
            <i class="fa-regular fa-pen-to-square" id="checkBox" onclick="updateEmpData(${item.id})" data-id="${item.id}"></i>
        </span> -->
        <img src="${item.image}" alt="" onclick="popupImage(${item.id})">
        <div class="p-details">
            <h2 onclick="displayEmpData(${item.id})" id="title" style="cursor: pointer;" data-id="${item.id}">${item.name}</h2>
            <h3>Joined in ${item.date}</h3>
            <div class="bottom">
                <span class="location"><i class="fa-solid fa-location-dot red"></i> ${item.location}</span>
                <span class="profession"><i class="fa-solid fa-briefcase blue"></i> ${item.profession}</span>
                <span class="rate"><i class="fa-solid fa-star yellow"></i> ${parseFloat(item.rate)}</span>
            </div>
        </div>
        `;
        
        mainContainer.appendChild(div);
    })

    empQty.textContent = employees.length;

}

// Search for an employee

const searchEmployee = () => {

    const searchTxt = document.querySelector('.searchBox').value.toUpperCase();
    let employees = document.querySelectorAll('.employee');
    let empQty = document.querySelector('.empQty span');

    let empNum = 0;
    clearTxt.querySelector('i').style.color = "#898686";

    for (let i = 0; i < employees.length; i++) {

        let match = employees[i].getElementsByTagName('h2')[0];

        if (searchTxt === "") {
            clearTxt.querySelector('i').style.color = "#CDC9C9";
        }
        if (match) {
            let txtValue = match.textContent || match.innerText;
               
            if (txtValue.toUpperCase().indexOf(searchTxt) > -1) {
                empNum += 1;
                employees[i].style.display = "";
            } else {
                employees[i].style.display = "none";
            }   
        }

    }

    if (!empNum) {
        empQty.textContent = "No employee was found!";
    } else {
        empQty.textContent = empNum;
    }
}

// Clear text from search field

const clearTxt = document.querySelector('.removeSearch');

clearTxt.addEventListener('click', () => {
    document.querySelector('.searchBox').value = "";
    searchEmployee();
});
  
// Image uploader 

const imgArea = document.querySelector('.img-area');
const inputFile = document.querySelector('#file');

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
		}
		reader.readAsDataURL(image);
	} else {
		alert("Image size more than 2MB");
	}
})

// Opening and closing the pop-up widnow

const addEmp = document.querySelector('.addUser');
const closeBtn = document.querySelector('.close');
const newEmpTemplate = document.querySelector('.newEmpTemplate');
const backdrop = document.querySelector('.backdrop');
const popupImg = document.querySelector('.popup-img');

addEmp.addEventListener('click', openForm);
closeBtn.addEventListener('click', closeForm);
backdrop.addEventListener('click', closeForm);
popupImg.addEventListener('click', closeForm);

function popupImage(imgId) {
    employees.forEach( id => {
        if (id.id == imgId) {
            popupImg.querySelector('img').src = id.image;
            popupImg.classList.add('show');
        }
    });
}

function openForm() {
    document.querySelector('.updateBtn').style.display = "none";
    document.querySelector('.submitBtn').style.display = "block";
    newEmpTemplate.classList.add('open');
    backdrop.classList.add('show');
}

function closeForm() {
    backdrop.classList.remove('show');
    popupImg.classList.remove('show');
    newEmpTemplate.classList.remove('open');
    clearForm();
    document.getElementById('emp-id').textContent = 0;
}

// Getting the data from the form

const empForm = document.getElementById("empForm"); 

empForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validateForm()) {
        getFormData(e.target);
        closeForm();
    }
});

function getFormData(form) {
    let formData = new FormData(form);
    let object = {};

    formData.forEach((value, key) => {
        object[key] = value;
    });
    
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const date = new Date();
    const dateJoined = monthNames[date.getMonth()] + " " + date.getFullYear();

    object['id'] = employees.length + 1;
    object['image'] = (imgArea.getElementsByTagName('img').length > 0) ? document.querySelector('.empImg').src : "assets/images/default-image.jpg"; 
    object['rate'] = parseFloat(showValue.textContent);
    object['date'] = dateJoined;

    // Add an employee
    employees.push(object);
    
    updateList();
}

function removeEmp(itemId) {
    // Delete the index of this ID
    employees = employees.filter(item => item.id != itemId);

    updateList();
}

// Clearing the form

function clearForm() {
    // Clear Image
    document.querySelector('.empImg').src = "assets/images/default-image.jpg";
    imgArea.classList.remove('active');
    imgArea.dataset.img = "";
    imgArea.querySelector('span').innerHTML = "";
    // empImg.src = def_img;
    // if (empImg) {
    //     empImg.remove();
    // }

    // Clear Input Fields
    let inputFields = document.querySelectorAll('#empForm .input, #empForm span');
    inputFields.forEach(element => {
        element.value = "";
        element.textContent = "";
    });

    // Clear Rating Stars 
    let ratingStar = document.querySelectorAll('fieldset input');
    ratingStar.forEach(element => {
        element.checked = false;
        showValue.textContent = "0.0";
    });
}

// Validating form inputs

function validateImage() {
    let imageError = document.getElementById('img-error');

    let imgUploaded = imgArea.dataset.img;
    if (!imgUploaded) {
        imageError.innerHTML = `Upload Image`;
        return false;
    }
    return true;
}
function validateName() {
    let name = document.getElementById('name').value;
    let nameError = document.getElementById('name-error');
    
    if (name.length == 0) {
        nameError.innerHTML = `Name is required`;
        return false;
    } 
    nameError.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
    return true;
}
function validateLocation() {
    let location = document.getElementById('location').value;
    let locationError = document.getElementById('location-error');
   
    if (location.length == 0) {
        locationError.innerHTML = `Location is required`;
        return false;
    } 
    locationError.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
    return true;
}
function validateProfession() {
    let profession = document.getElementById('profession').value;
    let professionError = document.getElementById('profession-error');

    if (profession.length == 0) {
        professionError.innerHTML = `Profession is required`;
        return false;
    } 
    professionError.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
    return true;
}
function validateRating() {
    let inputFields = document.querySelectorAll('fieldset input');
    let rateError = document.getElementById('rate-error');
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
    if ( !validateName() || !validateLocation() || !validateProfession() ) {
        console.log("Something missing in the form");
        return false;    
    } else {
        console.log("Good to GO!");
        return true;   
    }
}

// Displaying an employee data

function displayEmpData(empId) {

    employees.forEach(id => {
        
        if (id.id == empId) {

            // display image
            imgArea.querySelector('.empImg').src = id.image;
            imgArea.classList.add('active');

            // display fields
            document.getElementById('name').value = id.name;
            document.getElementById('location').value = id.location;
            document.getElementById('profession').value = id.profession;
            
            // display rating stars
            let starToNum = { 0.5: 9, 1: 8, 1.5: 7, 2: 6, 2.5: 5, 3: 4, 3.5: 3, 4: 2, 4.5: 1, 5: 0 }
            for (let i = 0; i < star.length; i++) {
                while ( i <= starToNum[parseFloat(id.rate)]) {
                    star[i].checked = true;
                    i++;
                }
            }

            showValue.textContent = parseFloat(id.rate);

            openForm();
            
            document.querySelector('.submitBtn').style.display = "none";
            document.querySelector('.updateBtn').style.display = "block";
            
            document.getElementById('emp-id').textContent = empId;
        }
    });

}

document.getElementById('updateBtn').addEventListener('click', (e) => {
    e.preventDefault();
    let x = document.getElementById('emp-id').textContent;
    updateEmpData(parseInt(x));
});

// Updating an employee data

function updateEmpData(empId) {

    employees.forEach(id => {
        
        if (id.id == empId) {
            if (validateForm()) {
                let imgSrc = imgArea.querySelector('img').src;
                id.image = imgSrc;
                id.name = document.getElementById('name').value;
                id.location = document.getElementById('location').value;
                id.profession = document.getElementById('profession').value;
                id.rate = parseFloat(showValue.textContent);
                updateList();
                searchEmployee();
                closeForm();
            }        
        }
    });

}


// Rating system

let star = document.querySelectorAll('.rating input');
let showValue = document.querySelector('#rating-value');

for (let i = 0; i < star.length; i++) {
	star[i].addEventListener('click', function() {
		x = this.value;
		showValue.textContent = x;    
	});
}


// Update the employee list

function updateList() {
    // Render employee list with newly added data
    renderEmpList();
    searchEmployee();
}


renderEmpList()











