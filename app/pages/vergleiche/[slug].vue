<script setup lang="ts">
const route = useRoute()

const { data: comparison } = await useAsyncData(route.path, () => queryCollection('comparisons').path(route.path).first())
if (!comparison.value) {
  throw createError({ statusCode: 404, statusMessage: 'Vergleich nicht gefunden', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('comparisons', route.path, {
    fields: ['description']
  })
})

useSeoMeta({
  title: comparison.value.title,
  ogTitle: comparison.value.title,
  description: comparison.value.description,
  ogDescription: comparison.value.description
})
</script>

<template>
  <UContainer
    v-if="comparison"
    class="py-12"
  >
    <UPageHeader
      :title="comparison.title"
      :description="comparison.description"
    >
      <template #headline>
        <UBadge
          label="Vergleich"
          color="neutral"
          variant="subtle"
        />
      </template>
    </UPageHeader>

    <div class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div class="space-y-6">
        <div class="rounded-[1.75rem] border border-default bg-default/70 p-6">
          <p class="text-sm font-semibold text-highlighted">
            Direkt verglichene Optionen
          </p>
          <div class="mt-4 flex flex-wrap gap-3">
            <UBadge
              v-for="tool in comparison.compared_tools"
              :key="tool"
              :label="tool"
              color="neutral"
              variant="subtle"
            />
          </div>
        </div>

        <div class="rounded-[1.75rem] border border-default bg-default/70 p-6">
          <ContentRenderer :value="comparison" />
        </div>

        <USeparator v-if="surround?.length" />
        <UContentSurround :surround="surround" />
      </div>

      <div class="space-y-6">
        <div class="rounded-[1.75rem] border border-default bg-default/70 p-6">
          <p class="text-sm font-semibold text-highlighted">
            Gewinner nach Use Case
          </p>
          <div class="mt-5 space-y-4">
            <div
              v-for="item in comparison.winner_by_use_case"
              :key="`${item.useCase}-${item.winner}`"
              class="rounded-2xl border border-default bg-default p-4"
            >
              <p class="text-sm font-medium text-muted">
                {{ item.useCase }}
              </p>
              <p class="mt-2 text-lg font-semibold text-highlighted">
                {{ item.winner }}
              </p>
              <p class="mt-2 text-sm leading-7 text-muted">
                {{ item.reason }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>
