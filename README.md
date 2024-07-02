# myPayslips

Small project using React, Capacitor, Ionic and Redux.

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

<img src="https://github.com/erperejildo/myPayslips/assets/5629919/feef1613-4535-48a6-aac6-ca4c26e9241a" width="200">
<img src="https://github.com/erperejildo/myPayslips/assets/5629919/207dba39-7dae-454e-9b6c-14ba00614226" width="200">
<img src="https://github.com/erperejildo/myPayslips/assets/5629919/5867206f-621b-453a-9133-d12ad09b6151" width="200">
<img src="https://github.com/erperejildo/myPayslips/assets/5629919/86e2264c-cca6-4ebe-8f50-ee39eb0d26f1" width="200">

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

  ![image](https://github.com/erperejildo/myPayslips/assets/5629919/72857c08-1ccf-4cb7-a974-48599158c8ba)
