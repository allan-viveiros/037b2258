import { useState, useEffect } from "react";
import ArchiveButton from "./ArchiveButton.jsx";
import "../css/activitydetail.css";

// Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVoicemail } from "@fortawesome/free-solid-svg-icons";
import { faPhoneSlash } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft} from "@fortawesome/free-solid-svg-icons";

// This component should receive 3 parameters:
// callData => array contained all calls 
// actionType => "activeCalls" = for active calls | "archivedCalls" = for archived calls | "all" = For all calls
// handleArchiveButton => to handle the button click to Archive & unarchive calls
// isSingleCall => True | false = to inform if the action is for one single element or for the whole list 

const ActivityDetail = (props) => {
    const[filter, setFilter] = useState([]);
    const[dateFilter, setDateFilter] = useState([]);
    const[isArchived, setIsArchived] = useState();
    const[hide, setHide] = useState(false);

    useEffect(() => {
        const callsFilter = () => {
            if(props.actionType === "activeCalls") {
                const newArray = props.callData.filter(item => item.is_archived === false); 
                setFilter(newArray);
                setIsArchived(false);
            }
            else if(props.actionType === "archivedCalls") {
                const newArray = props.callData.filter(item => item.is_archived === true);
                setFilter(newArray);
                setIsArchived(true);
            }
            else {
                setFilter(props.callData);
                setHide(true);
            }
        }

        callsFilter();
        
    }, [props.callData]);
    
  
    useEffect(() => {
        // Sort calls by the most recent
        const sortByDate = () => {
            const sortDateFilter = [...filter].sort((a, b) => {
                return (
                    new Date(b.created_at) - new Date(a.created_at)
                )
            });
            
            setDateFilter(sortDateFilter);
        }

        sortByDate();
    }, [filter]);


    const callIcon = (callType) => {
        switch (callType) {
            case "voicemail":
                return <FontAwesomeIcon icon={faVoicemail} size="xl" className="icon-blue" />;
            case "answered":
                return <FontAwesomeIcon icon={faPhone} size="xl" className="icon-green" />;
            case "missed":
                return <FontAwesomeIcon icon={faPhoneSlash} size="xl" className="icon-red" />;
            default:
                return null;
        }
    };

    return (
        <section className="content-section">
            <div className="button-big">
                <ArchiveButton id={0} isArchived={isArchived} isSingleCall={false} handleArchiveButton={props.handleArchiveButton} hide={hide} />
            </div>
            
            <ul className="call-list">               
                {
                    dateFilter.map((call) => {
                        return (
                            <li key={call.id} id={call.id}>
                                <div className="list-content">
                                    <div className="details">
                                        <span> {callIcon(call.call_type)} </span>

                                        <div className="call-info"> 
                                            <span>              
                                                from: {call.from} 
                                                <FontAwesomeIcon icon={faArrowRight} size="xs" className="icon-blue" />
                                            </span>
                                            <span> 
                                                to: {call.to} 
                                                <FontAwesomeIcon icon={faArrowLeft} size="xs" className="icon-blue" />
                                            </span>  
                                        </div> 
                                    </div>

                                    <div className="list-footer">
                                        <span> {call.created_at.slice(0, 10)} at {call.created_at.slice(11, 19)}</span> | 
                                        <span> {call.direction} </span>
                                    </div>                       
                                </div>

                                <ArchiveButton id={call.id} isArchived={call.is_archived} isSingleCall={true} handleArchiveButton={props.handleArchiveButton} hide={hide} />
                            </li>                           
                        )
                    })
                }
            </ul>
        </section>
    );
}

export default ActivityDetail;