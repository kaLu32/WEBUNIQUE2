import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  const ctx = gsap.context(() => {
    // ----------------------------------------
    // HERO
    // ----------------------------------------

    const hero = gsap.timeline();

    hero
      .from(".hero-kicker", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .from(
        ".hero-title-line",
        {
          yPercent: 110,
          opacity: 0,
          stagger: 0.12,
          duration: 1.1,
          ease: "power4.out",
        },
        "-=0.35"
      )
      .from(
        ".hero-copy",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .from(
        ".hero-pod",
        {
          scale: 0.7,
          opacity: 0,
          rotation: -12,
          duration: 1.4,
          ease: "power4.out",
        },
        "-=0.6"
      );

    // ----------------------------------------
    // HERO POD - PARALLAX / ROTATION
    // ----------------------------------------

    gsap.to(".hero-pod", {
      y: -180,
      rotation: 10,
      scale: 0.75,

      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // ----------------------------------------
    // HERO TEXT
    // ----------------------------------------

    gsap.to(".hero-title", {
      y: -120,
      opacity: 0.15,

      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "70% top",
        scrub: 1,
      },
    });

    // ----------------------------------------
    // POD SECTION
    // ----------------------------------------

    const podTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".pod-section",
        start: "top top",
        end: "+=1500",
        scrub: 1,
        pin: true,
      },
    });

    podTimeline
      .from(".pod-title", {
        x: -150,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
      .from(
        ".pod-description",
        {
          x: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "<"
      )
      .from(
        ".pod-large",
        {
          scale: 0.45,
          rotation: -25,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out",
        },
        "-=0.6"
      )
      .to(".pod-large", {
        rotation: 360,
        scale: 0.8,
        duration: 2,
        ease: "none",
      })
      .to(".pod-title", {
        x: -100,
        opacity: 0.2,
        duration: 1,
      });

    // ----------------------------------------
    // SECTION TITLES
    // ----------------------------------------

    gsap.utils.toArray(".section-title").forEach((title) => {
      gsap.from(title, {
        y: 100,
        opacity: 0,

        scrollTrigger: {
          trigger: title,
          start: "top 85%",
          end: "top 40%",
          scrub: 1,
        },
      });
    });

    // ----------------------------------------
    // PLANTS
    // ----------------------------------------

    gsap.utils.toArray(".plant-card").forEach((card, index) => {
      const image = card.querySelector(".plant-image");
      const info = card.querySelector(".plant-info");

      gsap.from(card, {
        y: 100,
        opacity: 0,
        duration: 1,

        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.1,
      });

      gsap.from(image, {
        scale: 1.35,
        rotation: index % 2 === 0 ? -8 : 8,

        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.from(info, {
        y: 30,
        opacity: 0,

        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // ----------------------------------------
    // APP / PHONE
    // ----------------------------------------

    const appTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".app-section",
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1,
      },
    });

    appTimeline
      .from(".app-title", {
        x: -150,
        opacity: 0,
      })
      .from(
        ".phone",
        {
          y: 250,
          rotation: 20,
          scale: 0.75,
          opacity: 0,
        },
        "<"
      )
      .to(".phone", {
        rotation: -5,
        y: -30,
      });

    // ----------------------------------------
    // STATS
    // ----------------------------------------

    gsap.utils.toArray(".stat").forEach((stat) => {
      gsap.from(stat, {
        y: 80,
        opacity: 0,

        scrollTrigger: {
          trigger: stat,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // ----------------------------------------
    // REFRESH
    // ----------------------------------------

    ScrollTrigger.refresh();
  });

  return () => ctx.revert();
}