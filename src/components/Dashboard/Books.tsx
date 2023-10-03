'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { getAllBooks } from './utils'

function Books() {
    const [books, setBooks] = useState<book[]>([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        getAllBooks().then((res) => {
            setBooks(res)
        }).finally(() => {
            setLoading(false)
        })
        return () => {

        }
    }, [])

    return (
        <Fragment>
            {loading &&
                <div className="row justify-content-center align-items-center vh-100">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
                {books.length > 0 && books.map((book, index) => {
                    return (
                        <div className="col my-3" key={index}>
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h3>{book.bookname}</h3>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <a href={`/dashboard/book/${book.id}`}
                                                className="btn btn-sm btn-outline-secondary">
                                                View
                                            </a>
                                            {/* <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button> */}
                                        </div>
                                        {/* <small className="text-muted">9 mins</small> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )
}

export default Books