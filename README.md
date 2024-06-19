# myPayslips

Small project using React, Capacitor, Ionic and Redux.

## Why this?

React and Capacitor were mandatory. Since I could use any other framework, I think Ionic matches perfectly with Capacitor and Redux is not only the best state management for React but also the [recommended option by Ionic](https://ionic.io/enterprise-guide/state-management).

## Run project

```bash
npm i -g @ionic/cli
npm install
ionic cap run android --livereload --external
```

## Bonus

- Animations:
  - Hover payslip items
  - Download button

## Problems found

- Not a big thing, but I thought Ionic would had something to display formatted dates (maybe not found). I just created an util, [formatDate.tsx](https://github.com/erperejildo/myPayslips/blob/main/src/utils/formatDate.tsx), which I initially called .jsx (typo) and lost few minutes looking why I couldn't import my method.
- The native download propabably was the onlye annoying part. I innitially used [this package](https://www.npmjs.com/package/@capacitor-community/http) but I got the error: `NullPointerException`. So looking for some info I found a method called `downloadFile()` here:
  https://github.com/ionic-team/capacitor-plugins/releases/tag/%40capacitor%2Ffilesystem%405.1.0 but it was already deprecated.
  I found some [missing configuration](https://capacitorjs.com/docs/apis/http?__hstc=57877749.b33e4a3d8e494b486c96c82c5df0ca71.1716974113056.1718786115786.1718793579625.3&__hssc=57877749.4.1718793579625&__hsfp=1384645326&_gl=1*18an2ac*_gcl_au*NDg3NDE4MDk3LjE3MTY5NzM5NzQ.*_ga*MTQ3NDczODk0LjE3MTY5NzM5NzU) in my `capacitor.config.ts` enabling https but it was still failing.Finally I ended up in a better place after reading [this documentation](https://ionicframework.com/docs/react/your-first-app/saving-photos)
