import { tsx, render, Ref } from 'springtype';
import { $ } from 'st-query';
import { bus } from '../../../dist';

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
      <div id="chatBox" ref={chatMessagesRef} />
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
        id="chatMessageInput"
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
