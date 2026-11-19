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
            const qrCanvas = contenedorQR.querySelector('canvas');
            const qrImg = contenedorQR.querySelector('img');
            const qrSource = qrCanvas || qrImg;

            if (qrSource) {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                canvas.width = 800;
                canvas.height = 1300;
                ctx.scale(2, 2);

                ctx.fillStyle = '#F2F0FF';
                ctx.fillRect(0, 0, 400, 650);

                ctx.strokeStyle = 'rgba(88, 0, 255, 0.05)';
                ctx.lineWidth = 1;
                for(let i=0; i<400; i+=20) {
                    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 650); ctx.stroke();
                }
                for(let i=0; i<650; i+=20) {
                    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(400, i); ctx.stroke();
                }

                ctx.beginPath();
                ctx.moveTo(200, 30);
                ctx.lineTo(245, 55);
                ctx.lineTo(245, 105);
                ctx.lineTo(200, 130);
                ctx.lineTo(155, 105);
                ctx.lineTo(155, 55);
                ctx.closePath();
                ctx.strokeStyle = '#D489FF';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.fillStyle = 'rgba(212, 137, 255, 0.1)';
                ctx.fill();

                ctx.fillStyle = '#5800FF';
                ctx.textAlign = 'center';
                ctx.font = 'bold 18px Outfit, sans-serif';
                ctx.fillText('SRP', 200, 85);

                ctx.beginPath();
                ctx.moveTo(175, 105);
                ctx.lineTo(190, 105);
                ctx.lineTo(195, 95);
                ctx.lineTo(205, 115);
                ctx.lineTo(210, 105);
                ctx.lineTo(225, 105);
                ctx.strokeStyle = '#D489FF';
                ctx.lineWidth = 2;
                ctx.lineJoin = 'round';
                ctx.stroke();

                ctx.fillStyle = '#1A153A';
                ctx.font = 'bold 36px Outfit, sans-serif';
                ctx.fillText('SRP EXPRESS', 200, 180);

                ctx.fillStyle = '#6B6189';
                ctx.font = '600 14px Inter, sans-serif';
                ctx.fillText('ESCANEA PARA INGRESAR AL SISTEMA', 200, 210);

                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = 'rgba(88, 0, 255, 0.15)';
                ctx.shadowBlur = 20;
                ctx.shadowOffsetY = 10;
                ctx.beginPath();
                ctx.roundRect(40, 230, 320, 350, 20);
                ctx.fill();
                
                ctx.shadowColor = 'transparent';
                ctx.shadowBlur = 0;
                ctx.shadowOffsetY = 0;

                ctx.strokeStyle = 'rgba(88, 0, 255, 0.1)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.roundRect(40, 230, 320, 350, 20);
                ctx.stroke();

                ctx.drawImage(qrSource, 75, 250, 250, 250);

                ctx.fillStyle = '#5800FF';
                ctx.font = 'italic bold 18px Inter, sans-serif';
                ctx.fillText('"Salvando vidas - SAN ROMÁN"', 200, 545);

                ctx.fillStyle = '#6B6189';
                ctx.font = '400 12px Inter, sans-serif';
                ctx.fillText(urlDestino, 200, 615);

                const enlaceDescarga = document.createElement('a');
                enlaceDescarga.href = canvas.toDataURL('image/png');
                enlaceDescarga.download = 'Poster_QR_SRP_Express.png';
                
                document.body.appendChild(enlaceDescarga);
                enlaceDescarga.click();
                document.body.removeChild(enlaceDescarga);
            } else {
                alert('El código QR aún no se ha generado. Intenta de nuevo.');
            }
        });
    }
});
