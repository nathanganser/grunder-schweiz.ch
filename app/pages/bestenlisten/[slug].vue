<script setup lang="ts">
const route = useRoute()

const { data: ranking } = await useAsyncData(route.path, () => queryCollection('rankings').path(route.path).first())
if (!ranking.value) {
  throw createError({ statusCode: 404, statusMessage: 'Bestenliste nicht gefunden', fatal: true })
}

const { data: reviews } = await useAsyncData(`${route.path}-reviews`, () => queryCollection('reviews').all())

const linkedReviews = computed(() => {
  const reviewList = reviews.value || []
  const slugs = [ranking.value?.topPick.slug, ...(ranking.value?.runnerUps?.map(tool => tool.slug) || [])]

  return reviewList.filter(review => slugs.some(slug => review.path?.endsWith(`/${slug}`)))
})

function reviewPathFor(slug: string) {
  return linkedReviews.value.find(review => review.path?.endsWith(`/${slug}`))?.path
}

const { data: allArticles } = await useAsyncData(`${route.path}-articles`, () => queryCollection('articles').all())
const relatedArticles = computed(() => {
  return (allArticles.value || []).slice(0, 3)
})

useSeoMeta({
  title: ranking.value.title,
  ogTitle: ranking.value.title,
  description: ranking.value.description,
  ogDescription: ranking.value.description
})
</script>

