import React from 'react';
import { act, render, cleanup, waitForElement, fireEvent } from '@testing-library/react';
import { withListHooks } from '../listHooks';
import axios from 'axios';

test('Expect loading to render', async () => {
  expect.assertions(1);
  
  await act(async () => {
    const List = () => <p>Mock list</p>;
    const WithHooks = withListHooks(List);
    const { getByText } = render(<WithHooks />);
    
    await waitForElement(() => getByText('Loading...'));
    
    expect(getByText('Loading...')).toMatchInlineSnapshot(`
    <p>
      Loading...
    </p>
    `);
  });
});

describe('With a resolved request', () => {
  const expectedItems = ['item0', 'item1', 'item2'];
  
  beforeEach(() => {
    axios.post = jest.fn(() => Promise.resolve({ data: { items: expectedItems } }));
  });
  
  afterEach(cleanup);
  
  test('Expect the list to render', async () => {
    expect.assertions(1);
  
    await act(async () => {
      const List = () => <p>Mock list</p>;
      const WithHooks = withListHooks(List);
      const { getByText } = render(<WithHooks />);
  
      await waitForElement(() => getByText('Mock list'));
  
      expect(getByText('Mock list')).toMatchInlineSnapshot(`
        <p>
          Mock list
        </p>
      `);
    });
  });

  test('it should call setRequest when onAdd is called', async () => {
    expect.assertions(1);
    const setRequest = jest.fn();
    
    React.useState = jest
      .fn()
      .mockReturnValueOnce(['data', setRequest])
      .mockReturnValueOnce([[], () => {}])
      .mockReturnValueOnce([false, () => {}]);

    await act(async () => {
      const List = ({ onAdd }) => (
        <p onClick={() => onAdd('item')}>Mock list</p>
      );
      const WithHooks = withListHooks(List);
      const { getByText } = render(<WithHooks />);

      await waitForElement(() => getByText('Mock list'));

      fireEvent.click(getByText('Mock list'));

      expect(setRequest).toHaveBeenCalledWith({
        action: 'add',
        item: { 
          text: 'item',
          checked: false,
         }
      });
    });
  });

  test('it should call setRequest when onCheck is called', async () => {
    expect.assertions(1);
    const setRequest = jest.fn();

    React.useState = jest
      .fn()
      .mockReturnValueOnce(['data', setRequest])
      .mockReturnValueOnce([[], () => {}])
      .mockReturnValueOnce([false, () => {}]);

    await act(async () => {
      const List = ({ onCheck }) => (
        <p onClick={() => onCheck({ mock: 'item' })}>Mock list</p>
      );
      const WithHooks = withListHooks(List);
      const { getByText } = render(<WithHooks />);

      await waitForElement(() => getByText('Mock list'));

      fireEvent.click(getByText('Mock list'));

      expect(setRequest).toHaveBeenCalledWith({
        action: 'update',
        item: { 
          mock: 'item',
          checked: true,
        },
      });
    });
  });

  test('it should call setRequest when onDelete is called', async () => {
    expect.assertions(1);
    const setRequest = jest.fn();

    React.useState = jest
      .fn()
      .mockReturnValueOnce(['data', setRequest])
      .mockReturnValueOnce([[], () => {}])
      .mockReturnValueOnce([false, () => {}]);

    await act(async () => {
      const List = ({ onDelete }) => (
        <p onClick={() => onDelete({ mock: 'item' })}>Mock list</p>
      );
      const WithHooks = withListHooks(List);
      const { getByText } = render(<WithHooks />);

      await waitForElement(() => getByText('Mock list'));

      fireEvent.click(getByText('Mock list'));

      expect(setRequest).toHaveBeenCalledWith({
        action: 'delete',
        item: { mock: 'item' }
      });
    });
  });

  test.skip('it should set items with the expected items', async () => {
    expect.assertions(2);
    const setRequest = jest.fn();
    const setResults = jest.fn();
    const itemSpy = jest.fn();

    React.useState = jest
      .fn()
      .mockReturnValueOnce(['data', setRequest])
      .mockReturnValueOnce([expectedItems, setResults])
      .mockReturnValueOnce([false, () => {}]);

    await act(async () => {
      const List = ({ items }) => {
        itemSpy(items);
        return <p>Mock list</p>;
      };
      const WithHooks = withListHooks(List);
      const { getByText } = render(<WithHooks />);

      await waitForElement(() => getByText('Mock list'));

      fireEvent.click(getByText('Mock list'));

      expect(itemSpy).toHaveBeenCalledWith(expectedItems);
      expect(setResults).toHaveBeenCalledWith(expectedItems);
    });
  });
});