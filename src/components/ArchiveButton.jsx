import { useState, useEffect } from "react";
import "../css/archivebutton.css";

// 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";


// This component should receive 4 parameters:
// isArchived => true | false
// handleArchiveButton => to handle the button click to Archive & unarchive calls
// isSingleCall => true | false
// id => id = if i want to change 1 call | 0 = if I want to change all calls

const ArchiveButton = (props) => {
    const [buttonClass, setButtonClass] = useState("");

    useEffect(() => {          
        const showButton = () => {
            if(props.isSingleCall === true) {
                if(props.hide === false) {
                    setButtonClass("button-single");
                }
                else {
                    setButtonClass("hide");
                }
            }
            else {
                if(props.hide === false) {
                    setButtonClass("button-all");
                } 
                else {
                    setButtonClass("hide");
                }                
            }            
        }

       showButton();

    }, [props.hide]);

    return (        
            <div className={buttonClass} onClick={() => props.handleArchiveButton(props.id, props.isArchived, props.isSingleCall)} >
                <FontAwesomeIcon icon={
                    props.isArchived
                    ? faBoxOpen
                    : faBox
                    } size="xl" className="icon-yellow"/>

                    {
                        props.isSingleCall === false
                        ? props.isArchived === true
                            ? "Unarchive all calls"
                            : "Archive all calls" 
                        : null
                            
                    }

                {/* {
                    props.isSingleCall
                    ? props.isArchived === true
                        ? "Unarchive"
                        : "Archive" 
                    : props.isArchived === true
                        ? "Unarchive all calls"
                        : "Archive all calls"                               
                }                */}
        </div>        
    );
}

export default ArchiveButton;
