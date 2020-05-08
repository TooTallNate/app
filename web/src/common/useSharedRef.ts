import { useEffect, useRef, Ref } from "react";

export function useCombinedRefs<T>(...refs: Ref<T>[]) {
  const targetRef = useRef<T>(null);

  useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(targetRef.current);
      } else {
        (ref as any).current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
}
