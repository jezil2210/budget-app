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

