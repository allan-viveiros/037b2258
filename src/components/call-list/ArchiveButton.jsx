import { useContext } from "react";
import "./styles/archivebutton.css";
import { CallListContext } from "./ActivityFeed.jsx";
import { ApiContext } from "./ActivityFeed.jsx";

// Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";

// This component should receive 4 parameters:
// isArchived => true | false
// isSingleCall => true | false
// id => id = if i want to change 1 call | 0 = if I want to change all calls
// hide => to change the button class in order to hide or not the current button

const ArchiveButton = ( {id, isArchived, isSingleCall, hide} ) => {    
    const buttonTypeClass = isSingleCall ? "button-single" : "button-all";
    const hideClassName = hide ? "hide" : "";
    const buttonText = isArchived ? "Unarchive all calls" : "Archive all calls";
        
    const { url, calls } = useContext(ApiContext);
    const { refreshCallList, setRefreshCallList } = useContext(CallListContext);

    const handleArchiveButton = (id, is_archived, isSingleCall) => {
        // creating a array of calls to archive/unarchive
        const filteredCalls = isSingleCall ? [id] : calls
                                                        .filter(call => call.is_archived === is_archived)
                                                        .map(call => call.id);

        // Change the current s_archived valor and set the PATCH request body to send 
        const archiveBody = {
            "is_archived": !is_archived
        };

        // Sending the PATCH request to change all ids in filteredCalls
        const requestArchive = async () => {            
            const promises = filteredCalls.map(callId => {     
                const archiveUrl = url+"/"+callId;

                return ( 
                    fetch(archiveUrl, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(archiveBody)
                    })
                    .then(response => {
                        if(!response.ok) {
                            throw new Error("Fetch Error: ", response.statusText);
                        } 
                        return response.text()
                    })
                    .then(dataText => {
                        console.log("Success", dataText);
                    })
                    .catch((error) => {
                        console.log("Error:", error);
                    })
                )
            });

            await Promise.all(promises);
            setRefreshCallList(!refreshCallList);
        }
        // Call function to archive/unarchive calls
        requestArchive();
    }
   
 
    return (
        <div className={`${buttonTypeClass} ${hideClassName}`} onClick={() => handleArchiveButton(id, isArchived, isSingleCall)} >

            <FontAwesomeIcon icon={isArchived ? faBoxOpen : faBox} size="xl" className="icon-yellow"/>
            { !isSingleCall && buttonText }    

        </div>                 
    );
}

export default ArchiveButton;
