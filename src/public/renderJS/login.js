
submitButton.onclick = async event => {
    event.preventDefault()

    const logAdmin = {
        name: usernameInput.value,
        password: passwordInput.value
    }

    let response = await req('/auth/login', 'POST', logAdmin)
    let token = await response.token
    window.localStorage.setItem('token', token)
    window.location = '/'
}