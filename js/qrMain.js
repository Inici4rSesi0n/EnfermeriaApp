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
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = 400;
            canvas.height = 520;

            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0b0f19';
            ctx.textAlign = 'center';
            
            ctx.font = 'bold 28px system-ui, sans-serif';
            ctx.fillText('Enfermería APP', canvas.width / 2, 60);
            
            ctx.fillStyle = '#64748b';
            ctx.font = '18px system-ui, sans-serif';
            ctx.fillText('Escanea para ingresar', canvas.width / 2, 95);

            const qrSize = 300;
            const qrX = (canvas.width - qrSize) / 2;
            const qrY = 130;
            ctx.drawImage(imgQR, qrX, qrY, qrSize, qrSize);

            ctx.fillStyle = '#94a3b8';
            ctx.font = '14px system-ui, sans-serif';
            ctx.fillText(urlDestino, canvas.width / 2, canvas.height - 30);

            const enlaceDescarga = document.createElement('a');
            enlaceDescarga.href = canvas.toDataURL('image/png');
            enlaceDescarga.download = 'QR_EnfermeriaApp.png';
            
            document.body.appendChild(enlaceDescarga);
            enlaceDescarga.click();
            document.body.removeChild(enlaceDescarga);
        } else {
            alert('El código QR aún no se ha generado. Intenta de nuevo.');
        }
    });
});
