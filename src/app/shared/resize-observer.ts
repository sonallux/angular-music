import { InjectionToken } from '@angular/core';

export type ResizeObserverFactory = (callback: ResizeObserverCallback) => ResizeObserver;

const browserResizeObserverFactory: ResizeObserverFactory = (callback) =>
  new ResizeObserver(callback);

export const RESIZE_OBSERVER_FACTORY = new InjectionToken<ResizeObserverFactory>(
  'ResizeObserverFactory',
  {
    factory: () => browserResizeObserverFactory,
  },
);

export const mockResizeObserverFactory: ResizeObserverFactory = () => mockResizeObserver;

const mockResizeObserver: ResizeObserver = {
  observe() {},
  disconnect() {},
  unobserve() {},
};
