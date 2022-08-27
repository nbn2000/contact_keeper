import React, {useState, useContext, useEffect} from 'react'
import AuthContext from '../../context/Auth/authContext'
import AlertContext from '../../context/Alert/alertContext'

const Login = (props) => {
	const alertContext = useContext(AlertContext)
	const authContext = useContext(AuthContext)

	const {setAlert} = alertContext

	const {login, error, clearErrors, isAuthenticated} = authContext

	useEffect(() => {
		if(isAuthenticated) {
			props.history.push('/')
		}

		if(error === 'Cridentsiyal Hatolik') {
			setAlert(error, 'danger')
			clearErrors()
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history])


	const [user, setUser] = useState ({
		email: '',
		password: ''
	})

	const {email, password} = user

	const onChange = e => setUser({...user, [e.target.name]: e.target.value})

	const onSubmit = e => {
		e.preventDefault()
		if(email === '' || password === '') {
			setAlert('Iltimos hamma bosh joylarni to`lg`izing!', 'danger')
		}else{
			login({
			email,
			password
			})
		}
	}
	return (
		<div className='form-container'>
			<h1>
				Akautga <span className='text-primary'>Kirish</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='email'>Pochta Adresi</label>
					<input type='email' name='email' value={email} onChange={onChange}/>
				</div>

				<div className='form-group'>
					<label htmlFor='password'>Parol</label>
					<input type='password' name='password' value={password} onChange={onChange}/>
				</div>
				<input type='submit' value='Kirish' className='btn btn-primary btn-block'/>
			</form>
			
		</div>
	)
}

export default Login