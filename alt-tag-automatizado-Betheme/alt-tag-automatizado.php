<?php
/*
Plugin Name: Alt Tag Automatizado
Description: El plugin Alt Tag Automatizado es una solución práctica para asignar automáticamente el atributo "alt" a las imágenes de tu sitio web basándose en el contenido del encabezado H1, H2, H3, H4, H5, H6 y strong (negritas) que esté más cercano a cada imagen. También considera el título del post/producto y la imagen destacada para proporcionar descripciones relevantes y accesibles. Además, asigna el título del sitio y la descripción corta a las imágenes con clase o ID "logo".
Version: 1.2
Author: Jan Carlos Zambrano
Author URI: https://www.thinkfactor.cl
*/

function alt_tag_automatizado_enqueue_scripts() {
    wp_enqueue_script('alt-tag-automatizado-header', plugin_dir_url(__FILE__) . 'js/header.js', array('jquery'), '1.0.0', true);
    wp_enqueue_script('alt-tag-automatizado-content', plugin_dir_url(__FILE__) . 'js/content.js', array('jquery'), '1.0.0', true);
    wp_enqueue_script('alt-tag-automatizado-footer', plugin_dir_url(__FILE__) . 'js/footer.js', array('jquery'), '1.0.0', true);

    // Datos para pasar a JavaScript
    $script_data = array(
        'siteTitle' => get_bloginfo('name'),
        'siteDescription' => get_bloginfo('description'),
        'postTitle' => '',
        'thumbnailUrl' => '',
        'isPostThumbnail' => false,
    );

    // Verificar si estamos en un post
    if (is_single()) {
        global $post;

        // Obtener el título del post
        $script_data['postTitle'] = get_the_title($post->ID);

        // Obtener la imagen destacada del post
        $thumbnail_id = get_post_thumbnail_id($post->ID);
        $thumbnail_url = wp_get_attachment_image_src($thumbnail_id, 'full');

        if (is_array($thumbnail_url)) {
            $script_data['thumbnailUrl'] = $thumbnail_url[0];
            $script_data['isPostThumbnail'] = true;
        }
    }

    // Pasar los datos a cada archivo JavaScript
    wp_localize_script('alt-tag-automatizado-header', 'altTagData', $script_data);
    wp_localize_script('alt-tag-automatizado-content', 'altTagData', $script_data);
    wp_localize_script('alt-tag-automatizado-footer', 'altTagData', $script_data);
}
add_action('wp_enqueue_scripts', 'alt_tag_automatizado_enqueue_scripts');