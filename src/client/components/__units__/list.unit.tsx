import React from 'react';
import { render, cleanup, fireEvent, getByRole } from '@testing-library/react';
import { List } from '../list';
import { Item } from '../../../server/utils/database';

const mockItems: Item[] = [
  {
    id: 'id-0',
    userId: 'userId-0',
    text: 'test-0',
    checked: true
  },
  {
    id: 'id-1',
    userId: 'userId-1',
    text: 'test-1',
    checked: true
  },
  {
    id: 'id-2',
    userId: 'userId-2',
    text: 'test-2',
    checked: false
  },
  {
    id: 'id-3',
    userId: 'userId-3',
    text: 'test-3',
    checked: false
  }
];
const addHandlerMock = jest.fn();

afterEach(cleanup);

test('it renders the list component', () => {
  const { asFragment } = render(
    <List
      items={mockItems}
      onAdd={addHandlerMock}
      onCheck={() => {}}
      onDelete={() => {}}
    />
  );
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div>
        <ul
          aria-label="Shopping list"
        >
          <li
            aria-label="Shopping list item"
            class="item complete"
          >
            <p>
              test-0
            </p>
            <button
              aria-checked="true"
              aria-label="Mark item"
              class="item-check"
              role="checkbox"
            />
            <button
              aria-label="Delete item"
              class="item-delete"
            />
          </li>
          <li
            aria-label="Shopping list item"
            class="item complete"
          >
            <p>
              test-1
            </p>
            <button
              aria-checked="true"
              aria-label="Mark item"
              class="item-check"
              role="checkbox"
            />
            <button
              aria-label="Delete item"
              class="item-delete"
            />
          </li>
          <li
            aria-label="Shopping list item"
            class="item"
          >
            <p>
              test-2
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
          <li
            aria-label="Shopping list item"
            class="item"
          >
            <p>
              test-3
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
        </ul>
        <form
          class="form"
        >
          <label
            class="form-label"
            for="form-button"
          >
            Add new item
          </label>
          <input
            class="form-textarea"
          />
          <button
            class="form-button"
            id="form-button"
            type="submit"
          />
        </form>
      </div>
    </DocumentFragment>
  `);
});

test('clicking the add item button calls the add handler', () => {
  const { getByLabelText } = render(
    <List
      items={mockItems}
      onAdd={addHandlerMock}
      onCheck={() => {}}
      onDelete={() => {}}
    />
  );
  fireEvent.submit(getByLabelText('Add new item'));
  expect(addHandlerMock).toHaveBeenCalledTimes(1);
});
