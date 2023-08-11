jQuery(document).ready(function ($) {
    
    // Selecciona todas las imágenes dentro de los elementos especificados en la cabecera
    $('header img, .navbar img, #header img, #nav img, #logo img, .site-logo .wd-logo img').each(function () {
        var $img = $(this);

        // Excluir imágenes en contenido y pie de página
        if ($img.closest('content-selector, footer-selector').length > 0) {
            return true; // Continuar con la siguiente imagen
        }

        var classesAndIDs = $img.attr('class') + ' ' + $img.attr('id');

        // Si la imagen es un logo, asignar el título del sitio y la descripción
        if (classesAndIDs && (classesAndIDs.includes('logo') || $img.closest('.site-logo').length > 0)) {
            $img.attr('alt', altTagData.siteTitle + ' - ' + altTagData.siteDescription);
            return true; // Continuar con la siguiente imagen
        }

        // Si no es un logo, buscar el texto más cercano para usar como alt
        var altText = '';
        var tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'a', 'span'];
        var $container = $img.closest('div');

        for (var i = 0; i < tags.length; i++) {
            var $element = $container.find(tags[i]).first();
            if ($element.length > 0) {
                altText = $element.text().trim().replace(/\s+/g, ' ');
                break;
            }
        }

        if (altText !== '') {
            $img.attr('alt', altText);
        }
    });
});