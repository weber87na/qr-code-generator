# LASAI QR Code Generator

一個簡單的靜態 QR Code 產生器，可輸入網址、選擇 QR Code 尺寸、上傳 Logo 並下載產生後的 PNG 圖片。

## 功能

- 輸入網址並產生 QR Code
- 可選擇 QR Code 尺寸：`500x500`、`800x800`、`1000x1000`
- 可上傳 Logo 並置中顯示
- 可選擇 Logo 大小：`10%`、`20%`、`30%`
- Logo 會保留原始比例，不會被拉伸變形
- 可清除網址、Logo 或已產生的 QR Code
- 可下載產生後的 QR Code PNG
- 支援手機版版面，避免橫向捲軸與按鈕破版

## 專案結構

```text
.
├── index.html    # 頁面結構、輸入欄位、按鈕、Canvas、CDN 依賴
├── style.css     # 頁面樣式、響應式版面、按鈕與自訂下拉選單
├── script.js     # QR Code 產生、Logo 繪製、清除與下載邏輯
└── README.md     # 專案說明
```

## 使用方式

這個專案不需要安裝套件，也沒有建置步驟。

直接用瀏覽器開啟 `index.html` 即可使用。

## 開發檢查

修改 JavaScript 後，可以執行語法檢查：

```powershell
node --check script.js
```

查看目前變更：

```powershell
git diff -- index.html style.css script.js README.md
```

## 手動測試建議

修改功能或樣式後，建議至少檢查：

- 未上傳 Logo 時可以正常產生 QR Code
- 上傳正方形、橫向、直向圖片時，Logo 不會變形
- 三種 Logo 大小都能正常顯示
- 三種 QR Code 尺寸都能正常產生與下載
- 清除網址、清除 Logo、清除 QR Code 按鈕都能正常運作
- 手機版畫面不會出現橫向捲軸
- 手機版上傳圖片列與清除按鈕不會破版

## 技術說明

QR Code 產生使用 CDN 載入的 `qrcode` 套件：

```html
<script src="https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js"></script>
```

Logo 繪製流程在 `script.js` 中完成：

1. 先使用 `QRCode.toCanvas()` 產生 QR Code。
2. 如果有上傳 Logo，使用 `URL.createObjectURL()` 讀取圖片。
3. 依照圖片原始長寬比計算置中繪製區域。
4. 在 Logo 後方繪製白色底，提升 QR Code 可讀性。
5. 更新下載連結為 Canvas 的 PNG Data URL。

## 注意事項

- 目前是純前端靜態頁面，不會上傳或儲存使用者選擇的圖片。
- QR Code 的可掃描程度會受到 Logo 大小與圖片內容影響；Logo 越大，越需要實際掃描確認。
- 若未來加入共用圖片或圖示，建議放在 `assets/` 目錄並使用相對路徑引用。
