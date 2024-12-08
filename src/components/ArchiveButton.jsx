import { useState, useEffect } from "react";
import "../css/archivebutton.css";

// Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";

// This component should receive 4 parameters:
// isArchived => true | false
// handleArchiveButton => to handle the button click to Archive & unarchive calls
// isSingleCall => true | false
// id => id = if i want to change 1 call | 0 = if I want to change all calls

const ArchiveButton = (props) => {
    // const [buttonClass, setButtonClass] = useState("");
    
    const buttonTypeClass = props.isSingleCall ? "button-single" : "button-all";
    const hideClassName = props.hide ? "hide" : "";
    const buttonText = props.isArchived ? "Unarchive all calls" : "Archive all calls";

    return (        
            <div className={`${buttonTypeClass} ${hideClassName}`} onClick={() => props.handleArchiveButton(props.id, props.isArchived, props.isSingleCall)} >
                <FontAwesomeIcon icon={
                    props.isArchived
                    ? faBoxOpen
                    : faBox
                    } size="xl" className="icon-yellow"/>

                    { !props.isSingleCall && buttonText }

        </div>        
    );
}

export default ArchiveButton;
