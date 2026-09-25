import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '50px 0px 50px 0px',
      }
    );

    const observeAll = () => {
      document.querySelectorAll('.reveal-on-scroll:not(.is-visible)').forEach((el) => {
        observer.observe(el);
      });
    };

    observeAll();

    // Observe any dynamic additions to the DOM
    const mutObserver = new MutationObserver(observeAll);
    mutObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutObserver.disconnect();
    };
  }, []);
}
