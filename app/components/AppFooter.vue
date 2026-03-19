<script setup lang="ts">
const columns = [{
  label: 'Inhalte',
  children: [{
    label: 'Kategorien',
    to: '/kategorien'
  }, {
    label: 'Bestenlisten',
    to: '/bestenlisten'
  }, {
    label: 'Reviews',
    to: '/reviews'
  }, {
    label: 'Ratgeber',
    to: '/blog'
  }]
}, {
  label: 'Transparenz',
  children: [{
    label: 'Methodik',
    to: '/methodik'
  }, {
    label: 'Affiliate-Hinweis',
    to: '/legal/affiliate-disclosure'
  }, {
    label: 'Impressum',
    to: '/legal/impressum'
  }, {
    label: 'Datenschutz',
    to: '/legal/datenschutz'
  }]
}, {
  label: 'Themen',
  children: [{
    label: 'Rechnungen',
    to: '/bestenlisten'
  }, {
    label: 'Buchhaltung',
    to: '/bestenlisten'
  }, {
    label: 'MWST',
    to: '/blog'
  }]
}]
</script>

<template>
  <UFooter :ui="{ top: 'border-b border-default/80' }">
    <template #top>
      <UContainer>
        <div class="grid gap-8 py-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div class="space-y-3">
            <p class="text-sm font-medium uppercase tracking-[0.24em] text-muted">
              Gründer Schweiz
            </p>
            <h2 class="font-display text-2xl font-semibold tracking-tight text-highlighted">
              Ein sachliches Verzeichnis fuer Schweizer Freelancer-Software.
            </h2>
            <p class="max-w-xl text-sm leading-6 text-muted">
              Keine Produktvermarktung, sondern Kategorien, Rankings, Guides, Reviews und klare Methodik.
            </p>
          </div>

          <UFooterColumns :columns="columns" />
        </div>
      </UContainer>
    </template>

    <template #left>
      <div class="space-y-1">
        <p class="text-sm font-medium text-highlighted">
          Gründer Schweiz
        </p>
        <p class="text-sm text-muted">
          Fuer Schweizer Selbststaendige, die ein brauchbares Repository statt einer Marketingseite suchen.
        </p>
      </div>
    </template>

    <template #right>
      <p class="text-sm text-muted">
        © {{ new Date().getFullYear() }} Gründer Schweiz
      </p>
    </template>
  </UFooter>
</template>
