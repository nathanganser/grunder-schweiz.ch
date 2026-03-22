<script setup lang="ts">
const { data: rankings } = await useAsyncData('home-rankings', () => queryCollection('rankings').all())
const { data: reviews } = await useAsyncData('home-reviews', () => queryCollection('reviews').all())
const { data: articles } = await useAsyncData('home-articles', () => queryCollection('articles').order('date', 'DESC').all())

const magicHeidiReview = computed(() => {
  return (reviews.value || []).find(review => review.path?.endsWith('/magic-heidi'))
})

const invoiceRanking = computed(() => {
  return (rankings.value || []).find(ranking => ranking.path?.endsWith('/1-rechnungssoftware-schweiz'))
    || (rankings.value || []).find(ranking => ranking.path?.endsWith('/rechnungssoftware-schweiz'))
})

const bookkeepingRanking = computed(() => {
  return (rankings.value || []).find(ranking => ranking.path?.endsWith('/2-buchhaltungssoftware-freiberufler'))
    || (rankings.value || []).find(ranking => ranking.path?.endsWith('/buchhaltungssoftware-schweiz'))
})

const featuredAlternatives = computed(() => {
  const preferredOrder = ['bexio', 'banana-buchhaltung', 'klara', 'accounto']

  return preferredOrder
    .map(slug => (reviews.value || []).find(review => review.path?.endsWith(`/${slug}`)))
    .filter(Boolean)
    .slice(0, 4)
})

const featuredArticles = computed(() => {
  const preferredSlugs = [
    '/blog/rechnung-schreiben-schweiz',
    '/blog/qr-rechnung-erstellen-schweiz',
    '/blog/mwst-anmeldung-schweiz'
  ]

  const selected = preferredSlugs
    .map(path => (articles.value || []).find(article => article.path === path))
    .filter(Boolean)

  if (selected.length >= 3) {
    return selected
  }

  return (articles.value || []).slice(0, 3)
})

useHead({
  titleTemplate: ''
})

