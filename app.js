class Budget {
	constructor(year, month, day, type, description, valueBudget) {
		this.year = year
		this.month = month
		this.day = day
		this.type = type
		this.description = description
		this.valueBudget = valueBudget
	}

	validateData() {
		for (let i in this) {
			if (this[i] == undefined || this[i] == '' || this[i] == null) {
				return false
			}
		}
		return true
	}
}

class BD {
	constructor() {
		let id = localStorage.getItem('id')

		if (id == null) {
			localStorage.setItem('id', 0)
		}
	}

	getNextId() {
		return parseInt(localStorage.getItem('id') + 1)
	}

	saveToBD(budget) {
		let id = this.getNextId()
		localStorage.setItem(id, JSON.stringify(budget))
		localStorage.setItem('id', id)
	}
	//data = resgister
	getAllData() {
		let budgets = Array()

		let id = localStorage.getItem('id')

		for (let i = 1; i <= id; i++) {
			let budget = JSON.parse(localStorage.getItem(i))

			if (budget === null) {
				continue
			}
			budget.id = i
			budgets.push(budget)
		}

		return budgets
	}

	search(budget) {
		let filterBudgets = []
		filterBudgets = this.getAllData()
		

		if (budget.year != '') {
			filterBudgets = filterBudgets.filter(b => b.year == budget.year)
		}

		if (budget.month != '') {
			filterBudgets = filterBudgets.filter(b => b.month == budget.month)
		}

		if (budget.day != '') {
			filterBudgets = filterBudgets.filter(b => b.day == budget.day)
		}

		if (budget.type != '') {
			filterBudgets = filterBudgets.filter(b => b.type == budget.type)
		}

		if (budget.description != '') {
			filterBudgets = filterBudgets.filter(b => b.description == budget.description)
		}

		if (budget.valueBudget != '') {
			filterBudgets = filterBudgets.filter(b => b.valueBudget == budget.valueBudget)
		}

		return filterBudgets

	}

	remove(id) {
		localStorage.removeItem(id)
	}

}

let bd = new BD()

function registerBudget() {
	let year = document.querySelector('#year')
	let month = document.querySelector('#month')
	let day = document.querySelector('#day')
	let type = document.querySelector('#type')
	let description = document.querySelector('#description')
	let valueBudget = document.querySelector('#valueBudget')

	let budget = new Budget(
		year.value,
		month.value,
		day.value,
		type.value,
		description.value,
		valueBudget.value
	)

	if (budget.validateData()) {
		bd.saveToBD(budget)

		document.querySelector('#modal_titulo').innerHTML = 'Registration completed successfully'
		document.querySelector('#modal_titulo_div').className = 'modal-header text-success'
		document.querySelector('#modal_conteudo').innerHTML = 'Budget resgistered successfully!'
		document.querySelector('#modal_btn').innerHTML = 'Back'
		document.querySelector('#modal_btn').className = 'btn btn-success'

		$('#modalRegistraDespesa').modal('show')

		year.value = ''
		month.value = ''
		day.value = ''
		type.value = ''
		description.value = ''
		valueBudget.value = ''

	} else {

		document.querySelector('#modal_titulo').innerHTML = 'Inclusion Error'
		document.querySelector('#modal_titulo_div').className = 'modal-header text-danger'
		document.querySelector('#modal_conteudo').innerHTML = 'Error in recording, check if all fields were filled in correctly!'
		document.querySelector('#modal_btn').className = 'btn btn-danger'

		$('#modalRegistraDespesa').modal('show')
	}

}

function loadBudgetList(budget = [], filter = false) {
	if (budget.length == 0 && filter == false) {
		budget = bd.getAllData()
	}

	let budgetList = document.getElementById("budgetList")
	budgetList.innerHTML = ''
	budget.forEach(function (b) {
		//Criando a row (tr)
		let row = budgetList.insertRow();

		//Criando as colunas (td)
		row.insertCell(0).innerHTML = `${b.day}/${b.month}/${b.year}`

		//Ajustar o type
		switch (b.type) {
			case '1': b.type = 'Alimentation'
				break
			case '2': b.type = 'Education'
				break
			case '3': b.type = 'Recreation'
				break
			case '4': b.type = 'Health'
				break
			case '5': b.type = 'Transport'
				break

		}
		row.insertCell(1).innerHTML = b.type
		row.insertCell(2).innerHTML = b.description
		row.insertCell(3).innerHTML = b.valueBudget

		//Criar o botão de exclusão
		let btn = document.createElement('button')
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class="fa fa-times"  ></i>'
		btn.id = `id_despesa_${b.id}`
		btn.onclick = function () {
			let id = this.id.replace('id_despesa_', '')
			bd.remove(id)
			window.location.reload()
		}
		row.insertCell(4).append(btn)
	})

}

function searchBudget(){
	 
	let year = document.querySelector('#year').value
	let month = document.querySelector('#month').value
	let day = document.querySelector('#day').value
	let type = document.querySelector('#type').value
	let description = document.querySelector('#description').value
	let valueBudget = document.querySelector('#valueBudget').value
	

	let budget = new Budget(year, month, day, type, description, valueBudget)

	let budgets = bd.search(budget)


	 
	this.loadBudgetList(budgets, true)

 }
