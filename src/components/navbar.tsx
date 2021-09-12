import Button from 'react-bootstrap/Button';
import { logout } from '../auth';
import { getUserRole } from '../services/RoleStorage';
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router';


export const NavBar = () => {
    const history = useHistory();
    const userRole = getUserRole();
    const handleLogout = (event: any) => {
        logout();
        history.push('/login');
    }

    return (
        <nav className='navbar navbar-dark bg-dark navbar-expand-lg px-4 py-2'>
            <NavLink to='/' className='navbar-brand'>DDM</NavLink>
            <div className='collapse navbar-collapse d-flex justify-content-md-end'>

                {userRole === 'Buyer' &&
                    <ul className='navbar-nav mr-auto'>

                    <li className='nav-item active mx=2'>
                        <NavLink to='/postrequest' className='nav-link'>Post Request</NavLink>
                    </li>

                    <li className='nav-item active mx=2'>
                        <NavLink exact to='/market' className='nav-link'>All Requests</NavLink>
                    </li>

                    <li className='nav-item active mx=2'>
                        <NavLink exact to='/invite' className='nav-link'>Send Invite</NavLink>
                    </li>

                    <li className='nav-item'>
                        <Button className='btn btn-secondary mx-2' onClick={(e) => handleLogout(e)}> Logout</Button>
                    </li>
                </ul>}

                {userRole === 'Seller' && <ul className='navbar-nav mr-auto'>

                    <li className='nav-item active mx=2'>
                        <NavLink exact to='/market' className='nav-link'>Market Place</NavLink>
                    </li>

                    <li className='nav-item active mx=2'>
                        <NavLink to='/invite' className='nav-link'>Send Invite</NavLink>
                    </li>
                    
                    <li className='nav-item'>
                        <Button className='btn btn-secondary mx-2' onClick={(e) => handleLogout(e)}> Logout</Button>
                    </li>

                </ul>}
            </div>
        </nav>
    )
}
