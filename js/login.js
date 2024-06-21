const valueCart = document.getElementById("valueCart");
const response = document.getElementById("response");
const submit = document.querySelector("button[type=button]");
const inputs = document.querySelectorAll("input");

function getCartProducts() {
  const numberProductsInCart = JSON.parse(localStorage.getItem("cart")) || [];

  valueCart.textContent = numberProductsInCart.length;
}

getCartProducts();

submit.addEventListener("click", function () {
  for (const input of inputs) {
    if (!input.value) {
      return;
    }
  }
  $.ajax({
    url: "../../database/register.json",
    dataType: "json",
    type: "GET",
    contentType: "application/json",

    beforeSend: function () {
      response.textContent = "Verificando";
    },
  })
    .done(function (data) {
      console.log({ data });
      setTimeout(() => {
        const findUser = data.find((user) => user.email === inputs[0].value);
        console.log({ findUser });

        if (!findUser || findUser.senha !== inputs[1].value)
          return (response.textContent = "Email e/ou Senha inválido");
      }, 2000);

      response.textContent = "Login efetuado com sucesso";
    })
    .fail(function (_, textStatus, errorThrown) {
      console.error("Error:", textStatus, errorThrown);
      response.textContent =
        "Falha no sistema, favor entrar em contato com o suporte através do telefone/whatsapp (11) 99999-9999 ou email suporte@sygla.com.br";
    });
});
