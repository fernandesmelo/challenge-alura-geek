const formulario = document.querySelector("[data-form]")

formulario.addEventListener("submit", function (event) {
    event.preventDefault()

    const email = document.querySelector("[data-email]").value
    const password = document.querySelector("[data-password]").value

    if (email === "" || password === "") {
        alert("Os campos email e senha devem estar preenchidos.")
    } else {
        if ( email !== "laerciofernandesmelonetoo@gmail.com" || password !== "software" ) {
            const erroForm = document.querySelector(".mensagem-erro")
            erroForm.textContent = "Acesso negado. Tente novamente!"
        } else {
            window.location.href = "../views/adm.html"
        }
    }
})