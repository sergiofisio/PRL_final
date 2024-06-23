const button = document
  .querySelector("button[type=button]")
  .addEventListener("click", function () {
    let nome = document.querySelector('input[name="nome"]');
    let email = document.querySelector('input[name="email"]');
    let assunto = document.querySelector('input[name="assunto"]:checked');
    let mensagem = document.querySelector("textarea");

    if (!assunto) {
      return alert("Selecione o assunto por favor!");
    }
    const contatoInfo = {
      nome: nome.value,
      email: email.value,
      assunto: assunto.value,
      mensagem: mensagem.value,
    };

    $.ajax({
      url: "../php/contato.php",
      type: "POST",
      data: contatoInfo,
    })
      .done(() => {
        alert(
          "Sua mensagem foi enviada, Estamos agradecidos por isso. Assim que for possível retornaremos o contato."
        );
        nome.value = "";
        email.value = "";
        document.querySelectorAll('input[name="assunto"]').forEach((radio) => {
          radio.checked = false;
        });
        mensagem.value = "";
      })
      .fail(function (_, textStatus, errorThrown) {
        console.error("Error:", textStatus, errorThrown);
      });
  });
