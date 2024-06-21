import { useState, useEffect, useRef } from 'react';
import { Button, Input, Space, Table, DatePicker, Typpography, Popconfirm, message } from 'antd';
import { useNavigate, Link } from 'react-router';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

function StaggerPullListTable(hideArray) {
    const [items, setItems] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const navigate = useNavigate();
    const [stat, setStat] = useState('Inactive');
    const [hideList, setHideList] = useState(['PK','Status'])
    const [filtHead, setFiltHead] = useState([]);
    const [toolCounts,setToolCounts] = useState({});
    const [toolsCounted,setToolsCounted] = useState({});
    const [stagList, setStagList] = useState([]);
    const [sendDate, setSendDate] = useState();
    const [send, setSend] = useState();
    const [theDay, setTheDay] = useState(dayjs());

    //handling changes from the date picker
    const handleDate = (date, dateString) => {
        setTheDay(dateString)
    }
    //calulates and sets page level variable of send date
    useEffect(() => {
        //calculating send date
        let tempS = dayjs(theDay).add(42, 'day')
        //moving send date to the first wednesday after calculated date
        do {
            tempS = dayjs(tempS).add(1, 'day');
        }
        while (dayjs(tempS).day() !== 3)
        //setting page level variable
        setSend(tempS)
    },[theDay])

    //generates the staggering list for calibrated tools
    const GenList = () => {
        //setting up constants needed to make staggering list
        let list=[]
        const sent = ['SENT', 'STAHLWILLE/REPAIR', 'BCP/QUARANTINED'];
        const outList = [...sent, 'OUTGOING'];
        let soon = dayjs(theDay).add(7, 'day');
        let lowBound = dayjs(send).subtract(7, 'day')
        let highBound = dayjs(send).add(7, 'day')
        //console.log(lowBound)
        //console.log(highBound)

        //display date of items to be sent
        document.getElementById("23").innerHTML = "Date to be Sent: " + sendDate;

        // Sort data by Calibration Due
        items.sort((a, b) => a['CalibrationDue'] - b['CalibrationDue']);
        //populating the staggering list
        for (let i = 0; i < items.length; i++) {
            //grabbing all items that are past due and not sent out
            if (dayjs(items[i]['CalibrationDue']) <= dayjs(theDay) && !sent.includes(items[i]['CurLoc'])) {
                list.push(items[i])
            }
            //grabbing all items due in a week and not sent out
            else if (dayjs(theDay) < dayjs(items[i]['CalibrationDue']) && dayjs(items[i]['CalibrationDue']) <= dayjs(soon) && !sent.includes(items[i]['CurLoc'])) {
                list.push(items[i])
            }
            //grabbing all lost items
            else if (items[i]['CurLoc'] === 'LOST') {
                list.push(items[i])
            }
            //grabbing all items that are between 35-49 days from being due and not sent/staged up to the limit of tools needed per week
            else if (dayjs(lowBound) <= dayjs(items[i]['CalibrationDue']) && dayjs(items[i]['CalibrationDue']) <= dayjs(highBound) && !outList.includes(items[i]['CurLoc']) && toolsCounted[items[i]['Description']] < toolCounts[items[i]['Description']] ) {
                list.push(items[i])
                toolsCounted[items[i]['Description']] = toolsCounted[items[i]['Description']] + 1
            }
        }
        //sending list to page level variable
        setStagList(list)

    }
    //triggering re-render to make send date visible on page
    useEffect(() => setSendDate(dayjs(send).format('MM-DD-YYYY')), [send])

    //creates dictionary of all tools and dictionary of  tools populated in staggering list 
    const toolMap = () => {
        let tools = {}
        //parsing items data
        for (let i = 0; i < items.length; i++) {
            //checking for tools description existence in dictionary
            if (items[i]['Description'] in tools) {
                //adds one to the count of tool description if it exists
                tools[items[i]['Description']] = tools[items[i]['Description']] + 1
            }
            else {
                //adds tool to the dictionary if it doesn't exist
                tools[items[i]['Description']] = 1
            }
        }
        //parses through dictionary and divides up all values by 52 and rounds up to determine number of tools to be sent each week
        for (const [key, value] of Object.entries(tools)) {
            tools[key] = Math.ceil(value / 52);
        }
        //sets page leve variable to dictionary created
        setToolCounts(tools)
        //creates clone dictionary with zero values and sets to page level variable, used to count tools placed on staggering list
        setToolsCounted(Object.fromEntries(Object.entries(tools).map(([k, v]) => [k, 0])));

    }
    //the following code is cloned from Ant Design, so less comments will be utilized.  If more information is needed, please go to Ant Design Documentation

    //Sort method to sort numbers and strings without having to determine type in column
    const defaultSort = (a, b) => {
        if (a < b) return -1;
        if (b < a) return 1;
        return 0;
    };

    //handles search for column search in table
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    //handles reseting the colum search filter
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    //handles searching of the table columns
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

    //retreiving headers from DB
    const loadHeaders = async () => {
        //utilizing a post request to get info from the DB
        const tableName = { tName: 'caltoolstable' }
        const response = await fetch('/headers', {
            method: 'POST',
            body: JSON.stringify(tableName),
            headers: {
                'Content-Type': 'application/json'
            }

        }).then((response) => {
            if (response.ok) { //checking for errors
                response.json().then((responseData) => {
                    const headerArray = []; //putting response data into an array
                    for (let i = 0; i < responseData.length; i++) { //checking for headers that are on the list of hidden columnns
                        let payload = {};
                        if (hideList.includes(responseData[i].COLUMN_NAME)) {
                            payload = {
                                title: responseData[i].COLUMN_NAME,
                                dataIndex: responseData[i].COLUMN_NAME,
                                key: responseData[i].COLUMN_NAME,
                                hidden: true
                            }
                        }
                        else {
                            payload = { //applying search props to columns
                                title: responseData[i].COLUMN_NAME,
                                dataIndex: responseData[i].COLUMN_NAME,
                                key: responseData[i].COLUMN_NAME,
                                ...getColumnSearchProps(responseData[i].COLUMN_NAME),
                                sorter: {
                                    compare: (a, b) => defaultSort(a[responseData[i].COLUMN_NAME], b[responseData[i].COLUMN_NAME])
                                },
                                sortDirections: ['descend', 'ascend'],
                                //width: '30%',
                            }

                        }
                        headerArray.push(payload)


                    }
                    setHeaders(headerArray)
                })
            }
        });
    }
    useEffect(() => loadHeaders(), []); //forces header retrieval to run on page initialization

    //retreiving items from DB
    const loadItems = async () => {
        //utilizing a fetch request to retrieve data from DB
        const response = await fetch('/stagTools', {
            headers: {
                'Content-Type': 'application/json'
            }

        }).then((response) => {
            if (response.ok) {
                response.json().then((responseData) => {
                    for (let i = 0; i < responseData.length; i++) { //sets format of the date displayed
                        if (responseData[i].CalibrationDue !== null) {
                            let cleanDate = (responseData[i].CalibrationDue.split('T')[0])
                            responseData[i].CalibrationDue = cleanDate
                        }

                    }
                    setItems(responseData)
                })
            }
        });
    }
    useEffect(() => loadItems(), []); //forces item retrieval to run on page initialization
    useEffect(() => toolMap(), [items]) //forces dictionary creation whenever items from DB changes
    

    //changes visible columns when a choice is made
    const columnHide = (hideArray, headers) => {
        let localHideList = []
        for (let i = 0; i < hideArray.hideArray.length; i++) {
            localHideList.push(hideArray.hideArray[i])
        }
        let addHeader = []
        for (let i = 0; i < headers.length; i++) {
            let payload = {}
            if (localHideList.includes(headers[i].title)) {
                payload = {
                    title: headers[i].title,
                    dataIndex: headers[i].dataIndex,
                    key: headers[i].key,
                    hidden: true
                }
            } else {
                payload = {
                    title: headers[i].title,
                    dataIndex: headers[i].dataIndex,
                    key: headers[i].key,
                    hidden: false,
                    ...getColumnSearchProps(headers[i].title),
                    sorter: {
                        compare: (a, b) => defaultSort(a[headers[i].title], b[headers[i].title])
                    },
                    sortDirections: ['descend', 'ascend'],
                }
            }
            addHeader.push(payload)
        }
        setHeaders(addHeader)
    }
    useEffect(() => { //causes subcomponent to run when a new column hide choice is made
        columnHide(hideArray, headers)
    }, [hideArray])

    useEffect(() => { //applies the hidden attribute whenever headers changes
        let filt = []
        filt = (
            headers.filter(item => !item.hidden)
        )
        setFiltHead([...filt])
    }, [headers])

    return (
        <div>
            <div style={{ textAlign: "Center"} } >
                <h1>Pull Date</h1>
                <div style={{
                    display: "flex",
                    textAlign: "center",
                    paddingLeft:"500px",
                    paddingRight: "550px",
                    justifyContent: "Space-Evenly",
                    alignItems: "Center"
                } }>
                    <DatePicker 
                        value={dayjs(theDay)}
                        onChange={handleDate}
                        allowClear={false}
                    />

                    <h3 id="23">Date to be sent:</h3>

                    <Button onClick={() => GenList()}>
                        {"Generate List"}
                    </Button>
                </div>
            </div>

            <Table
                className='OpenTicketTable'
                columns={filtHead}
                dataSource={stagList}
                style={{
                    paddingTop: '10px'
                }}
                showSorterTooltip={false}
            />
        </div>


    );
}

export default StaggerPullListTable;