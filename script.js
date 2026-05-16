function clearInput() {
    document.getElementById('urlInput').value = '';
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
    const canvas = document.getElementById('qrcodeCanvas');
    const canvasContainer = document.getElementById('canvasContainer');
    const downloadLink = document.getElementById('downloadLink');
    const clearImageBtn = document.getElementById('clearImageBtn');

    if (!url) {
        alert('Ay caramba! Please enter a URL first!');
        return;
    }

    // Generate QR code with selected size
    QRCode.toCanvas(canvas, url, {
        width: size,
        margin: 2,
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
            
            // Set download link
            const dataUrl = canvas.toDataURL('image/png');
            downloadLink.href = dataUrl;
            downloadLink.textContent = `Download (${size}x${size})`;
        }
    });
}