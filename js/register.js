const password = document.getElementById("senha");
const confPassword = document.getElementById("confirma_senha");
const imgSenha = document.getElementById("imgSenha");
const imgConfSenha = document.getElementById("imgConfSenha");
const findCep = document.getElementById("findCep");
const cep = document.getElementById("cep");
const enviar = document.querySelector("button[type=button]");
const inputs = document.querySelectorAll("input");
const passwordDivs = document.querySelectorAll(".passwordDiv");

function showPassword() {
  if (password.type === "password") {
    password.type = "text";
    confPassword.type = "text";
    imgSenha.src = "../../img/icons/openEye.svg";
    imgConfSenha.src = "../../img/icons/openEye.svg";
    return;
  }

  password.type = "password";
  confPassword.type = "password";
  imgSenha.src = "../../img/icons/closeEye.svg";
  imgConfSenha.src = "../../img/icons/closeEye.svg";
}

imgSenha.addEventListener("click", () => {
  showPassword();
});
imgConfSenha.addEventListener("click", () => {
  showPassword();
});

cep.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
  findCep.classList.remove("disabled");
  findCep.textContent = "Buscar CEP";
});

findCep.addEventListener("click", () => {
  findCep.textContent = "Buscando...";
  findCep.disabled = true;

  if (cep.value.length < 8) {
    return alert("CEP INVÁLIDO, CEP DEVE CONTER 8 DIGITOS");
  }

  $.ajax({
    url: `https://viacep.com.br/ws/${cep.value}/json/`,
    dataType: "json",
    type: "GET",
  })
    .done((data) => {
      if (data.erro === "true") {
        alert("Falha ao Buscar CEP, favor digitar o seu endereço.");
        findCep.textContent = "desabilitado";
        return findCep.classList.add("disabled");
      }

      document.getElementById("rua").value = data.logradouro;
      document.getElementById("estado").value = data.uf;
      document.getElementById("cidade").value = data.localidade;
      document.getElementById("bairro").value = data.bairro;

      inputs.forEach((input) => {
        input.classList.remove("error");
      });

      findCep.textContent = "desabilitado";

      cep.disabled = true;

      return findCep.classList.add("disabled");
    })
    .fail(function (_, textStatus, errorThrown) {
      console.error("Error:", textStatus, errorThrown);
    });
});

$(document).ready(function () {
  $("#phone").mask("(00) 00000-0000");
});

enviar.addEventListener("click", () => {
  let inputsOk = true;
  inputs.forEach((input) => {
    if (!input.value && input.id !== "complemento") {
      input.classList.add("error");
      if (input.id === "senha" || input.id === "confirma_senha") {
        if (!password.value) passwordDivs[0].classList.add("error");
        if (!confPassword.value) passwordDivs[1].classList.add("error");
      }
      return (inputsOk = false);
    }
  });
  if (!inputsOk) return alert("Preencha todos os campos obrigatórios");
  if (password.value !== confPassword.value)
    return alert("Os Campos Senha e Confirmar senha devem ser iguais");

  $.ajax({
    url: "../../database/register.json",
    dataType: "json",
    type: "GET",
    contentType: "application/json",
  })
    .done((data) => {
      const findUser = data.find((user) => user.email === inputs[1].value);

      if (findUser) return alert("Email já cadastro no sistema");

      if (inputs[2].value.length < 15) return alert("telefone esta incompleto");

      const user = {
        nome: inputs[0].value,
        email: inputs[1].value,
        phone: inputs[2].value,
        endereco: {
          cep: inputs[3].value,
          rua: inputs[4].value,
          numero: inputs[5].value,
          complemento: inputs[6].value,
          bairro: inputs[7].value,
          cidade: inputs[8].value,
          estado: inputs[9].value,
        },
        senha: inputs[10].value,
        admin: false,
      };

      $.ajax({
        url: "../../php/register.php",
        type: "POST",
        data: JSON.stringify(user),
        contentType: "application/json",
      })
        .done(() => {
          alert(
            "Cadastrado com sucesso, você será redirecionado para o login!"
          );
          window.location.href = "login.html";
        })
        .fail(function (_, textStatus, errorThrown) {
          console.error("Error:", textStatus, errorThrown);
        });
    })
    .fail(function (_, textStatus, errorThrown) {
      console.error("Error:", textStatus, errorThrown);
    });
});

inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.classList.remove("error");
    if (input.id === "senha" || input.id === "confirma_senha") {
      passwordDivs.forEach((div) => div.classList.remove("error"));
    }
  });
});
