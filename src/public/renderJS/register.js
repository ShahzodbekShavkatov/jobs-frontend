
btn.onclick = async event => {
    event.preventDefault()

    const newAdmin = {
        name: usernameInput.value,
        password: passwordInput.value,
        email: emailInput.value
    }

    let response = await req('/auth/register', 'POST', newAdmin)
    let token = await response.token
    window.localStorage.setItem('token', token)
    window.location = '/'
}