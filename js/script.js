const aside = document.querySelector("aside");

let subcategoryDivs = [];

$.ajax({
  url: "../../database/products.json",
  dataType: "json",
  type: "GET",
  contentType: "application/json",

  success: function (data) {
    console.log(data);
    for (let category in data) {
      let categoryDiv = document.createElement("div");
      const h2 = document.createElement("h2");
      h2.textContent = data[category].nome;

      categoryDiv.appendChild(h2);
      aside.appendChild(categoryDiv);

      let subcategoryDiv = document.createElement("div");
      subcategoryDiv.style.display = "none";
      subcategoryDivs.push(subcategoryDiv);

      categoryDiv.addEventListener("click", function () {
        const isCurrentlyVisible = subcategoryDiv.style.display === "block";

        subcategoryDivs.forEach((div) => (div.style.display = "none"));

        subcategoryDiv.style.display = isCurrentlyVisible ? "none" : "block";
      });

      $.ajax({
        url: "../../database/categories.json",
        dataType: "json",
        type: "GET",
        contentType: "application/json",

        success: function (subcategories) {
          let categories = subcategories[0].categorias;
          for (let i = 0; i < categories.length; i++) {
            if (categories[i].tipo === data[category].nome) {
              const h2 = document.createElement("h2");
              h2.textContent = categories[i].descrição;

              subcategoryDiv.appendChild(h2);
              categoryDiv.appendChild(subcategoryDiv);
            }
          }
        },

        error: function (_, textStatus, errorThrown) {
          console.error("Error:", textStatus, errorThrown);
        },
      });
    }
  },

  error: function (_, textStatus, errorThrown) {
    console.error("Error:", textStatus, errorThrown);
  },
});
