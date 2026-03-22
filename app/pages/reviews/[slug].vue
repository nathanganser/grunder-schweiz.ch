<script setup lang="ts">
const route = useRoute()

const { data: review } = await useAsyncData(route.path, () => queryCollection('reviews').path(route.path).first())
if (!review.value) {
  throw createError({ statusCode: 404, statusMessage: 'Review nicht gefunden', fatal: true })
}

const { data: allRankings } = await useAsyncData(`${route.path}-rankings`, () => queryCollection('rankings').all())
const { data: allArticles } = await useAsyncData(`${route.path}-articles`, () => queryCollection('articles').all())

const reviewSlug = computed(() => route.path.split('/').filter(Boolean).at(-1) || '')

const relatedRankings = computed(() => {
  return (allRankings.value || []).filter((ranking) => {
    const topPickMatch = ranking.topPick?.slug === reviewSlug.value
    const runnerUpMatch = ranking.runnerUps?.some(tool => tool.slug === reviewSlug.value)

    return topPickMatch || runnerUpMatch
  }).slice(0, 3)
})

const relatedArticles = computed(() => {
  return (allArticles.value || []).slice(0, 3)
})

const expandedQuestions = ref<Record<number, boolean>>({})

useSeoMeta({
  title: review.value.title,
  ogTitle: review.value.title,
  description: review.value.description,
  ogDescription: review.value.description
})
</script>

