// Contenido
jQuery(document).ready(function ($) {
    // Verificar si estamos en una página con clase "single-post"
    if ($('body').hasClass('single-post')) {
        var h1Text = $('.title').text().trim().replace(/\s+/g, ' ');
        var $firstImage = $('.section-post-header .image img.wp-post-image').first();
        $firstImage.attr('alt', h1Text);
        $firstImage.addClass('alt-assigned');
    }

    // Verificar si estamos en una página con clase "single-productos-ganadores"
    if ($('body').hasClass('single-productos-ganadores')) {
        var h1Text = $('h1.title').text().trim().replace(/\s+/g, ' ');
        var $firstImage = $('img.attachment-large').first(); // Selecciona la primera imagen con clase attachment-large
        $firstImage.attr('alt', h1Text);
        $firstImage.addClass('alt-assigned');
    }

    // Obtener todas las imágenes en el contenido, excluyendo la primera imagen marcada
    var $contentImages = $('div, nav, section, article, aside, main')
        .find('img:not(.alt-assigned)')
        .filter(function () {
            var $img = $(this);
            return (
                $img.closest('header, footer').length === 0 &&
                !$img.is('[itemprop="logo"]')
            );
        });

    // Asignar el encabezado o strong más cercano a las imágenes restantes
    $contentImages.each(function (index) {
        var $img = $(this);
        var altText = '';
        var tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong'];

        var $container = $img.parent();
        while ($container.length > 0 && !$container.is('footer')) {
            for (var i = 0; i < tags.length; i++) {
                var $hElement = $container.find(tags[i]).first();
                if ($hElement.length > 0) {
                    altText = $hElement.text().trim().replace(/\s+/g, ' ');
                    break;
                }
            }
            if (altText !== '') {
                break;
            }
            $container = $container.parent();
        }

        if (altText !== '') {
            $img.attr('alt', altText);
        }
    });
});