import { API } from './interface/API';
import { EventHandler } from './interface/EventHandler';

export const bus: API = {
  subscribers: [],
  on: (topic: string, handler: EventHandler) =>
    bus.subscribers.push({
      topic,
      handler,
    }) - 1,
  off: (subscriberIndex: number) => (bus.subscribers[subscriberIndex] = undefined),
  emit: (topic: string, event: any) => {
    for (let i = 0; i < bus.subscribers.length; i++) {
      if (bus.subscribers[i] && bus.subscribers[i]!.topic === topic) {
        bus.subscribers[i]!.handler(event);
      }
    }
  },
};