<template>
  <UContainer
    v-if="review"
    class="py-12"
  >
    <UPageHeader
      :title="review.title"
      :description="review.description"
    >
      <template #headline>
        <UBadge
          :label="review.category"
          color="neutral"
          variant="subtle"
        />
        <span class="text-muted">&middot;</span>
        <time class="text-muted">
          Zuletzt geprüft {{ new Date(review.last_reviewed).toLocaleDateString('de-CH', { year: 'numeric', month: 'short', day: 'numeric' }) }}
        </time>
      </template>
    </UPageHeader>

    <div class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div class="space-y-6">
        <div class="rounded-[1.75rem] border border-default bg-default/70 p-6">
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <p class="text-sm font-semibold text-highlighted">
                Anbieter
              </p>
              <p class="mt-2 text-sm text-muted">
                {{ review.vendor }}
              </p>
            </div>
            <div>
              <p class="text-sm font-semibold text-highlighted">
                Best für
              </p>
              <p class="mt-2 text-sm text-muted">
                {{ review.best_for }}
              </p>
            </div>
            <div>
              <p class="text-sm font-semibold text-highlighted">
                Preisbild
              </p>
              <p class="mt-2 text-sm text-muted">
                {{ review.pricing_summary }}
              </p>
            </div>
            <div>
              <p class="text-sm font-semibold text-highlighted">
                Schweizer Fit
              </p>
              <p class="mt-2 text-sm text-muted">
                {{ review.swiss_fit }}
              </p>
            </div>
          </div>
        </div>

        <div
          v-if="review.scores"
          class="rounded-[1.75rem] border border-default bg-default/70 p-6"
        >
          <h2 class="text-xl font-semibold text-highlighted">
            Bewertung
          </h2>
          <div class="mt-4 space-y-4">
            <div
              v-for="(score, key) in { 'Gesamt': Number(review.scores.overall), 'Schweizer Fit': Number(review.scores.swiss_fit), 'Preis-Leistung': Number(review.scores.value), 'Bedienbarkeit': Number(review.scores.usability) }"
              :key="key"
            >
              <div class="flex items-center justify-between text-sm">
                <span class="text-muted">{{ key }}</span>
                <span class="font-semibold text-highlighted">{{ score }}/10</span>
              </div>
              <div class="mt-1.5 h-2 w-full rounded-full border border-default bg-default">
                <div
                  class="h-full rounded-full transition-all duration-500"
                  :class="score >= 8 ? 'bg-green-500' : score >= 6 ? 'bg-primary' : 'bg-amber-500'"
                  :style="{ width: `${score * 10}%` }"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-[1.75rem] border border-default bg-default/70 p-6">
          <h2 class="text-xl font-semibold text-highlighted">
            Stärken
          </h2>
          <ul class="mt-4 space-y-3 text-sm leading-6 text-muted">
            <li
              v-for="item in review.pros"
              :key="item"
              class="flex gap-3"
            >
              <UIcon
                name="i-lucide-plus-circle"
                class="mt-1 size-4 text-primary"
              />
              <span>{{ item }}</span>
            </li>
          </ul>

          <h2 class="mt-8 text-xl font-semibold text-highlighted">
            Einschränkungen
          </h2>
          <ul class="mt-4 space-y-3 text-sm leading-6 text-muted">
            <li
              v-for="item in review.cons"
              :key="item"
              class="flex gap-3"
            >
              <UIcon
                name="i-lucide-minus-circle"
                class="mt-1 size-4 text-amber-500"
              />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <div
          v-if="review.decision_questions?.length"
          class="rounded-[1.75rem] border border-primary/20 bg-primary/5 p-6"
        >
          <h2 class="text-xl font-semibold text-highlighted">
            Ist {{ review.tool_name }} das Richtige für dich?
          </h2>
          <p class="mt-2 text-sm text-muted">
            Beantworte diese Fragen für eine schnelle Einschätzung.
          </p>
          <div class="mt-5 space-y-3">
            <div
              v-for="(q, index) in review.decision_questions"
              :key="index"
              class="rounded-xl border border-default bg-default p-4"
            >
              <p class="text-sm font-medium text-highlighted">
                {{ q.question }}
              </p>
              <div
                v-if="expandedQuestions[index] !== undefined"
                class="mt-3 rounded-lg p-3 text-sm"
                :class="expandedQuestions[index] ? 'bg-green-500/10 text-green-700 dark:text-green-400' : 'bg-amber-500/10 text-amber-700 dark:text-amber-400'"
              >
                {{ expandedQuestions[index] ? q.yes_answer : q.no_answer }}
              </div>
              <div class="mt-3 flex gap-2">
                <UButton
                  label="Ja"
                  :color="expandedQuestions[index] === true ? 'primary' : 'neutral'"
                  :variant="expandedQuestions[index] === true ? 'solid' : 'outline'"
                  size="xs"
                  @click="expandedQuestions[index] = true"
                />
                <UButton
                  label="Nein"
                  :color="expandedQuestions[index] === false ? 'primary' : 'neutral'"
                  :variant="expandedQuestions[index] === false ? 'solid' : 'outline'"
                  size="xs"
                  @click="expandedQuestions[index] = false"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-[1.75rem] border border-default bg-default/70 p-6">
          <ContentRenderer :value="review" />
        </div>

        <div
          v-if="relatedRankings.length || relatedArticles.length"
          class="rounded-[1.75rem] border border-default bg-default/70 p-6"
        >
          <p class="text-sm font-semibold text-highlighted">
            Verwandte Inhalte
          </p>
          <div class="mt-4 space-y-3">
            <NuxtLink
              v-for="ranking in relatedRankings"
              :key="ranking.path"
              :to="ranking.path"
              class="block rounded-xl border border-default bg-default px-4 py-3 transition hover:border-primary/30"
            >
              <div class="flex items-center gap-2">
                <UBadge
                  label="Bestenliste"
                  color="neutral"
                  variant="subtle"
                  size="xs"
                />
                <p class="text-sm font-medium text-highlighted">
                  {{ ranking.title }}
                </p>
              </div>
            </NuxtLink>
            <NuxtLink
              v-for="article in relatedArticles"
              :key="article.path"
              :to="article.path"
              class="block rounded-xl border border-default bg-default px-4 py-3 transition hover:border-primary/30"
            >
              <div class="flex items-center gap-2">
                <UBadge
                  :label="article.badge?.label || 'Ratgeber'"
                  color="neutral"
                  variant="subtle"
                  size="xs"
                />
                <p class="text-sm font-medium text-highlighted">
                  {{ article.title }}
                </p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="rounded-[1.75rem] border border-default bg-default/70 p-6">
          <p class="text-sm font-semibold text-highlighted">
            Wichtige Bausteine
          </p>
          <div class="mt-4 flex flex-wrap gap-3">
            <UBadge
              v-for="feature in review.features"
              :key="feature"
              :label="feature"
              color="neutral"
              variant="subtle"
            />
          </div>
        </div>

        <div class="rounded-[1.75rem] border border-default bg-default/70 p-6">
          <p class="text-sm font-semibold text-highlighted">
            Affiliate-Hinweis
          </p>
          <p class="mt-3 text-sm leading-7 text-muted">
            {{ review.disclosure_text }}
          </p>
          <div class="mt-5 flex flex-wrap gap-3">
            <UButton
              :to="review.affiliate_url"
              target="_blank"
              label="Zur Anbieter-Seite"
              trailing-icon="i-lucide-arrow-up-right"
            />
            <UButton
              to="/legal/affiliate-disclosure"
              label="Disclosure lesen"
              color="neutral"
              variant="outline"
            />
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>
