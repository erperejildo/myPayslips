# myPayslips

Small project using React, Redux, Ionic, Capacitor, Vite and much more.

## Set up

```bash
npm i -g @ionic/cli
npm install
npm run build
```

## Test

You can test it:

- locally with `ionic serve` or `ionic cap run android --livereload --external` (if you want to also check on a connected phone)
- [installing the apk](https://github.com/erperejildo/myPayslips/blob/main/app-debug.apk)
- [ONLINE](https://main--mypayslips.netlify.app)

## Info

The app is working on native devices and web.
NOTE: Despide I added all the permissions necessary for iOS, I'm using Windows, so I couldn't properly test it.

It's mobile friendly and also supports light and dark themes:

<img src="https://github.com/erperejildo/myPayslips/assets/5629919/9257dab7-47a0-41cf-90b8-f8d8b721e75a" width="600">
<img src="https://github.com/erperejildo/myPayslips/assets/5629919/a568338a-1e1e-4939-ab8c-7be3739341f4" width="600">

<img src="https://github.com/erperejildo/myPayslips/assets/5629919/9719fbd3-cf9d-4cb4-9398-051f01749767" width="200">
<img src="https://github.com/erperejildo/myPayslips/assets/5629919/f5c0caa3-d9c1-4676-b50a-785a54a8475f" width="200">

## Features

- Animations:
  - Hover payslip items
  - Download button
  - Routes (handled by Ionic)
- Native download button
- Added extra components such as modals, refreshers, toasts, loaders, etc.
- Inside details page, there is a camera button on the right to test this plugin
- Icon and splash screen
- Added loading/error to individual payslips and improved error handling when loading pages (search for `uncomment next line`)
- CD using [Netlify](https://www.netlify.com):

![image](https://github.com/erperejildo/myPayslips/assets/5629919/38c6f531-6ade-499e-adde-64509892a214)
