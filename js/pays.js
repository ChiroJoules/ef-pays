(function () {
    console.log("rest API")
  
    // Fonction pour "fetch" les categories des postes
    function fetchData(numero) {
        let url = `https://gftnth00.mywhc.ca/tim17/wp-json/wp/v2/posts?categories=${numero}&_embed`;
        let placeholderImageURL = 'https://via.placeholder.com/150';
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
                    let image = placeholderImageURL;
                    if(article._embedded['wp:featuredmedia']){
                        image = article._embedded['wp:featuredmedia'][0].source_url;
                    }   
                    let tempDiv = document.createElement('div');
                    tempDiv.innerHTML = contenu;                 
                    contenu = tempDiv.textContent || tempDiv.innerText || '';
                    let carte = document.createElement("div");
                    carte.classList.add("restapi__pays");
                    carte.innerHTML = `
                        <div class="titre__Image">
                        <h3>${titre}</h3>
                        <img src="${image}" alt="${titre}" class="image__pays" onerror="this.onerror=null; this.src='https://via.placeholder.com/150';">
                        </div>
                        <div class="contenu__pays">
                        <p>${contenu}</p>
                        </div>
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
  