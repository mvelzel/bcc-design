<script setup lang="ts">
import { useId } from '@/hooks/use-id';
import {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
} from '@headlessui/vue'
import BccFormLabel from "@/components/BccFormLabel/BccFormLabel.vue";
import { computed, ref } from 'vue';
import { SearchIcon } from "@bcc-code/icons-vue";

type Props = {
    label?: string;
    showOptionalLabel?: boolean;
    optionalLabel?: string;
    required?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
    showOptionalLabel: false,
    optionalLabel: "Optional",
    required: false,
});

const showOptionalLabel = computed(() => props.showOptionalLabel && !props.required);

const id = `bcc-input-${useId()}`;

const options = [
    'Durward Reynolds',
    'Kenton Towne',
    'Therese Wunsch',
    'Benedict Kessler',
    'Katelyn Rohan',
]

const query = ref("");

const filtered = computed(() =>
    query.value === "" ? options : options.filter(o => o.toLowerCase().includes(query.value.toLowerCase())))

const separateQuery = (option: string, query: string) => (
    option.substring(0, option.toLowerCase().indexOf(query.toLowerCase())),
    option.substring(option.toLowerCase().indexOf(query.toLowerCase()), option.toLowerCase().indexOf(query.toLowerCase())) + query.length,
    option.substring(option.toLowerCase().indexOf(query.toLowerCase()) + query.length, option.length)
)

</script>

<template>
    <div class="bcc-input-container">
        <BccFormLabel v-if="label || showOptionalLabel" :for="id" :showOptionalLabel="showOptionalLabel"
            :optionalLabel="optionalLabel">
            {{ label }}
        </BccFormLabel>
        <Combobox>
            <div class="bcc-input-wrapper">
                <div class="bcc-input-icon-wrapper">
                    <component :is="SearchIcon" class="bcc-input-icon" aria-hidden="true" />
                </div>
                <ComboboxInput class="bcc-input bcc-input-with-icon" @change="query = $event.target.value" />
            </div>
            <ComboboxOptions>
                <ComboboxOption v-for="o in filtered" :key="o" :value="o">
                    <span>{{ o.substring(0, o.toLowerCase().indexOf(query.toLowerCase())) }}</span>
                    <span class="font-bold">{{ o.substring(o.toLowerCase().indexOf(query.toLowerCase()),
                        o.toLowerCase().indexOf(query.toLowerCase()) + query.length)
                    }}</span>
                    <span>{{ o.substring(o.toLowerCase().indexOf(query.toLowerCase()) + query.length, o.length) }}</span>
                </ComboboxOption>
            </ComboboxOptions>
        </Combobox>
    </div>
</template>
