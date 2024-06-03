import { Link } from 'react-router-dom'



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
        <section className ="compose-header">
            {/* <span>new email</span> <Link to="/email">X</Link> */}
            <span>new email</span>
            <button className="close" onClick={(event) => { onClose(); event.preventDefault() } }>X</button>
        </section>
       

        <form  onSubmit={(event) => { onSend(getEmailData(event)) }}>
            {/* <label>To</label> */}
            <input name="to"type="text" placeholder='To'></input>
            {/* <label>Subject</label> */}
            <input name="subject"type="text" placeholder='Subject'></input>
            {/* <label>content</label> */}
            <textarea name="body" rows="10" cols="30"></textarea>
            {/* <button onClick={onComposeEmail}>send</button> */}
            <button className="send">send</button>
        </form> 
    </section>
 )
}