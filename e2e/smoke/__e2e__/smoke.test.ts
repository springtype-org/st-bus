import { Selector } from 'testcafe';

// eslint-disable-next-line
fixture`Smoke test`.page`../dist/index.html`;

test('Input field has been rendered', async (t) => {
  await t.wait(20);
  await t.typeText(Selector('#chatMessageInput'), 'Chat message A');
  await t.click(Selector('button'));
  await t.expect(Selector('#chatBox').textContent).contains('Chat message A');
});
