<script setup lang="ts">
const { data: categoriesPage } = await useAsyncData('home-categories', () => queryCollection('categories').first())
const { data: rankings } = await useAsyncData('home-rankings', () => queryCollection('rankings').all())
const { data: reviews } = await useAsyncData('home-reviews', () => queryCollection('reviews').all())
const { data: comparisons } = await useAsyncData('home-comparisons', () => queryCollection('comparisons').all())
const { data: articles } = await useAsyncData('home-articles', () => queryCollection('articles').order('date', 'DESC').all())

const categoryLabels: Record<string, string> = {
  rechnungen: 'Rechnungssoftware',
  buchhaltung: 'Buchhaltung',
  banking: 'Geschäftskonten',
  zeiterfassung: 'Zeiterfassung'
}

const categoryRankingMap = computed(() => {
  const map: Record<string, { path: string }> = {}
  for (const ranking of rankings.value || []) {
    if (ranking.category) {
      map[ranking.category] = ranking
    }
  }
  return map
})

const featuredArticles = computed(() => {
  const preferredSlugs = [
    '/blog/rechnung-schreiben-schweiz',
    '/blog/buchhaltung-einzelfirma-schweiz',
    '/blog/mwst-schweiz',
    '/blog/geschaeftskonto-freelancer-schweiz',
    '/blog/firma-gruenden-schweiz-kosten',
    '/blog/all-in-one-vs-best-of-breed'
  ]

  const selected = preferredSlugs
    .map(path => (articles.value || []).find(a => a.path === path))
    .filter(Boolean)

  if (selected.length >= 6) return selected
  return (articles.value || []).slice(0, 6)
})

useHead({
  titleTemplate: ''
})