<template>
  <UContainer
    v-if="ranking"
    class="py-12"
  >
    <UPageHeader
      :title="ranking.title"
      :description="ranking.description"
    >
      <template #headline>
        <UBadge
          label="Bestenliste"
          color="neutral"
          variant="subtle"
        />
      </template>
    </UPageHeader>

    <div class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div class="space-y-6">
        <div class="rounded-[1.75rem] border border-primary/20 bg-primary/5 p-6">
          <p class="text-sm font-semibold text-primary">
            Top Pick
          </p>
          <h2 class="mt-3 text-2xl font-semibold tracking-tight text-highlighted">
            {{ ranking.topPick.name }}
          </h2>
          <p class="mt-3 text-sm leading-7 text-muted">
            {{ ranking.topPick.verdict }}
          </p>
          <div class="mt-4 space-y-2 text-sm text-muted">
            <p><span class="text-highlighted">Best für:</span> {{ ranking.topPick.bestFor }}</p>
            <p><span class="text-highlighted">Preisbild:</span> {{ ranking.topPick.priceSummary }}</p>
            <p><span class="text-highlighted">Schweizer Fit:</span> {{ ranking.topPick.swissFit }}</p>
          </div>
          <div class="mt-6 flex flex-wrap gap-3">
            <UButton
              :to="ranking.topPick.url"
              target="_blank"
              label="Zur Anbieter-Seite"
              trailing-icon="i-lucide-arrow-up-right"
            />
            <UButton
              v-if="reviewPathFor(ranking.topPick.slug)"
              :to="reviewPathFor(ranking.topPick.slug)"
              label="Review lesen"
              color="neutral"
              variant="outline"
            />
          </div>
        </div>

        <div class="rounded-[1.75rem] border border-default bg-default/70 p-6">
          <p class="text-sm font-semibold text-highlighted">
            Runner-ups
          </p>
          <div class="mt-5 space-y-4">
            <div
              v-for="tool in ranking.runnerUps"
              :key="tool.slug"
              class="rounded-2xl border border-default bg-default p-4"
            >
              <div class="flex items-center justify-between gap-4">
                <p class="text-lg font-semibold text-highlighted">
                  {{ tool.name }}
                </p>
                <span class="text-xs uppercase tracking-[0.22em] text-muted">
                  {{ tool.vendor }}
                </span>
              </div>
              <p class="mt-3 text-sm leading-7 text-muted">
                {{ tool.verdict }}
              </p>
              <div class="mt-4 flex flex-wrap gap-3">
                <UButton
                  :to="tool.url"
                  target="_blank"
                  label="Website"
                  color="neutral"
                  variant="outline"
                  trailing-icon="i-lucide-arrow-up-right"
                />
                <UButton
                  v-if="reviewPathFor(tool.slug)"
                  :to="reviewPathFor(tool.slug)"
                  label="Review"
                  variant="ghost"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Comparison Table -->
        <div class="rounded-[1.75rem] border border-default bg-default/70 p-6 overflow-x-auto">
          <p class="text-sm font-semibold text-highlighted mb-4">
            Vergleich auf einen Blick
          </p>
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-default">
                <th class="pb-3 pr-4 text-left font-medium text-muted">
                  Tool
                </th>
                <th class="pb-3 px-4 text-left font-medium text-muted">
                  Beste für
                </th>
                <th class="pb-3 px-4 text-left font-medium text-muted">
                  Preisbild
                </th>
                <th class="pb-3 pl-4 text-left font-medium text-muted">
                  Schweizer Fit
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-default/50 bg-primary/5">
                <td class="py-3 pr-4">
                  <div class="flex items-center gap-2">
                    <UIcon
                      name="i-lucide-trophy"
                      class="size-4 text-primary"
                    />
                    <span class="font-semibold text-highlighted">{{ ranking.topPick.name }}</span>
                  </div>
                </td>
                <td class="py-3 px-4 text-muted">
                  {{ ranking.topPick.bestFor }}
                </td>
                <td class="py-3 px-4 text-muted">
                  {{ ranking.topPick.priceSummary }}
                </td>
                <td class="py-3 pl-4 text-muted">
                  {{ ranking.topPick.swissFit }}
                </td>
              </tr>
              <tr
                v-for="tool in ranking.runnerUps"
                :key="tool.slug"
                class="border-b border-default/50"
              >
                <td class="py-3 pr-4 font-medium text-highlighted">
                  {{ tool.name }}
                </td>
                <td class="py-3 px-4 text-muted">
                  {{ tool.bestFor }}
                </td>
                <td class="py-3 px-4 text-muted">
                  {{ tool.priceSummary }}
                </td>
                <td class="py-3 pl-4 text-muted">
                  {{ tool.swissFit }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="rounded-[1.75rem] border border-default bg-default/70 p-6">
          <ContentRenderer :value="ranking" />
        </div>
      </div>

      <div class="space-y-6">
        <div class="rounded-[1.75rem] border border-default bg-default/70 p-6">
          <p class="text-sm font-semibold text-highlighted">
            Bewertungslogik
          </p>
          <p class="mt-3 text-sm leading-7 text-muted">
            {{ ranking.methodologyNote }}
          </p>
          <ul class="mt-5 space-y-3 text-sm leading-6 text-muted">
            <li
              v-for="criterion in ranking.evaluationCriteria"
              :key="criterion"
              class="flex gap-3"
            >
              <UIcon
                name="i-lucide-check-circle-2"
                class="mt-1 size-4 text-primary"
              />
              <span>{{ criterion }}</span>
            </li>
          </ul>
        </div>

        <div class="rounded-[1.75rem] border border-default bg-default/70 p-6">
          <p class="text-sm font-semibold text-highlighted">
            Affiliate-Hinweis
          </p>
          <p class="mt-3 text-sm leading-7 text-muted">
            {{ ranking.disclosureText }}
          </p>
          <UButton
            to="/legal/affiliate-disclosure"
            label="Mehr zur Kennzeichnung"
            color="neutral"
            variant="outline"
            class="mt-5"
          />
        </div>

        <div
          v-if="linkedReviews.length"
          class="rounded-[1.75rem] border border-default bg-default/70 p-6"
        >
          <p class="text-sm font-semibold text-highlighted">
            Passende Reviews
          </p>
          <div class="mt-5 space-y-4">
            <NuxtLink
              v-for="review in linkedReviews"
              :key="review.path"
              :to="review.path"
              class="block rounded-2xl border border-default bg-default px-4 py-3"
            >
              <p class="text-sm font-semibold text-highlighted">
                {{ review.tool_name }}
              </p>
              <p class="mt-1 text-sm text-muted">
                {{ review.best_for }}
              </p>
            </NuxtLink>
          </div>
        </div>

        <div
          v-if="relatedArticles.length"
          class="rounded-[1.75rem] border border-default bg-default/70 p-6"
        >
          <p class="text-sm font-semibold text-highlighted">
            Passende Ratgeber
          </p>
          <div class="mt-4 space-y-3">
            <NuxtLink
              v-for="article in relatedArticles"
              :key="article.path"
              :to="article.path"
              class="block rounded-xl border border-default bg-default px-4 py-3 transition hover:border-primary/30"
            >
              <p class="text-xs uppercase tracking-[0.22em] text-muted">{{ article.badge?.label }}</p>
              <p class="mt-1 text-sm font-medium text-highlighted">{{ article.title }}</p>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>
