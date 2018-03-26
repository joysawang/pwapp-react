import { createBrowserHistory, createHashHistory } from 'history';

export const configureHistory = () => {
  return window.matchMedia('(display-mode: standalone)').matches
    ? createHashHistory()
    : createBrowserHistory()
}
