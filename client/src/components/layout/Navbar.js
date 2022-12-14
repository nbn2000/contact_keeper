import React, {Fragment, useContext} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/Auth/authContext'
import ContactContext from '../../context/contact/contactContext'

const Navbar = ({title, icon}) => {
	const authContext = useContext(AuthContext)
	const contactContext = useContext(ContactContext)

	const {isAuthenticated, logout, user} = authContext
	const {clearContacts} = contactContext

	const onLogout = () => {
		logout()
		clearContacts()
	}

	const authLinks = (
		<Fragment>
			<li>Salom {user && user.name}</li>
			<li>
				<a onClick={onLogout} href='#!'>
					<i className='fas fa-sign-out-alt'></i>
					<span className='hide-sm'>Chiqish</span>
				</a>
			</li>
		</Fragment>
	)

	const guestLinks = (
		<Fragment>
			<li>
					<Link to='/about'>Haqida</Link>
				</li>
				<li>
					<Link to='/register'>Ro`yhatdan O`tish</Link>
				</li>
				<li>
					<Link to='/login'>Kirish</Link>
				</li>
		</Fragment>
	)

	return (
		<div className='navbar bg-primary'>
			<h1>
				<i className={icon}/> {title}
			</h1>
			<ul>
				{isAuthenticated ? authLinks : guestLinks}
			</ul>
		</div>
	)
}

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string
}

Navbar.defaultProps = {
	title: 'Contact Keeper',
	icon: 'fas fa-id-card-alt'
}

export default Navbar
