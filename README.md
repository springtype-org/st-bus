<h1 align="center">SpringType: st-bus</h1>

> Nano event bus library

[![Gitter](https://badges.gitter.im/springtype-official/springtype.svg)](https://gitter.im/springtype-official/springtype?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

<h2 align="center">Purpose</h2>

This is an exremely tiny, yet powerful eventing library. `st-bus` makes it easy to decouple components. If one component wants to tell another component that something happend, `emit` is called. In another component, `on` is called to listen for such events.

<h2 align="center">Features</h2>

- ✅ Implements a socket.io-like publish/subscribe API
- ✅ Tiny: `136 byte` (best, brotli) - `267 byte` (worst, umd, gz)
- ✅ Zero dependencies
- ✅ First class TypeScript support
- ✅ 100% Unit Test coverage

<h2 align="center">How to</h2>

This is how `st-bus` is used:

```tsx
import { tsx, render, Ref } from 'springtype';
import { $ } from 'st-query';
import { bus } from 'st-bus';

interface ChatMessage {
  user: string;
  time: number;
  text: string;
}

const TrollBox = () => {
  const chatMessagesRef: Ref = {};

  // local messages state
  const msgs = [];

  bus.on('chat:message', (event: ChatMessage) => {
    // add message to local state
    msgs.push(
      <div>
        <hr />
        {new Date(event.time).toUTCString()}
        <br />
        <strong>{event.user}: </strong>
        {event.text}
      </div>,
    );

    // re-render all messages
    $(chatMessagesRef.current).html(<div>{msgs}</div>);
  });

  return (
    <div>
      <h3>Chat room:</h3>
      <div ref={chatMessagesRef} />
    </div>
  );
};

const TrollInput = () => {
  const chatMessageInputRef: Ref = {};

  const sendMessage = () => {
    bus.emit('chat:message', {
      user: 'Anonymous',
      time: Date.now(),
      text: $(chatMessageInputRef.current).val(),
    });
    // reset input
    $(chatMessageInputRef.current).val('');
  };

  return (
    <div style={{ borderTop: '2px solid #ccc', backgroundColor: '#eee', padding: 10, marginTop: 10 }}>
      <input
        ref={chatMessageInputRef}
        placeholder="Your message..."
        onKeyUp={(evt: KeyboardEvent) => {
          if (evt.keyCode === 13) {
            sendMessage();
          }
        }}
        type="text"
      />
      <button type="button" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

const AlterEgoChat = () => (
  <fragment>
    <TrollBox />
    <TrollInput />
  </fragment>
);

render(<AlterEgoChat />);
```

<h2 align="center">API</h2>

The following contract is made between the webapp and `st-bus`:

```typescript
export interface API {
  subscribers: Array<Subscriber | undefined>;
  on(topic: string, handler: EventHandler): number;
  off(subscriberId: number): void;
  emit(topic: string, event: any): void;
}
```

<h2 align="center">Backers</h2>

Thank you so much for supporting us financially! 🙏🏻😎🥳👍

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/17221813?v=4&s=150">
        </br>
        <a href="https://github.com/jsdevtom">Tom</a>
      </td>
    </tr>
  <tbody>
</table>

<h2 align="center">Maintainers</h2>

`st-bus` is brought to you by:

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/454817?v=4&s=150">
        </br>
        <a href="https://github.com/kyr0">Aron Homberg</a>
      </td>
    </tr>
  <tbody>
</table>

<h2 align="center">Contributing</h2>

Please help out to make this project even better and see your name added to the list of our
[CONTRIBUTORS.md](./CONTRIBUTORS.md) :tada:
