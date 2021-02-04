import { EventHandler } from './EventHandler';

export interface Subscriber {
  topic: string;
  handler: EventHandler;
}
