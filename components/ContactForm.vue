<script setup lang="ts">
import { site } from '~/site.config'

const props = defineProps<{ services: string[] }>()

const { t } = useI18n()

type Status = 'idle' | 'sending' | 'success' | 'error'
const status = ref<Status>('idle')

const form = reactive({ name: '', email: '', type: '', message: '', honey: '' })

async function submit() {
  if (form.honey) return
  status.value = 'sending'

  try {
    const res = await fetch(site.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        type: form.type,
        message: form.message,
        _subject: t('form.subject'),
        _template: 'table'
      })
    })
    if (!res.ok) throw new Error(String(res.status))
    status.value = 'success'
    Object.assign(form, { name: '', email: '', type: '', message: '' })
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <form class="form" @submit.prevent="submit">
    <div class="form__row">
      <label class="field">
        <span class="label">{{ t('form.name') }}</span>
        <input v-model.trim="form.name" name="name" type="text" autocomplete="name" required>
      </label>
      <label class="field">
        <span class="label">{{ t('form.email') }}</span>
        <input v-model.trim="form.email" name="email" type="email" autocomplete="email" required>
      </label>
    </div>

    <label class="field">
      <span class="label">{{ t('form.type') }}</span>
      <select v-model="form.type" name="type">
        <option value="">—</option>
        <option v-for="key in props.services" :key="key" :value="t(`services.items.${key}.title`)">
          {{ t(`services.items.${key}.title`) }}
        </option>
        <option :value="t('form.typeOther')">{{ t('form.typeOther') }}</option>
      </select>
    </label>

    <label class="field">
      <span class="label">{{ t('form.message') }}</span>
      <textarea
        v-model.trim="form.message"
        name="message"
        rows="5"
        :placeholder="t('form.messagePlaceholder')"
        required
      />
    </label>

    <input v-model="form.honey" class="form__honey" name="_honey" type="text" tabindex="-1" autocomplete="off" aria-hidden="true">

    <div class="form__footer">
      <button class="btn btn--accent" type="submit" :disabled="status === 'sending'">
        {{ status === 'sending' ? t('form.sending') : t('form.submit') }}
      </button>
      <p class="form__status" role="status" aria-live="polite">
        <template v-if="status === 'success'">{{ t('form.success') }}</template>
        <template v-else-if="status === 'error'">{{ t('form.error', { email: site.contact.email }) }}</template>
      </p>
    </div>
  </form>
</template>
