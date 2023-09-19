import { PaginatedEntity, PaginatedRequest } from '@/services/types'

export type GetDecksArgs = {
  minCardsCount?: string
  maxCardsCount?: string
  name?: string
  authorId?: Author['id']
  orderBy?: string
} & PaginatedRequest

export type CreateDeckArgs = {
  name: string
}

export interface Author {
  id: string
  name: string
}

export interface Deck {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover?: string | null
  rating: number
  isDeleted?: boolean | null
  isBlocked?: boolean | null
  created: string
  updated: string
  cardsCount: number
  author: Author
}

export type Card = {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  answerImg: string
  questionImg: string
  questionVideo: string
  answerVideo: string
  rating: number
  created: string
  updated: string
}

export type DecksResponse = {
  maxCardsCount: number
} & PaginatedEntity<Deck>

export type DecksCardsByIdResponse = PaginatedEntity<Card>
