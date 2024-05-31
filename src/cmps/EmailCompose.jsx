


export function EmailCompose({onClose, onSend}) {

    function getEmailData(event) {
        event.preventDefault();
        const { to, subject, body } = event.target.elements;
        return {
          to: to.value,
          subject: subject.value,
          body: body.value
        };
      }



 return (
    <section className="email-compose">
        <button className="close" onClick={(event) => { onClose(); event.preventDefault() } }>X</button>

        <form  onSubmit={(event) => { onSend(getEmailData(event)) }}>
            <label>To</label>
            <input name="to"type="text"></input>
            <label>Subject</label>
            <input name="subject"type="text"></input>
            <label>content</label>
            <input name="body"type="textarea"></input>
            {/* <button onClick={onComposeEmail}>send</button> */}
            <button>send</button>
        </form> 
    </section>
 )
}