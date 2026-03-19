import type { ParsedContent } from '@nuxt/content'
import type { Avatar, Badge, Link } from '#ui/types'

export interface ContentImage {
  src: string
  alt?: string
}

export interface EditorialAuthor {
  name: string
  avatar: Avatar
  to?: string
}

export interface ArticlePost extends ParsedContent {
  title: string
  description: string
  date: string
  image?: ContentImage
  badge?: Badge
  authors?: (EditorialAuthor & Link)[]
}

export interface RankingTool {
  name: string
  slug: string
  vendor: string
  url: string
  verdict: string
  bestFor: string
  priceSummary: string
  swissFit: string
}

export interface RankingPage extends ParsedContent {
  title: string
  description: string
  category: string
  summary: string
  methodologyNote: string
  disclosureText: string
  topPick: RankingTool
  runnerUps: RankingTool[]
  evaluationCriteria: string[]
}

export interface ReviewPage extends ParsedContent {
  tool_name: string
  vendor: string
  category: string
  pricing_summary: string
  best_for: string
  pros: string[]
  cons: string[]
  features: string[]
  swiss_fit: string
  last_reviewed: string
  affiliate_url: string
  disclosure_text: string
}

export interface MethodologyPage extends ParsedContent {
  title: string
  description: string
  lastUpdated?: string
  disclosureSummary?: string
  criteria?: string[]
}

export interface LegalPage extends ParsedContent {
  title: string
  description: string
}
