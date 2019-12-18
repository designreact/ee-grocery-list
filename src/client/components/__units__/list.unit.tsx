import React from "react";
import { List } from "../list";
import { shallow } from "enzyme";

const mockItems = [
  <li>'item-0'</li>,
  <li>'item-1'</li>,
  <li>'item-2'</li>,
  <li>'item-3'</li>
];
const addHandlerMock = jest.fn();

test("it renders the list component", () => {
  const list = shallow(<List items={mockItems} onAdd={addHandlerMock} />);
  expect(list).toMatchInlineSnapshot(`
    <div>
      <ul>
        <li>
          'item-0'
        </li>
        <li>
          'item-1'
        </li>
        <li>
          'item-2'
        </li>
        <li>
          'item-3'
        </li>
      </ul>
      <button
        className="add"
        onClick={[MockFunction]}
      />
    </div>
  `);
});

test("clicking the add item button adds an item", () => {
  const list = shallow(<List items={mockItems} onAdd={addHandlerMock} />);
  list
    .find("button.add")
    .first()
    .simulate("click");
  expect(addHandlerMock).toHaveBeenCalledTimes(1);
});
