import * as React from 'react';

export interface ItemProps {
  checked: boolean;
  text: string;
  onCheck: () => void;
  onDelete: () => void;
}

export function Item({ checked, text, onCheck, onDelete }: ItemProps): React.ReactElement {
  return (
    <li className={checked ? 'item complete' : 'item'} aria-label="Shopping list item">
      <p className="item-text">{text}</p>
      <button
        className="app-button check"
        onClick={onCheck}
        aria-label={checked ? 'Mark item' : 'Unmark item'}
        role="checkbox"
        aria-checked={checked}
      />
      <button
        className="app-button delete"
        onClick={onDelete}
        aria-label="Delete item"
      />
    </li>
  );
}