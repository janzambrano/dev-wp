// Pie de página
jQuery(document).ready(function ($) {
    // Iterar sobre cada imagen en el pie de página
    $('footer img').each(function () {
        var $img = $(this);
        var altText = '';
        var width = $img.width(); // Obtener el ancho de la imagen
        var height = $img.height(); // Obtener la altura de la imagen
        var src = $img.attr('src'); // Obtener la fuente de la imagen

        // Si la imagen es más grande que 60x60, asignar el título del sitio y la descripción como alt
        if (width > 60 && height > 60) {
            altText = altTagData.siteTitle + ' - ' + altTagData.siteDescription;
        } else {
            // Si la imagen es más pequeña, buscar el texto más cercano en los elementos siguientes
            var $nextElements = $img.parents().nextAll('a, p, h1, h2, h3, h4, h5, h6, strong');
            var foundHeaderTag = false;

            $nextElements.each(function () {
                var $element = $(this);
                var tagName = $element.prop('tagName').toLowerCase();

                // Verificar si el elemento es un encabezado
                if (tagName.startsWith('h')) {
                    foundHeaderTag = true;
                }

                // Si no se ha encontrado un encabezado o si el elemento es un enlace, usar su texto como alt
                if (!foundHeaderTag || tagName === 'a') {
                    altText = $element.text().trim().replace(/\s+/g, ' ');
                    return false; // Salir del bucle
                }
            });
        }

        // Si se encontró un texto alternativo, asignarlo a la imagen
        if (altText !== '') {
            $img.attr('alt', altText);
        }
    });
});