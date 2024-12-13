import { useEffect, useState, createContext } from "react";
import ActivityDetail from "./ActivityDetail.jsx";
import "./styles/activityfeed.css";

const url = "https://aircall-api.onrender.com/activities";

const tabs = [
    { label: "Active calls", actionType: "activeCalls" },
    { label: "Archived", actionType: "archivedCalls" },
    { label: "All", actionType: "all" }
];

export const ApiContext = createContext();
export const CallListContext = createContext();

const ActivityFeed = () => {
    const [calls, setCalls] = useState([]);
    const [activeTab, setActiveTab] = useState("activeCalls");
    const [refreshCallList, setRefreshCallList] = useState(false);

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
    
    }, [refreshCallList]);
    
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
                        <ApiContext.Provider value={{url, calls}} >
                            <CallListContext.Provider value={{refreshCallList, setRefreshCallList}} >
                                <ActivityDetail key={activeTab} callData={calls} actionType={activeTab} />
                            </CallListContext.Provider>
                        </ApiContext.Provider>                  
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ActivityFeed;
