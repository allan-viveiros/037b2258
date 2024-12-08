import { useEffect, useState } from "react";
import ActivityDetail from "./ActivityDetail.jsx";
import "../css/activityfeed.css";

const url = "https://aircall-api.onrender.com/activities";

const tabs = [
    { label: "Active calls", actionType: "activeCalls" },
    { label: "Archived", actionType: "archivedCalls" },
    { label: "All", actionType: "all" }
]

const ActivityFeed = () => {
    const [calls, setCalls] = useState([]);
    const [reload, setReload] = useState(false); 
    const [activeTab, setActiveTab] = useState("activeCalls");

    useEffect(() => {
        const fetchApi = () => {
            fetch(url)
            .then(response => {
                if(!response.ok) {
                    throw new Error(`Something is wrong: ${response.statusText}`);
                }
    
                return response.json();
            })
            .then(data => {
                setCalls(data);
            })
            .catch(error => {
                console.log(`Error: ${error}`);
            })
        }
    
        fetchApi();        
    
    }, [reload]);

    // Handle archive all calls Button 
    const handleArchive = (id, is_archived, isSingleCall) => {
        // Set the PATCH request body to send 
        const archiveBody = {
            "is_archived": !is_archived
        };

        // Create an array to receive call ids to change
        let filteredCalls = [];
        if(isSingleCall === true) {
            filteredCalls.push(id);
        }
        else {
            filteredCalls = calls
                            .filter(call => call.is_archived === is_archived)
                            .map(call => call.id);
        }
        
        // Sending the PATCH request to change all ids recovered
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
            setReload(!reload);
        }

        requestArchive();
    }

    return (
        <section className="tab-wrapper">
            <div className="tabs">
                <ul className="tab-links">
                    {
                        tabs.map((tab) => (
                            <li key={tab.label} className={`${activeTab === tab.actionType ? "active" : "" }`} >
                                <a onClick={() => setActiveTab(tab.actionType)}> {tab.label} </a>
                            </li>
                        ))
                    }
                </ul>

                <div className="tab-content">
                    <div className="tab active">
                        <ActivityDetail key={activeTab} callData={calls} handleArchiveButton={handleArchive} actionType={activeTab} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ActivityFeed;
