const HTML_MNEMONICS = {
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&apos;',
	'&': '&amp;',
}

function filterDangerousSymbols(inputString) {
	if (!inputString) return ''

	const filteredString = []

	for (let i = 0; i < inputString.length; i++) {
		if (HTML_MNEMONICS[inputString[i]]) {
			filteredString.push(HTML_MNEMONICS[inputString[i]])
		} else {
			filteredString.push(inputString[i])
		}
	}

	return filteredString.join('')
}

/***************************************************/

function templateStringEngine(block) {
	if (!block) {
		return ''
	}

	if (['string', 'number', true].includes(typeof block)) {
		// фильтруем входящий текст
		return filterDangerousSymbols(String(block))
	}

	if (Array.isArray(block)) {
		const element = []

		block.forEach((contentItem) => {
			element.push(templateStringEngine(contentItem))
		})

		return element.join('')
	}

	let classInfo = ''
	const attributesInfo = []

	// классы прописываем мы, поэтому тут фильтрация не нужна
	if (block.cls) {
		if (typeof block.cls === 'string') {
			classInfo = `class="${block.cls}" `
		} else {
			classInfo = `class="${block.cls.join(' ')}" `
		}
	}

	if (block.attrs) {
		for (let attributeName in block.attrs) {
			// фильтруем значения атрибутов
			attributesInfo.push(`${attributeName}="${filterDangerousSymbols(block.attrs[attributeName])}"`)
		}
	}

	const element = `<${block.tag} ${classInfo} ${attributesInfo.join(' ')}>
  ${templateStringEngine(block.content)}
  </${block.tag}>`

	return element
}

async function renderBlock(url) {
	const response = await fetch(url)

	const data = await response.json()

	return templateStringEngine(data)
}
