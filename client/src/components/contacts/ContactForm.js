import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactForm = () => {
	const contactContext = useContext(ContactContext)

	const {addContact, updateContact, clearCurrent, current} = contactContext

	useEffect(() => {
		if(current !== null){
			setContact(current)
		}else {
		setContact({
		name: '',
		email: '',
		phone: '',
		type: 'personal'
		})
	}
	}, [contactContext, current])

	const [contact, setContact] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'personal'
	})

	const {name, email, phone, type} = contact
	const onChange = e => setContact({...contact, [e.target.name]: e.target.value})

	const onSubmit = e => {
		e.preventDefault()
		if(current === null){
			addContact(contact)
		}else{
			updateContact(contact)
		}
		clearAll()
	}

	const clearAll = () => {
		clearCurrent()
	}
	return (
		<form onSubmit={onSubmit}>
			<h2 className='text-primary'>{current ? 'Contact Tahrirlash' : 'Contact Saqlash'}</h2>
			<input type='text' placeholder='Isim' name='name' value={name} onChange={onChange}/>
			<input type='text' placeholder='Pochta' name='email' value={email} onChange={onChange}/>
			<input type='text' placeholder='Raqam' name='phone' value={phone} onChange={onChange}/>
			<h5>Contact Turi</h5>
			<input type='radio' name='type' value='hususiy' checked={type === 'hususiy'} onChange={onChange}/>{' '}Hususiy{' '}
			<input type='radio' name='type' value='ishgaaloqador' checked={type === 'ishgaaloqador'} onChange={onChange}/>Ishga Aloqador
			<div>
				<input type='submit' value={current ? 'Contact Yangilash' : 'Contact Qo`shish'} className='btn btn-primary btn-block'/>
			</div>
			{current && 
				<div>
					<button className='btn btn-light btn-block' onClick={clearAll}>Tozalash</button>
				</div>
			}
		</form>
	)
}

export default ContactForm