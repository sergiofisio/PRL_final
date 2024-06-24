const cart = document.querySelector("#cart");
const cartItens = JSON.parse(localStorage.getItem("cart"));
const user = JSON.parse(localStorage.getItem("user"));
const nome = document.querySelector("#nome");
const telefone = document.querySelector("#telefone");
const endereco = document.querySelector("#endereco");
const total = document.querySelector("#total");
const button = document.querySelector("button[type=button]");
const radios = document.querySelectorAll("input[type=radio]");
const mesValidade = document.querySelector("#mesValidade");
const anoValidade = document.querySelector("#anoValidade");
const inputs = document.querySelectorAll("input");
const sair = document.querySelector("#sair");

if (window.location.href.endsWith("finalizacao.html")) {
  sair.addEventListener("click", () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("user");
    localStorage.removeItem("formaPg");
    localStorage.setItem("logado", false);
  });
}

let formaPagamento = "";

function fillCart() {
  cartItens.forEach((item) => {
    const tr = document.createElement("tr");
    const tdImg = document.createElement("td");
    const img = document.createElement("img");
    const tdName = document.createElement("td");
    const tdQtt = document.createElement("td");
    const tdPrice = document.createElement("td");
    const tdFullPrice = document.createElement("td");

    img.src = item.img;
    img.alt = `imagem ${item.nome}`;
    img.classList.add("imgProduct");
    tdImg.classList.add("tableImg");

    tdImg.appendChild(img);
    tdName.textContent = item.nome;
    tdName.classList.add("tableName");

    tdQtt.textContent = item.quantidade;
    tdQtt.classList.add("tableQtt");
    tdPrice.textContent = Number(item.valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    tdFullPrice.textContent = (
      Number(item.valor) * Number(item.quantidade)
    ).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    tdPrice.classList.add("tablePrice");
    tdFullPrice.classList.add("tablePrice");
    tr.append(tdImg, tdName, tdQtt, tdPrice, tdFullPrice);
    cart.append(tr);
    if (window.location.href.endsWith("cart.html")) {
      nome.textContent = user.nome;
      telefone.textContent = user.phone;
      endereco.textContent = `CEP: ${user.endereco.cep} - ${
        user.endereco.rua
      }, ${user.endereco.numero}${
        user.endereco.complemento ? ` - ${user.endereco.complemento}` : ""
      } - ${user.endereco.bairro} - ${user.endereco.cidade}/${
        user.endereco.estado
      }`;
    }
  });
  let sum = 0;
  cartItens.forEach((item) => {
    sum += Number(item.valor) * Number(item.quantidade);
  });
  if (!window.location.href.endsWith("finalizacao.html")) {
    total.textContent = sum.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
}

fillCart();
if (!window.location.href.endsWith("finalizacao.html")) {
  radios.forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.checked) {
        formaPagamento = this.value;
      }
    });
  });

  button.addEventListener("click", () => {
    if (button.id === "prosseguir") {
      if (!formaPagamento) return alert("Escolha uma forma de pagamento");
      localStorage.setItem("formaPg", formaPagamento);
      if (formaPagamento === "cartao")
        return (window.location.href = "cartao.html");
      if (formaPagamento === "pix") return (window.location.href = "pix.html");
      return;
    } else if (button.id === "finalizar") {
      for (const input of inputs) {
        if (!input.value) return alert("Preencha todos os campos");
      }
      if (formaPagamento === "cartao") {
        if (mesValidade.value < 0 || mesValidade > 12) alert("Mês inválido");
        const anoAtual = new Date().getFullYear() % 100;
        const mesAtual = new Date().getMonth() + 1;

        const anoInserido = Number(anoValidade.value);
        if (
          anoInserido < anoAtual ||
          (anoInserido === anoAtual && Number(mesValidade.value) <= mesAtual)
        ) {
          $(this).val("");
          alert("Ano de validade não pode ser no passado.");
        }
      }
    }
    const compra = {
      user,
      formaPagamento: localStorage.getItem("formaPg"),
      cart: cartItens,
    };
    $.ajax({
      url: "../../php/compras.php",
      type: "POST",
      data: JSON.stringify(compra),
    })
      .done(() => {
        console.log({ compra });
        window.location.href = "./finalizacao.html";
      })
      .fail(function (_, textStatus, errorThrown) {
        console.error("Error:", textStatus, errorThrown);
      });
  });

  if (window.location.href.endsWith("cartao.html")) {
    mesValidade.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    });
    $(document).ready(function () {
      $("#numerosCartao").mask("0000 0000 0000 0000");
      $("#ccv").mask("000");
      $("#mesValidade").mask("00");
      $("#anoValidade").mask("00");
    });

    anoValidade.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    });
  }
}
