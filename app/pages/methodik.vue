<script setup lang="ts">
const { data: page } = await useAsyncData('methodology', () => queryCollection('methodology').first())

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Methodik nicht gefunden', fatal: true })
}

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})
</script>

<template>
  <UContainer
    v-if="page"
    class="py-12"
  >
    <UPageHeader
      :title="page.title"
      :description="page.description"
    >
      <template #headline>
        <UBadge
          label="Methodik"
          color="neutral"
          variant="subtle"
        />
        <span class="text-muted">&middot;</span>
        <time class="text-muted">{{ new Date(page.lastUpdated).toLocaleDateString('de-CH', { year: 'numeric', month: 'short', day: 'numeric' }) }}</time>
      </template>
    </UPageHeader>

    <div class="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div class="rounded-[1.75rem] border border-default bg-default/70 p-6">
        <p class="text-sm font-semibold text-highlighted">
          Disclosure
        </p>
        <p class="mt-3 text-sm leading-7 text-muted">
          {{ page.disclosureSummary }}
        </p>

        <div class="mt-6">
          <p class="text-sm font-semibold text-highlighted">
            Kernkriterien
          </p>
          <ul class="mt-4 space-y-3 text-sm leading-6 text-muted">
            <li
              v-for="criterion in page.criteria"
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
      </div>

      <div class="rounded-[1.75rem] border border-default bg-default/70 p-6">
        <ContentRenderer :value="page" />

        <USeparator class="my-6" />

        <div>
          <p class="text-sm font-semibold text-highlighted">
            Ausgangsquellen
          </p>
          <div class="mt-4 flex flex-wrap gap-3">
            <UButton
              v-for="source in page.sources"
              :key="source.to"
              :label="source.label"
              :to="source.to"
              target="_blank"
              color="neutral"
              variant="outline"
              trailing-icon="i-lucide-arrow-up-right"
            />
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>
