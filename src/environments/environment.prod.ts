import { env } from 'env';

export const environment = {
  production: false,
  firebase: env.firebase,
  disqusShortName: env.disqusShortname,
  experience: {
    createCol: 20,
    updateCol: 5,
    createItem: 25,
    updateItem: 5,
  }
};
