import { bus } from '../bus';

describe('bus', () => {
  it('is defined', () => {
    expect(bus).toBeDefined();
    expect(bus.emit).toBeDefined();
    expect(bus.on).toBeDefined();
    expect(bus.off).toBeDefined();
    expect(bus.subscribers).toBeDefined();
  });

  it('can emit on a topic and get called', () => {
    const onEventReceived = jest.fn(() => {});

    bus.on('chat:message', onEventReceived);

    bus.emit('chat:message', {
      arbitrary: 'data',
    });

    bus.emit('chat:message', {
      arbitrary: 'data',
    });

    bus.emit('chat:message', {
      arbitrary: 'data',
    });

    expect(onEventReceived.mock.calls.length).toBe(3);
  });

  it('can emit on a topic and unregister as well', () => {
    const onEventReceived = jest.fn(() => {});

    const subscriberId = bus.on('chat:message', onEventReceived);
    bus.off(subscriberId);

    bus.emit('chat:message', {
      arbitrary: 'data',
    });

    bus.emit('chat:message', {
      arbitrary: 'data',
    });

    bus.emit('chat:message', {
      arbitrary: 'data',
    });

    expect(subscriberId).toBe(1);
    expect(onEventReceived.mock.calls.length).toBe(0);
  });
});
