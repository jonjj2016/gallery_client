import feathers from '@feathersjs/feathers';
import axios from 'axios';
import rest from '@feathersjs/rest-client';
const HOST = 'http://localhost:3030';

export const client = feathers()
    .configure(rest(HOST).axios(axios))



export const myClient = client;
export const photosService = client.service('photos');
export const webScreenshotService = client.service('web-screenshot');