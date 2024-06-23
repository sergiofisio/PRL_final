const duvida = document.querySelector("#duvida");
const elogio = document.querySelector("#elogio");
const sugestao = document.querySelector("#sugestao");
const cart = document.querySelector("#cart");

$.ajax({
  url: "../../php/dashboard.php",
  dataType: "json",
  type: "GET",
  contentType: "application/json",
})

  .done(function (data) {
    data.forEach((contato) => {
      for (const duvidas of contato.duvida) {
        const div = document.createElement("div");
        const h2Nome = document.createElement("h2");
        const h2Email = document.createElement("h2");
        const p = document.createElement("p");
        div.classList.add(
          "d-flex",
          "flex-column",
          "align-items-center",
          "w-100",
          "p-2"
        );
        h2Nome.classList.add("fs-4");
        h2Email.classList.add("fs-5");
        h2Nome.textContent = duvidas.nome;
        h2Email.textContent = duvidas.email;
        p.textContent = duvidas.mensagem;
        p.classList.add("text-center");
        div.append(h2Nome, h2Email, p);
        duvida.appendChild(div);
      }
      for (const elogios of contato.elogio) {
        const div = document.createElement("div");
        const h2Nome = document.createElement("h2");
        const h2Email = document.createElement("h2");
        const p = document.createElement("p");
        div.classList.add("d-flex", "flex-column", "align-items-center", "p-2");
        h2Nome.textContent = elogios.nome;
        h2Email.textContent = elogios.email;
        h2Nome.classList.add("fs-4");
        h2Email.classList.add("fs-5");
        p.textContent = elogios.mensagem;
        p.classList.add("text-center");
        div.append(h2Nome, h2Email, p);
        elogio.appendChild(div);
      }
      for (const sugestoes of contato.sugestao) {
        const div = document.createElement("div");
        const h2Nome = document.createElement("h2");
        const h2Email = document.createElement("h2");
        const p = document.createElement("p");
        div.classList.add("d-flex", "flex-column", "align-items-center", "p-2");
        h2Nome.textContent = sugestoes.nome;
        h2Email.textContent = sugestoes.email;
        h2Nome.classList.add("fs-4");
        h2Email.classList.add("fs-5");
        p.textContent = sugestoes.mensagem;
        p.classList.add("text-center");
        div.append(h2Nome, h2Email, p);
        sugestao.appendChild(div);
      }
    });
  })
  .fail(function (_, textStatus, errorThrown) {
    console.error("Error:", textStatus, errorThrown);
  });

$.ajax({
  url: "../../php/comprasDashboard.php",
  dataType: "json",
  type: "GET",
  contentType: "application/json",
})
  .done(function (data) {
    let sum = 0;
    data.forEach((compra) => {
      const div = document.createElement("div");
      const h2Nome = document.createElement("h2");
      const h2email = document.createElement("h2");
      const h2telefone = document.createElement("h2");
      const divcompra = document.createElement("div");
      const h2Endereco = document.createElement("h2");
      const h3TotalCompras = document.createElement("h3");
      h2Nome.textContent = `Nome: ${compra.user.nome}`;
      h2email.textContent = `Email: ${compra.user.email}`;
      h2telefone.textContent = `Telefone: ${compra.user.phone}`;
      h2Nome.classList.add("fs-4", "m-0");
      h2email.classList.add("fs-5", "m-0");
      h2Endereco.classList.add("fs-5", "m-0", "text-center");
      h2telefone.classList.add("fs-5", "m-0");
      h3TotalCompras.classList.add("fs-5", "m-0");
      div.classList.add("d-flex", "flex-column", "align-items-center", "p-2");

      h2Endereco.textContent = `${compra.user.endereco.rua}, ${
        compra.user.endereco.numero
      } ${
        compra.user.endereco.complemento
          ? `- ${compra.user.endereco.complemento}`
          : ""
      } / ${compra.user.endereco.bairro} - ${compra.user.endereco.cidade}/${
        compra.user.endereco.estado
      } - ${compra.user.endereco.cep}`;
      div.append(h2Nome, h2email, h2telefone, h2Endereco);
      compra.cart.forEach((item) => {
        const img = document.createElement("img");
        const h2 = document.createElement("h2");
        const h3Valor = document.createElement("h3");
        const h3Qtt = document.createElement("h3");
        const h3Total = document.createElement("h3");

        img.src = item.img;
        h2.textContent = `Produto: ${item.nome}`;
        h2.classList.add("fs-5", "text-center");
        h3Valor.classList.add("fs-5", "text-center");
        h3Valor.textContent = `Preço unitário: ${Number(
          item.valor
        ).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}`;
        h3Qtt.textContent = `Quantidade: ${item.quantidade}`;
        h3Total.textContent = `Total: ${(
          Number(item.valor) * Number(item.quantidade)
        ).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}`;
        h2.classList.add("fs-5", "text-center", "m-0");
        h3Valor.classList.add("fs-5", "text-center", "m-0");
        h3Qtt.classList.add("fs-5", "text-center", "m-0");
        h3Total.classList.add("fs-5", "text-center", "m-0");
        divcompra.classList.add(
          "d-flex",
          "flex-column",
          "align-items-center",
          "justify-content-center",
          "p-2"
        );
        divcompra.append(img, h2, h3Valor, h3Qtt, h3Total);
        div.append(divcompra);
        sum += Number(item.valor) * Number(item.quantidade);
      });
      h3TotalCompras.textContent = `TOTAL COMPRA: ${sum.toLocaleString(
        "pt-BR",
        {
          style: "currency",
          currency: "BRL",
        }
      )}`;
      h3TotalCompras.classList.add("fw-bold", "fs-3");
      div.append(h3TotalCompras);
      cart.appendChild(div);
    });
  })
  .fail(function (_, textStatus, errorThrown) {
    console.error("Error:", textStatus, errorThrown);
  });
