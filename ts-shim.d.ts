declare module '@bhplugin/vue3-datatable' {
  const Vue3DataTable: any;
  export default Vue3DataTable;
}

declare module '@headlessui/vue' {
  import { Ref, DefineComponent, ComponentOptions } from 'vue';

  // Definiciones para TransitionRoot y TransitionChild
  export const TransitionRoot: DefineComponent;
  export const TransitionChild: DefineComponent;

  // Definiciones para Dialog, DialogPanel y DialogOverlay
  export const Dialog: DefineComponent<
    { as: string },
    () => JSX.Element,
    any,
    {},
    { open: Ref<boolean>; onClose: () => void }
  >;

  export const DialogPanel: DefineComponent<
    { as: string },
    () => JSX.Element,
    any,
    {},
    { open: Ref<boolean>; onClose: () => void }
  >;

  export const DialogOverlay: DefineComponent<
    { as: string },
    () => JSX.Element,
    any,
    {},
    { open: Ref<boolean>; onClose: () => void }
  >;
}