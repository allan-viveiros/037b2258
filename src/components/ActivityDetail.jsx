import { useState } from "react";

const ActivityDetail = (props) => {

    return (
        <section>
            <h2>Active calls</h2>
            {/* <button onClick={props.handleArchiveClick} >Archive all calls</button> */}
            <ul>
                {
                    props.callData.map((call) => {
                        return (
                            call.is_archived === false
                            ? <li key={call.id} id={call.id}>
                                {call.from} | <button onClick={() => props.handleArchiveClick(call.id)}>Archive call</button>
                              </li>
                            : null
                        )
                    })
                }
            </ul>
        </section>
    );
}

export default ActivityDetail;