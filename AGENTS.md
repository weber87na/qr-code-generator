# Repository Guidelines

## Project Structure & Module Organization

This repository is a small static QR code generator. The main files live at the repository root:

- `index.html` defines the page structure, controls, canvas, and CDN dependency for `qrcode`.
- `style.css` contains all visual styling for the page, inputs, custom selects, buttons, and canvas preview.
- `script.js` contains QR generation, logo upload/drawing logic, clear actions, download-link updates, and custom select behavior.

There is currently no dedicated `tests/` directory, build output directory, or asset folder. If assets are added later, place reusable images or icons under `assets/` and reference them with relative paths.

## Build, Test, and Development Commands

No build step is required. Open `index.html` directly in a browser to run the app.

Useful checks:

```powershell
node --check script.js
```

Checks JavaScript syntax without executing browser-only code.

```powershell
git diff -- index.html style.css script.js
```

Reviews local changes before committing.

## Coding Style & Naming Conventions

Use plain HTML, CSS, and JavaScript. Keep indentation at 4 spaces to match the existing files. Prefer descriptive camelCase names for JavaScript functions and variables, such as `generateQRCode`, `clearLogo`, and `logoSizeRatio`.

Keep behavior in `script.js`, layout in `index.html`, and presentation in `style.css`. Avoid introducing frameworks or build tooling unless the project grows enough to justify them.

## Testing Guidelines

There is no automated test suite yet. For changes, perform manual browser checks:

- Generate a QR code with no logo.
- Generate with square, horizontal, and vertical logo images.
- Verify the logo is not distorted and the QR remains downloadable.
- Test all size controls and clear buttons.

Run `node --check script.js` before committing JavaScript changes.

## Commit & Pull Request Guidelines

Existing commit history uses short messages, sometimes in Chinese, such as `增加可以上傳圖片 logo` and `update icon`. Keep commits concise and action-oriented. Prefer specific messages, for example:

- `修正 logo 比例縮放`
- `Update QR canvas download label`

Pull requests should include a brief summary, manual test results, and screenshots or screen recordings for UI changes. Note any browser-specific behavior if relevant.

## Agent-Specific Instructions

Keep edits narrowly scoped. Do not reformat all files unless requested. Preserve the static, dependency-light structure and avoid changing CDN dependencies without explaining the reason.
