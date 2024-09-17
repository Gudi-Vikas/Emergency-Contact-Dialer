let inputForm = document.getElementById('main')
let saveBtn = document.getElementById('save-btn')
let saveList = document.getElementById('save-list')
let saveListParent = document.getElementById('save-list-parent')
let forDelete = document.getElementById('for-delete')
inputForm.addEventListener('click',handleEvents)
saveBtn.addEventListener('click',saveContacts)

let emergencyContacts =  []
function saveContacts(event){
  event.preventDefault()
  
  let contactName = document.getElementById('contact-name').value
  let contactNumber = document.getElementById('contact-number').value
  let newContact = {
    name: contactName,
    number: contactNumber
  }
  emergencyContacts.push(newContact)
  localStorage.setItem('emergencyContacts',JSON.stringify(emergencyContacts))
  showContacts()
  document.getElementById('contact-name').value = ''
  document.getElementById('contact-number').value = ''
}
function showContacts(event){

  
  saveList.innerHTML = ''
    emergencyContacts.forEach(contacts=>{
       let innerHTML = `<li>
          <h3>${contacts.name}</h3>
          <h3>${contacts.number}</h3>
          <button data-number='${contacts.number}' class="btn">Call</button>
          <button data-number='${contacts.number}' class="btn">Message</button>
          <button data-index='' id='delete'class="btn">Delete</button>
          </li>`
      saveList.insertAdjacentHTML('beforeend', innerHTML)
    })
  if(emergencyContacts.length == 0){
    forDelete.innerHTML = `        <h1>No Contacts Saved</h1>
        <h4>Save Contacts for Emergency Calls and Messages</h4>`
  }else if(emergencyContacts.length != 0){
    forDelete.innerHTML = ''
  }
}
function handleEvents(event){
  if(event.target.tagName === 'BUTTON'){
    if(event.target.textContent === 'Call'){
      let num = event.target.dataset.number
      let call = `tel:${num}`
      window.location.href = call
    } if(event.target.textContent === 'Message'){
      let subject = 'This is a Emergency Text'
      let body = 'This is a Emergency Message from [insert your name:]'
      let mailTo = `mailto:?subject=${subject}&body=${body}`
      window.location.href = mailTo
    } if(event.target.textContent==='Delete'){
      let index = event.target.index
      emergencyContacts.splice(index,1)
      localStorage.setItem('emergencyContacts',JSON.stringify(emergencyContacts))
      showContacts()
    }
  }
}
 emergencyContacts = JSON.parse(localStorage.getItem('emergencyContacts'))
showContacts()