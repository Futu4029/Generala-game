import { React } from 'react';
import NavBar from './NavBar'
import { Link } from 'react-router-dom';

const Index = () => {
    return (
        <div className='container'>
            <NavBar/>
            <Link to={`/game-on`} style={{ textDecoration: 'none' }}>
                <h1 className='start-button'>PRESS HERE TO START</h1>
            </Link>
        </div>
    );
}

export default Index;