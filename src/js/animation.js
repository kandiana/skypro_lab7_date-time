function shakeBlock(block) {
  document.body.style.backgroundColor = 'rgb(100,0,0)'
  block.style.backgroundColor = 'rgb(100,0,0)'
  block.classList.add('animate__animated')
  block.classList.add('animate__tada')

  setTimeout(() => {
    document.body.style.backgroundColor = ''
    block.style.backgroundColor = ''
    block.classList.remove('animate__animated')
    block.classList.remove('animate__tada')
  }, 1000)
}
