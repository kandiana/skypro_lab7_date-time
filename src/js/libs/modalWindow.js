const MODAL_CONTENT_JSON = '/src/json/modalContent.json'
const MODAL_FOOTER_CONTENT_JSON = '/src/json/modalFooterContent.json'

const modal = new tingle.modal({
  footer: true,
  stickyFooter: false,
  closeMethods: [],
  cssClass: ['custom-modal'],
})

async function renderModalBlock() {
  const modalContentHTML = await renderBlock(MODAL_CONTENT_JSON)
  const modalFooterContentHTML = await renderBlock(MODAL_FOOTER_CONTENT_JSON)

  modal.setContent(modalContentHTML)
  modal.setFooterContent(modalFooterContentHTML)
}
