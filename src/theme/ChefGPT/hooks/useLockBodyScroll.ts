import { useEffect } from "react";
import styles from "./useLockBodyScroll.module.css";

export function useLockBodyScroll() {
  useEffect(() => {
    document.body.classList.add(styles.noScroll);

    return () => {
      document.body.classList.remove(styles.noScroll);

      // IE11 doesn't support `scrollTo` so we check that the method exists
      // first.
      window.scrollTo?.(0, 0);
    };

  }, []);
}
