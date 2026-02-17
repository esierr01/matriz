import { toPng, toJpeg } from 'html-to-image';

/**
 * Servicio para convertir un elemento del DOM en imagen y descargarla.
 * @param {MutableRefObject} ref - Referencia del elemento HTML (useRef).
 * @param {string} fileName - Nombre del archivo a descargar.
 */
export const downloadComponentAsImage = async (ref, fileName = 'ticket-lote.png') => {
    if (!ref.current) {
        throw new Error('No se encontró la referencia del elemento para generar la imagen.');
    }

    try {
        // Configuraciones para mejorar la calidad y compatibilidad
        const options = {
            cacheBust: true,
            backgroundColor: '#1a1a1a', // Fondo para evitar transparencias no deseadas
            pixelRatio: 2, // Aumenta la resolución (mejor para WhatsApp)
        };

        const dataUrl = await toPng(ref.current, options);

        // Lógica de descarga
        const link = document.createElement('a');
        link.download = fileName;
        link.href = dataUrl;
        link.click();

        return true;
    } catch (err) {
        console.error('Error en imageService:', err);
        throw err;
    }
};