import { Card } from '@mui/material';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <div className="App">
            <Card sx={{ py: 5, px: 10 }}>
                <Outlet />
            </Card>
        </div>
    );
}

export default App;
