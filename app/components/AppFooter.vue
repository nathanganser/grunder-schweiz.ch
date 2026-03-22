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
    to: '/bestenlisten/rechnungssoftware-schweiz'
  }, {
    label: 'Buchhaltung',
    to: '/bestenlisten/buchhaltungssoftware-schweiz'
  }, {
    label: 'Banking',
    to: '/bestenlisten/geschaeftskonto-freelancer-schweiz'
  }, {
    label: 'MWST',
    to: '/blog/mwst-selbststaendige-schweiz'
  }]
}]

const email = ref('')
const subscribed = ref(false)

function handleSubscribe() {
  if (email.value && email.value.includes('@')) {
    subscribed.value = true
    email.value = ''
  }
}
</script>

<template>
  <UFooter :ui="{ top: 'border-b border-default/80' }">
    <template #top>
      <UContainer>
        <div class="mb-8 border-b border-default/80 pb-8">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 class="font-display text-lg font-semibold tracking-tight text-highlighted">
                Neue Reviews und Quellen-Updates erhalten
              </h3>
              <p class="mt-1 text-sm text-muted">
                Kein Spam, nur rationale Updates für Schweizer Selbstständige.
              </p>
            </div>

            <div
              v-if="!subscribed"
              class="flex gap-2"
            >
              <input
                v-model="email"
                type="email"
                placeholder="deine@email.ch"
                class="rounded-lg border border-default bg-default px-3 py-2 text-sm text-highlighted placeholder:text-muted focus:border-primary focus:outline-none"
                @keyup.enter="handleSubscribe"
              >
              <UButton
                label="Anmelden"
                @click="handleSubscribe"
              />
            </div>

            <div
              v-else
              class="flex items-center gap-2 text-sm text-primary"
            >
              <UIcon
                name="i-lucide-check-circle-2"
                class="size-4"
              />
              <span>Erfolgreich angemeldet</span>
            </div>
          </div>
        </div>

        <div class="grid gap-8 py-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div class="space-y-3">
            <p class="text-sm font-medium uppercase tracking-[0.24em] text-muted">
              Gründer Schweiz
            </p>
            <h2 class="font-display text-2xl font-semibold tracking-tight text-highlighted">
              Redaktionelle Empfehlungen für Schweizer Freelancer-Software.
            </h2>
            <p class="max-w-xl text-sm leading-6 text-muted">
              Keine verkappte Promo-Seite und keine falsche Neutralität. Wir ranken eigenstaendig, zeigen Quellen offen und sagen klar, wenn Magic Heidi aktuell vorne liegt.
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
          Für Schweizer Selbstständige, die eine belastbare Empfehlung statt einer Blackbox suchen.
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
