import React, { Fragment, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { deleteBookSection } from './utils'
import AddSectionModal from './AddSectionModal'
import Axios from '@/utils/Axios';

interface Props {
    sections: sectionsType[]
    reloadData?: () => void
}

function Sections({ sections, reloadData }: Props) {
    const [addModalShow, setAddModalShow] = useState(false)
    const [subSectionObj, setSubSectionObj] = useState<reqsectionsType>()
    const handleAddModalClose = () => {
        setAddModalShow(false)
        if (reloadData) {
            reloadData()
        }
    }

    const handleAddSection = (id?: string, depth?: number) => {
        if (id && depth) {
            setSubSectionObj({
                depth: depth,
                sectionId: parseInt(id),
                title: '',
                bookId: '',
            })
        }
        setAddModalShow(true)
    }

    const handleDeleteSection = (id: string) => {
        deleteBookSection(id)
        if (reloadData) {
            reloadData()
        }
    }

    return (
        <Fragment>
            <div className="btn-toolbar justify-content-end" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group py-2 " role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary" onClick={() => handleAddSection()}>Add New</button>
                </div>
            </div>
            {(sections && sections.length > 0) ?
                <Accordion className='bg-dark' defaultActiveKey="1_0">
                    {sections.map((item, index) => (
                        <SectionItem
                            {...item}
                            key={`${item.id}_${index}`}
                            handleAddSection={handleAddSection}
                            handleDeleteSection={handleDeleteSection}
                        />
                    ))}
                </Accordion>
                :
                <div className="alert alert-info" role="alert">
                    This Books as No Section.
                    For Add New Section <button className='btn btn-link p-0 m-0' onClick={() => handleAddSection()}>Click here.</button>
                </div>
            }
            <AddSectionModal
                show={addModalShow}
                handleClose={handleAddModalClose}
                subSectionObj={subSectionObj} />
        </Fragment>
    )
}

interface sectionItem extends sectionsType {
    handleAddSection: (id?: string, depth?: number) => void
    handleDeleteSection: (id: string) => void
}

const SectionItem = (item: sectionItem) => {
    const { id, title, handleAddSection, handleDeleteSection, depth } = item
    const [subsections, setSubsections] = useState<sectionsType[]>([])
    const handleEnter = () => {
        Axios.get(`sections/?sectionId=${id}&depth=${depth + 1}`).then((res) => {
            setSubsections(res.data)
        }).catch((e) => {
            console.log('error', e)
        })
    }
    const handleExited = () => {
        setSubsections([])
    }
    return (
        <Accordion.Item eventKey={`${id}`}>
            <Accordion.Button>{title}</Accordion.Button>
            <Accordion.Body onEnter={handleEnter} onExited={handleExited}>
                <div className="btn-toolbar justify-content-end" role="toolbar" aria-label="Toolbar with button groups">
                    <div className="btn-group py-2 " role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-primary" onClick={() => handleAddSection(id, depth + 1)}>Add New</button>
                        <button type="button" className="btn btn-danger" onClick={() => handleDeleteSection(id)}>Delete</button>
                    </div>
                </div>
                {(subsections && subsections.length > 0) ?
                    <Accordion defaultActiveKey="1_0">
                        {subsections.map((subitem, index) => (
                            <SectionItem
                                {...subitem}
                                key={`${id}_${subitem.id}_${index}`}
                                handleAddSection={handleAddSection}
                                handleDeleteSection={handleDeleteSection}
                            />
                        ))}
                    </Accordion>
                    :
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere repudiandae possimus beatae optio ducimus esse perferendis perspiciatis magni quae itaque, natus deserunt reprehenderit dicta, exercitationem nobis, illum quidem eligendi! Libero!
                    </p>
                }
            </Accordion.Body>
        </Accordion.Item>
    )
}
export default Sections