document.addEventListener('DOMContentLoaded', () => {
    const urlDestino = document.getElementById('urlInput').value;
    const contenedorQR = document.getElementById('qrcode');
    const btnDownload = document.getElementById('btnDownload');

    contenedorQR.innerHTML = '';

    new QRCode(contenedorQR, {
        text: urlDestino,
        width: 250,
        height: 250,
        colorDark : "#0b0f19", 
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    btnDownload.addEventListener('click', () => {
        const imgQR = contenedorQR.querySelector('img');
        
        if (imgQR) {
            const enlaceDescarga = document.createElement('a');
            enlaceDescarga.href = imgQR.src;
            enlaceDescarga.download = 'QR_EnfermeriaApp.png';
            
            document.body.appendChild(enlaceDescarga);
            enlaceDescarga.click();
            document.body.removeChild(enlaceDescarga);
        } else {
            alert('El código QR aún no se ha generado. Intenta de nuevo.');
        }
    });
});
