export type UpdateCardArgs = {
  id?: string
  question: string
  answer: string
  questionImg?: string
  answerImg?: string
  questionVideo?: string
  answerVideo?: string
}

export type DeleteCardArg = {
  id: string
}
