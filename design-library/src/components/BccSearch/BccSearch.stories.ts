import BccSearch from "./BccSearch.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccSearch",
  component: BccSearch,
  argTypes: {

  },
} as Meta<typeof BccSearch>;

const Template: StoryFn<typeof BccSearch> = (args) => ({
  components: { BccSearch },
  setup() {
    return { args };
  },
  template: `
    <BccSearch v-bind="args" />
  `,
});

export const Example = Template.bind({});
Example.args = {
  label: "Example label",
  showOptionalLabel: false,
  optionalLabel: "Optional"
};
