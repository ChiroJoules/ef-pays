(function () {
    console.log("rest API")
  
    // Fonction pour "fetch" les categories des postes
    function fetchData(category) {
        let url = `https://gftnth00.mywhc.ca/tim17/wp-json/wp/v2/posts?categories=${category}`;
        fetch(url)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error(
                        "La requête a échoué avec le statut " + response.status
                    );
                }
                return response.json();
            })
            .then(function (data) {
                let restapi = document.querySelector(".contenu__restapi");
                restapi.innerHTML = ''; // Vider le dernier contenu
                data.forEach(function (article) {
                    let titre = article.title.rendered;
                    let contenu = article.content.rendered;
                    //let image = extractImageFromContent(contenu);
                    contenu = truncateContent(contenu, 30);
                    let carte = document.createElement("div");
                    carte.classList.add("restapi__carte");
                    carte.innerHTML = `
                        <h3>${titre}</h3>
                        <p>${contenu}</p>
                    `;
                    restapi.appendChild(carte);
                });
            })
            .catch(function (error) {
                console.error("Erreur lors de la récupération des données :", error);
            });
    }
    
  // Fonction pour sortir l'image du contenu
   /*  
    function extractImageFromContent(content) {
        let div = document.createElement('div');
        div.innerHTML = content;
        let imgElement = div.querySelector('img');
        return imgElement ? imgElement.outerHTML : '';
    } */
  
    // Fonction pour reduire les mots du contenu
    function truncateContent(content, mots) {
        return content.split(/\s+/).slice(0, mots).join(" ") + '...';
    }
  
    // Met un eventlistener sur toutes les boutons
    let categoryButtons = document.querySelectorAll(".bouton__pays");
    categoryButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            let category = categoryData[button.getAttribute('data-category')];
            fetchData(category);
            console.log(category);
        });
    });
  
    //Mettre un valeur par defaut sur le menu du boutons
    let defaultCategoryButton = document.querySelector(".bouton__pays[data-default='true']");
      if (defaultCategoryButton) {
          let defaultCategory = categoryData[defaultCategoryButton.getAttribute('data-category')];
          fetchData(defaultCategory);
      }
  
  })();
  