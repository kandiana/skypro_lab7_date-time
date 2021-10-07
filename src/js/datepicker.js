const DAYS = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
const DAYS_MAP = new Map([
	['Mon', 'Понедельник'],
	['Tue', 'Вторник'],
	['Wed', 'Среда'],
	['Thu', 'Четверг'],
	['Fri', 'Пятница'],
	['Sat', 'Суббота'],
	['Sun', 'Воскресенье'],
])
const MONTHS = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь',
]
const MONTHS_MAP = new Map([
	['Jan', 'января'],
	['Feb', 'февраля'],
	['Mar', 'марта'],
	['Apr', 'апреля'],
	['May', 'мая'],
	['Jun', 'июня'],
	['Jul', 'июля'],
	['Aug', 'августа'],
	['Sep', 'сентября'],
	['Oct', 'октября'],
	['Nov', 'ноября'],
	['Dec', 'декабря'],
])

function formatDate(date) {
	// date: Sun Oct 03 2021 00:00:00 GMT+0300 (Moscow Standard Time)
	const dateArray = date.split(' ')
	return `${DAYS_MAP.get(dateArray[0])}, ${+dateArray[2]} ${MONTHS_MAP.get(dateArray[1])} ${dateArray[3]} года`
}

function setDatePicker(inputBlock) {
	const picker = datepicker(inputBlock, {
		customDays: DAYS,
		startDay: 1,
		customMonths: MONTHS,
		overlayButton: 'Сохранить',
		overlayPlaceholder: 'Введите год (4 цифры)',
		minDate: STATUS.currentDate || new Date(),
		formatter: (input, date, instance) => {
			input.value = formatDate(date.toString())
			STATUS.chosenDate.string = input.value
			STATUS.chosenDate.number = +date
		},
	})
}
