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

function getContainedImageRect(imageWidth, imageHeight, boxX, boxY, boxSize) {
    const imageRatio = imageWidth / imageHeight;
    let drawWidth = boxSize;
    let drawHeight = boxSize;

    if (imageRatio > 1) {
        drawHeight = boxSize / imageRatio;
    } else {
        drawWidth = boxSize * imageRatio;
    }

    return {
        x: boxX + (boxSize - drawWidth) / 2,
        y: boxY + (boxSize - drawHeight) / 2,
        width: drawWidth,
        height: drawHeight
    };
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
        alert('請先輸入網址');
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
                const logoUrl = URL.createObjectURL(logoFile);
                img.onload = function() {
                    const logoSize = size * logoSizeRatio; 
                    const x = (size - logoSize) / 2;
                    const y = (size - logoSize) / 2;
                    const logoRect = getContainedImageRect(img.naturalWidth, img.naturalHeight, x, y, logoSize);
                    const logoPadding = 5;
                    
                    // Draw a white background for the logo so it stands out
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(
                        logoRect.x - logoPadding,
                        logoRect.y - logoPadding,
                        logoRect.width + logoPadding * 2,
                        logoRect.height + logoPadding * 2
                    );
                    
                    // Draw the logo without changing its original aspect ratio.
                    ctx.drawImage(img, logoRect.x, logoRect.y, logoRect.width, logoRect.height);
                    URL.revokeObjectURL(logoUrl);
                    
                    // Update download link after logo is drawn
                    updateDownloadLink();
                };
                img.onerror = function() {
                    URL.revokeObjectURL(logoUrl);
                    alert('無法讀取上傳的圖片，請換一張圖片再試一次');
                    updateDownloadLink();
                };
                img.src = logoUrl;
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

// Custom Select Implementation
document.addEventListener("DOMContentLoaded", function() {
    const customSelects = document.querySelectorAll(".custom-select");
    
    customSelects.forEach(wrapper => {
        const selectedDiv = wrapper.querySelector(".select-selected");
        const itemsDiv = wrapper.querySelector(".select-items");
        const hiddenInput = wrapper.querySelector("input[type='hidden']");
        const options = itemsDiv.querySelectorAll("div");

        selectedDiv.addEventListener("click", function(e) {
            e.stopPropagation();
            closeAllSelect(this);
            itemsDiv.classList.toggle("select-hide");
            selectedDiv.classList.toggle("select-arrow-active");
        });

        options.forEach(opt => {
            opt.addEventListener("click", function(e) {
                // Update text
                selectedDiv.textContent = this.textContent;
                // Update hidden input using values from option
                hiddenInput.value = this.getAttribute("data-value");
                
                // Update selected state styling
                options.forEach(o => o.classList.remove("is-selected"));
                this.classList.add("is-selected");
                
                // Close
                selectedDiv.click();
            });
        });
    });

    function closeAllSelect(exceptELm) {
        const selectedDivs = document.querySelectorAll(".select-selected");
        const itemsDivs = document.querySelectorAll(".select-items");
        selectedDivs.forEach((el, index) => {
            if (el !== exceptELm) {
                el.classList.remove("select-arrow-active");
                itemsDivs[index].classList.add("select-hide");
            }
        });
    }

    document.addEventListener("click", function() {
        closeAllSelect(null);
    });
});
