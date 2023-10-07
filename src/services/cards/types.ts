export type UpdateCardArgs = {
  id?: string
  question: string
  answer: string
  questionImg?: File
  answerImg?: File
  questionVideo?: string
  answerVideo?: string
}

export type DeleteCardArg = {
  id: string
}
