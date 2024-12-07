import { useEffect, useState } from "react";
import ActivityDetail from "./ActivityDetail.jsx";
import "../css/activityfeed.css";

const ActivityFeed = () => {
    const [calls, setCalls] = useState([]);
    const [reload, setReload] = useState(false);

    const url = "https://aircall-api.onrender.com/activities";

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

    useEffect(() => { 
        const tabLinks = document.querySelectorAll('.tab-links li a'); 
        const tabContent = document.querySelectorAll('.tab-content .tab'); 

        tabLinks.forEach(link => { 
            link.addEventListener('click', function (e) { 
                e.preventDefault(); 
                const target = document.querySelector(this.getAttribute('href')); 

                // Remove active class from all tabs and links 
                tabLinks.forEach(link => link.parentElement.classList.remove('active')); 
                tabContent.forEach(tab => tab.classList.remove('active')); 
                
                // Add active class to the clicked tab and link 
                this.parentElement.classList.add('active'); 
                target.classList.add('active'); 
            }); 
        }); 
        
        // Cleanup function to remove event listeners when the component unmounts 
        return () => { 
            tabLinks.forEach(link => { 
                link.removeEventListener('click', function (e) { 
                    e.preventDefault(); 
                    const target = document.querySelector(this.getAttribute('href')); 
                    
                    // Remove active class from all tabs and links 
                    tabLinks.forEach(link => link.parentElement.classList.remove('active')); 
                    tabContent.forEach(tab => tab.classList.remove('active')); 
                    
                    // Add active class to the clicked tab and link 
                    this.parentElement.classList.add('active'); 
                    target.classList.add('active'); 
                }); 
            }); 
        }; 
    }, []);

    // Handle archive all calls Button 
    const handleArchive = (id, is_archived, isSingleCall) => {
        console.log(id, is_archived, isSingleCall);
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
                console.log(callId);        
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
                    <li className="active"><a href="#tab1">Active Calls</a></li>
                    <li><a href="#tab2">Archived</a></li>
                    <li><a href="#tab3">All</a></li>
                </ul>
                <div className="tab-content">
                    <div id="tab1" className="tab active">
                        <ActivityDetail callData={calls} actionType={"activeCalls"}  handleArchiveButton={handleArchive} />
                    </div>
                    <div id="tab2" className="tab">
                        <ActivityDetail callData={calls} actionType={"archivedCalls"} handleArchiveButton={handleArchive} />
                    </div>
                    <div id="tab3" className="tab">
                        <ActivityDetail callData={calls} actionType={"all"} handleArchiveButton={handleArchive} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ActivityFeed;

// isSingleCall => True | false = to inform if the action is for one single element or for the whole list 