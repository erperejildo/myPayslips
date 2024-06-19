import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'myPayslips',
  webDir: 'dist',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    CapacitorFilesystem: {
      android: {
        saveToGallery: true,
      },
    },
  },
};

export default config;
