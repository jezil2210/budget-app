let search = document.querySelector('#search')
let span = document.querySelector('#span1')
let buttonRegister = document.querySelector('#buttonRegister')
let modal = document.querySelector("#modalRegistraDespesa")
let row = document.querySelector('#changeClass')
let i = document.querySelector('#i')

//REGISTER
let modalFather = $('#modalFather');

buttonRegister.addEventListener('click', () => {
  registerBudget()
})

//SEARCH
let allowed = true
search.addEventListener('click', () => {

  span.innerHTML = "Search a new Budget"

  buttonRegister.addEventListener('click', () => {
    searchBudget()
  })
  
  if(allowed){
    modalFather.append("<div class='row' style='margin-left: 8%; margin-top: 2%;'><div class='col'><table class='table' ><thead><tr><th>Date</th><th>Type</th><th>Description</th><th>Value</th><th></th></tr></thead><tbody id='budgetList'> </tbody></table></div></div>")
    allowed = false
  }
   
  loadBudgetList()
});