import { useEffect, useState } from "react";

export function EmailSort({ sortBy, onSetSort }) {
  const [sortByToEdit, setSortByToEdit] = useState(sortBy);

  useEffect(() => {
    // onSetSort(sortByToEdit);
  }, [sortByToEdit]);

  // function handleChange({ target }) {
  //     let { value, name: field } = target
  //     setOrder(prevOrder => ({ ...prevOrder, [field]: value }))
  // }

  function onClickSort(by) {
    //  ev.preventDefault;
    const dir = sortByToEdit.by !== by ? 1 : sortByToEdit.dir * -1;

    const newSort = {
      by,
      dir,
    };

    setSortByToEdit(newSort);
    onSetSort(newSort);
  }

  const sorts = ["read", "starred", "date", "subject"];
  return (
    <form className="email-sort">
      {sorts.map((by) => (
        <button
          key={by}
          className={`sortBy${by}`}
          onClick={() => {
            onClickSort(by);
          }}
        >
          {by}
          {sortByToEdit.by === by && sortByToEdit.dir === 1 && (
            <span>&darr;</span>
          )}
          {sortByToEdit.by === by && sortByToEdit.dir === -1 && (
            <span>&uarr;</span>
          )}
        </button>
      ))}
    </form>
  );
}
