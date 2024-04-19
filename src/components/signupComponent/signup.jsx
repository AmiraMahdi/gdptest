import React from 'react'
import { useState } from 'react';
import formImg from "../assets/images/signup.jpg";
import logo from "../assets/images/logo.png";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosClient from '../../axiosClient';


export const Signup = () => {
	const [user, setUser] = useState(null); // Define user state variable

	const formik = useFormik({
		// valeurs initiales du formulaire
		initialValues: {
			email: '',
			pwd: '',
			confirmPwd: '',
			terms: false
		},


		onSubmit: (values) => {
			console.log('Form data', values);

			axiosClient.post('/register', values)
				.then(response => {
					// Update user state variable with the newly registered user data
					console.log('Response:', response.data);
					setUser(response.data);
				})
				.catch(error => {
					console.error('Error:', error);
					// Handle error if needed
				});

		},

		// modele des validations
		validationSchema: Yup.object({

			email: Yup.string().email('Invalid email address').required('email address is required'),
			pwd: Yup.string().required('password is required').matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/,
				'Password must contain at least one uppercase letter, one lowercase letter, and one digit, and be at least 5 characters long'
			),
			confirmPwd: Yup.string().oneOf([Yup.ref('pwd'), ''], 'Passwords must match').required('confirm password is required'),
			terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions')
		})
	})


	return (
		<div>
			<div className="bg-body-secondary mb-2 container text-center">

				<div className=" row mt-5  mb-4 justify-content-center align-items-center">
					<div className="col-md-6">
						<h1 className="text-primary mb-3 mt-4 text-center">Signup</h1>

						<img src={formImg} alt='' className="img-fluid mt-5" />
					</div>
					<div className="col-md-6">
						<form className="p-4" onSubmit={formik.handleSubmit}>
							<div className='row'>
								<h1 className="col-9 h3 mb-3 mt-4 mb-4 fw-normal">Welcome to GDP</h1>
								<img className="img-fluid col-3 mb-2" src={logo} alt='' width="72" height="57" />
							</div>

							<h1 className="h3 mb-3 fw-normal text-center">Please create your account here:</h1>


							<div className="form-floating">
								<input type="email" className="form-control" id="floatingInput3" placeholder="name@example.com"
									name="email" value={formik.values.email} onChange={formik.handleChange}
									onBlur={formik.handleBlur} />
								<label htmlFor="floatingInput3">Email address</label>
								<div className='text-danger'>
									{formik.errors.email && formik.touched.email && formik.errors.email}


								</div>
							</div>
							<div className="form-floating">
								<input type="password" className="form-control" id="floatingPassword4" placeholder="Password"
									name="pwd" value={formik.values.pwd} onChange={formik.handleChange}
									onBlur={formik.handleBlur} />
								<label htmlFor="floatingPassword4">Password</label>
								<div className='text-danger'>
									{formik.errors.pwd && formik.touched.pwd && formik.errors.pwd}

								</div>
							</div>
							<div className="form-floating">
								<input type="password" className="form-control" id="floatingPassword5" placeholder="ConfirmPassword"
									name="confirmPwd" value={formik.values.confirmPwd} onChange={formik.handleChange}
									onBlur={formik.handleBlur} />
								<label htmlFor="floatingPassword5">ConfirmPassword</label>
								<div className='text-danger'>
									{formik.errors.confirmPwd && formik.touched.confirmPwd && formik.errors.confirmPwd}

								</div>
							</div>


							<div className="form-check text-start my-3">
								<input className="form-check-input"
									type="checkbox"
									id="flexCheckDefault"
									name="terms" value={formik.values.terms} onChange={formik.handleChange}
									onBlur={formik.handleBlur} />
								<label className="form-check-label" htmlFor="flexCheckDefault">
									I agree to terms and conditions...
								</label>
								<div className='text-danger'>
									{formik.errors.terms && formik.touched.terms && formik.errors.terms}

								</div>
							</div>
							<button className="btn btn-primary w-100 py-2" type="submit" >Signup</button>
						</form>

					</div>
				</div>

			</div>
		</div>
	);
};

