import React from 'react';
import { withListHooks } from './utils/listHooks';
import { List } from './list';

const HookedList = withListHooks(List);

export function App(): React.ReactElement {
  return (
    <div className="app">
      <h1>Shopping List</h1>
      <HookedList />
    </div>
  );
};