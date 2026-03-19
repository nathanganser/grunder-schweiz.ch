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
  title: 'Gründer Schweiz | Reviews und Rankings fuer Freelancer-Software',
  ogTitle: 'Gründer Schweiz | Reviews und Rankings fuer Freelancer-Software',
  description: 'Unabhaengige Orientierung fuer Schweizer Selbststaendige: Kategorien, Bestenlisten, Reviews, Methodik und Affiliate-Transparenz.',
  ogDescription: 'Unabhaengige Orientierung fuer Schweizer Selbststaendige: Kategorien, Bestenlisten, Reviews, Methodik und Affiliate-Transparenz.',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UContainer class="py-10 lg:py-12">
    <div class="grid gap-8 lg:grid-cols-[0.72fr_0.28fr]">
      <div class="space-y-8">
        <UPageHeader
          title="Repository und Guide fuer Schweizer Freelancer-Software"
          description="Gruender Schweiz sammelt Kategorien, Bestenlisten, Reviews und Guides fuer Rechnungen, Buchhaltung, Banking und weitere Admin-Tools. Die Site ist als Arbeitsoberflaeche gedacht, nicht als Marketing-Landingpage."
        >
          <template #headline>
            <UBadge
              label="Editorial Repository"
              color="neutral"
              variant="subtle"
            />
          </template>
        </UPageHeader>

        <div class="grid gap-4 sm:grid-cols-3">
          <div class="rounded-2xl border border-default bg-default/70 p-4">
            <p class="text-2xl font-semibold text-highlighted">
              {{ rankings?.length || 0 }}
            </p>
            <p class="mt-1 text-sm text-muted">
              Bestenlisten
            </p>
          </div>
          <div class="rounded-2xl border border-default bg-default/70 p-4">
            <p class="text-2xl font-semibold text-highlighted">
              {{ reviews?.length || 0 }}
            </p>
            <p class="mt-1 text-sm text-muted">
              Reviews
            </p>
          </div>
          <div class="rounded-2xl border border-default bg-default/70 p-4">
            <p class="text-2xl font-semibold text-highlighted">
              {{ articles?.length || 0 }}
            </p>
            <p class="mt-1 text-sm text-muted">
              Guides
            </p>
          </div>
        </div>

        <section class="rounded-[1.75rem] border border-default bg-default/70 p-6 shadow-sm">
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                Kategorien
              </p>
              <h2 class="mt-2 text-2xl font-semibold tracking-tight text-highlighted">
                Schnell in den richtigen Bereich
              </h2>
            </div>
            <UButton
              to="/kategorien"
              label="Alle Kategorien"
              color="neutral"
              variant="outline"
            />
          </div>

          <div class="mt-6 grid gap-4 md:grid-cols-2">
            <NuxtLink
              v-for="category in categoriesPage?.items || []"
              :key="category.slug"
              to="/kategorien"
              class="rounded-2xl border border-default bg-default p-4 transition hover:border-primary/30"
            >
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <UIcon
                    :name="category.icon"
                    class="size-4"
                  />
                </div>
                <div>
                  <p class="font-medium text-highlighted">
                    {{ category.title }}
                  </p>
                  <p class="text-sm text-muted">
                    {{ category.intro }}
                  </p>
                </div>
              </div>
            </NuxtLink>
          </div>
        </section>

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
                Top Pick: {{ ranking.topPick?.name || 'noch pruefen' }}
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
            <p>Diese Site ist ein Verzeichnis und Guide fuer Schweizer Freelancer, kein Produkt-Funnel.</p>
            <p>Unklare Details bleiben als <code>noch pruefen</code> markiert.</p>
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
