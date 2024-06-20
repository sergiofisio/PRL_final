const aside = document.querySelector("aside");
const section = document.querySelector("section");
const response = document.querySelector("#response");

const categories = new Set();
let produtos = [];

function renderProducts(products) {
  section.innerHTML = "";
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

      cart.push(product);

      localStorage.setItem("cart", JSON.stringify(cart));
    });

    section.appendChild(div);
    div.append(img, h2, h3, button);
  }
}

$.ajax({
  url: "../../php/database.php",
  dataType: "json",
  type: "GET",
  contentType: "application/json",

  beforeSend: function () {
    response.textContent = "Carregando...";
  },
})

  .done(function (data) {
    setTimeout(() => {
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

          subcategoryDiv.style.display = isCurrentlyVisible ? "none" : "block";
        });

        $.ajax({
          url: "../../database/categories.json",
          dataType: "json",
          type: "GET",
          contentType: "application/json",
        })
          .done(function (subcategories) {
            console.log({ subcategories });

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
    }, 2000);
  })
  .fail(function (_, textStatus, errorThrown) {
    console.error("Error:", textStatus, errorThrown);
  });
