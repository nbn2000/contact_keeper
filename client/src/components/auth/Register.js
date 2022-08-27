import React, {useState, useContext, useEffect} from 'react'
import AlertContext from '../../context/Alert/alertContext'
import AuthContext from '../../context/Auth/authContext'


const Register = (props) => {
	const alertContext = useContext(AlertContext)
	const authContext = useContext(AuthContext)

	const {setAlert} = alertContext

	const {register, error, clearErrors, isAuthenticated} = authContext

	useEffect(() => {
		if(isAuthenticated) {
			props.history.push('/')
		}

		if(error === 'Bu ishlatuvchi mavjud') {
			setAlert(error, 'danger')
			clearErrors()
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history])

	const [user, setUser] = useState ({
		name: '',
		email: '',
		password: '',
		password2: ''
	})

	const {name, email, password, password2} = user

	const onChange = e => setUser({...user, [e.target.name]: e.target.value})

	const onSubmit = e => {
		e.preventDefault()
		if(name === '' || email === '' || password === ''){
			setAlert('Iltimos hamma bo`sh joylarni to`ldiring', 'danger')
		}else if(password !== password2){
			setAlert('Parol mos kelmadi', 'danger')
		}else {
			register ({
				name,
				email,
				password
			})
		}
	}
	return (
		<div className='form-container'>
			<h1>
				Akautga <span className='text-primary'>Ro`yhatdan O`tish</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='name'>Isim</label>
					<input type='text' name='name' value={name} onChange={onChange}/>
				</div>

				<div className='form-group'>
					<label htmlFor='email'>Pochta adressi</label>
					<input type='email' name='email' value={email} onChange={onChange}/>
				</div>

				<div className='form-group'>
					<label htmlFor='password'>Parol</label>
					<input type='password' name='password' value={password} onChange={onChange} minLength='6'/>
				</div>

				<div className='form-group'>
					<label htmlFor='password2'>Parolni Tasdiqlash</label>
					<input type='password' name='password2' value={password2} onChange={onChange} minLength='6'/>
				</div>
				<input type='submit' value='Register' className='btn btn-primary btn-block'/>
			</form>
			
		</div>
	)
}

export default Register