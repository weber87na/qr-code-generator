function clearInput() {
    document.getElementById('urlInput').value = '';
}

function clearLogo() {
    document.getElementById('logoInput').value = '';
}

function clearImage() {
    const canvasContainer = document.getElementById('canvasContainer');
    const clearImageBtn = document.getElementById('clearImageBtn');
    const canvas = document.getElementById('qrcodeCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvasContainer.style.display = 'none';
    clearImageBtn.style.display = 'none';
}

function generateQRCode() {
    const url = document.getElementById('urlInput').value;
    const size = parseInt(document.getElementById('sizeSelect').value);
    const logoSizeRatio = parseFloat(document.getElementById('logoSizeSelect').value);
    const logoFile = document.getElementById('logoInput').files[0];
    const canvas = document.getElementById('qrcodeCanvas');
    const canvasContainer = document.getElementById('canvasContainer');
    const downloadLink = document.getElementById('downloadLink');
    const clearImageBtn = document.getElementById('clearImageBtn');

    if (!url) {
        alert('Ay caramba! Please enter a URL first!');
        return;
    }

    // Determine error correction level based on logo size
    let ecl = 'L';
    if (logoSizeRatio >= 0.30) {
        ecl = 'H';
    } else if (logoSizeRatio >= 0.20) {
        ecl = 'Q';
    } else if (logoSizeRatio >= 0.10) {
        ecl = 'M';
    }

    // Generate QR code with selected size and dynamic error correction
    QRCode.toCanvas(canvas, url, {
        width: size,
        margin: 2,
        errorCorrectionLevel: ecl, 
        color: {
            dark: '#000000',
            light: '#ffffff'
        }
    }, function (error) {
        if (error) {
            console.error(error);
            alert('Failed to generate QR Code');
        } else {
            console.log('QR Code generated successfully');
            canvasContainer.style.display = 'flex';
            clearImageBtn.style.display = 'inline-block';
            
            if (logoFile) {
                // If logo is provided, draw it in the center
                const ctx = canvas.getContext('2d');
                const img = new Image();
                img.onload = function() {
                    const logoSize = size * logoSizeRatio; 
                    const x = (size - logoSize) / 2;
                    const y = (size - logoSize) / 2;
                    
                    // Draw a white background for the logo so it stands out
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(x - 5, y - 5, logoSize + 10, logoSize + 10);
                    
                    // Draw the round logo inside
                    ctx.drawImage(img, x, y, logoSize, logoSize);
                    
                    // Update download link after logo is drawn
                    updateDownloadLink();
                };
                img.src = URL.createObjectURL(logoFile);
            } else {
                // Update download link immediately if no logo
                updateDownloadLink();
            }

            function updateDownloadLink() {
                const dataUrl = canvas.toDataURL('image/png');
                downloadLink.href = dataUrl;
                downloadLink.textContent = `Download (${size}x${size})`;
            }
        }
    });
}