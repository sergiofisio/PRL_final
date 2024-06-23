const submit = document.querySelector("button[type=button]");
const inputs = document.querySelectorAll("input");
const password = document.getElementById("senha");
const imgSenha = document.getElementById("imgSenha");

function showPassword() {
  if (password.type === "password") {
    password.type = "text";
    imgSenha.src = "../img/icons/openEye.svg";
    return;
  }

  password.type = "password";
  imgSenha.src = "../img/icons/closeEye.svg";
}

imgSenha.addEventListener("click", () => {
  showPassword();
});

submit.addEventListener("click", function () {
  for (const input of inputs) {
    if (!input.value) {
      return;
    }
  }
  $.ajax({
    url: "../database/register.json",
    dataType: "json",
    type: "GET",
    contentType: "application/json",

    beforeSend: function () {},
  })
    .done(function (data) {
      submit.disabled = true;
      submit.classList.add("disabled");
      submit.classList.remove("btnLogin");
      setTimeout(() => {
        const findUser = data.find((user) => user.email === inputs[0].value);
        if (!findUser.admin) {
          return alert(
            "Somente administrador tem acesso. Por favor entre em contato se você for um administrador do sistema!"
          );
        }

        if (!findUser || findUser.senha !== inputs[1].value) {
          submit.disabled = false;
          submit.classList.remove("disabled");
          submit.classList.add("btnLogin");
          return alert("Email e/ou Senha inválido. Tente novamente");
        }
        alert(`Login realizado com sucesso. BEM VINDO ${findUser.nome}`);
        localStorage.setItem("logado", true);
        localStorage.setItem("user", JSON.stringify(findUser));
        window.location.href = "./dashborad/dashboard.html";
      }, 2000);
    })
    .fail(function (_, textStatus, errorThrown) {
      console.error("Error:", textStatus, errorThrown);
      response.textContent =
        "Falha no sistema, favor entrar em contato com o suporte através do telefone/whatsapp (11) 99999-9999 ou email suporte@sygla.com.br";
    });
});
