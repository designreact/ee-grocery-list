import * as React from 'react';

interface ItemProps {
  checked: string;
  text: string;
  onChecked: () => void;
  onDelete: () => void;
}

export function Item(props: ItemProps): React.ReactElement {
  return (
    <li>
      <button className="check" onClick={props.onChecked} />
      <p>{props.text}</p>
      <button className="delete" onClick={props.onDelete} />
    </li>
  );
}