import { create } from 'zustand';

interface EmailClassificationState {
  emailSuccess: {
    state: boolean;
    classification: string;
    auto_reply: string;
  };
  changeEmailSuccess: (
    status: boolean,
    classification: string,
    auto_reply: string
  ) => void;
  resetEmailSuccess: () => void;
  emailError: boolean;
  changeEmailError: (status: boolean) => void;
}

export const useEmailClassification = create<EmailClassificationState>(
  (set) => ({
    emailSuccess: {
      state: false,
      classification: '',
      auto_reply: '',
    },
    changeEmailSuccess: (status, classification, auto_reply) =>
      set({
        emailSuccess: {
          state: status,
          classification,
          auto_reply,
        },
      }),
    resetEmailSuccess: () =>
      set({
        emailSuccess: {
          state: false,
          classification: '',
          auto_reply: '',
        },
      }),
    emailError: false,
    changeEmailError: (status) => set({ emailError: status }),
  })
);
