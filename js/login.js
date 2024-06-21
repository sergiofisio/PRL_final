const valueCart = document.getElementById("valueCart");

function getCartProducts() {
  const numberProductsInCart = JSON.parse(localStorage.getItem("cart")) || [];

  valueCart.textContent = numberProductsInCart.length;
}

getCartProducts();

$(document).ready(function () {
  $("#phone").mask("(00) 00000-0000");
});

$(document).ready(function () {
  $("#email").on("blur", function () {
    var email = $(this).val();
    if (email.length > 0 && !validateEmail(email)) {
      alert("E-mail inválido!");
      $(this).focus();
    }
  });
});

function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

$(document).ready(function () {
  $("#cep").blur(function () {
    var cep = $(this).val().replace(/\D/g, "");
    if (cep != "") {
      var validacep = /^[0-9]{8}$/;
      if (validacep.test(cep)) {
        $("#rua").val("Buscando...");
        $.getJSON(
          "https://viacep.com.br/ws/" + cep + "/json/?callback=?",
          function (dados) {
            if (!("erro" in dados)) {
              $("#rua").val(dados.logradouro);
              $("#bairro").val(dados.bairro);
              $("#cidade").val(dados.localidade);
              $("#estado").val(dados.uf);
            } else {
              alert("CEP não encontrado.");
              $("#rua").val("");
              $("#bairro").val("");
              $("#cidade").val("");
              $("#estado").val("");
            }
          }
        );
      } else {
        alert("Formato de CEP inválido.");
      }
    }
  });
});
