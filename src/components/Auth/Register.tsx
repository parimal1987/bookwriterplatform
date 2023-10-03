'use client'
import React, { Fragment, useState } from 'react'
import { RegisterInputs } from './types'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Axios from '@/utils/Axios';

function Register() {

    const schema = yup
        .object({
            email: yup.string().required(),
            name: yup.string().required(),
            password: yup.string().required(),
            repeat_password: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Required field'),
        })
        .required()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterInputs>({
        resolver: yupResolver(schema),
    })

    const router = useRouter()
    const [hasError, setHasError] = useState(false)
    const [resError, setResError] = useState('')

    const onRegister = async (data: RegisterInputs) => {
        try {
            Axios.post(`register`, {
                name: data.name,
                email: data.email,
                password: data.password
            }).then(() => {
                router.push('/')
            }).catch((error) => {
                setHasError(true)
                setResError(error.response.data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center align-items-center vh-100">
                    <div className="col-md-4 col-sm-12">
                        <form onSubmit={handleSubmit(onRegister)}>
                            <div className="text-center mb-3">
                                <p>Sign up</p>
                            </div>
                            {hasError && <div className="alert alert-danger" role="alert">
                                {resError}
                            </div>}
                            {/* Name input */}
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="registerName">Name*</label>
                                <input type="text" id="registerName" className={`form-control ${errors.name && 'is-invalid'}`} {...register('name')} />
                            </div>
                            {/* Email input */}
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="registerEmail">Email*</label>
                                <input type="email" id="registerEmail" className={`form-control ${errors.email && 'is-invalid'}`} {...register('email')} />
                            </div>
                            {/* Password input */}
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="registerPassword">Password*</label>
                                <input type="password" id="registerPassword" className={`form-control ${errors.password && 'is-invalid'}`} {...register('password')} />
                            </div>
                            {/* Repeat Password input */}
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="registerRepeatPassword">Repeat password*</label>
                                <input type="password" id="registerRepeatPassword" className={`form-control ${errors.repeat_password && 'is-invalid'}`} {...register('repeat_password')} />
                                {errors.repeat_password && <div className="invalid-feedback">
                                    {errors.repeat_password?.message}
                                </div>}
                            </div>
                            {/* Checkbox */}
                            <div className="form-check d-flex justify-content-center mb-4">
                                <input className="form-check-input me-2" type="checkbox" id="registerCheck" defaultChecked aria-describedby="registerCheckHelpText" />
                                <label className="form-check-label" htmlFor="registerCheck">
                                    I have read and agree to the terms
                                </label>
                            </div>
                            {/* Submit button */}
                            <button type="submit" className="btn btn-primary btn-block mb-3">Sign up</button>
                            <div className="text-center">
                                <p>Already a member? <a href="/">Login</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Register