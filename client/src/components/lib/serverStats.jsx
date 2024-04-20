import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box } from '@chakra-ui/react'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';


const ServerStats = ({ bot }) => {
    const [serverData, setServerData] = useState(null);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const server = await axios.get('https://servers-frontend.fivem.net/api/servers/single/kd9rgr')


                setServerData(server.data.Data);
                console.log(server.data.Data)
            } catch (err) {
                console.log("Error fetching server data:", err);
            }
        };

        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Box className="server-stats" display='flex' alignItems='center' color="white">
            <p>
                {serverData?.clients} / <FontAwesomeIcon icon={faUserGroup} style={{ color: "#ffffff", }} />
            </p>

        </Box>
    );
};

export default ServerStats;
