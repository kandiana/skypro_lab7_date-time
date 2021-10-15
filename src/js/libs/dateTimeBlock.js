const DATE_TIME_BLOCK_JSON = '/src/json/dateTimeBlock.json'
const blockContainer = document.querySelector('.container')

async function renderDateTimeBlock() {
  const dateTimeHTML = await renderBlock(DATE_TIME_BLOCK_JSON)
  blockContainer.insertAdjacentHTML('beforeend', dateTimeHTML)
}
