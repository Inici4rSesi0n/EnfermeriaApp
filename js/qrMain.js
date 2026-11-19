document.addEventListener('DOMContentLoaded', () => {
    const urlDestino = document.getElementById('urlInput').value;
    const contenedorQR = document.getElementById('qrcode');
    const btnDownload = document.getElementById('btnDownload');

    if (contenedorQR) {
        contenedorQR.innerHTML = '';
        new QRCode(contenedorQR, {
            text: urlDestino,
            width: 250,
            height: 250,
            colorDark : "#1A153A",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }

    if (btnDownload) {
        btnDownload.addEventListener('click', () => {
            const imgQR = contenedorQR.querySelector('img');
            if (imgQR) {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 800;
                canvas.height = 1040;
                ctx.scale(2, 2);
                ctx.fillStyle = '#F2F0FF';
                ctx.fillRect(0, 0, 400, 520);
                ctx.fillStyle = '#5800FF';
                ctx.textAlign = 'center';
                ctx.font = 'bold 34px Outfit, sans-serif';
                ctx.fillText('SRP EXPRESS', 200, 70);
                ctx.fillStyle = '#907AFF';
                ctx.font = '600 13px Inter, sans-serif';
                ctx.fillText('ESCANEA PARA INGRESAR', 200, 105);
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(50, 140, 300, 300);
                ctx.strokeStyle = '#D489FF';
                ctx.lineWidth = 2;
                ctx.strokeRect(50, 140, 300, 300);
                ctx.drawImage(imgQR, 75, 165, 250, 250);
                ctx.fillStyle = '#5800FF';
                ctx.font = 'italic bold 16px Inter, sans-serif';
                ctx.fillText('Salvando vidas - SAN ROMÁN', 200, 475);
                ctx.fillStyle = '#6B6189';
                ctx.font = '300 12px Inter, sans-serif';
                ctx.fillText(urlDestino, 200, 500);
                ctx.fillStyle = '#5800FF';
                ctx.fillRect(180, 512, 40, 3);

                const enlaceDescarga = document.createElement('a');
                enlaceDescarga.href = canvas.toDataURL('image/png');
                enlaceDescarga.download = 'Poster_QR_SRP_Express.png';
                document.body.appendChild(enlaceDescarga);
                enlaceDescarga.click();
                document.body.removeChild(enlaceDescarga);
            }
        });
    }
});
