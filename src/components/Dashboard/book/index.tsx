'use client'
import { useParams } from 'next/navigation'
import React, { Fragment, useEffect, useState } from 'react'
import { getBookDetails, getBookSection } from './utils'
import Sections from './sections'

function Book() {
    const params = useParams()
    const [details, setDetails] = useState<book>()
    const [loading, setLoading] = useState(false)
    const [bookSections, setBookSections] = useState<sectionsType[]>([])
    useEffect(() => {
        setLoading(true)
        loadData()
        return () => {

        }
    }, [params.id])

    const loadData = () => {
        if (params && params.id) {
            getBookDetails(params.id).then((res) => {
                setDetails(res)
                setLoading(false)
                getBookSection(params.id).then((res) => {
                    setBookSections(res)
                })
            })
        }
    }

    return (
        <Fragment>
            {details && <Fragment>
                <h2 className='text-capitalize'>{details.bookname}</h2>
                <p>{details.description}</p>
                <Sections sections={bookSections} reloadData={loadData} />
            </Fragment>}
        </Fragment>
    )
}

export default Book