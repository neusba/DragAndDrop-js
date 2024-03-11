let files = []; 

// Variables con los elementos del HTML que usaremos
let dropArea = document.querySelector('.drop-area');
let dragDropText = document.querySelector('h2');
let button = document.querySelector('button');
let input = document.querySelector('#input-file');
let preview = document.querySelector('#preview');
let form = document.querySelector('form');

let events_preventDefault = ['dragover', 'dragleave', 'drop'];
events_preventDefault.forEach(evt => {
  dropArea.addEventListener(evt, prevDefault);
  function prevDefault(e) {
    e.preventDefault();
  }
});

// dragOver
dropArea.addEventListener("dragover", function() {
  dropArea.classList.add("active");
  dragDropText.textContent = "Drop to upload files";
})

// dragLeave
dropArea.addEventListener("dragleave", function() {
  dropArea.classList.remove("active");
  dragDropText.textContent = "Drag & Drop files";
})

// drop
dropArea.addEventListener("drop", function(e) {
  files = files.concat(Array.from(e.dataTransfer.files));
  showFiles();
});

// click
button.addEventListener("click", function(e) {
  e.preventDefault();
  input.click();
});

// change
input.addEventListener("change", function() {
  let inputFiles = input.files;
  files = files.concat(Array.from(inputFiles));
  showFiles();
  form.submit();
});

// submit
form.addEventListener("submit", function(e){
  e.preventDefault();
  console.log(e)
  const dataTransfer = new DataTransfer();
  files.forEach(file=>{
      dataTransfer.items.add(file);
  })
  input.files = dataTransfer.files;
  form.submit();
});

function showFiles() {
  preview.innerHTML = ""; 
  dropArea.classList.remove("active");
  dragDropText.textContent = "Drag & Drop files";
  if (files.length != 0) {
    files.forEach((file, index) => {
        processFile(file, index); 
    })
  }
}

function processFile(file, index) {
  const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"]; 
  const docType = file.type;

  if (!validExtensions.includes(docType)) {
    console.log(`El archivo "${file.name}" no es válido!`);
    files.splice(index, 1); 
  } else {
    let reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onloadend = function() { 
        let prev = 
        `<div class="previewImage">
            <img src="${reader.result}"/> 
            <span>${file.name}</span>
            <span onclick="removeBtn(${index})" class="material-symbols-outlined
        removeBtn">c</span>
        </div>`; 
        preview.innerHTML += prev;
    }
  }
}

function removeBtn(i) {
  files.splice(i, 1);
  showFiles();
}