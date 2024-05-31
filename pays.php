<?php 
/**
 * Plugin Pays
 * Version 1.0.0
 */
/*
Plugin name: Pays
Plugin uri: https://github.com/ChiroJoules
Version: 1.0.0
Description: Permet d'afficher les destinations qui répondent à certains pays
*/
header("Access-Control-Allow-Origin: http://localhost:8080");
function joules_enqueue()
{
    // filemtime // retourne en milliseconde le temps de la dernière modification
    // plugin_dir_path // retourne le chemin du répertoire du plugin
    // __FILE__ // le fichier en train de s'exécuter
    // wp_enqueue_style() // Intègre le link:css dans la page
    // wp_enqueue_script() // intègre le script dans la page
    // wp_enqueue_scripts // le hook

    $version_css = filemtime(plugin_dir_path(__FILE__) . "style.css");
    $version_js = filemtime(plugin_dir_path(__FILE__) . "js/pays.js");
    wp_enqueue_style('em_plugin_pays_css',
        plugin_dir_url(__FILE__) . "style.css",
        array(),
        $version_css);

    wp_enqueue_script('em_plugin_pays_js',
        plugin_dir_url(__FILE__) . "js/pays.js",
        array(),
        $version_js,
        true);

    // Pass category IDs to JavaScript
    wp_localize_script('em_plugin_pays_js', 'categoryData', array(
        'France' => 18,
        'États-Unis' => 19,
        'Canada' => 20,
        'Argentine' => 29,
        'Chili' => 30,
        'Belgique' => 28,
        'Maroc' => 34,
        'Mexique' => 23,
        'Japon' => 21,
        'Italie' => 24,
        'Islande' => 43,
        'Chine' => 27,
        'Grèce' => 35,
        'Suisse' => 26,
    ));
}
add_action('wp_enqueue_scripts', 'joules_enqueue'); 

/* Création de la liste des destinations en HTML */
function creation_pays()
{
    $contenu = '<div class="pays-menu">
                    <button class="bouton__pays" data-category="France" data-default="true">France</button>
                    <button class="bouton__pays" data-category="États-Unis">États-Unis</button>
                    <button class="bouton__pays" data-category="Canada">Canada</button>
                    <button class="bouton__pays" data-category="Argentine">Argentine</button>
                    <button class="bouton__pays" data-category="Chili">Chili</button>
                    <button class="bouton__pays" data-category="Belgique">Belgique</button>
                    <button class="bouton__pays" data-category="Maroc">Maroc</button>
                    <button class="bouton__pays" data-category="Mexique">Mexique</button>
                    <button class="bouton__pays" data-category="Japon">Japon</button>
                    <button class="bouton__pays" data-category="Italie">Italie</button>
                    <button class="bouton__pays" data-category="Islande">Islande</button>
                    <button class="bouton__pays" data-category="Chine">Chine</button>
                    <button class="bouton__pays" data-category="Grèce">Grèce</button>
                    <button class="bouton__pays" data-category="Suisse">Suisse</button>
                </div>
                <div class="contenu__restapi">
                </div>';
    return $contenu;
}

add_shortcode('em_pays', 'creation_pays');

?>
