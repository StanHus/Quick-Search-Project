interface IResultEntry {
  '@uri': string
  authorweb: string
  onsaledate: string
  titleAuth: string
  titleSubtitleAuth: string
  titles: { isbn: any }
  titleshort: string
  titleweb: string
  workid: string
}
const transformAuthor = (author: string) => {
  return author
    .toLowerCase()
    .split(' ')
    .map((word) =>
      word[0] !== undefined
        ? (word = word[0].toUpperCase() + word.slice(1))
        : word
    )
    .join(' ')
}

const shorten = (text: string) => {
  return text.split(' ').length > 12
    ? text.split(' ').slice(0, 12).join(' ') + '...'
    : text
}

export type { IResultEntry }
export { shorten, transformAuthor }
