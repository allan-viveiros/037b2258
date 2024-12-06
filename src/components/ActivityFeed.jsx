import { useEffect, useState } from "react";
import ActivityDetail from "./ActivityDetail.jsx";
import Archive from "./Archive.jsx";

const ActivityFeed = () => {
    const [calls, setCalls] = useState([]);
    const [reload, setReload] = useState(false);

    const url = "https://aircall-api.onrender.com/activities";

    useEffect(() => {
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

    }, [reload]);

    // Handle archive all calls Button 
    const handleArchive = (id) => {
        console.log(id);

        const archiveBody = {
            "is_archived": true
        };

        const archiveUrl = url+"/"+id;
        // console.log(archiveUrl);
        // console.log(JSON.stringify(archiveBody));

        fetch(archiveUrl, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(archiveBody)
        })
        .then(response => response.text())
        .then(dataText => {
            console.log("Success", dataText);

            setReload(!reload);
        })
        .catch((error) => {
            console.log("Error:", error);
        });
    }

    return (
        <section>
            <ActivityDetail callData={calls} handleArchiveClick={handleArchive} />

            <Archive callData={calls} />
        </section>
    );
}

export default ActivityFeed;