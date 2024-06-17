import { useEffect, useState } from "react";
import { emailService } from "../services/email.service.js";
import { useForm } from "../customHooks/useForm.js";

export function EmailFilter({ filterBy, onSetFilterBy }) {
  //const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  const [filterByToEdit, handleChange] = useForm(filterBy, onSetFilterBy);

  // useEffect(() => {
  //   onSetFilterBy(filterByToEdit); //update EmailIndex without Submit Btn
  // }, [filterByToEdit]);

  // function handleChange({ target }) {
  //   let { value, name: field, type } = target;
  //   // value = type !== 'text' ? utilService.strToNullableBool(value) : value
  //   setFilterByToEdit((prevFilterByToEdit) => ({
  //     ...prevFilterByToEdit,
  //     [field]: value,
  //   }));
  // }

  function onSubmitFilter(ev) {
    ev.preventDefault();
    // console.log('onSubmitFilter filterByToEdit:',filterByToEdit)
    onSetFilterBy(filterByToEdit);
  }

  const { text, isRead } = filterByToEdit;

  return (
    <form onSubmit={onSubmitFilter} className="email-filter">
      <section>
        <label htmlFor="text">search</label>
        <input
          onChange={handleChange}
          name="text"
          id="text"
          type="text"
          value={text}
        />
      </section>

      <section>
        <select
          name="isRead"
          id="isRead"
          type="select"
          onChange={handleChange}
          defaultValue={emailService.convertIsReadStatus(isRead)}
        >
          <option value="true">Read</option>
          <option value="false">UnRead</option>
          <option value="null">all</option>
        </select>
      </section>
      <section>
        <button>Submit</button>
      </section>
    </form>
  );
}
