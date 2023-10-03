import Axios from '@/utils/Axios';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form'

interface ModalProps {
    show: boolean,
    subSectionObj: reqsectionsType | undefined
    handleClose: () => void
}

function AddSectionModal({
    show,
    handleClose,
    subSectionObj
}: ModalProps) {
    const params = useParams()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const [loading, setLoading] = useState(false)
    const onSubmit = (data: any) => {
        const id = params.id as string
        setLoading(true)
        Axios.post(`sections/`, {
            depth: 0,
            ...subSectionObj,
            ...data,
            bookId: parseInt(id)
        }).then(() => {
            setLoading(false)
            handleClose()
        })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <div className="bg-dark">
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add New Section
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="Title">Title</label>
                            <input type="text" id="Title" className="form-control" {...register("title")} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                        {loading ? 'Loading...' : 'Save Changes'}
                    </Button>
                </Modal.Footer>
            </div>
        </Modal>
    )
}

export default AddSectionModal