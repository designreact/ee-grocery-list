import * as React from 'react';
import { Item } from './item';
import { Item as DBItem } from '../../server/utils/database';

export interface ListProps {
  items: DBItem[],
  onAdd: (text: string) => void
  onCheck: (item: DBItem) => void
  onDelete: (item: DBItem) => void
}

function renderListItems(props: ListProps): React.ReactElement[] {
  return props.items.map(
    (item): React.ReactElement => (
      <Item
        key={item.id}
        text={item.text}
        checked={item.checked}
        onCheck={(): void => props.onCheck(item)}
        onDelete={(): void => props.onDelete(item)}
      />
    )
  );
}

export function List(props: ListProps): React.ReactElement {
  const [text, setText] = React.useState('');
  return (
    <div>
      <ul aria-label="Shopping list">{renderListItems(props)}</ul>
      <form className="form" onSubmit={(): void => {props.onAdd(text);}}>
        <label className="form-label" htmlFor="form-button">Add new item</label>
        <input
          className="form-textarea"
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setText(event.target.value);
          }}
        />
        <button
          id="form-button"
          className="form-button"
          type="submit"
        />
      </form>
    </div>
  );
}