useSeoMeta({
  title: 'Gründer Schweiz | Software-Vergleiche für Freelancer und Selbstständige',
  ogTitle: 'Gründer Schweiz | Software-Vergleiche für Freelancer und Selbstständige',
  description: 'Unabhängige Vergleiche und Bestenlisten für Schweizer Business-Software: Rechnungen, Buchhaltung, Geschäftskonten und Zeiterfassung. Redaktionell geprüft und transparent bewertet.',
  ogDescription: 'Unabhängige Vergleiche und Bestenlisten für Schweizer Business-Software: Rechnungen, Buchhaltung, Geschäftskonten und Zeiterfassung. Redaktionell geprüft und transparent bewertet.',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UContainer class="py-10 lg:py-12">
    <div class="space-y-8">
      <!-- Hero: Portal-Intro -->
      <section class="rounded-[1.75rem] border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8">
        <UBadge
          label="Redaktionelles Portal"
          color="primary"
          variant="subtle"
        />
        <h1 class="mt-4 font-display text-3xl font-bold tracking-tight text-highlighted lg:text-5xl">
          Die besten Tools für Schweizer Gründer und Freelancer
        </h1>
        <p class="mt-4 max-w-3xl text-base leading-7 text-muted">
          Unabhängige Bestenlisten, Reviews und Ratgeber für Business-Software in der Schweiz.
          Wir vergleichen Rechnungssoftware, Buchhaltung, Geschäftskonten und Zeiterfassung
          nach klaren Kriterien — transparent, redaktionell und mit Schweizer Fokus.
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <UButton
            to="/bestenlisten"
            label="Bestenlisten ansehen"
            size="lg"
          />
          <UButton
            to="/kategorien"
            label="Alle Kategorien"
            color="neutral"
            variant="outline"
            size="lg"
          />
          <UButton
            to="/methodik"
            label="Unsere Methodik"
            color="neutral"
            variant="ghost"
            size="lg"
          />
        </div>
      </section>

      <!-- Software-Kategorien -->
      <section>
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
              Software-Bereiche
            </p>
            <h2 class="mt-2 text-2xl font-semibold tracking-tight text-highlighted">
              Vier Kategorien, vier Bestenlisten
            </h2>
          </div>
          <UButton
            to="/kategorien"
            label="Alle Kategorien"
            color="neutral"
            variant="outline"
          />
        </div>

        <div class="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <NuxtLink
            v-for="category in categoriesPage?.items || []"
            :key="category.slug"
            :to="categoryRankingMap[category.slug]?.path || '/bestenlisten'"
            class="rounded-[1.75rem] border border-default bg-default/70 p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/30"
          >
            <div class="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
              <UIcon
                :name="category.icon"
                class="size-5"
              />
            </div>
            <h3 class="mt-4 text-lg font-semibold text-highlighted">
              {{ category.title }}
            </h3>
            <p class="mt-2 text-sm leading-6 text-muted">
              {{ category.intro }}
            </p>
            <p class="mt-3 text-xs text-muted">
              {{ category.audience }}
            </p>
          </NuxtLink>
        </div>
      </section>

      <!-- Bestenlisten -->
      <section class="rounded-[1.75rem] border border-default bg-default/70 p-6 shadow-sm">
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
              Bestenlisten
            </p>
            <h2 class="mt-2 text-2xl font-semibold tracking-tight text-highlighted">
              Aktuelle Top-Empfehlungen
            </h2>
          </div>
          <UButton
            to="/bestenlisten"
            label="Alle Bestenlisten"
            color="neutral"
            variant="outline"
          />
        </div>

        <div class="mt-6 grid gap-4 md:grid-cols-2">
          <NuxtLink
            v-for="ranking in rankings || []"
            :key="ranking.path"
            :to="ranking.path"
            class="rounded-2xl border border-default bg-default p-5 transition hover:border-primary/30"
          >
            <p class="text-xs uppercase tracking-[0.22em] text-muted">
              {{ categoryLabels[ranking.category] || ranking.category }}
            </p>
            <h3 class="mt-2 text-lg font-semibold text-highlighted">
              {{ ranking.title }}
            </h3>
            <p class="mt-2 text-sm leading-6 text-muted">
              {{ ranking.summary }}
            </p>
            <p class="mt-3 text-sm font-medium text-primary">
              Top Pick: {{ ranking.topPick?.name }}
            </p>
          </NuxtLink>
        </div>
      </section>

      <!-- Vergleiche -->
      <section
        v-if="comparisons?.length"
        class="rounded-[1.75rem] border border-default bg-default/70 p-6 shadow-sm"
      >
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
              Vergleiche
            </p>
            <h2 class="mt-2 text-2xl font-semibold tracking-tight text-highlighted">
              Software direkt gegenübergestellt
            </h2>
          </div>
          <UButton
            to="/vergleiche"
            label="Alle Vergleiche"
            color="neutral"
            variant="outline"
          />
        </div>

        <div class="mt-6 grid gap-4 md:grid-cols-3">
          <NuxtLink
            v-for="comparison in comparisons"
            :key="comparison.path"
            :to="comparison.path"
            class="rounded-2xl border border-default bg-default p-5 transition hover:border-primary/30"
          >
            <div class="flex flex-wrap gap-1.5">
              <UBadge
                v-for="tool in comparison.compared_tools?.slice(0, 3)"
                :key="tool"
                :label="tool"
                color="neutral"
                variant="subtle"
                size="xs"
              />
            </div>
            <h3 class="mt-3 text-base font-semibold text-highlighted">
              {{ comparison.title }}
            </h3>
            <p class="mt-2 text-sm leading-6 text-muted line-clamp-2">
              {{ comparison.description }}
            </p>
          </NuxtLink>
        </div>
      </section>

      <!-- Reviews -->
      <section class="rounded-[1.75rem] border border-default bg-default/70 p-6 shadow-sm">
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
              Reviews
            </p>
            <h2 class="mt-2 text-2xl font-semibold tracking-tight text-highlighted">
              Einzelne Tools im Detail geprüft
            </h2>
          </div>
          <UButton
            to="/reviews"
            label="Alle Reviews"
            color="neutral"
            variant="outline"
          />
        </div>

        <div class="mt-6 grid gap-4 md:grid-cols-3">
          <NuxtLink
            v-for="review in reviews || []"
            :key="review.path"
            :to="review.path"
            class="rounded-2xl border border-default bg-default p-4 transition hover:border-primary/30"
          >
            <p class="font-medium text-highlighted">
              {{ review.tool_name }}
            </p>
            <p class="mt-1 text-xs uppercase tracking-[0.22em] text-muted">
              {{ categoryLabels[review.category] || review.category }}
            </p>
            <p class="mt-2 text-sm leading-6 text-muted line-clamp-2">
              {{ review.best_for }}
            </p>
            <div
              v-if="review.scores"
              class="mt-3"
            >
              <span class="inline-flex items-center justify-center rounded-lg bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                {{ Number(review.scores.overall) }}/10
              </span>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- Ratgeber -->
      <section class="rounded-[1.75rem] border border-default bg-default/70 p-6 shadow-sm">
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
              Ratgeber
            </p>
            <h2 class="mt-2 text-2xl font-semibold tracking-tight text-highlighted">
              Wissen für den Schweizer Geschäftsalltag
            </h2>
          </div>
          <UButton
            to="/blog"
            label="Alle Ratgeber"
            color="neutral"
            variant="outline"
          />
        </div>

        <div class="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="article in featuredArticles"
            :key="article?.path"
            :to="article?.path"
            class="rounded-2xl border border-default bg-default p-5 transition hover:border-primary/30"
          >
            <UBadge
              :label="article?.badge?.label || 'Artikel'"
              color="neutral"
              variant="subtle"
              size="xs"
            />
            <h3 class="mt-3 text-base font-semibold text-highlighted">
              {{ article?.title }}
            </h3>
            <p class="mt-2 text-sm leading-6 text-muted line-clamp-2">
              {{ article?.description }}
            </p>
          </NuxtLink>
        </div>
      </section>

      <!-- Transparenz -->
      <section class="rounded-[1.75rem] border border-default bg-default/70 p-6 shadow-sm">
        <div class="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
              Transparenz
            </p>
            <p class="mt-2 max-w-2xl text-sm leading-6 text-muted">
              Einige ausgehende Links sind Affiliate-Links. Unsere Kriterien und Rankings bleiben
              davon getrennt. Wenn die Kriterien klar auf einen Gewinner zeigen, sagen wir das offen.
            </p>
          </div>
          <div class="flex flex-wrap gap-3">
            <UButton
              to="/legal/affiliate-disclosure"
              label="Affiliate-Hinweis"
              color="neutral"
              variant="outline"
            />
            <UButton
              to="/methodik"
              label="Methodik"
              color="neutral"
              variant="outline"
            />
            <UButton
              to="/legal/datenschutz"
              label="Datenschutz"
              color="neutral"
              variant="outline"
            />
          </div>
        </div>
      </section>
    </div>
  </UContainer>
</template>
