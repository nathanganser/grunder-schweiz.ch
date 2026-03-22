import { defineCollection, z } from '@nuxt/content'

const toolSchema = z.object({
  name: z.string().nonempty(),
  slug: z.string().nonempty(),
  vendor: z.string().nonempty(),
  url: z.string().nonempty(),
  verdict: z.string().nonempty(),
  bestFor: z.string().nonempty(),
  priceSummary: z.string().nonempty(),
  swissFit: z.string().nonempty()
})

const categorySchema = z.object({
  slug: z.string().nonempty(),
  title: z.string().nonempty(),
  intro: z.string().nonempty(),
  audience: z.string().nonempty(),
  primaryCta: z.string().nonempty(),
  icon: z.string().nonempty().editor({ input: 'icon' })
})

const authorSchema = z.object({
  name: z.string().nonempty(),
  to: z.string().nonempty(),
  avatar: z.object({
    src: z.string().nonempty().editor({ input: 'media' })
  })
})

export const collections = {
  blog: defineCollection({
    source: '3.blog.yml',
    type: 'page'
  }),
  articles: defineCollection({
    source: '3.blog/**/*',
    type: 'page',
    schema: z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
      image: z.object({
        src: z.string().nonempty().editor({ input: 'media' })
      }),
      authors: z.array(authorSchema),
      date: z.string(),
      badge: z.object({
        label: z.string().nonempty()
      })
    })
  }),
  rankings: defineCollection({
    source: '5.bestenlisten/**/*',
    type: 'page',
    schema: z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
      category: z.string().nonempty(),
      summary: z.string().nonempty(),
      methodologyNote: z.string().nonempty(),
      disclosureText: z.string().nonempty(),
      topPick: toolSchema,
      runnerUps: z.array(toolSchema),
      evaluationCriteria: z.array(z.string().nonempty())
    })
  }),
  reviews: defineCollection({
    source: '6.reviews/**/*',
    type: 'page',
    schema: z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
      tool_name: z.string().nonempty(),
      vendor: z.string().nonempty(),
      category: z.string().nonempty(),
      pricing_summary: z.string().nonempty(),
      best_for: z.string().nonempty(),
      swiss_fit: z.string().nonempty(),
      last_reviewed: z.string(),
      affiliate_url: z.string().nonempty(),
      disclosure_text: z.string().nonempty(),
      pros: z.array(z.string().nonempty()),
      cons: z.array(z.string().nonempty()),
      features: z.array(z.string().nonempty()),
      decision_questions: z.array(z.object({
        question: z.string(),
        yes_answer: z.string(),
        no_answer: z.string()
      })).optional(),
      scores: z.object({
        overall: z.number().min(1).max(10),
        swiss_fit: z.number().min(1).max(10),
        value: z.number().min(1).max(10),
        usability: z.number().min(1).max(10)
      }).optional()
    })
  }),
  methodology: defineCollection({
    source: '8.methodik.md',
    type: 'page',
    schema: z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
      lastUpdated: z.string(),
      disclosureSummary: z.string().nonempty(),
      criteria: z.array(z.string().nonempty()),
      sources: z.array(z.object({
        label: z.string().nonempty(),
        to: z.string().nonempty()
      }))
    })
  }),
  legal: defineCollection({
    source: '7.legal/**/*',
    type: 'page',
    schema: z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty()
    })
  }),
  categories: defineCollection({
    source: '9.kategorien.yml',
    type: 'page',
    schema: z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
      items: z.array(categorySchema)
    })
  }),
  comparisons: defineCollection({
    source: '10.vergleiche/**/*',
    type: 'page',
    schema: z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
      compared_tools: z.array(z.string().nonempty()),
      winner_by_use_case: z.array(z.object({
        useCase: z.string().nonempty(),
        winner: z.string().nonempty(),
        reason: z.string().nonempty()
      }))
    })
  })
}
