const aside = document.querySelector("aside");
const section = document.querySelector("section");
const response = document.querySelector("#response");

const categories = [];

const subcategoryDivs = [];

const produtos = [];

$.ajax({
  url: "../database/products.json",
  dataType: "json",
  type: "GET",
  contentType: "application/json",

  beforeSend: function () {
    response.textContent = "Carregando...";
    setTimeout(() => {
      response.textContent = "";
    }, 1000);
  },
})

  .done(function (data) {
    for (const products of data) {
      try {
        if (!categories.includes(products.categoria)) {
          categories.push(products.categoria);
        }
        products.produtos.forEach((product) => {
          produtos.push(product);
        });
      } catch (error) {
        console.log({ error });
      }
    }
    console.log({ categories });
    for (const product of produtos) {
      const div = document.createElement("div");
      const img = document.createElement("img");
      const h2 = document.createElement("h2");
      const h3 = document.createElement("h3");
      const button = document.createElement("button");

      div.classList.add("product");
      img.src = product.img;
      img.alt = `image ${product.nome}`;
      h2.textContent = product.nome;
      h3.textContent = product.valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      button.textContent = "Adicionar ao carrinho";

      section.appendChild(div);
      div.append(img, h2, h3, button);
    }
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
      img.src = "../img/icons/arrowsDown.svg";
      img.alt = "seta para baixo";
      h2.appendChild(img);
      categoryDiv.appendChild(h2);
      aside.appendChild(categoryDiv);
      subcategoryDiv.style.display = "none";
      subcategoryDivs.push(subcategoryDiv);
      h2.addEventListener("click", function () {
        const isCurrentlyVisible = subcategoryDiv.style.display === "block";

        subcategoryDivs.forEach((div) => (div.style.display = "none"));

        subcategoryDiv.style.display = isCurrentlyVisible ? "none" : "block";
      });

      $.ajax({
        url: "../database/categories.json",
        dataType: "json",
        type: "GET",
        contentType: "application/json",
      })
        .done(function (subcategories) {
          let categories = subcategories[0].categorias;
          for (let i = 0; i < categories.length; i++) {
            console.log(categories[i].tipo, category);

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

              subcategoryDiv.appendChild(h2);
              categoryDiv.appendChild(subcategoryDiv);
            }
          }
        })
        .fail(function (_, textStatus, errorThrown) {
          console.error("Error:", textStatus, errorThrown);
        });
    });
  })
  .fail(function (_, textStatus, errorThrown) {
    console.error("Error:", textStatus, errorThrown);
  });
