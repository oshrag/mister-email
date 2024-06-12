import { useEffect, useState } from "react";

export function EmailSort({ sort2, onSetSort2 }) {
  const [sort, setSort] = useState(sort2);

  useEffect(() => {
    onSetSort2(sort);
  }, [sort]);

  // function handleChange({ target }) {
  //     let { value, name: field } = target
  //     setOrder(prevOrder => ({ ...prevOrder, [field]: value }))
  // }

  function onClickSort(by) {
    //  ev.preventDefault;

    console.log("onClickSort : by", by);

    const dir = sort.by !== by ? 1 : sort.dir * -1;
    const newSort = {
      by,
      dir,
    };

    console.log("onClickSort :newSort", newSort);
    setSort(newSort);
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
          {sort.by === by && sort.dir === 1 && <span>&darr;</span>}
          {sort.by === by && sort.dir === -1 && <span>&uarr;</span>}
        </button>
      ))}
    </form>
  );
}
