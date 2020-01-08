import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Item } from '../item';

const checkHandlerMock = jest.fn();
const deleteHandlerMock = jest.fn();

afterEach(cleanup);

test('it renders an item', () => {
  const { asFragment } = render(
    <Item
      checked={false}
      text="item-text"
      onCheck={checkHandlerMock}
      onDelete={deleteHandlerMock}
    />
  );
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <li
        aria-label="Shopping list item"
        class="item"
      >
        <p>
          item-text
        </p>
        <button
          aria-checked="false"
          aria-label="Unmark item"
          class="item-check"
          role="checkbox"
        />
        <button
          aria-label="Delete item"
          class="item-delete"
        />
      </li>
    </DocumentFragment>
  `);
});

test('when checked it calls the check handler', () => {
  const { getByLabelText } = render(
    <Item
      checked={false}
      text="item-text"
      onCheck={checkHandlerMock}
      onDelete={deleteHandlerMock}
    />
  );
  fireEvent.click(getByLabelText('Unmark item'));
  expect(checkHandlerMock).toHaveBeenCalledTimes(1);
});

test('when deleted it calls the delete handler', () => {
  const { getByLabelText } = render(
    <Item
      checked={false}
      text="item-text"
      onCheck={checkHandlerMock}
      onDelete={deleteHandlerMock}
    />
  );
  fireEvent.click(getByLabelText('Delete item'));
  expect(deleteHandlerMock).toHaveBeenCalledTimes(1);
});
