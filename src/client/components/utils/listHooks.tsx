import React from 'react';
import axios from 'axios';
import { Item } from '../../../types/Item';
import { ListProps } from '../list';

declare var CONFIG: {
  api: {
    host: string;
    port: number;
    routes: {
      items: string;
    };
  };
};

function useShoppingApi(): [Item[], boolean, Function] {
  const [data, setRequest] = React.useState({});
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  
  React.useEffect(
    (): void => {
      setLoading(true);
      async function fetchItems(): Promise<void> {
        try {
          const { host, port, routes } = CONFIG.api;
          const path = `${host}:${port}${routes.items}`;
          const { data: { items } } = await axios.post(path, data);
          setResults(items);
          setLoading(false);
        } catch (e) {
          setResults([]);
          setLoading(false);
        }
      }
      fetchItems();
    }, [data]
  );

  return [results, loading, setRequest];
}


export function withListHooks(
  Component: React.FC<ListProps>
): () => React.ReactElement {
  return function ListWrapper(): React.ReactElement {
    const [results, loading, setRequest] = useShoppingApi();
    
    return loading
      ? (<p>Loading...</p>) 
      : (<Component
          items={results}
          onAdd={(text: string): void => {
            setRequest({
              action: 'add',
              item: {
                text,
                checked: false,
              }
            });
          }}
          onCheck={(item: Item): void => {
            setRequest({
              action: 'update',
              item: {
                ...item,
                checked: !item.checked,
              }
            });
          }}
          onDelete={(item: Item): void => {
            setRequest({
              action: 'delete',
              item
            });
          }}
        />);
  };
};