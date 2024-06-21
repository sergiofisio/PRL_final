const cart = document.querySelector("#cart");

function fillCart() {
  const cartItens = JSON.parse(localStorage.getItem("cart"));
  console.log({ cartItens });
  cartItens.forEach((item) => {
    const tr = document.createElement("tr");
    const tdImg = document.createElement("td");
    const img = document.createElement("img");
    const tdName = document.createElement("td");
    const tdQtt = document.createElement("td");
    const tdPrice = document.createElement("td");

    img.src = item.img;
    img.alt = `imagem ${item.nome}`;
    img.classList.add("imgProduct");
    tdImg.classList.add("tableImg");

    tdImg.appendChild(img);
    tdName.textContent = item.nome;
    tdName.classList.add("tableName");

    tdQtt.textContent = item.quantidade;
    tdQtt.classList.add("tableQtt");
    tdPrice.textContent = (
      Number(item.valor) * Number(item.quantidade)
    ).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    tdPrice.classList.add("tablePrice");
    tr.append(tdImg, tdName, tdQtt, tdPrice);
    cart.append(tr);
  });
}

fillCart();
