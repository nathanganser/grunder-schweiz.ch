<script setup lang="ts">
const { data: categoriesPage } = await useAsyncData('categories-page', () => queryCollection('categories').first())
const { data: rankings } = await useAsyncData('home-rankings', () => queryCollection('rankings').all())
const { data: reviews } = await useAsyncData('home-reviews', () => queryCollection('reviews').all())
const { data: articles } = await useAsyncData('home-articles', () => queryCollection('articles').order('date', 'DESC').all())

const featuredRankings = computed(() => {
  return rankings.value?.filter(ranking => ranking?.topPick?.name).slice(0, 3) ?? []
})
const featuredReviews = computed(() => reviews.value?.slice(0, 4) ?? [])
const featuredArticles = computed(() => articles.value?.slice(0, 3) ?? [])

useHead({
  titleTemplate: ''
})

useSeoMeta({
  title: 'Gründer Schweiz | Reviews und Rankings für Freelancer-Software',
  ogTitle: 'Gründer Schweiz | Reviews und Rankings für Freelancer-Software',
  description: 'Unabhängige Orientierung für Schweizer Selbstständige: Kategorien, Bestenlisten, Reviews, Methodik und Affiliate-Transparenz.',
  ogDescription: 'Unabhängige Orientierung für Schweizer Selbstständige: Kategorien, Bestenlisten, Reviews, Methodik und Affiliate-Transparenz.',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UContainer class="py-10 lg:py-12">
    <div class="grid gap-8 lg:grid-cols-[0.72fr_0.28fr]">
      <div class="space-y-8">
        <!-- Hero Section -->
        <div class="rounded-[1.75rem] border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-8">
          <UBadge label="Unabhängig & transparent" color="primary" variant="subtle" />
          <h1 class="mt-4 font-display text-3xl font-bold tracking-tight text-highlighted lg:text-4xl">
            Die richtige Software für dein Schweizer Business
          </h1>
          <p class="mt-3 max-w-2xl text-base leading-7 text-muted">
            Unabhängige Rankings, ehrliche Reviews und praktische Guides für Rechnungen, Buchhaltung, Banking und mehr.
          </p>

          <div class="mt-6">
            <p class="text-sm font-medium text-highlighted mb-3">Was suchst du?</p>
            <div class="flex flex-wrap gap-2">
              <UButton
                v-for="category in categoriesPage?.items || []"
                :key="category.slug"
                :to="`/kategorien`"
                color="neutral"
                variant="outline"
                size="lg"
              >
                <UIcon :name="category.icon" class="size-4" />
                {{ category.title }}
              </UButton>
            </div>
          </div>

          <div class="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted">
            <span class="flex items-center gap-1.5">
              <UIcon name="i-lucide-list-checks" class="size-4 text-primary" />
              {{ rankings?.length || 0 }} Bestenlisten
            </span>
            <span class="flex items-center gap-1.5">
              <UIcon name="i-lucide-file-search" class="size-4 text-primary" />
              {{ reviews?.length || 0 }} Reviews
            </span>
            <span class="flex items-center gap-1.5">
              <UIcon name="i-lucide-book-open" class="size-4 text-primary" />
              {{ articles?.length || 0 }} Guides
            </span>
          </div>
        </div>

        <section class="rounded-[1.75rem] border border-default bg-default/70 p-6 shadow-sm">
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                Bestenlisten
              </p>
              <h2 class="mt-2 text-2xl font-semibold tracking-tight text-highlighted">
                Aktuelle Shortlists
              </h2>
            </div>
            <UButton
              to="/bestenlisten"
              label="Alle Bestenlisten"
              color="neutral"
              variant="outline"
            />
          </div>

          <div class="mt-6 grid gap-4 lg:grid-cols-3">
            <NuxtLink
              v-for="ranking in featuredRankings"
              :key="ranking.path"
              :to="ranking.path"
              class="rounded-2xl border border-default bg-default p-5 transition hover:border-primary/30"
            >
              <p class="text-xs uppercase tracking-[0.22em] text-muted">
                {{ ranking.category }}
              </p>
              <h3 class="mt-2 text-lg font-semibold text-highlighted">
                {{ ranking.title }}
              </h3>
              <p class="mt-2 text-sm leading-6 text-muted">
                {{ ranking.summary }}
              </p>
              <p class="mt-3 text-sm text-highlighted">
                Top Pick: {{ ranking.topPick?.name || 'noch prüfen' }}
              </p>
            </NuxtLink>
          </div>
        </section>

        <section class="rounded-[1.75rem] border border-default bg-default/70 p-6 shadow-sm">
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                Reviews
              </p>
              <h2 class="mt-2 text-2xl font-semibold tracking-tight text-highlighted">
                Einzelne Tools im Detail
              </h2>
            </div>
            <UButton
              to="/reviews"
              label="Alle Reviews"
              color="neutral"
              variant="outline"
            />
          </div>

          <div class="mt-6 grid gap-4 md:grid-cols-2">
            <NuxtLink
              v-for="review in featuredReviews"
              :key="review.path"
              :to="review.path"
              class="rounded-2xl border border-default bg-default p-4 transition hover:border-primary/30"
            >
              <div class="flex items-center justify-between gap-3">
                <p class="font-medium text-highlighted">
                  {{ review.tool_name }}
                </p>
                <span class="text-xs uppercase tracking-[0.22em] text-muted">
                  {{ review.category }}
                </span>
              </div>
              <p class="mt-2 text-sm leading-6 text-muted">
                {{ review.description }}
              </p>
              <div class="mt-2 flex items-center gap-2">
                <span
                  class="inline-block size-2 rounded-full"
                  :class="(Date.now() - new Date(review.last_reviewed).getTime()) < 30 * 86400000 ? 'bg-green-500' : (Date.now() - new Date(review.last_reviewed).getTime()) < 90 * 86400000 ? 'bg-amber-400' : 'bg-red-400'"
                />
                <span class="text-xs text-muted">
                  {{ new Date(review.last_reviewed).toLocaleDateString('de-CH', { month: 'short', year: 'numeric' }) }}
                </span>
              </div>
            </NuxtLink>
          </div>
        </section>
      </div>

      <div class="space-y-6">
        <section class="rounded-[1.75rem] border border-default bg-default/70 p-5 shadow-sm">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
            Orientierung
          </p>
          <div class="mt-4 space-y-3 text-sm leading-6 text-muted">
            <p>Diese Site ist ein Verzeichnis und Guide für Schweizer Freelancer, kein Produkt-Funnel.</p>
            <p>Unklare Details bleiben als <code>noch prüfen</code> markiert.</p>
            <p>Affiliate-Hinweise und Bewertungslogik sind sichtbar dokumentiert.</p>
          </div>
        </section>

        <section class="rounded-[1.75rem] border border-default bg-default/70 p-5 shadow-sm">
          <div class="flex items-center justify-between gap-4">
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
              Methodik
            </p>
            <UButton
              to="/methodik"
              label="Lesen"
              color="neutral"
              variant="ghost"
            />
          </div>
          <p class="mt-4 text-sm leading-6 text-muted">
            Wie wir Kategorien, Rankings und Reviews aufbauen und warum Transparenz hier Vorrang vor schicker Conversion-Optik hat.
          </p>
        </section>

        <section class="rounded-[1.75rem] border border-default bg-default/70 p-5 shadow-sm">
          <div class="flex items-center justify-between gap-4">
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
              Guides
            </p>
            <UButton
              to="/blog"
              label="Alle Guides"
              color="neutral"
              variant="ghost"
            />
          </div>
          <div class="mt-4 space-y-3">
            <NuxtLink
              v-for="article in featuredArticles"
              :key="article.path"
              :to="article.path"
              class="block rounded-xl border border-default bg-default px-4 py-3 transition hover:border-primary/30"
            >
              <p class="text-xs uppercase tracking-[0.22em] text-muted">
                {{ article.badge?.label }}
              </p>
              <p class="mt-1 font-medium text-highlighted">
                {{ article.title }}
              </p>
            </NuxtLink>
          </div>
        </section>

        <section class="rounded-[1.75rem] border border-default bg-default/70 p-5 shadow-sm">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
            Transparenz
          </p>
          <div class="mt-4 flex flex-col gap-3">
            <UButton
              to="/legal/affiliate-disclosure"
              label="Affiliate-Hinweis"
              color="neutral"
              variant="outline"
              block
            />
            <UButton
              to="/legal/impressum"
              label="Impressum"
              color="neutral"
              variant="outline"
              block
            />
            <UButton
              to="/legal/datenschutz"
              label="Datenschutz"
              color="neutral"
              variant="outline"
              block
            />
          </div>
        </section>
      </div>
    </div>
  </UContainer>
</template>
