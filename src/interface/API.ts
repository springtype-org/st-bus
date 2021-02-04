import { EventHandler } from './EventHandler';
import { Subscriber } from './Subscriber';

export interface API {
  subscribers: Array<Subscriber | undefined>;
  on(topic: string, handler: EventHandler): number;
  off(subscriberId: number): void;
  emit(topic: string, event: any): void;
}
