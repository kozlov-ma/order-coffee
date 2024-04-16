const openModalBtn = document.getElementById('submit');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close');

openModalBtn.addEventListener('click', function(event) {
event.preventDefault()
    modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', function() {
    console.log('asd');
  modal.style.display = 'none';
});