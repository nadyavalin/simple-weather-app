import { SnackbarType } from "../types/interfaces";
import { createSnackbar } from "../utils/elements";

async function handleAsyncButtonAction(
  button: HTMLButtonElement,
  action: () => Promise<void>,
  buttonText: string,
  errorMessage: string,
) {
  button.disabled = true;
  button.innerHTML = '<div class="spinner"></div>';
  try {
    await action();
  } catch (error) {
    createSnackbar(SnackbarType.error, `${errorMessage}: ${(error as Error).message}`);
  } finally {
    button.disabled = false;
    button.textContent = buttonText;
  }
}

export default handleAsyncButtonAction;
