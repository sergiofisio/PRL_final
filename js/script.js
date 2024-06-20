const aside = document.querySelector("aside");
const section = document.querySelector("section");
const response = document.querySelector("#response");
const cart = document.querySelector(".cartValue");
const valueCart = document.getElementById("valueCart");
const modal = document.querySelector(".modalShop");
const closedButton = document.querySelector(".closedButton");

closedButton.addEventListener("click", function () {
  modal.classList.add("hidden");
});

const categories = new Set();
let produtos = [];
let render = localStorage.getItem("render") || false;

function getCartProducts() {
  const numberProductsInCart = JSON.parse(localStorage.getItem("cart")) || [];

  valueCart.textContent = numberProductsInCart.length;
}

function renderProducts(products) {
  getCartProducts();
  section.innerHTML = "";

  localStorage.setItem("render", true);
  render = localStorage.getItem("render");
  const cartItens = JSON.parse(localStorage.getItem("cart")) || [];

  for (const product of products) {
    const div = document.createElement("div");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    const button = document.createElement("button");

    div.classList.add("product", "position-relative");
    img.src = product.img;
    img.alt = `image ${product.nome}`;
    h2.textContent = product.nome;
    h2.classList.add("m-0", "text-capitalize", "fs-5");
    h3.textContent = product.valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    h3.classList.add("m-0", "text-capitalize", "fs-6");
    button.textContent = "Adicionar ao carrinho";

    button.addEventListener("click", function () {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      if (cart.some((cartProduct) => cartProduct.nome === product.nome)) {
        return alert("Esse item ja foi adicionado ao carrinho");
      }

      cart.push({ ...product, quantidade: 1 });

      localStorage.setItem("cart", JSON.stringify(cart));
      getCartProducts();
    });

    section.appendChild(div);
    div.append(img, h2, h3, button);
  }
  cart.addEventListener("click", function () {
    modal.classList.remove("hidden");
    cartItens.forEach((item) => {
      console.log({ item });

      const tr = document.createElement("tr");
      const tdImg = document.createElement("td");
      const img = document.createElement("img");
      const tdName = document.createElement("td");
      const tdQtt = document.createElement("td");
      const sum = document.createElement("h3");
      const minus = document.createElement("h3");
      const tdPrice = document.createElement("td");
      img.src = item.img;
      img.alt = `imagem ${item.nome}`;
      tdImg.classList.add("tableImg");

      tdImg.appendChild(img);
      tdName.textContent = item.nome;
      tdName.classList.add("tableName");
      sum.textContent = "+";
      minus.textContent = "-";
      tdQtt.append(sum, (tdQtt.textContent = item.quantidade), minus);
      tdQtt.classList.add("tableQtt");
      tdPrice.textContent = item.valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      tdPrice.classList.add("tablePrice");
      tr.append(tdImg, tdName, tdQtt, tdPrice);
      document.querySelector("tbody").appendChild(tr);
    });
  });
}

$.ajax({
  url: "../../php/database.php",
  dataType: "json",
  type: "GET",
  contentType: "application/json",
  beforeSend: function () {
    if (!render) {
      response.textContent = "Carregando...";
    }
  },
})

  .done(function (data) {
    setTimeout(
      () => {
        response.textContent = "";

        for (const products of data) {
          try {
            categories.add(products.categoria);
            produtos.push(...products.produtos);
          } catch (error) {
            console.log({ error });
          }
        }
        renderProducts(produtos);

        categories.forEach((category) => {
          const categoryDiv = document.createElement("div");
          const subcategoryDiv = document.createElement("div");
          const h2 = document.createElement("h2");
          const img = document.createElement("img");
          h2.textContent = category;
          h2.classList.add(
            "m-0",
            "text-capitalize",
            "fs-5",
            "pointer",
            "red",
            "gap-3",
            "d-flex"
          );
          img.src = "../../img/icons/arrowsDown.svg";
          img.alt = "seta para baixo";
          h2.appendChild(img);
          categoryDiv.appendChild(h2);
          aside.appendChild(categoryDiv);
          subcategoryDiv.style.display = "none";

          h2.addEventListener("click", function () {
            const isCurrentlyVisible = subcategoryDiv.style.display === "block";

            subcategoryDiv.style.display = isCurrentlyVisible
              ? "none"
              : "block";
          });

          $.ajax({
            url: "../../database/categories.json",
            dataType: "json",
            type: "GET",
            contentType: "application/json",
          })
            .done(function (subcategories) {
              let categories = subcategories[0].categorias;
              for (let i = 0; i < categories.length; i++) {
                if (categories[i].tipo === category) {
                  const h2 = document.createElement("h2");
                  h2.textContent = categories[i].descrição;
                  h2.classList.add(
                    "m-0",
                    "text-capitalize",
                    "fs-6",
                    "pointer",
                    "red"
                  );

                  h2.addEventListener("click", function () {
                    const filterProducts = produtos.filter(
                      (produto) => produto.categoria === categories[i].id
                    );
                    renderProducts(filterProducts);
                  });

                  subcategoryDiv.appendChild(h2);
                  categoryDiv.appendChild(subcategoryDiv);
                }
              }
            })
            .fail(function (_, textStatus, errorThrown) {
              console.error("Error:", textStatus, errorThrown);
            });
        });
        const button = document.createElement("button");
        button.textContent = "Mostrar todos os produtos";
        button.addEventListener("click", function () {
          renderProducts(produtos);
        });
        aside.appendChild(button);
      },
      render ? 0 : 2000
    );
  })
  .fail(function (_, textStatus, errorThrown) {
    console.error("Error:", textStatus, errorThrown);
  });
