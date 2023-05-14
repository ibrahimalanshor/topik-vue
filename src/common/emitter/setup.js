import mitt from 'mitt';

export function setupEmitter(app) {
  app.provide('emitter', mitt());
}
