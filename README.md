# myPayslips

Small project using React, Capacitor, Ionic and Redux.

## Why this?

React and Capacitor were mandatory. Since I could use any other framework, I think Ionic matches perfectly with Capacitor and Redux is not only the best state management for React but also the [recommended option by Ionic](https://ionic.io/enterprise-guide/state-management).

## Set up

```bash
npm i -g @ionic/cli
npm install
```

## Test

You can test it:

- locally with `ionic cap run android --livereload --external`
- [installing the apk](https://github.com/erperejildo/myPayslips/blob/main/app-debug.apk) (download button not working on debug apk)
- [ONLINE](https://main--mypayslips.netlify.app)

## Info

The app is working on native devices and web.
NOTE: Despide I added all the permissions necessary for iOS, I'm using a Windows, so I couldn't properly test it.

It's mobile friendly and also supports light and dark themes:

<img src="https://github.com/erperejildo/myPayslips/assets/5629919/feef1613-4535-48a6-aac6-ca4c26e9241a" width="200">
<img src="https://github.com/erperejildo/myPayslips/assets/5629919/0b01e833-3e93-484c-afe1-4ae081f8a9cd" width="200">
<img src="https://github.com/erperejildo/myPayslips/assets/5629919/5867206f-621b-453a-9133-d12ad09b6151" width="200">
<img src="https://github.com/erperejildo/myPayslips/assets/5629919/86e2264c-cca6-4ebe-8f50-ee39eb0d26f1" width="200">

## Bonus

- Animations:
  - Hover payslip items
  - Download button
- Native download button
- Routes (handled by Ionic)

## BonusX2

- Added extra components such as modals, refreshers, toasts, loaders, etc.
- Inside details page, there is a camera button on the right to test this plugin
- Icon and splash screen
- CD using [Netlify](https://www.netlify.com):

  ![image](https://github.com/erperejildo/myPayslips/assets/5629919/72857c08-1ccf-4cb7-a974-48599158c8ba)

## Challenges found

- Not a big thing, but I thought Ionic would had something to display formatted dates (maybe not found). I just created an util, [formatDate.tsx](https://github.com/erperejildo/myPayslips/blob/main/src/utils/formatDate.tsx), which I initially called .jsx (typo) and lost few minutes looking why I couldn't import my method :S
- The native download probably was the only annoying part. I initially used [this package](https://www.npmjs.com/package/@capacitor-community/http) but I got the error: `NullPointerException`. So looking for some info I found a method called `downloadFile()` here:
  https://github.com/ionic-team/capacitor-plugins/releases/tag/%40capacitor%2Ffilesystem%405.1.0 but it was already deprecated.
  I found some [missing configuration](https://capacitorjs.com/docs/apis/http?__hstc=57877749.b33e4a3d8e494b486c96c82c5df0ca71.1716974113056.1718786115786.1718793579625.3&__hssc=57877749.4.1718793579625&__hsfp=1384645326&_gl=1*18an2ac*_gcl_au*NDg3NDE4MDk3LjE3MTY5NzM5NzQ.*_ga*MTQ3NDczODk0LjE3MTY5NzM5NzU) in my `capacitor.config.ts` enabling https but it was still failing... Finally I ended up in a better place after reading [this documentation](https://ionicframework.com/docs/react/your-first-app/saving-photos)
