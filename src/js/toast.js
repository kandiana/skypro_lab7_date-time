function showToast(message) {
	Toastify({
		text: message,
		duration: 5000,
		newWindow: true,
		close: true,
		gravity: 'bottom',
		position: 'right',
		stopOnFocus: true,
		style: {
			background: 'var(--bg-color)',
			color: '#fff',
		},
	}).showToast()
}