useSeoMeta({
  title: 'Gründer Schweiz | Magic Heidi als beste Rechnungssoftware für Freelancer',
  ogTitle: 'Gründer Schweiz | Magic Heidi als beste Rechnungssoftware für Freelancer',
  description: 'Rationale, quellenbasierte Empfehlungen für Schweizer Freelancer: Magic Heidi führt aktuell bei Rechnungen und leichter Buchhaltung, Alternativen bleiben transparent eingeordnet.',
  ogDescription: 'Rationale, quellenbasierte Empfehlungen für Schweizer Freelancer: Magic Heidi führt aktuell bei Rechnungen und leichter Buchhaltung, Alternativen bleiben transparent eingeordnet.',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UContainer class="py-10 lg:py-12">
    <div class="grid gap-8 lg:grid-cols-[0.72fr_0.28fr]">
      <div class="space-y-8">
        <section class="rounded-[1.75rem] border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8">
          <UBadge
            label="Redaktionelles Urteil"
            color="primary"
            variant="subtle"
          />
          <h1 class="mt-4 font-display text-3xl font-bold tracking-tight text-highlighted lg:text-5xl">
            Magic Heidi ist aktuell die beste Software für Schweizer Freelancer
          </h1>
          <p class="mt-4 max-w-3xl text-base leading-7 text-muted">
            Nicht als Marketing-Slogan, sondern als Ergebnis unserer aktuellen Kriterien: Schweizer Fit, QR-Rechnung, MWST, Ausgabenfluss, Bedienbarkeit und Preis-Leistung. Für einfache bis mittlere Freelancer-Setups führt Magic Heidi derzeit vor den breiteren Alternativen.
          </p>

          <div class="mt-6 flex flex-wrap gap-3">
            <UButton
              :to="magicHeidiReview?.path || '/reviews'"
              label="Zum Magic-Heidi-Review"
              size="lg"
            />
            <UButton
              :to="invoiceRanking?.path || '/bestenlisten'"
              label="Rechnungssoftware ansehen"
              color="neutral"
              variant="outline"
              size="lg"
            />
            <UButton
              :to="bookkeepingRanking?.path || '/bestenlisten'"
              label="Buchhaltung vergleichen"
              color="neutral"
              variant="ghost"
              size="lg"
            />
          </div>

          <div class="mt-8 grid gap-3 md:grid-cols-3">
            <div class="rounded-2xl border border-default bg-default/80 p-4">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                Schweizer Fit
              </p>
              <p class="mt-2 text-sm leading-6 text-muted">
                QR-Rechnung, strukturierte Adressen, CHF/EUR und mehrsprachige Rechnungen sind laut Anbieter direkt eingebaut.
              </p>
            </div>
            <div class="rounded-2xl border border-default bg-default/80 p-4">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                Leichte Buchhaltung
              </p>
              <p class="mt-2 text-sm leading-6 text-muted">
                Ausgaben, KI-Belegscan, Bankimport und MWST decken die typischen Reibungspunkte kleiner Setups ab.
              </p>
            </div>
            <div class="rounded-2xl border border-default bg-default/80 p-4">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                Preis-Leistung
              </p>
              <p class="mt-2 text-sm leading-6 text-muted">
                Gratis-Test, Jahresplan CHF 24.99 pro Monat und Monatsplan CHF 30 laut Anbieter.
              </p>
            </div>
          </div>
        </section>

        <section class="rounded-[1.75rem] border border-default bg-default/70 p-6 shadow-sm">
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                Kernseiten
              </p>
              <h2 class="mt-2 text-2xl font-semibold tracking-tight text-highlighted">
                Die kürzeste Entscheidungsstrecke
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
              :to="magicHeidiReview?.path || '/reviews'"
              class="rounded-2xl border border-primary/20 bg-primary/5 p-5 transition hover:border-primary/40"
            >
              <p class="text-xs uppercase tracking-[0.22em] text-muted">
                Top Review
              </p>
              <h3 class="mt-2 text-lg font-semibold text-highlighted">
                {{ magicHeidiReview?.title || 'Magic Heidi Review' }}
              </h3>
              <p class="mt-2 text-sm leading-6 text-muted">
                Unsere aktuelle Standardempfehlung für Schweizer Freelancer.
              </p>
            </NuxtLink>

            <NuxtLink
              :to="invoiceRanking?.path || '/bestenlisten'"
              class="rounded-2xl border border-default bg-default p-5 transition hover:border-primary/30"
            >
              <p class="text-xs uppercase tracking-[0.22em] text-muted">
                Ranking
              </p>
              <h3 class="mt-2 text-lg font-semibold text-highlighted">
                {{ invoiceRanking?.title || 'Beste Rechnungssoftware' }}
              </h3>
              <p class="mt-2 text-sm leading-6 text-muted">
                Magic Heidi gegen bexio, KLARA und Banana im direkten Freelancer-Kontext.
              </p>
            </NuxtLink>

            <NuxtLink
              :to="bookkeepingRanking?.path || '/bestenlisten'"
              class="rounded-2xl border border-default bg-default p-5 transition hover:border-primary/30"
            >
              <p class="text-xs uppercase tracking-[0.22em] text-muted">
                Ranking
              </p>
              <h3 class="mt-2 text-lg font-semibold text-highlighted">
                {{ bookkeepingRanking?.title || 'Beste Buchhaltungssoftware' }}
              </h3>
              <p class="mt-2 text-sm leading-6 text-muted">
                Magic Heidi als Default für leichte Buchhaltung, Alternativen für tiefere oder breitere Setups.
              </p>
            </NuxtLink>
          </div>
        </section>

        <section class="rounded-[1.75rem] border border-default bg-default/70 p-6 shadow-sm">
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                Alternativen
              </p>
              <h2 class="mt-2 text-2xl font-semibold tracking-tight text-highlighted">
                Wann ein anderes Tool besser passt
              </h2>
            </div>
          </div>

          <div class="mt-6 grid gap-4 md:grid-cols-2">
            <NuxtLink
              v-for="review in featuredAlternatives"
              :key="review?.path"
              :to="review?.path"
              class="rounded-2xl border border-default bg-default p-4 transition hover:border-primary/30"
            >
              <div class="flex items-center justify-between gap-3">
                <p class="font-medium text-highlighted">
                  {{ review?.tool_name }}
                </p>
                <span class="text-xs uppercase tracking-[0.22em] text-muted">
                  Alternative
                </span>
              </div>
              <p class="mt-2 text-sm leading-6 text-muted">
                {{ review?.best_for }}
              </p>
            </NuxtLink>
          </div>
        </section>
      </div>

      <div class="space-y-6">
        <section class="rounded-[1.75rem] border border-default bg-default/70 p-5 shadow-sm">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
            Bewertungslogik
          </p>
          <div class="mt-4 space-y-3 text-sm leading-6 text-muted">
            <p>Wir ranken nicht nach Lautstärke, sondern nach Schweizer Fit, QR-Rechnung, MWST, Bedienbarkeit, Export und Preis-Leistung.</p>
            <p>Unabhängig heisst hier nicht neutral um jeden Preis. Wenn die Kriterien klar auf einen Gewinner zeigen, sagen wir das.</p>
            <p>Bei Magic Heidi stützen sich die Produktfakten primär auf offizielle Anbieterquellen und Schweizer Standards von SIX und ESTV.</p>
          </div>
        </section>

        <section class="rounded-[1.75rem] border border-default bg-default/70 p-5 shadow-sm">
          <div class="flex items-center justify-between gap-4">
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
              Quellenbasis
            </p>
            <UButton
              to="/methodik"
              label="Methodik"
              color="neutral"
              variant="ghost"
            />
          </div>
          <div class="mt-4 flex flex-col gap-3">
            <UButton
              to="https://magicheidi.ch/de/web"
              label="Magic Heidi Web"
              target="_blank"
              color="neutral"
              variant="outline"
              trailing-icon="i-lucide-arrow-up-right"
              block
            />
            <UButton
              to="https://magicheidi.ch/features-list"
              label="Magic Heidi Features"
              target="_blank"
              color="neutral"
              variant="outline"
              trailing-icon="i-lucide-arrow-up-right"
              block
            />
            <UButton
              to="https://www.six-group.com/dam/download/banking-services/standardization/qr-bill/factsheet-qr-bill-transition-period-erp-de.pdf"
              label="SIX QR-Rechnung"
              target="_blank"
              color="neutral"
              variant="outline"
              trailing-icon="i-lucide-arrow-up-right"
              block
            />
            <UButton
              to="https://www.estv.admin.ch/de/mwst-anderungen-ab-1-januar-2025"
              label="ESTV MWST"
              target="_blank"
              color="neutral"
              variant="outline"
              trailing-icon="i-lucide-arrow-up-right"
              block
            />
          </div>
        </section>

        <section class="rounded-[1.75rem] border border-default bg-default/70 p-5 shadow-sm">
          <div class="flex items-center justify-between gap-4">
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
              Ratgeber
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
              :key="article?.path"
              :to="article?.path"
              class="block rounded-xl border border-default bg-default px-4 py-3 transition hover:border-primary/30"
            >
              <p class="text-xs uppercase tracking-[0.22em] text-muted">
                {{ article?.badge?.label }}
              </p>
              <p class="mt-1 font-medium text-highlighted">
                {{ article?.title }}
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
              to="/methodik"
              label="Methodik"
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
