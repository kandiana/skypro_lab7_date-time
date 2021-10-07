const STATUS = {
	chosenDate: {
		number: 0,
		string: '',
	},
	chosenTime: {
		number: 0,
		string: '',
	},
	currentDate: '',
}

function fillStatus() {
	const savedData = JSON.parse(localStorage.getItem('date-time-status'))
	if (!savedData) {
		return
	}

	STATUS.currentDate = new Date()

	if (savedData.chosenDate.number + savedData.chosenTime.number < +STATUS.currentDate) {
		localStorage.removeItem('date-time-status')
		STATUS.chosenDate.string = ''
		STATUS.chosenDate.number = 0
		STATUS.chosenTime.string = ''
		STATUS.chosenTime.number = 0
		return
	}

	STATUS.chosenDate.string = savedData.chosenDate.string
	STATUS.chosenDate.number = savedData.chosenDate.number
	STATUS.chosenTime.string = savedData.chosenTime.string
	STATUS.chosenTime.number = savedData.chosenTime.number
}

async function main() {
	fillStatus()
	await renderDateTimeBlock()
	await renderModalBlock()

	// Main blocks
	const dateTimeContent = document.querySelector('.date-time__content')
	const dateTimeButton = document.querySelector('.date-time__button')

	const modalBox = document.querySelector('.tingle-modal')
	const dateInput = document.querySelector('.date-input')
	const timeInput = document.querySelector('.time-input')
	const okButton = document.querySelector('.modal__button_ok')
	const cancelButton = document.querySelector('.modal__button_cancel')

	// filling saved info
	dateTimeContent.textContent =
		STATUS.chosenDate.string && STATUS.chosenTime.string
			? `${STATUS.chosenDate.string}, ${STATUS.chosenTime.string}`
			: 'Дата и время не заданы'

	dateInput.value = STATUS.chosenDate.string
	timeInput.value = STATUS.chosenTime.string

	// rendering datepicker
	setDatePicker(dateInput)

	// setting modal window to open on click and fill in input fields
	function openModalWindow() {
		STATUS.currentDate = new Date()
		dateInput.value = STATUS.chosenDate.string
		timeInput.value = STATUS.chosenTime.string
		modal.open()
	}
	dateTimeButton.addEventListener('click', openModalWindow)

	// preventing any custom input
	dateInput.addEventListener('keypress', (event) => {
		event.preventDefault()
	})

	dateInput.addEventListener('blur', (event) => {
		if (event.target.value) {
			event.target.value = STATUS.chosenDate.string
		}
	})

	timeInput.addEventListener('keypress', (event) => {
		event.preventDefault()
	})

	function processInputData(event) {
		event.preventDefault()

		if (!dateInput.value || !timeInput.value) {
			shakeBlock(modalBox)
			showToast('Не все поля заполнены!')
			return
		}

		STATUS.chosenTime.string = timeInput.value
		STATUS.chosenTime.number =
			timeInput.value
				.split(':')
				.map((el) => +el * 60)
				.reduce((res, el) => res * 60 + el) * 1000

		if (STATUS.chosenDate.number + STATUS.chosenTime.number < +STATUS.currentDate) {
			shakeBlock(modalBox)
			showToast('Нельзя поставить встречу в прошлом')
			return
		}

		localStorage.setItem('date-time-status', JSON.stringify(STATUS))

		dateTimeContent.textContent = `${STATUS.chosenDate.string}, ${STATUS.chosenTime.string}`

		modal.close()
	}

	okButton.addEventListener('click', processInputData)

	cancelButton.addEventListener('click', () => {
		dateInput.value = ''
		timeInput.value = ''

		fillStatus()

		modal.close()
	})
}

main()
