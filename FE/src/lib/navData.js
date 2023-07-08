import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
 
export const navData = [
    {
        id: 0,
        icon: <HomeIcon/>,
        text: "Home",
        link: "/"
    },
    {
        id: 1,
        icon: <TravelExploreIcon/>,
        text: "Ticket  Dashboard",
        link: "TicketDashboard"
    },
    {
        id: 2,
        icon: <BarChartIcon/>,
        text: "Material Ordering",
        link: "MaterialOrderingPage"
    },
    {
        id: 3,
        icon: <BarChartIcon/>,
        text: "Material List Page",
        link: "MaterialListPage"
    },
    {
        id: 4,
        icon: <SettingsIcon/>,
        text: "Map",
        link: "Map"
    },
    {
        id: 5,
        icon: <SettingsIcon/>,
        text: "Cal Tool Movement Log",
        link: "ScanTool"
    },
    {
        id: 6,
        icon: <SettingsIcon/>,
        text: "Cal Tool Info",
        link: "ToolHistory"
    },
    {
        id: 7,
        icon: <SettingsIcon/>,
        text: "Tool Requests",
        link: "toolRequest"
    }
]