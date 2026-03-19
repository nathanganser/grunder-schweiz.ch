<script setup lang="ts">
const route = useRoute()

const { data: review } = await useAsyncData(route.path, () => queryCollection('reviews').path(route.path).first())
if (!review.value) {
  throw createError({ statusCode: 404, statusMessage: 'Review nicht gefunden', fatal: true })
}

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
          Zuletzt geprueft {{ new Date(review.last_reviewed).toLocaleDateString('de-CH', { year: 'numeric', month: 'short', day: 'numeric' }) }}
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
                Best fuer
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

        <div class="rounded-[1.75rem] border border-default bg-default/70 p-6">
          <h2 class="text-xl font-semibold text-highlighted">
            Staerken
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
            Einschraenkungen
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

        <div class="rounded-[1.75rem] border border-default bg-default/70 p-6">
          <ContentRenderer :value="review" />
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
