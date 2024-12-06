
const Archive = (props) => {

    return (
        <section>
            <h2>Archived calls</h2>
            <ul>
                {
                    props.callData.map((call) => {
                        return (
                            call.is_archived === true
                            ? <li key={call.id} id={call.id}>{call.from}</li>
                            : null
                        )
                    })
                }
            </ul>
        </section>
    );
}

export default Archive;