export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    product: '/dashboard',
    Analysis: '/dashboard/SkinAnalysis',
    customers: '/dashboard/customers',
    integrations: '/dashboard/integrations',
    MainDescription: '/dashboard/MainDescription',
  },
} as const;
