import * as React from 'react';

interface ListProps {
  items: React.ReactElement[],
  onAdd: () => void
}

export function List(props: ListProps): React.ReactElement {
  return (
    <div>
      <ul>
        {props.items}
      </ul>
      <button className="add" onClick={props.onAdd} />
    </div>
  );
}
