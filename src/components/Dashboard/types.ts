interface sectionsType {
    id: string,
    bookId: string,
    title: string,
    depth: number
}

interface reqsectionsType {
    bookId: string,
    title: string,
    depth: number
    sectionId: number
}

type book = {
    id: number
    userid: number,
    bookname: string,
    description: string
    sections: sectionsType[]
}