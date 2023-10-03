'use client'
import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { LoginInputs } from './types'
import { useRouter } from 'next/navigation';
import Axios from '@/utils/Axios';
import { setLoginCookies } from './utils';

function Login() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputs>()
    const router = useRouter()

    const onsubmit = async (data: LoginInputs) => {
        const res = await Axios.post(`login`, {
            ...data
        })
        if (res.status == 200) {
            setLoginCookies(res.data)
            router.push('/dashboard')
        }
    }

    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center align-items-center vh-100">
                    <div className="col-md-4 col-sm-12">
                        <form onSubmit={handleSubmit(onsubmit)}>
                            <div className="text-center mb-3">
                                <p>Sign in</p>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="loginName">Email or username</label>
                                <input type="email" id="loginName" className="form-control" {...register("email")} />
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="loginPassword">Password</label>
                                <input type="password" id="loginPassword" className="form-control" {...register("password")} />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
                            <div className="text-center">
                                <p>Not a member? <a href="/register">Register</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Login