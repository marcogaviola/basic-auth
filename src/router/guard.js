import Auth from '@/services/auth'

export const ifAuthenticated = (to, from, next) => {
  Auth.isLoggedIn().then(() => {
    next();
  }).catch(() => {
    next("/login")
  })
};