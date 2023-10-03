'use server'
import Axios from "@/utils/Axios"

export const getBookDetails = async (id: any) => {
    const res = await Axios.get(`books/${id}?_embed=sections`)
    return res.data
}

export const getBookSection = async (id: any) => {
    const res = await Axios.get(`sections/?bookId=${id}&depth=0&_embed=books`)
    return res.data
}

export const deleteBookSection = async (id: string) => {
    const res = await Axios.delete(`sections/${id}`)
    return res.data
}