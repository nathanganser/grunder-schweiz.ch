<script setup lang="ts">
const route = useRoute()

const searchOpen = ref(false)
const searchQuery = ref('')

const { data: allArticles } = await useAsyncData('search-articles', () => queryCollection('articles').all())
const { data: allRankings } = await useAsyncData('search-rankings', () => queryCollection('rankings').all())
const { data: allReviews } = await useAsyncData('search-reviews', () => queryCollection('reviews').all())
const { data: allComparisons } = await useAsyncData('search-comparisons', () => queryCollection('comparisons').all())

const searchResults = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  if (!q || q.length < 2) return []

  const results: Array<{ title: string, description: string, path: string, type: string }> = []

  for (const article of allArticles.value || []) {
    if (article.title?.toLowerCase().includes(q) || article.description?.toLowerCase().includes(q)) {
      results.push({ title: article.title, description: article.description, path: article.path, type: 'Ratgeber' })
    }
  }

  for (const ranking of allRankings.value || []) {
    if (ranking.title?.toLowerCase().includes(q) || ranking.description?.toLowerCase().includes(q)) {
      results.push({ title: ranking.title, description: ranking.description, path: ranking.path, type: 'Bestenliste' })
    }
  }

  for (const review of allReviews.value || []) {
    if (review.title?.toLowerCase().includes(q) || review.tool_name?.toLowerCase().includes(q) || review.description?.toLowerCase().includes(q)) {
      results.push({ title: review.title, description: review.description, path: review.path, type: 'Review' })
    }
  }

  for (const comparison of allComparisons.value || []) {
    if (comparison.title?.toLowerCase().includes(q) || comparison.description?.toLowerCase().includes(q)) {
      results.push({ title: comparison.title, description: comparison.description, path: comparison.path, type: 'Vergleich' })
    }
  }

  return results.slice(0, 8)
})

const items = computed(() => [{
  label: 'Kategorien',
  to: '/kategorien',
  active: route.path.startsWith('/kategorien')
}, {
  label: 'Bestenlisten',
  to: '/bestenlisten',
  active: route.path.startsWith('/bestenlisten')
}, {
  label: 'Vergleiche',
  to: '/vergleiche',
  active: route.path.startsWith('/vergleiche')
}, {
  label: 'Reviews',
  to: '/reviews',
  active: route.path.startsWith('/reviews')
}, {
  label: 'Methodik',
  to: '/methodik',
  active: route.path.startsWith('/methodik')
}, {
  label: 'Ratgeber',
  to: '/blog',
  active: route.path.startsWith('/blog')
}])
</script>

<template>
  <UHeader class="border-b border-default/70 bg-default/85 backdrop-blur supports-[backdrop-filter]:bg-default/75">
    <template #left>
      <NuxtLink
        to="/"
        class="flex items-center gap-3"
      >
        <AppLogo class="h-8 w-8 shrink-0" />

        <div class="hidden flex-col leading-tight sm:flex">
          <span class="font-display text-sm font-semibold tracking-tight text-highlighted">
            Gründer Schweiz
          </span>
          <span class="text-xs text-muted">
            Unabhängige Empfehlungen für Schweizer Freelancer-Software
          </span>
        </div>
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
      class="hidden xl:flex"
    />

    <template #right>
      <UButton
        icon="i-lucide-search"
        color="neutral"
        variant="ghost"
        @click="searchOpen = true"
      />
      <UColorModeButton />
    </template>

    <template #body>
      <div class="mb-6 rounded-2xl border border-default bg-elevated/70 p-4">
        <p class="text-sm font-medium text-highlighted">
          Redaktionelle Empfehlung
        </p>
        <p class="mt-1 text-sm text-muted">
          Wir ranken eigenstaendig. Aktuell führt Magic Heidi bei Rechnungen und leichter Buchhaltung für Schweizer Freelancer.
        </p>
      </div>

      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>

  <UModal
    v-model:open="searchOpen"
    :ui="{ content: 'sm:max-w-xl' }"
  >
    <template #content>
      <div class="p-4">
        <div class="relative">
          <UIcon
            name="i-lucide-search"
            class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Tool, Thema oder Ratgeber suchen..."
            class="w-full rounded-xl border border-default bg-default py-3 pl-10 pr-4 text-sm text-highlighted placeholder:text-muted focus:border-primary focus:outline-none"
            autofocus
          >
        </div>

        <div
          v-if="searchResults.length"
          class="mt-4 max-h-80 space-y-1 overflow-y-auto"
        >
          <NuxtLink
            v-for="result in searchResults"
            :key="result.path"
            :to="result.path"
            class="block rounded-xl px-3 py-2.5 transition hover:bg-elevated/80"
            @click="searchOpen = false; searchQuery = ''"
          >
            <div class="flex items-center gap-2">
              <UBadge
                :label="result.type"
                color="neutral"
                variant="subtle"
                size="xs"
              />
              <p class="truncate text-sm font-medium text-highlighted">
                {{ result.title }}
              </p>
            </div>
            <p class="mt-1 truncate text-xs text-muted">
              {{ result.description }}
            </p>
          </NuxtLink>
        </div>

        <div
          v-else-if="searchQuery.length >= 2"
          class="mt-4 py-8 text-center text-sm text-muted"
        >
          Keine Ergebnisse für "{{ searchQuery }}"
        </div>

        <div
          v-else
          class="mt-4 py-8 text-center text-sm text-muted"
        >
          Mindestens 2 Zeichen eingeben...
        </div>
      </div>
    </template>
  </UModal>
</template>
