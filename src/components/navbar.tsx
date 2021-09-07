import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { logout } from '../auth';
import { useHistory } from 'react-router';


export const NavBar = () => {
    const history = useHistory();
    const handleLogout = (event: any) => {
        logout();
        history.push('/login');
    }

    return (
        <nav className='navbar navbar-dark bg-dark navbar-expand-lg px-4 py-2'>
            <Link to='/' className='navbar-brand' href='#'>DDM</Link>
            <div className='collapse navbar-collapse d-flex justify-content-md-end'>
                <ul className='navbar-nav mr-auto'>
                    <li className='nav-item active mx=2'>
                        <Link to='/' className='nav-link'>Home</Link>
                    </li>
                    <li className='nav-item '>
                        <Button className='btn btn-secondary mx-2' onClick={(e) => handleLogout(e)}> Logout</Button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}