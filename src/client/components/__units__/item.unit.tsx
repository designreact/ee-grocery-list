import React from 'react';
import { Item } from '../item';
import { shallow } from 'enzyme';

const checkHandlerMock = jest.fn();
const deleteHandlerMock = jest.fn();

test('it renders an item', () => {
  const item = shallow(
    <Item
      checked="false"
      text="item-text"
      onChecked={checkHandlerMock}
      onDelete={deleteHandlerMock}
    />
  );
  expect(item).toMatchInlineSnapshot(
    `
    <li>
      <button
        className="check"
        onClick={[MockFunction]}
      />
      <p>
        item-text
      </p>
      <button
        className="delete"
        onClick={[MockFunction]}
      />
    </li>
  `
  );
});

test('when checked it calls the check handler', () => {
  const item = shallow(
    <Item
      checked="false"
      text="item-text"
      onChecked={checkHandlerMock}
      onDelete={deleteHandlerMock}
    />
  );
  item
    .find('button.check')
    .first()
    .simulate('click');
  expect(checkHandlerMock).toHaveBeenCalledTimes(1);
});

test('when deleted it calls the delete handler', () => {
  const item = shallow(
    <Item
      checked="false"
      text="item-text"
      onChecked={checkHandlerMock}
      onDelete={deleteHandlerMock}
    />
  );
  item
    .find('button.delete')
    .first()
    .simulate('click');
  expect(deleteHandlerMock).toHaveBeenCalledTimes(1);
});
