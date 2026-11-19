document.addEventListener('DOMContentLoaded', () => {
    const urlDestino = document.getElementById('urlInput').value;
    const contenedorQR = document.getElementById('qrcode');

    // Limpiamos el contenedor por si acaso
    contenedorQR.innerHTML = '';

    // Generamos el código QR con la librería
    new QRCode(contenedorQR, {
        text: urlDestino,
        width: 200,
        height: 200,
        colorDark : "#0b0f19", // Usamos el color de fondo de tu app
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    console.log('QR generado para:', urlDestino);
});
