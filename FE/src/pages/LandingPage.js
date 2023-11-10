import React from 'react';
import { Badge, Calendar, Button, Typography, ConfigProvider } from 'antd';
import './LandingPage.css';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

const LandingPage = () => {
    useEffect(() =>  loadPtoTable(), []);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)
    const [ptoTable, setPtoTable] = useState([]);
    const request = () => {
        let path = '/PtoRequestForm';
        navigate(path);
    }
    //requesting PTO entries from DB and causing refresh after load of entries
    const loadPtoTable = async () => {
        console.log('loading pto table')
        const response = await fetch('/loadPtoTable', {
            headers: {
                'Content-Type': 'application/json'
            }            
        }).then((response) => {
            if (response.ok) {
                response.json().then((responseData) => {
                    setPtoTable(responseData)
                    setIsLoading(false)
                })
            }
        });
    }

    //loading PTO entries into proper format
    const loadListData = (value) => {
        let listData = [];
        let test = [
            {
              type: 'error',
              content: 'James Stallkamp',
            },

          ];
        for (let i =0; i<ptoTable.length;i++){
            let cellYear = value.year()
            let cellMonth = value.month()
            let cellDay = value.date()
            let curDate = ptoTable[i].date.split('T')[0]
            let curYear = curDate.split('-')[0]
            let curMonth = curDate.split('-')[1]
            let curDay = curDate.split('-')[2]
            if(cellYear == curYear && (cellMonth == (curMonth-1)) && cellDay == curDay){
                let payload = {
                    type: 'warning',
                    content:ptoTable[i].name,
                }
                listData.push(payload)
            }
        }
        return listData || [];
    }

    //rendering cells of PTO calendar
    const cellRender = (current, info) =>{
        window.test = current;
        const listData = loadListData(current);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
          );
    }

    //holds screen in "loading" until PTO entries have loaded
    if(isLoading){
        return(
            <span>loading</span>
        );
    }
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#6ce3c6',
                    colorTextLightSolid: '#000000',
                    colorBorder: '#242437',
                    colorPrimaryHover: '#6ce3c6'
                },
            }}>

            <div>
                <div id='LandingTitleCard'>
                    <h1 id='LandingTitle'>Support App HomePage</h1>
                </div>
                <div id='LandingHeader' />
                    <div id='LandingLeads'>
                        <div id='LandingLeadTitle'>Supervisor and Lead Information</div>
                        <div id='LandingLeadInfoBox'>
                            <div id='LandingFe'>
                                FE Supervisor: Nick Walker
                                <div id='LandingInfoSub'>
                                    <div id='LandingSwat'>
                                        SWAT<br />
                                        FED Lead: Hunter Collins<br />
                                        FEN Lead: David Alexander
                                    </div>
                             
                                    <div id='LandingDos'>
                                        DOS <br />
                                        FED Lead: JJ Tatton <br />
                                        FEN Lead: Jalen Lowry
                                    </div>
                                </div>
                            </div>
                            <div id='LandingBe'>
                                BE Supervisor: Brendan Carrigan
                                <div id='LandingInfoSub'>
                                    <div id='LandingSwat'>
                                        SWAT<br />
                                        BED Lead: Nicholas Johnson<br />
                                        BEN Lead: Shelby Abbott
                                    </div>

                                    <div id='LandingDos'>
                                        DOS <br />
                                        BED Lead: James Stallkamp <br />
                                        BEN Lead: John Portis
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <div id='LandingSpacer' />
                <div id='LandingBody'>
                    <div id='LandingCalendar'>
                        <div id='LandingCalendarTitle'> PTO Calendar</div>
                        <div id='LandingRequest'>
                            <Button onClick={() => request()}>PTO Request</Button>
                        </div>
                        <Calendar cellRender={cellRender}/>
                    </div>
                    <div id='LandingLinksBox'>
                        <div id='LandingLinksTitle'>Helpful Links</div>
                        <div id='LandingLinks'>
                            <Button type="link" size="Large" href="https://lamresearch.sharepoint.com/sites/WetOpsMfgTeam-SWATInternalComms/SitePages/S.W.A.T.-Home-Page.aspx?xsdata=MDV8MDF8fDQxZDE1YTM3NTZmZjQ2NTBkYWQzMDhkYjhmZGZiZDA1fDkxODA3OWRiYzkwMjRlMjliMjJjOTc2NDQxMGQwMzc1fDB8MHw2MzgyNjE5NjMzMTQ4MTM2NTF8VW5rbm93bnxWR1ZoYlhOVFpXTjFjbWwwZVZObGNuWnBZMlY4ZXlKV0lqb2lNQzR3TGpBd01EQWlMQ0pRSWpvaVYybHVNeklpTENKQlRpSTZJazkwYUdWeUlpd2lWMVFpT2pFeGZRPT18MXxMMk5vWVhSekx6RTVPakV6TVRFM01XSmtMV0ZrWmpBdE5ESmhZaTA1TkdObUxXUmtPRGN3WldNNU5EZ3paRjg1TVRWaU1UTTVNUzAzWkRoa0xUUmxNV010T0RjMll5MDJNbUkyTVdJd1lqazBaRGxBZFc1eExtZGliQzV6Y0dGalpYTXZiV1Z6YzJGblpYTXZNVFk1TURVNU9UVXpNRGMwTnc9PXw2MzM5NWUzMjRmMGE0NzkxNzg4YzA4ZGI4ZmRmYmQwM3xkMjQ0ZDJjMWYwMDI0ODRiOGJiY2E5YjkzMWZiOGRjYg%3D%3D&sdata=ek92bVRCdnRiYzJ3NjR1bjkxY3h3c21QZEo5QXpLRGxUYlFaRTRpZmROaz0%3D&ovuser=918079db-c902-4e29-b22c-9764410d0375%2CJordan.Oster%40lamresearch.com&OR=Teams-HL&CT=1690599544079&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiIyNy8yMzA3MDMwNzMzMCIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ%3D%3D" target="_blank">SWAT SharePoint</Button>
                            <Button type="link" size="Large" href="https://lamresearch.sharepoint.com/sites/DMO/DOSupport/SitePages/Home.aspx?RootFolder=%2Fsites%2FDMO%2FDOSupport%2FDry%20Operations%20Support%20Library%2FCalibration%20Program&FolderCTID=0x0120006C8A25AE9D2CB04AAD8754DAA86291AB&View=%7BC96FDBD5-BF14-497B-ABE0-5282532C53DB%7D" target="_blank">DOS SharePoint</Button>
                            <Button type="link" size="Large" href="https://lamresearch.sharepoint.com/sites/SIP-eDMSTeam" target="_blank">eDMS</Button>
                        </div>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};
  
export default LandingPage;